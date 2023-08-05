import useAxios from 'axios-hooks'

interface Props {
  url?: string
  manual?: boolean
}

interface PostDataProps {
  data?: unknown
  url?: string
}

export const usePost = <T,>({ url, manual }: Props) => {
  const [{ data, error, loading, response }, executePost] = useAxios<T>(
    {
      url,
      method: 'POST',
    },
    { manual }
  )

  const postData = async (postData: PostDataProps, headers: Record<string, string> = {}) => {
    const config = {
      ...postData,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }
    executePost(config)
  }

  return { data: data ?? [], error, loading, postData, response }
}
