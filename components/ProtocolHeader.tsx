
import { List, ListItem, makeStyles, Divider, Box, Container } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import {ProtocolHeaderWrapper} from "../styles/ProtocolHeader.styles"

const useStyles = makeStyles((theme) =>
({
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
}));

type props={
    avatar:string,
    name:string,
    tokenSymbol:string,
    tokenPrice:string,
    contractAddress:string
}


const ProtocolHeader : React.FC<props> =({avatar,name,tokenSymbol,tokenPrice, contractAddress})=>{
    const classes = useStyles();

    return(
        <ProtocolHeaderWrapper>
        <div className="container">
        <div className="left">
        <Avatar alt="protocol logo" src={avatar} className={classes.large}/>
        </div>
        <div className="right">
        <div className="element"><span className="textHeader">Name : </span><span className="textValue">{name}</span></div>
        <div className="element"><span className="textHeader">TokenSymbol : </span><span className="textValue">{tokenSymbol}</span></div>
        <div className="element"><span className="textHeader">TokenPrice : </span><span className="textValue">&#36;</span><span className="textValue">{tokenPrice}</span></div>
        <div className="element"><span className="textHeader"> Contract : </span><span className="textValue">{contractAddress}</span></div>
        </div>
        </div>
        </ProtocolHeaderWrapper>

    )
}
    



export default ProtocolHeader;
