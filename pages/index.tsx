import Head from 'next/head'
import {IndexWrapper} from "../styles/app.styles"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {getGlobalstats, /*getallProposals, getallProtocols */ getTop10Protocols, topProtocolsByProposals} from "../utility/HttpHelper";
import GlobalStats from "../components/GlobalStats";
import Loading from "../components/loading";
import TopTenProtocols from "../components/TopTenProtocols"

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
    const interval = setInterval(() => {
      settotalProposals(62);
        settotalProtocols(2496);
        settotalUniqueVoters(37585);
        settotalVotesCast(218354);
        setTopTenProtocols(getTop10Protocols());
        setIsLoading(false);
    }, 3000);
    return () => clearInterval(interval);
  },[]);

  return (
    <div>
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
        <div className="sidebaritem">
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
            <div className="leftEle">
            <GlobalStats totalProposals={totalProposals} totalProtocols={totalProtocols} totalUniqueVoters={totalUniqueVoters} totalVotesCast={totalVotesCast}/>
            </div>
            <div className="rightEle">
            <TopTenProtocols protocols={toptenProtocols}/>
            </div>
       </div>
       
      </div>
      </>
      }
      </IndexWrapper>
    </div>
    
  )
}
