

const jwtErrorHandler = (err,req,res,next) => {
	if(err.code === "credentials_required"){
		return res.status(401).json({message:err.message})
	}

	if(err.code === "invalid_token"){
		return res.status(401).json({message:err.message})
	}

	if(err){
		return res.status(500).json({message:err.message})
	}

	return next();
};

module.exports = jwtErrorHandler;
