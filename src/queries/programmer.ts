export const PROGRAMMER_QUERY = `
  *[_type == "program" && !(_id in path("drafts.**"))] | order(Oppstart desc){
    programNavn,
    bilde {
        asset->{
            url
        }
    },
    beskrivelse,
    Oppstart,
    Slutt,
    StartaAv
  }
`;