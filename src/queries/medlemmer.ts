export const MEDLEM_QUERY = `
  *[_type == "tidligereMedlemmer" && !(_id in path("drafts.**"))] | order(tattOpp desc){
      medlemNavn,
      medlemBilde {
          asset->{
              url
          }
      },
      programTilhorighet->{
          programNavn,
          bilde {
              asset->{
                  url
              }
          },
          slug
      },
      tattOpp,
      forlot,
      tattOppAv->{
          medlemNavn,
          medlemBilde {
              asset->{
                  url
              }
          }
      },
      varFunk
    
  }
`;