export interface breedProjection {
    _id: string,
    name: string,
    origin: string,
    size: number,
    minHeight: number,
    maxHeight: number,
    minWeight: number,
    maxWeight: number,
    description: string,
    lifeTime: number,
    active: boolean
}

export interface cityProjection {
    _id: string,
    name: string,
    provinceId: string,
    countryId: string,
    active: boolean
}

export interface provinceProjection {
    _id: string,
    name: string,
    countryId: string,
    active: boolean
}

export interface countryProjection {
    _id: string,
    name: string,
    active: boolean
}

export interface userProjection {
    _id: string,
    firstName: string,
    lastName: string,
    sex: string,
    dateOfBirth: Date,
    profilePhoto: string,
    address: any,
    dogsQuantity: number,
    active: boolean
}

export interface dogProjection {
    _id: string,
    name: string,
    sex: string,
    idOwner: string,
    profilePhoto: string,
    dateOfBirth: Date,
    address: any,
    photos: string[],
    vaccines: string[]
    active: boolean,
    isOwner: boolean
}