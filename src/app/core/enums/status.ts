export enum Status {
    AVAILIABLE = 'AVAILIABLE',
    UNAVAILABLE = 'UNAVAILABLE'
}

export const statusToString: { [key in Status]: string } = {
    [Status.AVAILIABLE]: 'Ativado',
    [Status.UNAVAILABLE]: 'Pausado',
};