import { DarkThemeToggle } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

import { Logo } from './logo'
import { CreateProductModal } from './modals/create-product-modal'
import { useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { UsersModal } from './modals/users-modal'
import { useUserDetails } from '../hooks/use-user-details'

export const NavBar = () => {
  const { dispatch, state } = useContext(AuthContext)
  const { roles } = useUserDetails()
  const [isOpenCreateProduct, setIsOpenCreateProduct] = useState(false)
  const [isOpenUsers, setIsOpenUsers] = useState(false)
  const navigate = useNavigate()

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div
            onClick={() => navigate('/')}
            className="flex hover:cursor-pointer hover:bg-gray-100 p-1 pr-2 pl-2 rounded-md dark:hover:bg-gray-700"
          >
            <Logo />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">RestoFlow</span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            {!state.currentUser && (
              <a onClick={() => navigate('/register')} className="text-gray-900 dark:text-white hover:cursor-pointer">
                Register
              </a>
            )}
            {!state.currentUser && (
              <a onClick={() => navigate('/login')} className="text-gray-900 dark:text-white hover:cursor-pointer">
                Login
              </a>
            )}
            {state.currentUser && (
              <a onClick={logout} className="text-gray-900 dark:text-white hover:cursor-pointer">
                Logout
              </a>
            )}
            <DarkThemeToggle />
          </div>
        </div>
      </nav>
      <nav className="bg-gray-100 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li>
                <a
                  onClick={() => navigate('/menu')}
                  className="text-gray-900 dark:text-white hover:underline hover:cursor-pointer"
                >
                  Menu
                </a>
              </li>
              {(roles.includes('Cook') || roles.includes('Admin')) && (
                <li>
                  <a
                    onClick={() => navigate('/orders')}
                    className="text-gray-900 dark:text-white hover:underline hover:cursor-pointer"
                  >
                    Orders
                  </a>
                </li>
              )}
              {roles.includes('Waiter') && (
                <li>
                  <a
                    onClick={() => navigate('/my-orders')}
                    className="text-gray-900 dark:text-white hover:underline hover:cursor-pointer"
                  >
                    My Orders
                  </a>
                </li>
              )}
              {roles.includes('Admin') && (
                <li>
                  <a
                    onClick={() => setIsOpenCreateProduct((prev) => !prev)}
                    className="text-gray-900 dark:text-white hover:underline hover:cursor-pointer"
                  >
                    New Product
                  </a>
                </li>
              )}
              {roles.includes('Waiter') && (
                <li>
                  <a
                    onClick={() => navigate('/my-tables')}
                    className="text-gray-900 dark:text-white hover:underline hover:cursor-pointer"
                  >
                    My Tables
                  </a>
                </li>
              )}
              {roles.includes('Admin') && (
                <li>
                  <a
                    onClick={() => navigate('/all-bills')}
                    className="text-gray-900 dark:text-white hover:underline hover:cursor-pointer"
                  >
                    Bills
                  </a>
                </li>
              )}
              {roles.includes('Waiter') && (
                <li>
                  <a
                    onClick={() => navigate('/my-bills')}
                    className="text-gray-900 dark:text-white hover:underline hover:cursor-pointer"
                  >
                    My Bills
                  </a>
                </li>
              )}
              {roles.includes('Admin') && (
                <li>
                  <a
                    onClick={() => setIsOpenUsers(true)}
                    className="text-gray-900 dark:text-white hover:underline hover:cursor-pointer"
                  >
                    Users
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <CreateProductModal isOpen={isOpenCreateProduct} close={() => setIsOpenCreateProduct(false)} />
      {isOpenUsers && <UsersModal isOpen={isOpenUsers} close={() => setIsOpenUsers(false)} />}
    </>
  )
}
