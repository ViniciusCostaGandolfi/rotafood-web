export interface CepV1 {
    cep: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    service: string
}


export interface CepV2 {
    cep: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    service: string,
    location: {
        type: string;
        coordinates : {
            latitude: number;
            longitude: number
        }
    }

}