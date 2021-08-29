import {globalStatsProp,globalStatsResponse,allProtocols} from "./typedefinitions";


export default class DataStore {

    static myInstance:DataStore = new DataStore();

    _currentGlobalStats:globalStatsProp|null = null;
    _allProtocols:allProtocols[] = [];

    static getInstance() {
        if (!DataStore.myInstance) {
            DataStore.myInstance = new DataStore();
        }

        return this.myInstance;
    }

    getGlobalStatsData(){
        return this._currentGlobalStats;
    }

    setGlobalStatsData(data:globalStatsResponse) {
        this._currentGlobalStats = data.data;
    }
    getAllProtocolsData(){
        return this._allProtocols;
    }
    setAllProtocolsData(data:allProtocols[]){
        this._allProtocols = data;
    }
}