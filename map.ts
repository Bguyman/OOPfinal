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
        for (let house of this._mapData.city.Burnaby.households) {
            burnabyplaces.push(house)
        }
        for (let clinic of this._mapData.city.Burnaby.clinics) {
            burnabyplaces.push(clinic)
        }
        burnabyplaces.sort((a, b) => a.blockNum - b.blockNum)
    }

}

export default MyMap