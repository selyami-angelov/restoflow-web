import { Modal } from 'flowbite-react'
import { useGet } from '../../hooks/use-get'
import { useEffect, useState } from 'react'
import { API_ENDPOINTS } from '../../common/api-endpoints'
import { User } from '../../pages/models'
import { FaUserCircle } from 'react-icons/fa'
import { ALL_ROLES } from '../../common/constants'
import { usePost } from '../../hooks/use-post'

interface Props {
  isOpen: boolean
  close: () => void
}

export const UsersModal = ({ isOpen, close }: Props) => {
  const { data: users, getData: getUsers } = useGet<User[]>({ manual: true })
  const [assignRole, setAssignRole] = useState<Record<string, string>>({})
  const [removeRole, setRemoveRole] = useState<Record<string, string>>({})
  const { response, loading, postData } = usePost({ manual: true })

  useEffect(() => {
    getUsers(API_ENDPOINTS.USERS)
  }, [])

  useEffect(() => {
    if (response?.status === 200) {
      console.log('in data', response)
      getUsers(API_ENDPOINTS.USERS)
    }
  }, [response])

  const onAssigSelectChange = (userId: string, assignRole: string) => {
    setAssignRole((prev) => ({ ...prev, [userId]: assignRole }))
  }

  const onRemoveSelectChange = (userId: string, assignRole: string) => {
    setRemoveRole((prev) => ({ ...prev, [userId]: assignRole }))
  }

  const onAssignClick = (userId: string, role: string) => {
    const url = API_ENDPOINTS.ASSIGN_ROLE(userId)
    postData({ url, data: role })
  }

  const onRemoveClick = (userId: string, role: string) => {
    const url = API_ENDPOINTS.REMOVE_ROLE(userId)
    postData({ url, data: role })
  }

  return (
    <>
      <Modal show={isOpen} size="2xl" popup onClose={() => close()}>
        <Modal.Header>Users</Modal.Header>
        <Modal.Body className="relative w-full items-center block bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
          {users && (
            <ul className=" w-full divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <li key={user.id} className={`p-4 pb-3 sm:pb-4 w-full ${loading && 'opacity-20'}`}>
                  <div className="flex w-full items-start gap-3">
                    <FaUserCircle className="w-8 h-8 rounded-full mt-1 text-gray-900 dark:text-white" />
                    <div className="flex flex-col items-start">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</p>
                      </div>
                      <div className="flex flex-col w-full gap-1  mt-3">
                        <label className="text-xs text-gray-900 truncate dark:text-white">Roles: </label>
                        <div className="flex gap-1">
                          {user.roles.map((role) => (
                            <span
                              key={role}
                              className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-auto">
                      <div className="flex gap-2 items-center">
                        <select
                          className="block py-2.5 px-0 w-28 text-xs text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                          onChange={(e) => onAssigSelectChange(user.id, e.target.value)}
                        >
                          {!assignRole[user.id] && <option>Chose role</option>}
                          {ALL_ROLES.filter((role) => !user.roles.includes(role)).map((role) => (
                            <option key={role} value={assignRole[user.id]}>
                              {role}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-xs text-xs px-2 py-1 w-16 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          onClick={() => onAssignClick(user.id, assignRole[user.id])}
                          disabled={!assignRole[user.id]}
                        >
                          Assign
                        </button>
                      </div>
                      <div className="flex gap-2 items-center">
                        <select
                          className="block py-2.5 px-0 w-28 text-xs text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                          onChange={(e) => onRemoveSelectChange(user.id, e.target.value)}
                        >
                          {!removeRole[user.id] && <option key={'default'}>Chose role</option>}
                          {user.roles.map((role) => (
                            <option key={role} value={removeRole[user.id]}>
                              {role}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-xs text-xs px-2 py-1 w-16 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          onClick={() => onRemoveClick(user.id, removeRole[user.id])}
                          disabled={!removeRole[user.id]}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {loading && (
            <div className="absolute top-0 right-0 left-0 bottom-0  bg-transparent">
              <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 z-auto">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}
