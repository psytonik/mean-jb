const express = require('express');
const {createNewUser, getUsers,getUserById,updateUser,
	loginUser,getCountOfUsers,deleteUser} = require("../controllers/userController");

const router = express.Router();

router.route('/')
    .get(getUsers)
    .post(createNewUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
	.delete(deleteUser);


router.route('/login')
    .post(loginUser);

router.route('/get/users-count')
	.get(getCountOfUsers);

module.exports = router;
