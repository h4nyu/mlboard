import axios from 'axios'
axios.defaults.headers.get['Content-Type'] = 'application/json'


class API {
  constructor() {
    this.url = ''
  }

  _post(url, data) {
    return axios.post(url, data)
  }

  _put(url, data) {
    return axios.put(url, data)
  }

  _get(url, data) {
    return axios.get(url, {
      params: data
    })
  }
}


class QueryApi extends API {
  constructor(target, entities) {
    super()
    this.postData = {
      target: target,
      methods: [],
      entities: entities,
    }
    this.url = 'api/query'
  }

  get(id) {
    this.postData.methods.push({
      name: 'get',
      args: [id],
      kwargs: {}
    })
    return this._post(this.url, this.postData)
  }

  distinct(formula) {
    this.postData.methods.push({
      name: 'distinct',
      args: [formula],
      kwargs: {}
    })
    return this
  }

  orderBy(argStr) {
    this.postData.methods.push({
      name: 'order_by',
      args: [argStr],
      kwargs: {}
    })
    return this
  }

  first() {
    this.postData.methods.push({
      name: 'first',
      args: [],
      kwargs: {}
    })
    return this._post(this.url, this.postData)
  }

  all() {
    this.postData.methods.push({
      name: 'all',
      args: [],
      kwargs: {}
    })
    return this._post(this.url, this.postData)
  }

  count() {
    this.postData.methods.push({
      name: 'count',
      args: [],
      kwargs: {}
    })
    return this._post(this.url, this.postData)
  }

  limit(num) {
    this.postData.methods.push({
      name: 'limit',
      args: [num],
      kwargs: {}
    })
    return this
  }

  filterBy(kwargs) {
    this.postData.methods.push({
      name: 'filter_by',
      args: [],
      kwargs: kwargs
    })
    return this
  }

  filter(formula) {
    this.postData.methods.push({
      name: 'filter',
      args: [formula],
      kwargs: {}
    })
    return this
  }

  orFilter(conds) {
    this.postData.methods.push({
      name: 'or_filter',
      args: [],
      kwargs: conds
    })
    return this
  }

  inFilter(conds) {
    this.postData.methods.push({
      name: 'in_filter',
      args: [],
      kwargs: conds
    })
    return this
  }

  groupBy(column) {
    this.postData.methods.push({
      name: 'group_by',
      args: [column],
      kwargs: {}
    })
    return this
  }

  last() {
    this.postData.methods.push({
      name: 'last',
      args: [],
      kwargs: {}
    })
    return this._post(this.url, this.postData)
  }

  recalc(obj) {
    const putData = {
      target: this.postData.target,
      method: {
        name: 'recalc',
        args: [],
        kwargs: {
          obj: obj
        }
      }
    }
    return this._put(this.url, putData)
  }

  upsert(obj) {
    const putData = {
      target: this.postData.target,
      method: {
        name: 'upsert',
        args: [],
        kwargs: {
          obj: obj
        }
      }
    }
    return this._put(this.url, putData)
  }

  delete() {
    this.postData.methods.push({
      name: 'delete',
      args: [],
      kwargs: {synchronize_session: false}
    })
    return this._post(this.url, this.postData)
  }

  deleteCascade(id) {
    this.postData.methods.push({
      name: 'delete_cascade',
      args: [id],
      kwargs: {}
    })
    return this._post(this.url, this.postData)
  }

  searchRange(kwargs) {
    this.postData.methods.push({
      name: 'search_range',
      args: [],
      kwargs: kwargs
    })
    return this._post(this.url, this.postData)
  }

  rangeCount(kwargs) {
    this.postData.methods.push({
      name: 'range_count',
      args: [],
      kwargs: kwargs
    })
    return this._post(this.url, this.postData)
  }
}


export function query(target, entities=[]) {
  return new QueryApi(target, entities)
}
