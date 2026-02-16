export interface Medlem {
    medlemNavn: string;
    medlemBilde: {
        asset: {
            url: string;
        }
    };
    programTilhorighet: {
        programNavn: string;
        bilde: {
            asset: {
                url: string;
            }
        };

    };
    tattOpp: string;
    forlot: string;
    tattOppAv: {
        medlemNavn: string;
        medlemBilde: {
            asset: {
                url: string;
            }
        };
    };
    varFunk: boolean;
}