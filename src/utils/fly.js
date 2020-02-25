var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()

fly.config.baseURL = 'https://wei.wangq.online/';

fly.interceptors.request.use((config, promise) => {
  return config
})

fly.interceptors.response.use(response => {
  return response.data
}, (error, promise) => {
  wx.showToast({
    title: error.message,
    icon: 'none'
  })
  return promise.resolve(error)
})

export default fly
