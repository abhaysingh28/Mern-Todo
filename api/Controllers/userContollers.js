const userModel = require('../Models/User');
const todoModel = require('../Models/Todo');
const { sendToken } = require('../utils/auth');

exports.profile = async function (req, res) {
    const alluser = await userModel.find()
    res.json({ alluser })
}

exports.signup = async (req, res) => {
    try {
        let user = await userModel.findOne({ name: req.body.name })
            .select("+password")
            .exec();
        if (user) {
            console.log("user found");
            const matchpassword = user.comparepassword(req.body.password);
            if (!matchpassword) {
                return res.status(500).json({ message: "wrong password" });
            }
            sendToken(user, req, res, 200);
            return;
        }
        console.log(req.body);
        const newUser = new userModel(req.body);
        user = await newUser.save();
        console.log("created");
        sendToken(user, req, res, 200);
    } catch (error) {
        res.status(501).json({ message: error.message });
    }
}

exports.signin = async (req, res, next) => {
    try {
        let user = await userModel.findOne({ name: req.body.name })
            .select("+password")
            .exec();
        if (user) {
            const matchpassword = user.comparepassword(req.body.password);
            if (!matchpassword) {
                return res.status(500).json({ message: "wrong password" });
            }
            sendToken(user, req, res, 200);
            return;
        }
        // const newUser = new userModel(req.body);
        // user = await newUser.save();
        // console.log("created");
        sendToken(user, req, res, 200);
    } catch (error) {
        res.status(501).json({ message: error.message });
    }
    // res.json({})
};

exports.addTodos = async (req, res) => {
    try {
        const { title, description } = req.body;
        const user = await userModel.findById(req.user._id);
        const newTodo = await todoModel.create({ title, description, author: user._id });
        user.todos.push(newTodo._id);
        await user.save();
        console.log(user);
        res.json(newTodo);
    } catch (error) {
        res.json(error.message);
    }
}
exports.refereshUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id)
        res.json(user);
    } catch (error) {
        res.json(error.message);
    }
}
exports.allTudos = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).populate('todos');
        res.json(user.todos);
    } catch (error) {
        res.json(error.message);
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(req.user._id);
        const deleteTodo = await todoModel.findByIdAndDelete(id);
        user.todos.pull(id);
        user.save();
        res.json(deleteTodo);
    } catch (error) {
        res.json(error.message);
    }
}
exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedTodo = await todoModel.findOneAndUpdate({ _id: id }, { title, description }, { new: true });
        res.json(updatedTodo);
    } catch (error) {
        res.json(error.message);
    }
}
exports.logout = async (req, res) => {
    try {
        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        })
        res.json({ message: 'logout' })
    } catch (error) {
        res.json(error.message);
    }
}

