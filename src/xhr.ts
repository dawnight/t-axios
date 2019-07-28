import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types';
import { parseHeaders } from './helper/headers';
import { createError } from './helper/error';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data, url, method = 'get', headers, responseType, timeout } = config;

    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    request.open(method.toUpperCase(), url!, true);

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 0) {
        return;
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData = responseType === 'text' ? request.responseText : request.response;
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        request,
        config
      };
      handleResponse(response);
    };

    // 网络错误
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request));
    };

    // 超时时间
    if (timeout) {
      request.timeout = timeout;
    }
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout}ms`, config, 'ECONNABORTED', request));
    };

    // 返回非 2xx 状态码

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    });

    request.send(data);

    function handleResponse(response: AxiosResponse): void {
      const status = response.status;
      if (status >= 200 && status < 300) {
        resolve(response);
      } else {
        reject(
          createError(
            `Request failed with status code ${status}`,
            config,
            'ECONNABORTED',
            request,
            response
          )
        );
      }
    }
  });
}
