import { Modal } from 'flowbite-react'
import { CreateProduct } from '../form/create-product'

interface Props {
  isOpen: boolean
  close: () => void
}

export const CreateProductModal = ({ isOpen, close }: Props) => {
  return (
    <>
      <Modal show={isOpen} size="md" popup onClose={() => close()}>
        <Modal.Body>{isOpen && <CreateProduct close={close} />}</Modal.Body>
      </Modal>
    </>
  )
}
