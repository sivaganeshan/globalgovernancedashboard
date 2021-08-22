import React from 'react'
import {topProtocolsByProposals} from "../utility/HttpHelper"
import { useTable } from 'react-table';
import {TableWrapper} from '../styles/TopTenProtocols.styles';
import Image from 'next/image'


{/* 
  // @ts-ignore */}
function Table({columns, data}){
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data,
      })

      return(
          <table {...getTableProps()}>
              <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
          </table>
      )
}

type ToptenprotocolsData ={
    protocols : topProtocolsByProposals[]
}

const TopTenProtocols : React.FC<ToptenprotocolsData>= ({protocols})=>{

    const columns = React.useMemo(() => [
        {
          Header: 'Top 10 Protocols by Proposals',
          columns: [
            {
              Header: 'Name',
              accessor: 'name',
                // @ts-ignore 
              Cell: props => {
                return (
                  <div>
                    <span className="cellImg"><Image src={props.row.original.thumbUrl} alt="thumbnail" width='24' height='24'></Image></span>
                    <span className="cellName">{props.row.original.name}</span>
                  </div>
                )
              }
            },
            {
              Header: 'No of Proposals',
              accessor: 'totalProposals',
            },
          ]
        }],[]) 

   const data = React.useMemo(() => protocols, [])

    return (
        <TableWrapper>
          <Table columns={columns} data={data} />
        </TableWrapper>
      )
    };

    export default TopTenProtocols;