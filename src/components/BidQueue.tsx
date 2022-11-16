import DataTable from 'react-data-table-component'

const columns = [
  {
    name: 'Ask Price',
    selector: (row: any) => row.askPrice,
    sortable: true,
  },
  {
    name: 'Ask Quantity',
    selector: (row: any) => row.askQuantity,
    sortable: true,
  },
  {
    name: 'Bid Number',
    selector: (row: any) => row.bidNumber,
    sortable: true,
  },
  {
    name: 'Bid Price',
    selector: (row: any) => row.bidPrice,
    sortable: true,
  },
  {
    name: 'Bid Quantity',
    selector: (row: any) => row.bidQuantity,
    sortable: true,
  },
  {
    name: 'Symbol Id',
    selector: (row: any) => row.symbolId,
  },
  {
    name: 'Row Place',
    selector: (row: any) => row.rowPlace,
  },
]

function BidQueue({ queue }: any) {
  return <DataTable data={queue} columns={columns} />
}

export default BidQueue
