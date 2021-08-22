import styled from 'styled-components';

export const TableWrapper = styled.div`
padding: 1rem;
.cellName{
    padding-left:.5em;
}
.cellImg{
    margin-top:0.5em;
}

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`
