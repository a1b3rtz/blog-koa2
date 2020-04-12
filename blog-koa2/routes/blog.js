const router = require('koa-router')()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''
  
  if (ctx.query.isadmin) {
    if (ctx.session.username == null) {
      ctx.body = new ErrorModel('not login yet')
      return
    } 
    author = ctx.session.username
  }

  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData)
})

router.get('/detail', async function (ctx, next) {
  console.log(ctx.query.id)
  const blogData = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(blogData)
})

router.post('/new', loginCheck, async function (ctx, next) {
  ctx.request.body.author = ctx.session.username
  const result = await newBlog(ctx.request.body)
  ctx.body = new SuccessModel(result)
})

router.post('/update', loginCheck, async function (ctx, next) {
  const result = await updateBlog(ctx.query.id, ctx.request.body)
  if(result) {
    ctx.body = new SuccessModel(result)
  } else {
    ctx.body = new ErrorModel('error when updating')
  }
})

router.post('/delete', loginCheck, async function (ctx, next) {
  const author = ctx.session.username
  const result = await deleteBlog(ctx.query.id, author)
  if (result) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('delete error')
  }
})

module.exports = router
