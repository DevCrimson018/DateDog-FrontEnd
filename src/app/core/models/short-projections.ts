export interface shortBreedProjection {
    _id: string,
    name: string,
    description: string
}

export interface shortCityProjection {
    _id: string,
    name: string,
}

export interface shortProvinceProjection {
    _id: string,
    name: string,
}

export interface shortCountryProjection {
    _id: string,
    name: string,
}

export interface shortUserProjection {
    _id: string,
    firstName: string,
    lastName: string,
    profilePhoto: string
}
