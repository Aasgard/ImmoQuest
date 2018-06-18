export interface IMarker {
    id?: string;
    lat?: number;
    lng?: number;
    label?: string;
    ownerId?: string;
    isFavorite?: boolean;
    houseId?: string;
    type?: string;
    markerIcon?: string;
    createdDatetime?: Date;
    updatedDatetime?: Date;
}