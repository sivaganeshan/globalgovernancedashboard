import {protocols, proposals} from "./data"
import {topProtocolsByProposals, allProtocols} from "./typedefinitions"
import DataStore from "./dataStore"
import {MapToAllProposals} from "./mapper";

export const getGlobalstats= async ()=>  {
    try{
        const endpoint = `https://api.boardroom.info/v1/stats`;
    const response = await(await fetch(endpoint)).json();
    console.log(response);
    let staticInstance = DataStore.getInstance();
    staticInstance.setGlobalStatsData(response);
    }
    catch(err){
        console.log('error in getGlobalstats:'+err.message);
        throw 'error while fetching global stats';
    }
}

export const getallProposals= async ()=>  {
    try{
    //     const endpoint = `https://api.boardroom.info/v1/proposals`;
    // const response = await(await fetch(endpoint)).json();
    // if(!response.data) return undefined;
    // return response.data;
        return proposals.data;

    }
    catch(err){
        throw 'error while fetching all proposals';
    }
}

export const getallProtocols= async () =>  {
    try{
        const endpoint = `https://api.boardroom.info/v1/protocols`;
        const response = await(await fetch(endpoint)).json();
        if(!response.data) return undefined;
        let result = MapToAllProposals(response.data);
        let staticInstance = DataStore.getInstance();
        staticInstance.setAllProtocolsData(result);

    }
    catch(err){
        console.log('error in getallProtocols:'+err.message);
        throw 'error while fetching all protocols';
    }
}

export const getallProtocolsFromStore=()=>{
   
        let staticInstance = DataStore.getInstance();
        let responseData =  staticInstance.getAllProtocolsData();
        return responseData;
    
}





export const getProtocolsByProposals = () =>{
    let staticInstance = DataStore.getInstance();
    //let toptenProtocols = protocols.data.sort((a,b)=>(b.totalProposals) -(a.totalProposals)).slice(0,10);
    let toptenProtocols = staticInstance.getAllProtocolsData().sort((a,b)=>(b.totalProposals)-(a.totalProposals)).slice(0,10);
    let responsedata:topProtocolsByProposals[]= [];
    toptenProtocols.map(item =>{
        responsedata.push({
            "thumbUrl": item.thumbUrl,
            "name": item.name,
            "totalProposals": item.totalProposals,
            "cname": item.cname
        })
    });
    return responsedata;
}

export const getProtocolsByVoters = () =>{
    let staticInstance = DataStore.getInstance();
    //let toptenProtocols = protocols.data.sort((a,b)=>(b.uniqueVoters) -(a.uniqueVoters)).slice(0,10);
    let toptenProtocols = staticInstance.getAllProtocolsData().sort((a,b)=>(b.uniqueVoters)-(a.uniqueVoters));
    let responsedata:topProtocolsByProposals[]= [];
    toptenProtocols.map(item =>{
        responsedata.push({
            "thumbUrl": item.thumbUrl,
            "name": item.name,
            "totalProposals": item.uniqueVoters,
            "cname": item.cname
        })
    });
    return responsedata;
}

export const getProtocolsByVotes = () =>{
    let staticInstance = DataStore.getInstance();
   //let toptenProtocols = protocols.data.sort((a,b)=>(b.totalVotes) -(a.totalVotes)).slice(0,10);
   let toptenProtocols = staticInstance.getAllProtocolsData().sort((a,b)=>(b.totalVotes)-(a.totalVotes)).slice(0,10);
    let responsedata:topProtocolsByProposals[]= [];
    toptenProtocols.map(item =>{
        responsedata.push({
            "thumbUrl": item.thumbUrl,
            "name": item.name,
            "totalProposals": item.totalVotes,
            "cname": item.cname
        })
    });
    return responsedata;
}