import { Outlet } from 'react-router-dom'
import { SubNavbar } from '../components/navbar'
import Footer from '../components/footer'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const Root = () => {
  const { state } = useContext(AuthContext)

  console.log('AUTH STATE', state)

  return (
    <div className="flex flex-col h-screen">
      <SubNavbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
