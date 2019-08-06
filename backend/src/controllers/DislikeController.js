const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { user } = req.headers;
        const { devId } = req.params;

        const targetDev = await Dev.findById(devId);
        if (!targetDev) res.status(400).send({ mensage: "User not exists" });

        const loggedDev = await Dev.findById(user);
        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        res.send(loggedDev);
    }
}