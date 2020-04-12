const crypto = require('crypto')

//key
const SECRET_KEY = 'DJASasd_1235432345#'

//md5 cryp
function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

//crypt function
function genPassword(password) {
  const str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}

module.exports = {
  genPassword
}
