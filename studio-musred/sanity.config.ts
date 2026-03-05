import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '6n3j5jt3'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const singletonTypes = new Set(['omMusRed'])
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

const SANITY_STUDIO_PREVIEW_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.vg.no'
      : process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

export default defineConfig({
  name: 'default',
  title: 'MusRed',

  projectId: '6n3j5jt3',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Om MusRed')
              .id('omMusRed')
              .child(S.editor().id('omMusRed').schemaType('omMusRed').documentId('omMusRed')),
            ...S.documentTypeListItems().filter(
              (listItem) => !singletonTypes.has(listItem.getId() || ''),
            ),
          ]),
    }),
    visionTool(),
  ],

  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => !singletonTypes.has(templateItem.templateId))
      }
      return prev
    },
    actions: (prev, context) =>
      singletonTypes.has(context.schemaType)
        ? prev.filter(({action}) => action && singletonActions.has(action))
        : prev,
  },

  schema: {
    types: schemaTypes,
  },
})
