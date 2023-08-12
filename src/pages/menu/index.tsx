import { MouseEventHandler, useEffect, useState } from 'react'
import { API_ENDPOINTS } from '../../common/api-endpoints'
import { useGet } from '../../hooks/use-get'
import { Category, Product, Table } from '../models'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { OrderDetailsModal } from './order-details-modal'
import { EditProductModal } from '../../components/modals/edit-product-modal'
import './styles.scss'
import { ProductCard } from '../../components/cards/product-card'
import { axios } from '../../App'
import { ConfirmDeleteModal } from '../../components/modals/confirm-delete-modal'
import { useDelete } from '../../hooks/use-delete'
import { DeletedItemToast } from '../../components/toast/deleted-item-toast'

export interface CreateOrderProps {
  productId: number
  productQuantity: number
  info: string
}

export const Menu = () => {
  const [isOpenOrderDetails, setIsOpenOrderDetails] = useState(false)
  const [isOpenEditProduct, setIsOpenEditProduct] = useState(false)
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false)
  const [productToEdit, setProductToEdit] = useState<Product>()
  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([])
  const [productToDeleteId, setProductToDeleteId] = useState<number | null>(null)
  const [showDeletedToast, setShowIsDeletedToast] = useState(false)
  const [loading, setLoading] = useState(false)
  const { data: deleteResponse, deleteData, loading: deleteLoading } = useDelete({ manual: true })
  const { data: categories } = useGet<Category[]>({ url: API_ENDPOINTS.CATEGORY })
  const { data: products, getData: getProducts } = useGet<Product[]>({ manual: true })

  useEffect(() => {
    getProducts(API_ENDPOINTS.PRODUCTS)
  }, [deleteResponse])

  useEffect(() => {
    document.addEventListener('reload-products', () => getProducts(API_ENDPOINTS.PRODUCTS))
    return () => document.removeEventListener('reload-products', () => getProducts(API_ENDPOINTS.PRODUCTS))
  }, [])

  useEffect(() => {
    if (products && categories) {
      const categoryName = categories[0].name
      const catProducts = products?.filter((p) => p.categoryName === categoryName)
      setCategoryProducts(catProducts)
    }
  }, [products, categories])

  const handleCategoryClick: MouseEventHandler<HTMLLIElement> = (event) => {
    if (products) {
      const categoryName = event.currentTarget.textContent
      const catProducts = products?.filter((p) => p.categoryName === categoryName)
      setCategoryProducts(catProducts)
    }
  }

  const openOrderDetailsModal = (product: Product) => {
    setSelectedProduct(product)
    setIsOpenOrderDetails(true)
  }

  const openEditProductModal = (product: Product) => {
    setProductToEdit(product)
    setIsOpenEditProduct(true)
  }

  const closeEditProductModal = () => {
    setProductToEdit(undefined)
    setIsOpenEditProduct(false)
  }

  const createOrder = async (data: CreateOrderProps) => {
    console.log('updated data', data)

    try {
      const response = await axios.post(API_ENDPOINTS.ORDERS, data)
      console.log(response.data)
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const onCofirm = async (table: Table, data: CreateOrderProps) => {
    setLoading(true)
    try {
      const orderResponse = await createOrder(data)

      // assign order to table
      const endpoint = `/tables/${table.id}/orders/${orderResponse.data.id}`
      const assignTableResponse = await axios.post(endpoint)
      if (assignTableResponse.status === 200) {
        setLoading(false)
        setIsOpenOrderDetails(false)
      }
      console.log('assignTableResponse', assignTableResponse)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteClick = (productId: number) => {
    setProductToDeleteId(productId)
    setIsOpenDeleteConfirm(true)
  }

  const closeDeleteConfirm = () => {
    setIsOpenDeleteConfirm(false)
    setProductToDeleteId(null)
  }

  const confirmDelte = () => {
    deleteData({ url: `${API_ENDPOINTS.PRODUCTS}/${productToDeleteId}` })
  }

  console.log('deleteResponse', deleteResponse)

  useEffect(() => {
    if (deleteResponse) {
      closeDeleteConfirm()
      setShowIsDeletedToast(true)
    }
  }, [deleteResponse])

  return (
    <div className="w-full  h-max">
      <p className="m-10 text-3xl font-bold font-playfair italic text-gray-600/90 dark:text-white/90">
        Check Our Tasty Menu
      </p>
      <ul className="flex flex-row justify-center font-medium mt-0 mr-6 space-x-8 text-sm">
        {categories?.map((c) => (
          <li key={c.id} onClick={handleCategoryClick}>
            <a className="text-gray-950 dark:text-white hover:underline hover:cursor-pointer">{c.name}</a>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-4 mt-10">
        <TransitionGroup component={null}>
          {categoryProducts?.map((product) => (
            <CSSTransition key={product.id} timeout={500} classNames="fade">
              <ProductCard
                {...product}
                handleCreateOrderClick={openOrderDetailsModal}
                handleEditProductClick={() => openEditProductModal(product)}
                handleDeleteClick={() => handleDeleteClick(product.id)}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <OrderDetailsModal
        closeTablesModal={() => setIsOpenOrderDetails(false)}
        onCofirm={onCofirm}
        isOpen={isOpenOrderDetails}
        loadingConfirm={loading}
        selectedProduct={selectedProduct}
      />
      <EditProductModal isOpen={isOpenEditProduct} product={productToEdit} close={closeEditProductModal} />
      <ConfirmDeleteModal
        loading={deleteLoading}
        isOpen={isOpenDeleteConfirm}
        cancel={closeDeleteConfirm}
        confirm={confirmDelte}
      />
      {showDeletedToast && <DeletedItemToast duration={3000} />}
    </div>
  )
}
