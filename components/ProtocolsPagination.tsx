import React,  { useState, useEffect} from "react";
import { List, ListItem, makeStyles, Divider, Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Pagination from "@material-ui/lab/Pagination";
import {allProtocols} from "../utility/typedefinitions";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {getallProposals} from "../utility/HttpHelper";
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(1)
      },
      border: '1px solid #111',
      borderRadius:'1.25rem',
      marginTop:"2rem",
      marginLeft:'20%',
      marginRight:'20%'

    },
    selectedButton: {
      background: "#24a0ed"
    },
    unSelectedButton: {
      background: "#aaa",
      color:"#111"
    },
    item:{
        padding:'5px',
    },
    paginator: {
        justifyContent: "center",
        padding: "10px"
      },
      '@global': {
        'ul>div:nth-child(odd)': {
            backgroundColor: '#eee',
        },
    }
      
  }));

type ProtocolsData = {
    allProtocolsFromStore : allProtocols[]
}
const ProtocolsPagination : React.FC<ProtocolsData> = ({allProtocolsFromStore})=>{

const[currentProposals, SetCurrentProposals] = useState<allProtocols[]>(allProtocolsFromStore);


const[sortByProposals, SetSortByProposals] = useState<boolean|undefined>(undefined);
const[sortByVoters, SetSortByVoters] = useState<boolean|undefined>(undefined);
const[sortByVotes, SetSortByVotes] = useState<boolean|undefined>(undefined);

const[listByAsc, SetListByAsc] = useState<boolean|undefined>(undefined);

//pagination
const itemsPerPage = 5;
  const [page, setPage] = React.useState(1);
  const [noOfPages] = React.useState(
    Math.ceil(currentProposals.length / itemsPerPage)
  );

  const handleChange = (event:any, value:any) => {
    setPage(value);
  };
useEffect(()=>{

    let newProtocols = [...allProtocolsFromStore];
    if(!listByAsc){
      if(sortByProposals){
        newProtocols = newProtocols.sort((a,b)=>(b.totalProposals)-(a.totalProposals));
      }
      if(sortByVoters){
        newProtocols = newProtocols.sort((a,b)=>(b.uniqueVoters)-(a.uniqueVoters))
      }
      if(sortByVotes){
        newProtocols = newProtocols.sort((a,b)=>(b.totalVotes)-(a.totalVotes))
      }
    }else{
      if(sortByProposals){
        newProtocols = newProtocols.sort((a,b)=>(a.totalProposals)-(b.totalProposals));
      }
      if(sortByVoters){
        newProtocols = newProtocols.sort((a,b)=>(a.uniqueVoters)-(b.uniqueVoters))
      }
      if(sortByVotes){
        newProtocols = newProtocols.sort((a,b)=>(a.totalVotes)-(b.totalVotes))
      }
    }
    SetCurrentProposals(newProtocols);

},[sortByProposals,sortByVoters,sortByVotes,listByAsc])


let classes = useStyles();

let ByProposalsClicked = ()=>{
    SetSortByProposals(true);
    SetSortByVoters(false);
    SetSortByVotes(false);
}

let ByVotersClicked=()=>{
  
    SetSortByProposals(false);
    SetSortByVoters(true);
    SetSortByVotes(false);
}

let ByVotesClicked=()=>{

    SetSortByProposals(false);
    SetSortByVoters(false);
    SetSortByVotes(true);

}

let ByAscClicked=()=>{
    SetListByAsc(true);
}

let ByDescClicked=()=>{
    SetListByAsc(false);
}

let RiredirectToProtocol=(event:any)=>{
    //let router = useRouter();
    console.log(event)
    //router.push(`/protocols/${defaultProto[0].cname}`);
}



return(<div className={classes.container}>
    <div>
    <span style={{marginRight:'10px', fontSize:'1.125rem'}}> Sort By:</span>
    <span style={{marginRight:'50px'}}>
    <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        <Button size="small" className={sortByProposals?classes.selectedButton:classes.unSelectedButton} onClick={()=>{ByProposalsClicked()}}>By Proposals</Button>
        <Button  size="small" className={sortByVoters?classes.selectedButton:classes.unSelectedButton} onClick={()=>{ByVotersClicked()}}>By Voters</Button>
        <Button  size="small" className={sortByVotes?classes.selectedButton:classes.unSelectedButton} onClick={()=>{ByVotesClicked()}}>By Votes</Button>
      </ButtonGroup>
      </span>
      <span style={{}}>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        <Button  size="small"  className={listByAsc?classes.unSelectedButton:classes.selectedButton} onClick={()=>{ByDescClicked()}}>By Desc</Button>
        <Button  size="small"  className={listByAsc?classes.selectedButton:classes.unSelectedButton} onClick={()=>{ByAscClicked()}}>By Asc</Button>
      </ButtonGroup>
      </span>
    </div>
    <div>
    <List >
    {currentProposals.slice((page-1)*itemsPerPage, page*itemsPerPage).
        map(item=>{
            const labelId = `list-secondary-label-${item.cname}`;
            return(
                <ListItem key={item.cname} button onClick={(event) => {RiredirectToProtocol(event)}}>
                    <ListItemAvatar>
                        <Avatar alt={`avator of ${item.cname}`} src={item.thumbUrl} ></Avatar>
                    </ListItemAvatar>
                    <ListItemText id={labelId}
                        primary={item.name}
                  secondary={
                <React.Fragment>
                    <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                      style={{marginRight:'4px'}}
                    >
                      Proposals : 
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      color="primary"
                      style={{marginRight:'10px'}}
                    >
                      {item.totalProposals.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                  </React.Fragment>
                  <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                    style={{marginRight:'4px'}}
                  >
                    Voters : 
                  </Typography>
                  <Typography
                      component="span"
                      variant="body2"
                      color="primary"
                      style={{marginRight:'10px'}}
                    >
                      {item.uniqueVoters.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                </React.Fragment>
                <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                  style={{marginRight:'4px'}}
                >
                  Votes : 
                </Typography>
                <Typography
                      component="span"
                      variant="body2"
                      color="primary"
                      style={{marginRight:'10px'}}
                    >
                      {item.totalVotes.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
              </React.Fragment>
              </React.Fragment>
                  }
                  className={classes.item} />
                </ListItem>
            );
        })}
        </List>
        <Divider />
      <Box component="span">
        <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
          classes={{ ul: classes.paginator }}
        />
      </Box>
    </div>
</div>)
};

export default ProtocolsPagination;

