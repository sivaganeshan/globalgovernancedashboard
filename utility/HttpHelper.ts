import {protocols, proposals} from "../utility/data"

export const getGlobalstats= async ()=>  {
    try{
        const endpoint = `https://api.boardroom.info/v1/stats`;
    const response = await(await fetch(endpoint)).json();
    console.log(response);
    return response;
    }
    catch(err){
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

export const getallProtocols= async ()=>  {
    try{
    //     const endpoint = `https://api.boardroom.info/v1/protocols`;
    // const response = await(await fetch(endpoint)).json();
    // if(!response.data) return undefined;
    // return response.data;
    return protocols.data;
    }
    catch(err){
        throw 'error while fetching all protocols';
    }
}

export type topProtocolsByProposals = {
    thumbUrl : string | undefined,
    name : string,
    totalProposals: number,
    cname:string
}

export const getTop10ProtocolsByProposals = () =>{
    let toptenProtocols = protocols.data.sort((a,b)=>(b.totalProposals) -(a.totalProposals)).slice(0,10);
    let responsedata:topProtocolsByProposals[]= [];
    toptenProtocols.map(item =>{
        responsedata.push({
            "thumbUrl": item.icons?(item.icons.length>0?item.icons[0].url: undefined):undefined,
            "name": item.name,
            "totalProposals": item.totalProposals,
            "cname": item.cname
        })
    });
    return responsedata;
}

export const getTop10ProtocolsByVoters = () =>{
    let toptenProtocols = protocols.data.sort((a,b)=>(b.uniqueVoters) -(a.uniqueVoters)).slice(0,10);
    let responsedata:topProtocolsByProposals[]= [];
    toptenProtocols.map(item =>{
        responsedata.push({
            "thumbUrl": item.icons?(item.icons.length>0?item.icons[0].url: undefined):undefined,
            "name": item.name,
            "totalProposals": item.uniqueVoters,
            "cname": item.cname
        })
    });
    return responsedata;
}

export const getTop10ProtocolsByVotes = () =>{
    let toptenProtocols = protocols.data.sort((a,b)=>(b.totalVotes) -(a.totalVotes)).slice(0,10);
    let responsedata:topProtocolsByProposals[]= [];
    toptenProtocols.map(item =>{
        responsedata.push({
            "thumbUrl": item.icons?(item.icons.length>0?item.icons[0].url: undefined):undefined,
            "name": item.name,
            "totalProposals": item.totalVotes,
            "cname": item.cname
        })
    });
    return responsedata;
}