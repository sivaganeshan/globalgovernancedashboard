import {GlobalStatsWrapper} from "../styles/GlobalStats.styles";


type props = {
    totalProposals: number,
    totalProtocols:number,
    totalUniqueVoters:number,
    totalVotesCast:number
}

const GlobalStats : React.FC<props> = ({totalProposals,totalProtocols,totalUniqueVoters,totalVotesCast})=>(
<GlobalStatsWrapper>
    <div className="parent">
       
    <div className="card" >
        <p>Projects Integrated</p>
        <p className="numbersVal">{totalProtocols.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
    </div>
    
    <div className="card">
        <p>Proposals Made</p>
        <p className="numbersVal">{totalProposals.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
    </div>
    <div className="card">
        <p>Unique Voters</p>
        <p className="numbersVal">{totalUniqueVoters.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
    </div>
    <div className="card">
        <p>Votes casted</p>
        <p className="numbersVal">{totalVotesCast.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
    </div>
    </div>
</GlobalStatsWrapper>
);



export default GlobalStats;