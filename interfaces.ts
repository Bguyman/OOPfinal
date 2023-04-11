export interface IPerson {
    phn: string
    fullname: string
    isVaccinated:boolean
    age:number
}

export interface IHouse {
    blockNum: number
    inhabitants: IPerson[]
}

export interface IClinic {
    name: string
    blockNum: number
    staff: number
}

export interface ICities {
    Burnaby: {
        households: IHouse[]
        clinics: IClinic[]
    },
    Vancouver: {
        households: IHouse[]
        clinics: IClinic[]
    },
    Richmond: {
        households: IHouse[]
        clinics: IClinic[]
    },
}

export interface IMap {
    city: ICities
}
