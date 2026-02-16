export const PAGE_BY_SLUG_QUERY = `
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    content
  }
`;