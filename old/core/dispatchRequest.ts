import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types';
import { buildURL } from '../helpers/url';
import { transformRequest, transformResponse } from '../helpers/data';
import { processHeaders } from '../helpers/headers';
import xhr from './xhr';

// 主函数
export default function dispatch(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config).then(res => {
    return transformResponseData(res);
  });
}

// 处理配置信息的方法
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}

// 处理配置信息里的 url 的方法
function transformURL(config: AxiosRequestConfig): string {
  let { url, params } = config;
  return buildURL(url!, params);
}

// 处理配置信息里的请求数据
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data);
}

// 处理配置信息里的请求头信息
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}

// 处理配置信息里的响应信息
function transformResponseData(response: AxiosResponse): AxiosResponse {
  response.data = transformResponse(response.data);
  return response;
}
