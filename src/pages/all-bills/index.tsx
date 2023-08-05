import { useEffect, useState } from 'react'
import { useGet } from '../../hooks/use-get'
import { API_ENDPOINTS } from '../../common/api-endpoints'
import { Bill, Order } from '../models'
import { DatePicker } from '../../components/form/date-picker'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { ProdcutsModal } from './products-modal'

interface TableRowDataProps {
  billId: number
  tableNumber: number
  price: number
  productsCount: number
  date: string
  user: string
}

export const AllBills = () => {
  const [tableRowData, setTableRowData] = useState<TableRowDataProps[]>([])
  const [isOpenProductsModal, setIsOpenProductsModal] = useState(false)
  const [selectedBillOrders, setSelectedBillOrders] = useState<Partial<Order>[]>([])
  const { data, getData } = useGet<Bill[]>({ manual: true })

  useEffect(() => {
    if (data) {
      const trData: TableRowDataProps[] = data.map((bill) => ({
        billId: bill.id,
        tableNumber: bill.tableNumber,
        price: bill.totalSum,
        productsCount: bill.orders.map((o) => o.productQuantity).reduce((a, b) => Number(a) + Number(b), 0) || 0,
        date: new Date(bill.date).toLocaleString('en-GB'),
        user: bill.user,
      }))

      setTableRowData(trData)
      console.log(data)
    }
  }, [data])

  const getBillForDate = (date: Date) => {
    const currentDate = new Date()
    const newDate = new Date(date)
    newDate.setHours(currentDate.getHours())
    newDate.setMinutes(currentDate.getMinutes())
    newDate.setMilliseconds(currentDate.getMilliseconds())

    console.log(newDate)
    getData(`${API_ENDPOINTS.ALL_BILLS}/${newDate.toISOString()}`)
  }

  const handleInfoClick = (bill?: Bill) => {
    if (bill) {
      setSelectedBillOrders(bill.orders)
      setIsOpenProductsModal(true)
    }
  }

  console.log(
    data
      ?.map((d) => d.orders.map((o) => Number(o.productQuantity)))
      .flat()
      .reduce((a, b) => a + b, 0)
  )

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full">
      <div className="flex items-center justify-between p-3">
        <div className="">
          <DatePicker getBillForDate={getBillForDate} />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Table Number
            </th>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Products Count
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {tableRowData?.map((row) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">{row.tableNumber}</td>
              <td className="px-6 py-4">{row.user}</td>
              <td className="px-6 py-4">{row.date}</td>
              <td className="px-6 py-4">{row.productsCount}</td>
              <td className="px-6 py-4">{row.price}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleInfoClick(data?.find((b) => b.id === row.billId))}
                  type="button"
                  className="text-white bg-gradient-to-r flex justify-center items-center gap-1 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 py-2.5 font-medium rounded-lg text-xs px-3 text-center"
                >
                  <HiOutlineExclamationCircle className="h-4 w-4" />
                  Info
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-semibold text-gray-900 dark:text-white">
            <th scope="row" className="px-6 py-3 text-base">
              Total
            </th>
            <td className="px-6 py-3"></td>
            <td className="px-6 py-3"></td>
            <td className="px-6 py-3">
              {data
                ?.map((d) => d.orders.map((o) => Number(o.productQuantity)))
                .flat()
                .reduce((a, b) => a + b, 0)}
            </td>
            <td className="px-6 py-3">
              {data
                ?.map((d) => d.orders.map((o) => Number(o.productQuantity) * Number(o.product?.price)))
                .flat()
                .reduce((a, b) => a + b, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
      <ProdcutsModal
        isOpen={isOpenProductsModal}
        closeModal={() => setIsOpenProductsModal(false)}
        orders={selectedBillOrders}
      />
    </div>
  )
}
