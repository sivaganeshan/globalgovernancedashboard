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
    protocols : topProtocolsByProposals[],
    tableHeader : string,
    columnValue: string
}

const TopTenProtocols : React.FC<ToptenprotocolsData>= ({protocols,tableHeader,columnValue})=>{

    const columns = React.useMemo(() => [
        {
          Header: tableHeader,
          columns: [
            {
              Header: 'Name',
              accessor: 'name',
                // @ts-ignore 
              Cell: props => {
                return (
                  <div>
                    <span className="cellImg"><Image src={props.row.original.thumbUrl} alt="thumbnail" width='18' height='18'></Image></span>
                    <span className="cellName">{props.row.original.name}</span>
                  </div>
                )
              }
            },
            {
              Header: columnValue,
              accessor: 'totalProposals',
              // @ts-ignore 
              Cell: props => {
                return(
                  <div className="centerAlign">
                  {props.row.original.totalProposals.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                )
              }
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