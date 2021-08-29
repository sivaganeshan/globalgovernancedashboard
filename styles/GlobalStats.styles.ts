import styled from 'styled-components';

export const GlobalStatsWrapper = styled.div`
.parent{
    display:flex;
    flex-directio:row;
}

.card{
    min-width:9rem;
    max-width:10rem;
    padding:0.7em;
    margin:0.7em;
    border: 1px solid #eee;
    box-shadow: 0 2px 2px  #ccc;
    text-align:center;
    font-family:Roboto;
    font-weight:550;
}
.numbersVal{
    color:#b00707;
}

@media only screen and (max-width: 700px) {
    .parent{
        flex-direction:column;
        align-items:center;
    }
    
}
`