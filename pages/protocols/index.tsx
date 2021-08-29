import Head from 'next/head'
import {IndexWrapper} from "../../styles/app.styles"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {getGlobalstats, /*getallProposals, getallProtocols */   getTop10ProtocolsByVoters
,getTop10ProtocolsByProposals,getTop10ProtocolsByVotes, getallProtocols} from "../../utility/httpHelper";
import GlobalStats from "../../components/GlobalStats";
import Loading from "../../components/loading";
import TopTenProtocols from "../../components/TopTenProtocols"
import Image from 'next/image'
import boadrroomlogo from "../../public/boardroominc.png";
import {topProtocolsByProposals} from "../../utility/typedefinitions";
import DataStore from "../../utility/dataStore";


export default function Protocols(){

    const[sideMenuClicked, SetSideMenuClicked] = useState<boolean>(false);
    const[isloading, setIsLoading] = useState<boolean>(false);
    const[errorText, setErrorText]= useState<string|undefined>(undefined);

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