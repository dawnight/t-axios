const toString = Object.prototype.toString

export function isDate(value: any): value is Date {
  return toString.call(value) === '[object Date]'
}

export function isObject(value: any): value is object {
  return value !== null && typeof value === 'object'
}
