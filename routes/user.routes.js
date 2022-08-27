const { Router } = require('express');


const { getUsers, getUser, createUser, updateUser, deleteUser, activateUser } = require('../controllers/user.controller');

const router = Router();


router.post('/', createUser );
router.put('/:id', updateUser );
router.delete('/:id', deleteUser );
router.patch('/:id/active', activateUser );
router.get('/:id', getUser );

router.get('/', getUsers );




module.exports = router;