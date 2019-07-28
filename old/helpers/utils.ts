const toString = Object.prototype.toString;

export function isDate(value: any): value is Date {
  return toString.call(value) === '[object Date]';
}

export function isObject(value: any): value is Object {
  return value !== null && typeof value === 'object';
}

// 判断是否是纯对象
export function isPlainObject(value: any): value is Object {
  return toString.call(value) === '[object Object]';
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any;
  }
  return to as T & U;
}
