import useAxios from 'axios-hooks'

interface Props {
  url?: string
  manual?: boolean
}

export const useGet = <T,>({ url, manual }: Props) => {
  const [{ data, error, loading }, executeGet] = useAxios<T>(
    {
      url: url,
      method: 'GET',
    },
    { manual }
  )

  const getData = (url?: string) => {
    executeGet({ url })
  }

  return { data, error, loading, getData }
}
