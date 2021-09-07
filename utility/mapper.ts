
import {allProtocols, AllProtocolsResponse,ProposalResponse, Proposal} from './typedefinitions';

export const  MapToAllProtocols =((data:AllProtocolsResponse[]):allProtocols[]=>{

    let result: allProtocols[] = [];
    try{
    if (data) {
        data.forEach(element => {
            let name = element.name;
            let cname= element.cname;
            let totalProposals= element.totalProposals;
            let totalVotes=element.totalVotes;
            let uniqueVoters =element.uniqueVoters;  
            let thumbUrl ="", avatar ="",tokenSymbol="",tokenCurrency="",tokenPrice=0,tokenNetwork="",contractAddress="";
            if(element.icons){
                thumbUrl = element.icons.length>0?element.icons[0].url:"";
                avatar = element.icons.length>2?element.icons[2].url:"";
            }  
            if(element.tokens){
                tokenSymbol = element.tokens.length>0?element.tokens[0].symbol:"";
                tokenCurrency = element.tokens.length>0?(element.tokens[0].marketPrices.length>0?element.tokens[0].marketPrices[0].currency:""):"";
                tokenPrice = element.tokens?.length>0?(element.tokens[0].marketPrices.length>0?element.tokens[0].marketPrices[0].price:0):0;
                tokenNetwork = element.tokens?.length>0?element.tokens[0].network:"";
                contractAddress = element.tokens?.length>0?element.tokens[0].contractAddress:"";
            }
            
            result.push(
                {
                    thumbUrl: thumbUrl,
                    name: name,
                    cname: cname,
                    totalProposals: totalProposals,
                    totalVotes: totalVotes,
                    uniqueVoters: uniqueVoters,
                    avatar: avatar,
                    
                    tokenSymbol: tokenSymbol,
                    tokenCurrency: tokenCurrency,
                    tokenPrice: tokenPrice,
                    tokenNetwork: tokenNetwork,
                    contractAddress: contractAddress
                }
            )
        });
    }
}
catch(err)
{
    console.log("error in MapToAllProposals() :" + err.message);
}   

return result;

})


export const  MapToOneProtocol =((data:AllProtocolsResponse):allProtocols|undefined=>{

    let result;
    try{
    if (data) {
            let name = data.name;
            let cname= data.cname;
            let totalProposals= data.totalProposals;
            let totalVotes=data.totalVotes;
            let uniqueVoters =data.uniqueVoters;  
            let thumbUrl ="", avatar ="",tokenSymbol="",tokenCurrency="",tokenPrice=0,tokenNetwork="",contractAddress="";
            if(data.icons){
                thumbUrl = data.icons.length>0?data.icons[0].url:"";
                avatar = data.icons.length>2?data.icons[2].url:"";
            }  
            if(data.tokens){
                tokenSymbol = data.tokens.length>0?data.tokens[0].symbol:"";
                tokenCurrency = data.tokens.length>0?(data.tokens[0].marketPrices.length>0?data.tokens[0].marketPrices[0].currency:""):"";
                tokenPrice = data.tokens?.length>0?(data.tokens[0].marketPrices.length>0?data.tokens[0].marketPrices[0].price:0):0;
                tokenNetwork = data.tokens?.length>0?data.tokens[0].network:"";
                contractAddress = data.tokens?.length>0?data.tokens[0].contractAddress:"";
            }
            
            result = {
                    thumbUrl: thumbUrl,
                    name: name,
                    cname: cname,
                    totalProposals: totalProposals,
                    totalVotes: totalVotes,
                    uniqueVoters: uniqueVoters,
                    avatar: avatar,
                    
                    tokenSymbol: tokenSymbol,
                    tokenCurrency: tokenCurrency,
                    tokenPrice: tokenPrice,
                    tokenNetwork: tokenNetwork,
                    contractAddress: contractAddress
                };
    }
}
catch(err)
{
    console.log("error in MapToAllProposals() :" + err.message);
}   

return result;

})


export const MapToProposals =((data:Proposal[]):ProposalResponse[]|[]=>{

    let result:ProposalResponse[]=[];

    try{
        if (data) {
            data.forEach(element => {
                let eleTitle = element.title;
                let eleRefid = element.refId;
                let eleProposer = element.proposer;
                let eleTotalVotes=element.totalVotes;
                let eleExternalurl  =element.externalUrl;  
                let eleStartsAt = new Date(element.startTimestamp).toLocaleString();
                let eleEndsAt = new Date(element.endTimestamp).toLocaleString();
                let eleChoices = element.choices?element.choices.join(' / '):"";
                let eleResults = "";//element.results?element.results.forEach(ele).join('/'):"";
                if(element.results){
                    element.results.forEach((ele, index)=>{
                        if(ele.total && index <element.results.length-1){
                            eleResults+=`${ele.total} / `;
                        }
                        if(ele.total && index ===element.results.length-1){
                            eleResults+=`${ele.total}`;
                        }
                    })
                }
                let eleState = element.currentState.toUpperCase();
                
                result.push(
                    {
                        title:eleTitle,
                        refid:eleRefid,
                        totalVotes:eleTotalVotes,
                        startsAt:eleStartsAt,
                        results:eleResults,
                        choices: eleChoices,
                        endsAt: eleEndsAt,
                        externalUrl :eleExternalurl,
                        proposer:eleProposer,
                        state: eleState
                    }
                )
            });
        }
    }
    catch(err)
    {
        console.log("error in MapToProposals() :" + err.message);
    }   
    
    return result;

})