import {defineField, defineType} from 'sanity'

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
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [{ title: "Normal", value: "normal" }],
                    lists: [],
                },
            ],
            validation: (Rule) => Rule.required().error('Title is required')
        }),
        defineField({
            name: "bilde",
            title: "Bilde for program",
            type: "image",
            validation: (Rule) => Rule.required().error('Title is required'),
            options: {
                hotspot: true,
            },
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
        }),
        {
        name: "slug",
        type: "slug",
        options: {
            source: "programNavn",
            maxLength: 96
        }
        },
        defineField({
            name: "aktiveMedlemmer",
            title: "Aktive medlemmer i programmet",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{type: "tidligereMedlemmer"}],
                }
            ]
        })
    ],
})