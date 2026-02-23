export interface Program {
    programNavn: string;
    bilde: {
        asset: {
            url: string;
        }
    };
    slug:  {
        current: string;
    } 
    beskrivelse: beskrivelseBlock[];
    aktiveMedlemmer: AktiveMedlemmer[];
    startaAv: StartaAv[];
    Oppstart: string;
}

interface beskrivelseBlock {
    children: {
        text: string;
    }[];
}

interface AktiveMedlemmer {
    medlemNavn: string;
    medlemBilde: {
        asset: {
            url: string;
        }
    };

};

interface StartaAv {
    medlemNavn: string;
    medlemBilde: {
        asset: {
            url: string;
        }
    };
}
