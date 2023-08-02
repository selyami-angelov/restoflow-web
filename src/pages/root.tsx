import { Outlet } from 'react-router-dom'
import { NavBar } from '../components/navbar'
import Footer from '../components/footer'

export const Root = () => {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-800">
      <div className="sticky top-0 z-10">
        <NavBar />
      </div>
      <div className="flex-1 flex justify-center overflow-y-auto">
        <div className="max-w-7xl w-full px-4">
          <Outlet />
        </div>
      </div>
      <div className="sticky bottom-0 z-10">
        <Footer />
      </div>
    </div>
  )
}
