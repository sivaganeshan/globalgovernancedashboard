
import {allProtocols, AllProtocolsResponse} from './typedefinitions';

export const  MapToAllProposals =((data:AllProtocolsResponse[]):allProtocols[]=>{

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