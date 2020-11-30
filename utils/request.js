/**
 * 基于axios封装request请求
 */
import axios from 'axios';

const requset = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

export default requset;