const toString = Object.prototype.toString;

export function isDate(value){
  return toString.call(value) === '[object Date]';
}

export function isObject(value) {
  return value !== null && typeof value === 'object';
}
