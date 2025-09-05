
export function filterCities(filter: any, skip: number, limit: number) {
    const query = {
        filter: filter,
        skip: skip,
        limit: limit
    }

    return query;
}

export function filterProvinces(filter: any, skip: number, limit: number) {
    const query = {
        filter: filter,
        skip: skip,
        limit: limit
    }

    console.log(query);
    

    return query;
}

export function filterCountries(filter: any, skip: number, limit: number) {
    const query = {
        filter: filter,
        skip: skip,
        limit: limit
    }

    return query;
}

export function filterBreeds(filter: any, skip: number, limit: number) {
    const query = {
        filter: filter,
        skip: skip,
        limit: limit
    }

    return query;
}

export function filterUsers(filter: any, skip: number, limit: number) {
    const query = {
        filter: filter,
        skip: skip,
        limit: limit
    }

    return query;
}

export function filterDogs(filter: any, skip: number, limit: number) {
    
    console.log(filter);
    if(filter.idBreed == null){
        delete filter.idBreed
    }
    if(filter.idBreed == null){
        delete filter.sex
    }
    if(filter.idBreed == null){
        delete filter.address.cityId
    }
    if(filter.idBreed == null){
        delete filter.address.provinceId
    }
    if(filter.idBreed == null){
        delete filter.address.countryId
    }
    console.log(filter);
    

    const query = {
        filter: filter,
        skip: skip,
        limit: limit
    }

    return query;
}