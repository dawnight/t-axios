import { AxiosRequestConfig } from './types'
import { buildURL } from './helpers/url'
import xhr from './xhr'

// 处理配置信息的方法
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
}

// 处理配置信息里的 url 的方法
function transformURL(config: AxiosRequestConfig): string {
  let { url, params } = config
  return buildURL(url, params)
}

// 主函数
function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

export default axios
