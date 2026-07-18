import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import { basename, join, relative, resolve, sep } from "node:path";
import { MongoClient } from "mongodb";
import { getContentType, getMediaKind } from "../app/lib/media-types.js";

function loadEnvironmentFile(filename) {
  if (!existsSync(filename)) return;

  for (const line of readFileSync(filename, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator < 1) continue;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvironmentFile(resolve(".env.local"));
loadEnvironmentFile(resolve(".env"));

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is required. Copy .env.example to .env.local and add your MongoDB connection string.");
}

const sourceRoot = resolve("media-source");
if (!existsSync(sourceRoot)) {
  throw new Error(`Media source directory was not found: ${sourceRoot}`);
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    if (entry.isFile()) files.push(path);
  }

  return files;
}

const client = new MongoClient(process.env.MONGODB_URI);
const dbName = process.env.MONGODB_DB || "early_years_education_group";
const now = new Date();

await client.connect();

try {
  const collection = client.db(dbName).collection("mediaAssets");
  await collection.createIndex({ key: 1 }, { unique: true, name: "media_key_unique" });

  const files = await walk(sourceRoot);
  const keys = [];
  let inserted = 0;
  let updated = 0;
  let unchanged = 0;

  for (const path of files) {
    const key = relative(sourceRoot, path).split(sep).join("/");
    const fileStat = await stat(path);
    if (fileStat.size > 15 * 1024 * 1024) {
      throw new Error(`${key} is larger than 15 MB. Store larger files in object storage and keep only their URL in MongoDB.`);
    }

    const data = await readFile(path);
    const sha256 = createHash("sha256").update(data).digest("hex");
    const contentType = getContentType(path);
    const existing = await collection.findOne({ key }, { projection: { sha256: 1 } });
    keys.push(key);

    if (existing?.sha256 === sha256) {
      unchanged += 1;
      continue;
    }

    const result = await collection.updateOne(
      { key },
      {
        $set: {
          key,
          kind: getMediaKind(contentType),
          category: key.split("/")[0],
          filename: basename(path),
          contentType,
          size: fileStat.size,
          altText: "",
          sha256,
          data,
          managedBy: "seed",
          updatedAt: now
        },
        $setOnInsert: { createdAt: now }
      },
      { upsert: true }
    );

    if (result.upsertedCount) inserted += 1;
    else updated += 1;
  }

  const removed = await collection.deleteMany({ managedBy: "seed", key: { $nin: keys } });
  console.log(`Seeded mediaAssets in "${dbName}": ${inserted} inserted, ${updated} updated, ${unchanged} unchanged, ${removed.deletedCount} removed.`);
} finally {
  await client.close();
}
