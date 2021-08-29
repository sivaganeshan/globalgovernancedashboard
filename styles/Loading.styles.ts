import styled from 'styled-components';

const LoadingWrapper = styled.div`
.loading {
  top: 50%;
  position: absolute;
  left: 50%;
  margin: auto;
  transform: translate(50%, 50%);
    width: 50px;
    height: 50px;
    border: 3px solid rgba(0,0,111,.3);
    border-radius: 50%;
    border-top-color: #160e94;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    from{ transform: rotate(0deg);}
    to { transform: rotate(360deg); }
  }
`

export default LoadingWrapper;