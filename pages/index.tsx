import Head from 'next/head'
import {IndexWrapper} from "../styles/app.styles"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {getGlobalstats, /*getallProposals, getallProtocols */  topProtocolsByProposals, getTop10ProtocolsByVoters
,getTop10ProtocolsByProposals,getTop10ProtocolsByVotes} from "../utility/HttpHelper";
import GlobalStats from "../components/GlobalStats";
import Loading from "../components/loading";
import TopTenProtocols from "../components/TopTenProtocols"
import Image from 'next/image'
import boadrroomlogo from "../public/boardroominc.png";


type globalStatsProp={
  totalProposals: number,
    totalProtocols:number,
    totalUniqueVoters:number,
    totalVotesCast:number
}

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
     function getRequiredData(){
       //#region  actual code
      //try{
        //  getGlobalstats().then((response)=>{
        //   let globalStates  = response.data;
        //   settotalProposals(globalStates.totalProposals);
        // settotalProtocols(globalStates.totalProtocols);
        // settotalUniqueVoters(globalStates.totalUniqueVoters);
        // settotalVotesCast(globalStates.totalVotesCast);
        // setIsLoading(false);

        
        }
        
        //let globalStates = JSON.parse(await getGlobalstats());
        
        //setAllProposals(await getallProposals());
        //setallProtocols(await getallProtocols());
        
    //   catch(err){
    //     setIsLoading(false);
    //     setErrorText(err.message);
    //   }
    // }
    // getRequiredData();
    //#endregion
   
      settotalProposals(2496);
        settotalProtocols(62);
        settotalUniqueVoters(37585);
        settotalVotesCast(218354);
        setTopTenProtocols(getTop10ProtocolsByProposals());
        setTopTenProtocolsByVoters(getTop10ProtocolsByVoters());
        setTopTenProtocolsByVotes(getTop10ProtocolsByVotes());
        setIsLoading(false);
    
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
        <Link href="/">
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
        <span className="footer-text">Powered By BoardRoom API</span>
      </div>
      </div>
     
      </>
      
      }
      </IndexWrapper>
    </div>
    
  )
}
