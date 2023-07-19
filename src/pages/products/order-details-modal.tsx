import { Badge, Button, Card, Checkbox, Label, Modal, TextInput, Textarea } from 'flowbite-react'
import { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { useGet } from '../../hooks/use-get'
import { OccupiedTables, Product, Table } from '../models'
import { API_ENDPOINTS } from '../../common/api-endpoints'
import { SearchIput } from './search-input'
import img from '../../assets/burger.jpg'
import { CreateOrderProps } from '.'

interface Props {
  closeTablesModal: () => void
  onCofirm: (table: Table, data: CreateOrderProps) => void
  selectedProduct?: Product
  loadingConfirm?: boolean
  isOpen?: boolean
}

export const OrderDetailsModal = ({ closeTablesModal, isOpen, onCofirm, loadingConfirm, selectedProduct }: Props) => {
  const [clickedTable, setClickedTable] = useState<Table>()
  const [filteredTables, setFilteredTables] = useState<Table[]>([])
  const [quantity, setQuantity] = useState(1)
  const [qtyError, setQtyError] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const listRef = useRef<HTMLUListElement>(null)
  const quantityInputRef = useRef<HTMLInputElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const { data: tableData, loading: tableLoading, error: tableError } = useGet<Table[]>({ url: API_ENDPOINTS.TABLES })
  const { data: occupiedTables } = useGet<OccupiedTables[]>({ url: API_ENDPOINTS.OCCUPIED_TABLES })

  const handleOnQtyChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = +event.target.value
    const newValue = value < 0 ? 0 : value
    setQtyError('')
    setQuantity(newValue)

    requestAnimationFrame(() => {
      if (quantityInputRef.current) {
        quantityInputRef.current.focus()
      }
    })
  }

  const handleIfoChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const value = event.target.value
    setAdditionalInfo(value)

    requestAnimationFrame(() => {
      if (textAreaRef.current) {
        textAreaRef.current.focus()
      }
    })
  }

  useEffect(() => {
    if (tableData) {
      setFilteredTables(tableData)
    }
  }, [tableData])

  const handleTableClick = (table: Table) => {
    setClickedTable(table)
    // Store the current scroll position
    const scrollTop = listRef.current?.scrollTop

    // Restore the scroll position after re-render
    requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current.scrollTop = scrollTop || 0
      }
    })
  }

  const handleConfirm = () => {
    if (quantity === 0) {
      setQtyError('Please select quantity.')
      return
    }

    if (clickedTable && selectedProduct) {
      const data = { productId: selectedProduct?.id, productQuantity: quantity, info: additionalInfo }
      console.log('post data', data)
      onCofirm(clickedTable, data)
      setQuantity(1)
      setAdditionalInfo('')
    }
  }

  const handleDecline = () => {
    closeTablesModal()
    setClickedTable(undefined)
  }

  const filterTables = (search: string) => {
    if (!tableData) {
      return
    }
    const filtered = tableData.filter((t) => {
      const occupiedTable = occupiedTables?.find((ot) => ot.tableId === t.id)
      const searchString = search.toLocaleLowerCase()
      return (
        t.seats.toString().includes(searchString) ||
        t.tableNumber.toString().includes(searchString) ||
        occupiedTable?.userName.toLowerCase().includes(searchString) ||
        (occupiedTable?.userName && 'busy'.includes(searchString)) ||
        (!occupiedTable?.userName && 'free'.includes(searchString))
      )
    })

    if (!search) {
      setFilteredTables(tableData)
    } else {
      setFilteredTables(filtered)
    }
  }

  const getTableState = (tableId: number) => {
    const occupiedTable = occupiedTables?.find((oc) => oc.tableId === tableId)
    const state = occupiedTable ? 'failure' : 'success'
    const text = occupiedTable ? 'Busy' : 'Free'
    const servingPerson = occupiedTable ? occupiedTable.userName : ''
    return { state, text, servingPerson }
  }

  return (
    <>
      <Button onClick={closeTablesModal}>Toggle modal</Button>
      <Modal size={'3xl'} show={isOpen} onClose={closeTablesModal}>
        <Modal.Header>New order details</Modal.Header>
        <Modal.Body>
          <div className="flex w-full">
            <div className="space-y-6 w-1/3">
              <div>
                <div className="mb-2 block">
                  <Label className="whitespace-normal break-all" value={selectedProduct?.name} />
                </div>

                <figure className="relative max-w-sm  cursor-pointer filter ">
                  <a href="#">
                    <img className="rounded-lg" src={img} alt="image description" />
                  </a>
                </figure>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="quantity" value="Product Quantity" />
                </div>
                <TextInput
                  ref={quantityInputRef}
                  onChange={handleOnQtyChange}
                  value={quantity}
                  id="quantity"
                  type="number"
                  placeholder="quantity"
                  required
                />
                {qtyError && <p className="text-sm text-red-500">{qtyError}</p>}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="info" value="Additional Information" />
                </div>
                <Textarea
                  onChange={handleIfoChange}
                  value={additionalInfo}
                  ref={textAreaRef}
                  id="info"
                  placeholder="Leave a comment..."
                  rows={4}
                />
              </div>
            </div>
            <div className="flex-grow border-l ml-3 ">
              <SearchIput filterTables={filterTables} />
              <ul ref={listRef} className="h-96 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
                {filteredTables.map((table) => (
                  <li
                    key={table.id}
                    onClick={() => handleTableClick(table)}
                    className="flex items-center justify-between p-2 rounded hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 border-b"
                  >
                    <div className="flex items-center">
                      <input
                        readOnly
                        id={table.id.toString()}
                        checked={table.id === clickedTable?.id}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <div className="flex flex-col gap-1 ml-4">
                        <label>
                          Table number:
                          <span className="ml-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                            {table.tableNumber}
                          </span>
                        </label>
                        {getTableState(table.id).servingPerson && (
                          <label>
                            Serving:
                            <span className="ml-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                              {getTableState(table.id).servingPerson}
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 ">
                      <Badge color={getTableState(table.id).state}>{getTableState(table.id).text}</Badge>
                      <label>
                        Seats:
                        <span className="ml-1 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                          {table.seats}
                        </span>
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button isProcessing={loadingConfirm} disabled={!clickedTable} onClick={handleConfirm}>
            Confirm Order
          </Button>
          <Button color="gray" onClick={handleDecline}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
