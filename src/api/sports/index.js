
import { getApis } from '@/api/baseConfig'

export default getApis(require.context('./', false, /\.js$/), './index.js')
