export interface IMarker {
    lat: number;
    lng: number;
    label?: string;
    ownerId: string;
    isFavorite: boolean;
    houseId: string;
    type: string;
}