import {defineField, defineType} from 'sanity'
import { tidligereMedlemmer } from './tidligereMedlemmer'

export const program = defineType({
    name: "program",
    title: "Program",
    type: "document",
    fields: [
        defineField({
            name: "programNavn",
            title: "Navn på program",
            type: "string",
            validation: (Rule) => Rule.required().error('Title is required')
        }),
        defineField({
            name: "beskrivelse",
            title: "Beskrivelse av program",
            type: "text",
            validation: (Rule) => Rule.required().error('Title is required')
        }),
        defineField({
            name: "bilde",
            title: "Bilde for program",
            type: "image",
            validation: (Rule) => Rule.required().error('Title is required')
        }),
        defineField({
            name: 'Oppstart',
            type: 'date',
            description: 'Dato for oppstart',
            validation: (Rule) => Rule.required().error('Title is required')
        }),
        defineField({
            name: 'Slutt',
            type: 'date',
            description: 'Dato for slutt',
        }),
        defineField({
            name: "startaAv",
            type: 'array',
            of: [
                {
                name: "medlem",
                type: "reference",
                to: [{type: "tidligereMedlemmer"}],
                description: "Folka som starta  programmet",
                }
            ],    
        })
    ],
})