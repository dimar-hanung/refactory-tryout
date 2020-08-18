class globalFunction {
  static isObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object ? false:true;
  }
}

module.exports = globalFunction;
