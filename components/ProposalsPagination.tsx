import React,  { useState, useEffect} from "react";
import { List, ListItem, makeStyles, Divider, Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Pagination from "@material-ui/lab/Pagination";
import {ProposalResponse} from "../utility/typedefinitions";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
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
      border: '0.5px solid #111',
      borderRadius:'1.25rem',
      marginTop:"0.5rem",
      marginLeft:'2%',
      marginRight:'2%'

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
            backgroundColor: '#f9f9f9',
        },
    }
      
  }));

type ProposalsData = {
    allProposalsFromStore : ProposalResponse[]
}
const ProposalsPagination : React.FC<ProposalsData> = ({allProposalsFromStore})=>{

    let router = useRouter();

const[currentProposals, SetCurrentProposals] = useState<ProposalResponse[]>(allProposalsFromStore);


//pagination
const itemsPerPage = 5;
  const [page, setPage] = React.useState(1);
  const [noOfPages] = React.useState(
    Math.ceil(currentProposals.length / itemsPerPage)
  );

  const handleChange = (event:any, value:any) => {
    setPage(value);
  };



let classes = useStyles();



return(<div className={classes.container}>
    <div>
        <h4>Proposals</h4>
    </div>
    <div>
    <List >
    {currentProposals.slice((page-1)*itemsPerPage, page*itemsPerPage).
        map((item,index)=>{
            const labelId = `list-secondary-label-${item.refid}`;
            return(
                <ListItem key={item.refid} button >
                    {/* <ListItemAvatar>
                        <Avatar alt={`avator of ${item.cname}`} src={item.thumbUrl} ></Avatar>
                    </ListItemAvatar> */}
                    <ListItemText id={labelId}
                        primary={`${(index+1)+((page-1)*itemsPerPage)}.${item.title}`}
                  secondary={
                <React.Fragment>
                    <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                      style={{marginRight:'4px'}}
                    >
                      Totol Votes : 
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
                  <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                    style={{marginRight:'4px'}}
                  >
                    StartsAt : 
                  </Typography>
                  <Typography
                      component="span"
                      variant="body2"
                      color="primary"
                      style={{marginRight:'10px'}}
                    >
                      {item.startsAt}
                    </Typography>
                </React.Fragment>
                <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                  style={{marginRight:'4px'}}
                >
                  EndsAt : 
                </Typography>
                <Typography
                      component="span"
                      variant="body2"
                      color="primary"
                      style={{marginRight:'10px'}}
                    >
                      {item.endsAt}
                    </Typography>
              </React.Fragment>
              <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                    style={{marginRight:'4px'}}
                  >
                    CurrentStatus : 
                  </Typography>
                  <Typography
                      component="span"
                      variant="body2"
                      color="primary"
                      style={{marginRight:'10px'}}
                    >
                      {item.state}
                    </Typography>
                </React.Fragment>
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                    style={{marginRight:'4px'}}
                  >
                    Choices : 
                  </Typography>
                  <Typography
                      component="span"
                      variant="body2"
                      color="primary"
                      style={{marginRight:'10px'}}
                    >
                      {item.choices}
                    </Typography>
                </React.Fragment>
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                    style={{marginRight:'4px'}}
                  >
                    Results : 
                  </Typography>
                  <Typography
                      component="span"
                      variant="body2"
                      color="primary"
                      style={{marginRight:'10px'}}
                    >
                      {item.results}
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

export default ProposalsPagination;

