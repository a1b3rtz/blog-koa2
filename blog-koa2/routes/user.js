const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  const result = await login(username, password)
  console.log(result.username)
  if (result.username) {
    ctx.session.username = result.username
    ctx.session.realname = result.realname
    ctx.body = new SuccessModel()
    return
  }
  ctx.body = new ErrorModel('login error')
})

// router.get('/session-test', async function (ctx, next) {
//   if (ctx.session.viewCount == null) {
//     ctx.session.viewCount = 0
//   }
//   ctx.session.viewCount++

//   ctx.body = {
//     errno: 0,
//     viewCount: ctx.session.viewCount
//   }
// })

module.exports = router
