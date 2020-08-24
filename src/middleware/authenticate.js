const jwt = require('jsonwebtoken');
const config = require('../configs/config')
let userTokenModel = require('../user/models/userToken.model')
module.exports = () => {
  return async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      console.log("here", token)
      const tokenExists = await userTokenModel.findOne({token: token, validity: {$gt: new Date()} , usable: true});
      if(tokenExists){ 
        console.log(tokenExists)
      let user = jwt.verify(token, config.jwt.secret);
      req.user = user.data.user
      next();
      }else res.status(401).end();
    } catch (e) {
      console.log(e)
      res.status(401).end();
    }
  };
};