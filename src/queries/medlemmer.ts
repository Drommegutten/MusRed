import { client } from "../sanity/lib/client";

export function getTidligereMedlemmer({ start = 0, limit = 10 } = {}) {
  const query = `
    *[_type == "tidligereMedlemmer" && !(_id in path("drafts.**"))] 
    | order(tattOpp desc)
    [${start}...${start + limit}] {
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
  return client.fetch(query);
}