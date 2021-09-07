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
import { useRouter } from 'next/router'


export default function Protocols(){
    let router = useRouter();

    const[sideMenuClicked, SetSideMenuClicked] = useState<boolean>(false);
    const[isloading, setIsLoading] = useState<boolean>(true);
    const[errorText, setErrorText]= useState<string|undefined>(undefined);
    const[defaultProtocol, setDefaultProtocol] = useState<string>("");

    useEffect(()=>{
        let _instance = DataStore.getInstance();
        let allProtocols = _instance.getAllProtocolsData();
        // console.log(allProtocols);
        if(allProtocols && allProtocols.length>0)
        {
            let defaultProto = allProtocols.sort((a,b)=>(b.totalProposals)-(a.totalProposals)).slice(0,1);
            setDefaultProtocol(defaultProto[0].cname);
            setIsLoading(false);
            console.log(defaultProto[0].cname);
            
            router.push(`/protocols/${defaultProto[0].cname}`);
        }
        setIsLoading(false);

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