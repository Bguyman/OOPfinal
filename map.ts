import fs from "fs/promises"
import {IPerson} from "./interfaces";
import {IHouse} from "./interfaces";
import {IClinic} from "./interfaces";
import {ICities} from "./interfaces";
import {IMap} from "./interfaces";
class MyMap {
    private _mapData: IMap;

    constructor(map) {
        this.setMapData(map)
    }

    public setMapData = (data) => {
        this._mapData = data
    }

    static async build(filename: string) {
        const json = await MyMap.loadMap(filename)
        return new MyMap(json);
    }

    static async loadMap(filename: string) {
        const data = JSON.parse(await fs.readFile(filename, "utf8"))
        return data;
    }

    public printMap = () => {
        let burnabyplaces: (IHouse | IClinic)[] = []
        let burnabyMap: string[] = []
        let finalMap: string = ""
        for (let house of this._mapData.city.Burnaby.households) {
            burnabyplaces.push(house)
        }
        for (let clinic of this._mapData.city.Burnaby.clinics) {
            burnabyplaces.push(clinic)
        }
        burnabyplaces.sort((a, b) => a.blockNum - b.blockNum)

        for (let place of burnabyplaces) {
            let whatIsIt: string = "F" 
            if (!place.name) {
            for (let person of place.inhabitants) {
                if (person.isVaccinated == false) {
                    whatIsIt = "H"
                } 
            }
        } else {
            whatIsIt = "C"
        }
        burnabyMap.push(whatIsIt)
        }
        finalMap = finalMap + burnabyMap.toString() + "// Burnaby" + "\n"
    }

// this code was above was going to individually create the maps for each city, turn them into strings, then marge them together as one string

}

export default MyMap