import {GlobalStatsWrapper} from "../styles/GlobalStats.styles";


type props = {
    totalProposals: number,
    totalProtocols:number,
    totalUniqueVoters:number,
    totalVotesCast:number
}

const GlobalStats : React.FC<props> = ({totalProposals,totalProtocols,totalUniqueVoters,totalVotesCast})=>(
<GlobalStatsWrapper>
    <div className="card">
        <p>Projects Intergrated</p>
        <p>{totalProtocols}</p>
    </div>
    <div className="card">
        <p>Proposals Made</p>
        <p>{totalProposals}</p>
    </div>
    <div className="card">
        <p>Unique Voters</p>
        <p>{totalUniqueVoters}</p>
    </div>
    <div className="card">
        <p>Votes casted</p>
        <p>{totalVotesCast}</p>
    </div>
</GlobalStatsWrapper>
);



export default GlobalStats;