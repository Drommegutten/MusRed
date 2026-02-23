export const PROGRAMMER_QUERY = `
  *[_type == "program" && !(_id in path("drafts.**"))] | order(Oppstart desc){
    bilde {
        asset->{
            url
        }
    },
    slug {
      current
    }
  }
`;

