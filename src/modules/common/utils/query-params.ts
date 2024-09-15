import md5 from 'md5'

const PUBLIC_KEY = 'b7c12e9c8c7a696c2beba3d88402cdca'
const PRIVATE_KEY = '2af2d886232bee04e511538616968e49efe2cb5b'

export const getQueryParamsApi = () => {
  const timestamp = new Date().getTime()
  const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY)
  const queryParams = `ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`

  return queryParams
}
