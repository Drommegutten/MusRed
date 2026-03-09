import {defineType} from 'sanity'

export const ForumPost = defineType({
  name: 'post',
  type: 'document',
  title: 'Forum Post',
  fields: [
    { name: 'text', type: 'text', title: "Innhold" },
    { name: 'createdAt', type: 'datetime', title:"Opprettet" }
  ]
})