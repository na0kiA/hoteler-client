import applyCaseMiddleware  from 'axios-case-converter'
import axios, { AxiosInstance} from 'axios'

const options = {
  ignoreHeaders: true,
}

const client: AxiosInstance | any = applyCaseMiddleware(
  axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
    headers: { 'Content-Type': 'application/json' },
    responseType: 'json'
  }),
  options
)


export default client