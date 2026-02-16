import {defineCliConfig} from 'sanity/cli'


const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '6n3j5jt3'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || '', // Visit https://www.sanity.io/docs/environment-variables to learn more about using environment variables for local & production.
  autoUpdates: true,
})