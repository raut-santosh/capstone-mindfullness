const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(" ")[1];
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    if(req.userData.is_admin == true){
      next();
      // console.log(req.userData)
    }else{

      return res.redirect('/login')
    }
    // next();
  } catch (e) {
    // return res.status(401).json({
    //   message: "Your not logged in",
    // });
    return res.redirect('/login')
  }
};
