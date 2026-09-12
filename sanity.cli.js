import {defineCliConfig} from 'sanity/cli';
import {projectId, dataset} from './sanity/project.js';
export default defineCliConfig({api: {projectId, dataset}});
