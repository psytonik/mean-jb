const express = require('express');
const {createNewUser, getUsers,getUserById,updateUser,
	loginUser,getCountOfUsers,deleteUser} = require("../controllers/userController");

const router = express.Router();

/// admin route
router.route('/')
    .get(getUsers)
    .post(createNewUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
	.delete(deleteUser);

/// open route
router.route('/login')
    .post(loginUser);

router.route('/registration')
	.post(createNewUser);

/// admin route
router.route('/get/users-count')
	.get(getCountOfUsers);

module.exports = router;
