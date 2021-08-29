import styled from 'styled-components';

type IndexWrapperProps = {
    userClicked: boolean;
  };

export const IndexWrapper = styled.div<IndexWrapperProps>`

.header{
    background-color: #113a68;
    display: flex;
    justify-content: center;
    z-index: 9;
  
  }
  .headerName{
    font-family: 'Roboto', sans-serif;
    font-size: 2rem;
    color: #fff;
    padding: 1rem;
    margin-left: 1rem;
  }
  .bars{
    display: none;
  }
  
  .sidebar{
    position: fixed;
    background-color: #113a68;
    color: white;
    display: flex;
    top:0;
    left:0;
    flex-direction: column;
    height:100%;
    
    margin-right: 1rem;

  }
  .sidebaritem:nth-child(1){
    margin-top: 8rem;
  }
  .sidebaritem{
    margin-top:1rem;
    margin-bottom:1rem;
    padding:1rem;
    font-size:1.125rem;
  }
  .content{
    margin-left : 10rem;
    margin-top : 1rem;
  }
  .topTables{
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
  }
  .globalStats{
    display:flex;
    justify-content:space-evenly;
  }
  
  .footer{
    postion:fixed;
    display : flex;
    color: #113a68;
    justify-content:center;
    margin-top:2rem;
    opacity:0.6;
  }
  .footer-text{
    align-self:center;
    margin-left: 1rem;
  }
  .selected{
    background : linear-gradient(#947c4f,#7a824a);
  }

  
  @media only screen and (max-width: 700px) {
    .bars {
      display: inherit;
      font-size: 2rem;
      color: #fff;
      padding: 1rem;
      cursor: pointer;
      margin-right: 2rem;
    }
    .sidebar{
      display: ${({ userClicked })=> userClicked?'flex':'none'};
      position: absolute;
      width:30%;
      z-index: -1;
    }
    .content{
        display:${({ userClicked })=> userClicked?'none':'flex'};
        margin-left : 1rem;
        flex-direction:column;
      }
      
      .topTables{
        flex-direction:column;
        align-items:center;
      }
      .globalStats{
        flex-direction:column;
      }
      .sidebaritem:nth-child(1){
        margin-top: 10rem;
      }
      
  }
`

