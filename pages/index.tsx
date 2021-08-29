import Head from 'next/head'
import {IndexWrapper} from "../styles/app.styles"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {getGlobalstats, /*getallProposals, getallProtocols */   getTop10ProtocolsByVoters
,getTop10ProtocolsByProposals,getTop10ProtocolsByVotes, getallProtocols} from "../utility/httpHelper";
import GlobalStats from "../components/GlobalStats";
import Loading from "../components/loading";
import TopTenProtocols from "../components/TopTenProtocols"
import Image from 'next/image'
import boadrroomlogo from "../public/boardroominc.png";
import {topProtocolsByProposals} from "../utility/typedefinitions";
import DataStore from "../utility/dataStore";




export default function Home()  {

  const[sideMenuClicked, SetSideMenuClicked] = useState<boolean>(false);
  const[isloading, setIsLoading] = useState<boolean>(true);
  const[errorText, setErrorText]= useState<string|undefined>(undefined);
  const[totalProposals, settotalProposals] = useState<number>(0);
  const[totalProtocols, settotalProtocols] = useState<number>(0);
  const[totalUniqueVoters, settotalUniqueVoters] = useState<number>(0);
  const[totalVotesCast, settotalVotesCast] = useState<number>(0);
  const[toptenProtocols,setTopTenProtocols] = useState<topProtocolsByProposals[]>([]);
  const[toptenProtocolsbyVoters,setTopTenProtocolsByVoters] = useState<topProtocolsByProposals[]>([]);
  const[toptenProtocolsbyVotes,setTopTenProtocolsByVotes] = useState<topProtocolsByProposals[]>([]);
  //const[allProposals, setAllProposals] = useState<string | undefined>(undefined);
 // const[allProtocols, setallProtocols] = useState<string | undefined>(undefined)

  useEffect(()=>{
     //function getRequiredData(){
       //#region  actual code
      function getInitialData(){
         try{
           
          let _instance = DataStore.getInstance();
          let globalStats = _instance.getGlobalStatsData();
          if(globalStats && globalStats.totalProposals){
            //await getGlobalstats();
            let _instance = DataStore.getInstance();
            let globalStats = _instance.getGlobalStatsData();
            settotalProposals(globalStats?globalStats.totalProposals:0);
            settotalProtocols(globalStats?globalStats.totalProtocols:0);
            settotalUniqueVoters(globalStats?globalStats.totalUniqueVoters:0);
            settotalVotesCast(globalStats?globalStats.totalVotesCast:0);
            setTopTenProtocols(getTop10ProtocolsByProposals());
            setTopTenProtocolsByVoters(getTop10ProtocolsByVoters());
            setTopTenProtocolsByVotes(getTop10ProtocolsByVotes());
            setIsLoading(false);

          }
          else{
            Promise.all([getGlobalstats(),getallProtocols()]).then(()=>{
              console.log("gloabal stats data fetched");
              let _instance = DataStore.getInstance();
              let globalStats = _instance.getGlobalStatsData();
              settotalProposals(globalStats?globalStats.totalProposals:0);
              settotalProtocols(globalStats?globalStats.totalProtocols:0);
              settotalUniqueVoters(globalStats?globalStats.totalUniqueVoters:0);
              settotalVotesCast(globalStats?globalStats.totalVotesCast:0);
              console.log("protocols data fetched");
              setTopTenProtocols(getTop10ProtocolsByProposals());
              setTopTenProtocolsByVoters(getTop10ProtocolsByVoters());
              setTopTenProtocolsByVotes(getTop10ProtocolsByVotes());
              setIsLoading(false);
             })
          }
           
         }
         catch(err){
           console.log(err.message);
           setErrorText(err.message);
         }
       }
       getInitialData();  
    
  },[]);

  return (

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
        <div className="sidebaritem selected">
        <Link  href="/">
          <a>Home</a>
        </Link>
        </div>
        <div className="sidebaritem">
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
            <GlobalStats totalProposals={totalProposals} totalProtocols={totalProtocols} totalUniqueVoters={totalUniqueVoters} totalVotesCast={totalVotesCast}/>
            </div>
       </div>
       <div className="topTables">
            <TopTenProtocols protocols={toptenProtocols} columnValue='No of Proposals' tableHeader='Top 10 Protocols By Proposals'/>
            <TopTenProtocols protocols={toptenProtocolsbyVoters} columnValue='No of Voters' tableHeader='Top 10 Protocols By Voters'/>
            <TopTenProtocols protocols={toptenProtocolsbyVotes} columnValue='No of Votes' tableHeader='Top 10 Protocols By Votes'/>
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
