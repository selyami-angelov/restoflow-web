import useAxios from 'axios-hooks'

interface Props {
  url?: string
  manual?: boolean
}

interface DeleteDataProps {
  data?: unknown
  url?: string
}

export const useDelete = <T,>({ url, manual }: Props) => {
  const [{ data, error, loading }, executeDelete] = useAxios<T>(
    {
      url,
      method: 'DELETE',
    },
    { manual }
  )

  const deleteData = (putData: DeleteDataProps) => {
    executeDelete(putData)
  }

  return { data, error, loading, deleteData }
}
