var express = require('express');
var router = express.Router();
var { signup, signin, addTodos, allTudos, deleteTodo, updateTodo, logout, refereshUser } = require('../Controllers/userContollers');
const { isLoggedIn } = require('../utils/auth');


router.post('/login', signin);
router.post('/register', signup);
router.post('/addTodos', isLoggedIn, addTodos);
router.get('/allTudos', isLoggedIn, allTudos)
router.get("/refresh", isLoggedIn, refereshUser);
router.delete('/delete/:id', isLoggedIn,deleteTodo);
router.post('/update/:id', updateTodo);
router.post('/logout', logout)


module.exports = router;

