const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(" ")[1];
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Your not logged in",
    });
  }

  // try {
  //   alert('hi')
  //   const token = req.cookies.token;
  //   if (!token) {
  //     throw new Error('No token found');
  //   }
  //   const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  //   req.userId = decodedToken.userId;
  //   next();
  // } catch (err) {
  //   res.redirect('/login');
  // }
};
