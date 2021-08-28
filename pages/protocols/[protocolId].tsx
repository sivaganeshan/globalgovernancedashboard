import {useRouter } from 'next/router';


export default function Protocols(){

    let router = useRouter();
    let {protocolId} = router.query;
    return(
        <>
        <h1> Protocols page for : {protocolId}</h1>
        </>
    )
}