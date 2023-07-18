//const expressJwt = require('express-jwt');
const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
    const secret = process.env.SECRET;
    return jwt({
        secret,
        algorithms: ['HS256']

    }).unless({
        path: [
            `/api/users/login`,
            `/api/users/register`
            //{ url: /(.*)/ },
        ]
    });
}



module.exports = authJwt;
