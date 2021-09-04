import Head from 'next/head'
import {IndexWrapper} from "../../styles/app.styles"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {getGlobalstats, /*getallProposals, getallProtocols */   getProtocolsByVoters
,getProtocolsByProposals,getProtocolsByVotes, getallProtocols} from "../../utility/HttpHelper";
import GlobalStats from "../../components/GlobalStats";
import Loading from "../../components/loading";
import TopTenProtocols from "../../components/TopTenProtocols"
import Image from 'next/image'
import boadrroomlogo from "../../public/boardroominc.png";
import {topProtocolsByProposals} from "../../utility/typedefinitions";
import DataStore from "../../utility/dataStore";
import {useRouter} from 'next/router';


export default function Protocol(){

    const[sideMenuClicked, SetSideMenuClicked] = useState<boolean>(false);
    const[isloading, setIsLoading] = useState<boolean>(false);
    const[errorText, setErrorText]= useState<string|undefined>(undefined);
    const[totalProposals, SetTotalProposals] = useState<number>(0);
    const[uniqueVoters, SetUniqueVoters] = useState<number>(0);
    const[totalVotes, SetTotalVotes] = useState<number>(0);
    const[defaultProtocol , setDefaultProtocol] = useState<string>("");
    let router = useRouter();

    useEffect(()=>{
        let { protocolId } = router.query;
        if(!protocolId){
            protocolId = window.location.href.split("protocols/")[1];   
        }
        function getRequiredData() {
          try {
              
            let _instance = DataStore.getInstance();
            let allProtocols = _instance.getAllProtocolsData();
            
            if (protocolId) {
                setDefaultProtocol(protocolId.toString());
              let requiredProtocol = allProtocols.filter(
                (x) => x.cname === protocolId
              );
              if (requiredProtocol && requiredProtocol.length > 0) {
                SetTotalProposals(requiredProtocol[0].totalProposals);
                SetUniqueVoters(requiredProtocol[0].uniqueVoters);
                SetTotalVotes(requiredProtocol[0].totalVotes);
              } else {
                setErrorText("protocol cname does not exist");
              }
            } else {
              setErrorText("Protocol cname is empty");
            }
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
        <div className="sidebaritem">
        <Link href="/">
          <a>Proposals</a>
        </Link>
        </div>
        <div className="sidebaritem">
        <Link href="/">
          <a>Votes</a>
        </Link>
        </div>
      </div>
      <div className="content">
        <div className="homeTop">
            <div className="globalStats">
            <GlobalStats totalProposals={totalProposals} totalUniqueVoters={uniqueVoters} totalVotesCast={totalVotes} totalProtocols={0}/>
        </div>
       </div>
       <div className="topTables">
            
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