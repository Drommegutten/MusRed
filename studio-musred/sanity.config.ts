import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singletonTypes = new Set(['omMusRed'])
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])


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
