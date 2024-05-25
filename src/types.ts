export type RequestCard = {
    id: number;
    uid: string;
    blend_name: string;
    origin: string;
    variety: string;
    notes: string;
    intensifier: string;
};

export type Card = Omit<RequestCard, "notes"> & {
    notes: string[];
    imageUrl: string;
};
