import { Modal } from 'flowbite-react'
import { EditProduct } from '../form/edit-product'
import { Product } from '../../pages/models'

interface Props {
  product?: Product
  isOpen: boolean
  close: () => void
}

export const EditProductModal = ({ product, isOpen, close }: Props) => {
  return (
    <>
      <Modal show={isOpen} size="md" popup onClose={() => close()}>
        <Modal.Body>{product && <EditProduct product={product} close={close} />}</Modal.Body>
      </Modal>
    </>
  )
}
