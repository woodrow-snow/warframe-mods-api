const isAuthenticated = (req, res, next) => {
     if (req.session.user === undefined) {
          return res.status(401).json("Hey Brotha, you don't have access to this.");
     }
     next();
};

module.exports = { isAuthenticated };
