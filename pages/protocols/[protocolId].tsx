import Head from 'next/head'
import {IndexWrapper} from "../../styles/app.styles"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {getaProtocolByNamefromStore,getProtocolByName, getallProposalssFromStore,getProposalsbycname} from "../../utility/HttpHelper";
import ProposalStats from "../../components/ProposalStats";
import Loading from "../../components/loading";
import TopTenProtocols from "../../components/TopTenProtocols"
import Image from 'next/image'
import boadrroomlogo from "../../public/boardroominc.png";
import {allProtocols, topProtocolsByProposals, ProposalResponse} from "../../utility/typedefinitions";
import DataStore from "../../utility/dataStore";
import {useRouter} from 'next/router';
import ProtocolHeader from "../../components/ProtocolHeader";
import ProposalsData from "../../components/ProposalsPagination";


export default function Protocol(){

    const[sideMenuClicked, SetSideMenuClicked] = useState<boolean>(false);
    const[isloading, setIsLoading] = useState<boolean>(true);
    const[errorText, setErrorText]= useState<string|undefined>(undefined);
    const[totalProposals, SetTotalProposals] = useState<number>(0);
    const[uniqueVoters, SetUniqueVoters] = useState<number>(0);
    const[totalVotes, SetTotalVotes] = useState<number>(0);
    const[avatar, SetAvatar] = useState<string>("");
    const[name, SetName] = useState<string>("");
    const[tokensymbol, SetTokensymbol] = useState<string>("");
    const[tokenPrice, SetTokenPrice] = useState<string>("");
    const[contractAddress, SetContractAddress] = useState<string>("");
    const [proposalsData, setProposalsData] = useState<ProposalResponse[]>([]);
    let router = useRouter();

    useEffect(()=>{
        let { protocolId } = router.query;
        if(!protocolId){
            protocolId = window.location.href.split("protocols/")[1];   
        }
        function getRequiredData() {
          try {
              
                //setErrorText("protocol cname does not exist");
                //Fetch proposals data
                Promise.all([getProtocolByName(protocolId?protocolId.toString():""),getProposalsbycname(protocolId?protocolId.toString():"")]).then(()=>{

                  let selected = getaProtocolByNamefromStore(protocolId?protocolId.toString():"");
                  SetTotalProposals(selected?selected.totalProposals:0);
                  SetUniqueVoters(selected?selected.uniqueVoters:0);
                  SetTotalVotes(selected?selected.totalVotes:0);
                  SetAvatar(selected?selected.avatar:"");
                  SetName(selected?selected.name:"");
                  SetTokensymbol(selected?selected.tokenSymbol:"");
                  SetTokenPrice(selected?selected.tokenPrice.toString():"");
                  SetContractAddress(selected?selected.contractAddress.toString():"")

                  let ProposalsResponse = getallProposalssFromStore();
                  setProposalsData(ProposalsResponse);
                  setIsLoading(false);
                })
                
          } catch (err) {
            setErrorText("Error in loading required Data");
          }
        }
        getRequiredData();
    },[]);

    return(
        <div>
      <Head>
        <title>Global Governance Dashboard | BoardRoom API</title>
      </Head>
      <IndexWrapper userClicked={sideMenuClicked} >
      {isloading && <Loading />}
      {!isloading && errorText && <div id="errorText">{errorText}</div>}
      {!isloading && !errorText && <>
      <div className="header">
        <div className="bars" onClick={
          ()=>SetSideMenuClicked(sideMenuClicked?false:true)}>&#9776;</div>
        <div className="headerName">Global Governance Dashboard</div>
      </div>
      <div className="sidebar">
        <div className="sidebaritem ">
        <Link  href="/">
          <a>Home</a>
        </Link>
        </div>
        <div className="sidebaritem selected">
        <Link href="/protocols">
          <a>Protocols</a>
        </Link>
        </div>
      </div>
      <div className="content">
        <div className="homeTop">
            <div className="globalStats">
            {/* <ProposalStats totalProposals={totalProposals} totalUniqueVoters={uniqueVoters} totalVotesCast={totalVotes}/> */}
        </div>
       </div>
       <div className="topTables">
       <ProtocolHeader avatar={avatar} name={name} tokenSymbol={tokensymbol} tokenPrice={tokenPrice} contractAddress={contractAddress} ></ProtocolHeader>
       <ProposalStats totalProposals={totalProposals} totalUniqueVoters={uniqueVoters} totalVotesCast={totalVotes}/>
      </div>
      <div className="topTables">
       <ProposalsData allProposalsFromStore={proposalsData}></ProposalsData>
      </div>

      <div className="footer">
      <span>
        <Image src={boadrroomlogo}
         alt="boardroom_logo" width="50px" height="50px"></Image>
         </span>
        <span className="footer-text">Data provided by BoardRoom API</span>
      </div>
      </div>
     
      </>
      
      }
      </IndexWrapper>
    </div>
    )
}