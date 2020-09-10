randomToken = (req, res, next) => {
    //console.log('Authenticating User ... ');
    var x = Math.floor((Math.random() * 100000) + 1);
    console.log(x.toString()+"-"+(Math.floor((Math.random() * 100000) + 1)).toString()+"-"+(Math.floor((Math.random() * 100000) + 1)).toString());
    next();
}

module.exports = randomToken;