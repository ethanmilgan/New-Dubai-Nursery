'use client';
import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {projectId, dataset} from './sanity/project.js';
import {schemaTypes} from './sanity/schema.js';

export default defineConfig({
  name: 'nursery', title: 'New Dubai Nursery', projectId, dataset, basePath: '/studio',
  plugins: [structureTool({structure: S => S.list().title('Website content').items([
    S.listItem().title('Pages').child(S.documentTypeList('nurseryPage').title('Pages')),
    S.listItem().title('Photo library').child(S.documentTypeList('nurseryPhoto').title('Photo library')),
    S.listItem().title('Nursery details').child(S.document().schemaType('nurserySettings').documentId('nurserySettings')),
  ])})],
  schema: {types: schemaTypes},
});
