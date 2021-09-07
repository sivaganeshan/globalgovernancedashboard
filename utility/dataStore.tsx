import {globalStatsProp,globalStatsResponse,allProtocols, ProposalResponse} from "./typedefinitions";


export default class DataStore {

    static myInstance:DataStore = new DataStore();

    _currentGlobalStats:globalStatsProp|null = null;
    _allProtocols:allProtocols[] = [];
    _selectedProtocol:allProtocols|undefined = undefined; 
    _selectedProposals:ProposalResponse[] = [];

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
    getaProtocolData(){
        return this._selectedProtocol;
    }
    setaProtocolData(data:allProtocols|undefined){
        this._selectedProtocol = data;
    }

    getProposalsData(){
        return this._selectedProposals;
    }
    setProposalsData(data:ProposalResponse[]){
        this._selectedProposals = data;
    }
}