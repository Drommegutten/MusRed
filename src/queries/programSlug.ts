export const getProgrammerInfoSlug = (slug: string) => `
  *[_type == "program" && slug.current == "${slug}"][0]{
    programNavn,
    bilde {
      asset->{
        url
      }
    },
    beskrivelse,
    Oppstart,
    Slutt,
    startaAv[] ->  {
        medlemNavn,
        medlemBilde {
          asset->{
            url
        }
      }
    },
    slug {
      current
    },
    aktiveMedlemmer[] -> {
      medlemNavn,
      medlemBilde {
        asset->{
          url
        }
      }
    },
    linkTil
    
  }
`