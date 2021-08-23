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
    padding: 0.2rem;
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
    z-index: -1;
    margin-right: 1rem;
  }
  .sidebaritem:nth-child(1){
    margin-top: 8rem;
  }
  .sidebaritem{
    margin:1rem;
    padding:0.5rem;
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
  
  
  @media only screen and (max-width: 480px) {
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
    
  }
`

