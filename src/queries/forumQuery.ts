import { client } from "../sanity/lib/client";

export function getForumPosts({ start = 0, limit = 10 } = {}) {
  const query = `
    *[_type == "post" && !(_id in path("drafts.**"))] 
    | order(createdAt desc)
    [${start}...${start + limit}] {
        text,
        createdAt
    }
  `;
  return client.fetch(query);
}