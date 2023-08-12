import useAxios from 'axios-hooks'

interface Props {
  url?: string
  manual?: boolean
}

interface PostDataProps {
  data?: unknown
  url?: string
}

interface HttpHeaders {
  'Content-Type': string
}

const DEFAULE_HEADERS = {
  'Content-Type': 'application/json',
}

export const usePost = <T,>({ url, manual }: Props) => {
  const [{ data, error, loading, response }, executePost] = useAxios<T>(
    {
      url,
      method: 'POST',
    },
    { manual }
  )

  const postData = async (postData: PostDataProps, headers?: HttpHeaders) => {
    const config = {
      ...postData,
      headers: headers ?? DEFAULE_HEADERS,
    }
    executePost(config)
  }

  return { data: data ?? [], error, loading, postData, response }
}
