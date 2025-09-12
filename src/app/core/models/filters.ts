
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

    if(filter.address){
        filter["address.cityId"] = filter.address.cityId
        filter["address.provinceId"] = filter.address.provinceId
        filter["address.countryId"] = filter.address.countryId

        if(filter.address.cityId == null){
            delete filter.address.cityId
            delete filter["address.cityId"]
        }

        
        if(filter.address.provinceId == null){
            delete filter.address.provinceId
            delete filter["address.provinceId"]
        }
        if(filter.address.countryId == null){
            delete filter.address.countryId
            delete filter["address.countryId"]
        }
        
    }
    
    delete filter.address
    
    console.log(filter);

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
    if(filter.sex == null){
        delete filter.sex
    }
    if(filter.address){
        filter["address.cityId"] = filter.address.cityId
        filter["address.provinceId"] = filter.address.provinceId
        filter["address.countryId"] = filter.address.countryId

        if(filter.address.cityId == null){
            delete filter.address.cityId
            delete filter["address.cityId"]
        }

        
        if(filter.address.provinceId == null){
            delete filter.address.provinceId
            delete filter["address.provinceId"]
        }
        if(filter.address.countryId == null){
            delete filter.address.countryId
            delete filter["address.countryId"]
        }
        
    }
    
    delete filter.address
    
    console.log(filter);
    

    const query = {
        filter: filter,
        //filter: {"address.countryId": "688b9494e0d88d6611ec2295"},
        skip: skip,
        limit: limit
    }

    return query;
}