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
    display:flex;
    flex-direction:row;
  }
  .homeTop{
    display:flex;
    flex-direction:row;
  }

  .loading {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255,255,255,.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
    top:50%;
    left:50%;
    position:fixed;
    transform: translate(-50%, -50%);
    z-index:10;
  }
  
  keyframes spin {
    from{ transform: rotate(0deg);},
    to { transform: rotate(360deg); }
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
      .homeTop{
        flex-direction:column;
      }
    
  }
`

