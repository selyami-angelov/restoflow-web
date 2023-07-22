import { Button } from 'flowbite-react'
import placeholder from '../../assets/create-product-placeholder.jpg'
import { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { useGet } from '../../hooks/use-get'
import { API_ENDPOINTS } from '../../common/api-endpoints'
import { Category, Product } from '../../pages/models'
import { usePost } from '../../hooks/use-post'
import axios from 'axios'
import { stage } from '../../configs/stage'

export const CreateProduct = () => {
  const [fileUrl, setFileUrl] = useState('')
  const [fileUrlError] = useState('')
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [category, setCategory] = useState('')
  const [categoryError, setCategoryError] = useState('')
  const [price, setPrice] = useState('')
  const [priceError, setPriceError] = useState('')
  const [file, setFile] = useState<File>()
  const { data: categories } = useGet<Category[]>({ url: API_ENDPOINTS.CATEGORY })
  const { data: productData, loading } = usePost<Product>({ url: API_ENDPOINTS.PRODUCTS, manual: true })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const openFileExplorer = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  useEffect(() => {
    if (typeof productData === 'object' && !Array.isArray(productData) && 'id' in productData) {
      setCategory('')
      setFileUrl('')
      setName('')
      setDescription('')
      setCategory('')
      setPrice('')
    }
  }, [productData])

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      const file = event.target.files[0]
      const fileUrl = URL.createObjectURL(file)

      setFile(file)
      setFileUrl(fileUrl)
      console.log('File selected:', file.name)
    }
  }

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNameError('')
    setName(event.target.value)
  }

  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setDescriptionError('')
    setDescription(event.target.value)
  }

  const handlePriceChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputPrice = event.target.value
    setPriceError('')
    // Remove any non-digit characters
    const price = inputPrice.replace(/[^0-9.-]/g, '')

    // Check if the price is a valid decimal number
    if (/^-?\d*\.?\d{0,2}$/.test(price)) {
      setPrice(price)
    }
  }

  const handleCategoryChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setCategoryError('')
    setCategory(event.target.value)
  }

  const createProduct = async () => {
    const isValid = validateInputs()

    if (!isValid) {
      return
    }

    const categoryId = categories?.find((c) => c.name === category)?.id
    if (file && categoryId) {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('categoryId', categoryId.toString())
      formData.append('file', file)

      // const data = {
      //   name,
      //   description,
      //   price,
      //   categoryId: categories?.find((c) => c.name === category)?.id,
      //   image: file,
      // }
      const response = await axios.post(`${stage}/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log(response)
    }
  }

  const validateInputs = () => {
    let isValid = true
    if (!name) {
      setNameError('Product name is required.')
      isValid = false
    }
    if (name.length < 2 || name.length > 50) {
      setNameError('Product name must be between 2 and 50 characters long.')
      isValid = false
    }
    if (!description) {
      setDescriptionError('Product description is required.')
      isValid = false
    }
    if (description.length < 10 || description.length > 500) {
      setDescriptionError('Product description must be between 10 and 500 characters long.')
      isValid = false
    }
    if (!category) {
      setCategoryError('Category is required.')
      isValid = false
    }
    if (!price) {
      setPriceError('Price is required.')
      isValid = false
    }
    if (Number(price) < 0) {
      setPriceError('Price must be a positive number.')
      isValid = false
    }

    return isValid
  }

  const isDisabledCreate = nameError || descriptionError || categoryError || priceError

  console.log('product data', productData)

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <input onChange={handleFileUpload} ref={fileInputRef} className="hidden" id="file" type="file" />
      <figure className="relative max-w-sm  p-4 pb-8 cursor-pointer ">
        <a href="#">
          <img className="rounded-lg" src={fileUrl || placeholder} alt="image description" />
        </a>
        <figcaption className="absolute px-4 text-lg text-white bottom-12">
          <Button onClick={openFileExplorer} size={'xs'}>
            Chose image
          </Button>
        </figcaption>
      </figure>
      {fileUrlError && <p className="text-sm text-red-500">{fileUrlError}</p>}
      <div className="px-5 pb-5">
        <form>
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={name}
              onChange={handleNameChange}
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
            {nameError && <p className="text-sm text-red-500">{nameError}</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              rows={4}
              id="description"
              name="description"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            ></textarea>
            <label
              htmlFor="description"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description
            </label>
            {descriptionError && <p className="text-sm text-red-500">{descriptionError}</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <select
              onChange={handleCategoryChange}
              value={category}
              name="category"
              id="category"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            >
              {category || <option>-</option>}
              {categories?.map((cat) => (
                <option key={cat.id}>{cat.name}</option>
              ))}
            </select>
            <label
              htmlFor="category"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Category
            </label>
            {categoryError && <p className="text-sm text-red-500">{categoryError}</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={price}
              onChange={handlePriceChange}
              type="text"
              name="price"
              id="price"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="price"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Price
            </label>
            {priceError && <p className="text-sm text-red-500">{priceError}</p>}
          </div>
        </form>
        <div className="flex items-center justify-end">
          <Button isProcessing={loading} disabled={Boolean(isDisabledCreate) || loading} onClick={createProduct}>
            Create Product
          </Button>
        </div>
      </div>
    </div>
  )
}
