import { isDate, isPlainObject } from './utils';

function encode(value: string): string {
  return encodeURIComponent(value)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '(')
    .replace(/%5D/gi, ')');
}

/**
 * buildURL 的原理，就是把一个参数，组装成为符合 url 规范的字符串，并且只处理第一层 key 的数据，如果某一个 key 的 value 是一个对象，那么这个对象的 key 不做处理
 * 如果遍历的 key 是数组，那么把字符串拼接成 home[]=shanghai&home[]=beijing
 * 如果遍历的 key 是对象，那么把对象的 value 进行encode 转化
 * 如果 url 上已经有了 ? ，那么就不再加问号
 * 如果 url 上有 # ，那么就去掉 # 后边所有的字符串
 * 最后把所有的字符串拼接成一个最终的 url
 * @param url 需要进行处理的 url
 * @param params 给 url 传递的参数
 */
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url;
  }

  const parts: string[] = [];

  Object.keys(params).forEach(key => {
    const value = params[key];

    if (value === null || typeof value === 'undefined') {
      return;
    }

    let values = [];

    if (Array.isArray(value)) {
      values = value;
      key += '[]';
    } else {
      values = [value];
    }

    values.forEach(value => {
      if (isDate(value)) {
        value = value.toISOString();
      } else if (isPlainObject(value)) {
        value = JSON.stringify(value);
      }

      parts.push(`${key}=${encode(value)}`);
    });
  });

  let serializeParams = parts.join('&');

  if (serializeParams) {
    const markIndex = url.indexOf('#');

    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializeParams;
  }

  return url;
}
