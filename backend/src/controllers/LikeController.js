const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { user } = req.headers;
        const { devId } = req.params;

        const targetDev = await Dev.findById(devId);
        if (!targetDev) res.status(400).send({ mensage: "User not exists" });

        if (targetDev.likes.includes(user)) console.log("Deu Match")

        const loggedDev = await Dev.findById(user);
        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        res.send(loggedDev);
    }
}