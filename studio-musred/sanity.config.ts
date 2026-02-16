import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '6n3j5jt3'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

const SANITY_STUDIO_PREVIEW_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.vg.no'
      : process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

export default defineConfig({
  name: 'default',
  title: 'MusRed',

  projectId: '6n3j5jt3',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
