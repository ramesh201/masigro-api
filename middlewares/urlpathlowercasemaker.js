urlPathLowerCase = (req, res, next) => {

    //console.log(req.url.toLowerCase());
    req.url = req.url.toLowerCase();
    newUrl = req;
    //return req.url.toLowerCase();
    next();
}

module.exports = urlPathLowerCase;