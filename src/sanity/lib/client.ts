import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./api";
import { tokenWrite } from "./token";

import type { ForumPost } from "../../interfaces/forumPost";

export const client = createClient(
  {
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: tokenWrite
});

export async function createPost(data: ForumPost) {
  return client.create({
    _type: 'post',
    text: data.text,
    createdAt: data.createdAt
  })
}