const Qs = require('qs');

const model = require('./model')


const createVideo = async (req, res) => {
    try {
        // Creates new video, timesViewed is always 0 and all field not in the schema will be ignored
        const newVideo = new model({
            ...req.body,
            timesViewed: 0
        });

        const result = await newVideo.save();
        return res.send(result);
    } catch (err) {
        if (err) {
            console.error('Error creating video', err);
            return res.status(500).send('Error creating video');
        }
    }
};

const updateVideo = async (req, res) => {
    try {
        // timesViewed can't be updated
        delete req.body.timesViewed;

        const result = await model.findByIdAndUpdate(req.params.id, {
            ...req.body,
        },{new: true})

        return res.send(result);
    } catch (err) {
        if (err) {
            console.error('Error updating video', err);
            return res.status(500).send('Error updating video');
        }
    }
};

const getVideo = async (req, res) => {
    try {
        const result = await model.findById(req.params.id)

        return res.send(result);
    } catch (err) {
        if (err) {
            console.error('Error getting video', err);
            return res.status(500).send('Error getting video');
        }
    }
};

const getVideos = async (req, res) => {
    // removes offset and limit form query string to not conflict with the where statement below
    req.limit = req.query.limit;
    delete req.query.limit
    req.offset = req.query.offset;
    delete req.query.offset

    // parses query string to a valid mongoose where statement
    const q = (req.query) ? Qs.parse(req.query) : {};

    req.where = q || {};

    try {
        const result = await model
            .where(req.where)
            .limit(parseInt(req.limit || '10', 10))
            .skip(parseInt(req.offset || '0', 10))
            .sort()
            .find()
            .exec()

        return res.send(result);
    } catch (err) {
        if (err) {
            console.error('Error getting videos', err);
            return res.status(500).send('Error getting video');    
        }
    }
};

const deleteVideo = async (req, res) => {
    try {
        const result = await model.findByIdAndDelete(req.params.id)

        return res.send(result);
    } catch (err) {
        if (err) {
            console.error('Error deleting video', err);
            return res.status(500).send('Error deleting video');   
        }
    }
};

module.exports = {
    getVideos,
    getVideo,
    deleteVideo,
    createVideo,
    updateVideo,
}