// vrije keuze module

enum Location {
    DENBOSCH = "Den Bosch",
    BREDA = "Breda",
    TILBURG = "Tilburg"
}

type Contact = {
    name: string;
    email: string;
}

export interface iVkm { 
    id: number;
    shortdescription: string;
    description: string;
    content: string; 
    studyCredits: number;
    location: Location;
    contact: Contact;
}