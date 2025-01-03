import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  console.log("verifyToken", req.cookies);
  const token = req.cookies?.token;
  console.log(token,process.env.SECRET)
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) return res.status(401).send("Invalid Token");
      console.log("000000000",decoded);
      req.user = decoded;
      next();
    });
  } else {
    return res.status(403).send("Token required");
  }
}

export default verifyToken;
