const jwt = require('jsonwebtoken');
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData && decodedData.id;

        } else {
            decodedData = jwt.decode(token);
            req.useId = decodedData && decodedData.sub; ///sub is given by google API for veryuser data
        }
        next();
    } catch (error) {
        console.log(error);
    }
}
module.exports = { auth }