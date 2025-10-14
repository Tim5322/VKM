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
    _id: string;
    id: number;
    name: string;
    shortdescription: string;
    description: string;
    content: string; 
    studycredit: number;
    location: string;
    contact_id: number;
    level: string;
    learningoutcomes: string;
    isFavoriet?: boolean; // Voor frontend gebruik
}

export { Location };