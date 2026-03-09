import {defineField, defineType} from 'sanity'

export const omMusRed = defineType({
    name: "omMusRed",
    title: "Om MusRed",
    type: "document",
    fields: [
        defineField({
            name: "beskrivelse",
            title: "Beskrivelse av MusRed",
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
            title: "Bilde for Om MusRed",
            type: "image",
            validation: (Rule) => Rule.required().error('Title is required'),
            options: {
                hotspot: true,
            },
        }),
    ],
})