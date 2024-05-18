// Creating a token and sending it in a cookies
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
    // cookie is accessible only through HTTP(S) request, not JavaScript
    secure: false, // cookie will only be sent over HTTPS
    sameSite: "lax", // allows cross-site requests
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};
module.exports = sendToken;
