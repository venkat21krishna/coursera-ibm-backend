const {authschema }=require('../helpers/validation-schema')
const User = require('../Models/user')
const jwt  = require('jsonwebtoken')



async function isAuthenticated(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json("Unauthorized Request");
      }
    
      const token = req.headers["authorization"].split(" ")[1];
    
      if (!token) {
        return res.status(401).json("No token provided.");
      }
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        console.log(decoded)
        req.user = decoded.userid;
        console.log(req.user)
        next();
      } catch (err) {
        res.status(400).json("Invalid token.");
      }
}

async function isAdmin(req, res, next) {

    try {
        const userId = req.user;
    
        const user = await User.findOne({_id : userId});
    
        if(user.isadmin)
            next();
        
        return res.json({message : "User is not an admin"});
    } catch (error) {
        res.json(error.message);
    }

}


module.exports = { isAuthenticated, isAdmin};