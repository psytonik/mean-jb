const expressJwt = require('express-jwt');

const isRevoked = async (req, payload, done) => {
	if(!payload.isAdmin) {
		return done(null,true)
	}

	done();
};

const authJwtMiddleware = () => {
	const secret = process.env.SECRET_TOKEN;
	const api = process.env.API_URL;

	return expressJwt({
		secret,
		algorithms: ['HS256'],
		isRevoked: isRevoked
	}).unless({
		path:[
			`${api}/users/login`,
			`${api}/users/registration`,
			{url: /\/public\/uploads(.*)/, methods:['GET','OPTIONS']},
			{url: /\/api\/v1\/products(.*)/, methods:['GET','OPTIONS']},
			{url: /\/api\/v1\/category(.*)/, methods:['GET','OPTIONS']},
			{url: /\/api\/v1\/orders(.*)/, methods:['POST','OPTIONS']},

			// this line allow use all api routes without auth for developing purpose only;
			// {url:/(.*)/}
		]
	})

};

module.exports = authJwtMiddleware;
