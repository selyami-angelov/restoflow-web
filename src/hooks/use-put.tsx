import useAxios from 'axios-hooks'

interface Props {
  url?: string
  manual?: boolean
}

interface PutDataProps {
  data?: unknown
  url?: string
}

export const usePut = <T,>({ url, manual }: Props) => {
  const [{ data, error, loading }, executePut] = useAxios<T>(
    {
      url,
      method: 'PUT',
    },
    { manual }
  )

  const putData = (putData: PutDataProps) => {
    executePut(putData)
  }

  return { data, error, loading, putData }
}
