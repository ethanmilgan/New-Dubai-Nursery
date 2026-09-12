import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Review IDs refer to the local archive inventory, not children's identities.
const selections = [
  [4, 'creative-collage', 'A child creating a colourful paper collage', ['Home: main hero'], 'Clear portrait composition with the activity visible.'],
  [8, 'reading-together', 'Children sharing a picture book', ['Curriculum: literacy'], 'Close view of shared reading and communication.'],
  [12, 'classroom-storytime', 'Children exploring picture books around a classroom table', ['Home: supporting hero', 'Curriculum: communication and language'], 'Landscape view showing authentic shared learning.'],
  [32, 'family-teacher-meeting', 'Families and an educator meeting in a nursery classroom', ['About: hero', 'Admissions: family partnership', 'Contact: hero'], 'Welcoming family interaction; landscape frame suits banners.'],
  [43, 'sports-day', 'Children taking part in a nursery sports day', ['Home: celebration gallery'], 'Colourful group activity with a clear foreground.'],
  [58, 'sensory-number-tracing', 'Children tracing number shapes in sensory trays', ['Curriculum: purposeful play'], 'Clear view of both learners and their number activity.'],
  [72, 'counting-and-colours', 'Children counting and sorting colourful counters', ['Curriculum: mathematics'], 'The learning materials and cooperative activity are easy to see.'],
  [84, 'cooperative-discovery', 'Children using tongs together to explore a sensory tray', ['Home: learning approach', 'About: educators', 'Curriculum: personal social and emotional development'], 'Close view of cooperative, hands-on exploration.'],
  [91, 'balance-and-movement', 'Children practising balance along an outdoor activity path', ['Home: movement gallery', 'About: physical play', 'Curriculum: physical development'], 'Portrait framing preserves the balance path and movement.'],
  [97, 'soft-play-friends', 'Two children smiling together in the soft play area', ['Home: belonging', 'About: learning through play'], 'Warm expressions and clear portrait framing.'],
  [104, 'small-world-exploration', 'Children exploring plants and materials in a small-world tray', ['Home: supporting hero', 'Curriculum: hero'], 'Landscape composition shows shared curiosity and the activity.'],
  [108, 'imaginative-kitchen', 'Children playing together in a classroom pretend kitchen', ['Home: role-play gallery', 'About: nursery life'], 'Recognisable imaginative play with space around the subjects.'],
  [112, 'watering-plants', 'Children watering plants together', ['Home: care section', 'Curriculum: nature and discovery'], 'Portrait composition connects caring actions with nature.'],
  [118, 'outdoor-discovery', 'Children investigating soil with pots and scoops outdoors', ['Contact: nursery activities'], 'High-resolution outdoor learning scene with visible activity.'],
  [28, 'nursery-anniversary-team', 'The nursery team celebrating forty years together', ['About: hero'], 'A wide group photograph connects the nursery story to its people and anniversary.'],
  [36, 'learning-beyond-classroom', 'Children and educators together on an outdoor visit', ['About: learning through play'], 'Clear outdoor group portrait with educators and children together.'],
  [99, 'outdoor-group-movement', 'Children moving together across the shaded nursery playground', ['About: physical play'], 'Landscape framing shows whole-body movement and the play space.'],
  [62, 'firefighter-role-play', 'Children pretending to be firefighters with a play fire engine', ['About: nursery life'], 'Bright, sharp imaginative play scene with visible costumes and props.'],
  [119, 'educator-nature-circle', 'An educator leading a small-group activity in the nature area', ['About: educators'], 'The educator and attentive children are clearly visible in a real learning interaction.'],
  [116, 'animal-puzzle-discovery', 'Children working together on an animal puzzle outdoors', ['Curriculum: hero'], 'Clear landscape view of cooperative problem-solving.'],
  [63, 'story-and-conversation', 'Children exploring a caterpillar story with picture cards', ['Curriculum: communication and language'], 'Clear faces and story props show conversation around a familiar story.'],
  [92, 'stepping-stone-balance', 'Children balancing along a line of stepping stones', ['Curriculum: physical development'], 'Full-body activity makes coordination and balance easy to understand.'],
  [82, 'shared-sensory-play', 'Children exploring a five-senses activity together', ['Curriculum: personal social and emotional development'], 'Well-lit group activity shows children sharing materials and exploring together.'],
  [65, 'quiet-reading-corner', 'Two children enjoying picture books in the reading corner', ['Curriculum: literacy'], 'Uncluttered portrait with both books and readers visible.'],
  [114, 'solar-system-discovery', 'A child exploring a model of the solar system', ['Curriculum: understanding the world'], 'A focused portrait with the child and science model visible.'],
  [1, 'creative-making-together', 'Children decorating gingerbread-shaped crafts with colourful materials', ['Curriculum: expressive arts and design'], 'Clear landscape view of creative making and varied art materials.'],
  [98, 'welcome-to-soft-play', 'Two children smiling in the nursery soft play area', ['Admissions: hero'], 'Welcoming expressions in a bright nursery setting.'],
  [31, 'parent-teacher-partnership', 'A family meeting with an educator in the nursery classroom', ['Admissions: family partnership'], 'Clear landscape portrait of a family and educator meeting.'],
  [10, 'sharing-stories-and-feelings', 'A child sharing a story activity with emotion cards', ['Contact: hero'], 'A warm expression and storytelling props suit starting a conversation.'],
];

const inventory = JSON.parse(await fs.readFile('.photo-review/inventory.json', 'utf8'));
await fs.mkdir('public/images/curated', {recursive: true});
await fs.mkdir('content', {recursive: true});
const photos = [];
for (const [id, slug, alt, placements, reason] of selections) {
  const source = inventory.find(photo => photo.id === id);
  const output = `public/images/curated/${slug}.webp`;
  const result = await sharp(source.path).rotate().resize({width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true}).webp({quality: 86}).toFile(output);
  photos.push({id: slug, src: `/images/curated/${slug}.webp`, alt, category: source.category, width: result.width, height: result.height, bytes: result.size, sourceArchive: `${source.category}.zip`, sourcePath: path.relative(path.resolve('.photo-review', source.category), source.path).replaceAll('\\', '/'), placements, selectionReason: reason});
}
const pages = JSON.parse(await fs.readFile('content/pages.json', 'utf8'));
for (const photo of photos) {
  photo.placements = pages.flatMap(page => page.photos.filter(position => position.photoId === photo.id).map(position => `${page.title}: ${position.label}`));
  if (photo.id === 'educator-nature-circle') photo.focus = {x: 0.28, y: 0.5};
  if (photo.id === 'welcome-to-soft-play') photo.focus = {x: 0.5, y: 0.33};
  if (photo.id === 'solar-system-discovery') photo.focus = {x: 0.5, y: 0.4};
}
await fs.writeFile('content/photo-library.json', JSON.stringify(photos, null, 2) + '\n');
console.log(`Prepared ${photos.length} photos (${photos.reduce((n, p) => n + p.bytes, 0)} bytes).`);
