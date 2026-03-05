import {defineField, defineType} from 'sanity'

export const tidligereMedlemmer = defineType({
  name: 'tidligereMedlemmer',
  title: 'Tidligere/nåværende Medlemmer',
  type: 'document',
  fields: [
    defineField({
      name: 'medlemNavn',
      type: 'string',
      description: 'Navnet på det tidligere medlemmet',
      validation: (Rule) => Rule.required().error('Title is required')
    }),
    defineField({
      name: 'medlemBilde',
      type: 'image',
      description: 'Bilde av det tidligere medlemmet',
      options: {hotspot: true},
    }),
    defineField({
      name: 'programTilhorighet',
      type: "reference",
      to: [{type: "program"}],
      description: 'Programmet det tidligere medlemmet tilhørte',
      validation: (Rule) => Rule.required().error('Program tilhørighet må med!')
    }),
    defineField({
      name: 'tattOpp',
      type: 'date',
      description: 'Når medlemmet ble tatt opp i musred',
      validation: (Rule) => Rule.required().error('Når medlemmet ble tatt opp i musred må med!')
    }),
    defineField({
      name: 'forlot',
      type: 'date',
      description: 'Når medlemmet forlot musred',
    }),
    defineField({
      name: 'tattOppAv',
        type: 'reference',
        description: 'Brukeren som tok opp medlemmet',
        to: [{type: 'tidligereMedlemmer'}],
    }),
    defineField({
        name: 'varFunk',
        type: 'boolean',
        description: 'Var brukeren funksjonær i musred?'
    }),
  ],
})