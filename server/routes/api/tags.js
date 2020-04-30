const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// get tags
router.get('/', async (req, res) => {
    const tags = await loadTagsCollection();
    res.send(await tags.find({}).toArray());
})

// add tag
router.post('/', async (req, res) => {
    const tags = await loadTagsCollection();
    await tags.insertOne({
        text: req.body.text,
        color: req.body.color,
        createdAt: Date.now()
    });
    res.status(201).send();
})

// update tag
router.patch('/:id', async (req, res, next) => {
    var newData = {
        text: req.body.text,
    }
    const tags = await loadTagsCollection();
    await tags.updateOne({_id: new mongodb.ObjectID(req.params.id)}, {$set: newData});
    res.status(200).send();
})

// delete tag
router.delete('/:id', async (req, res) => {
    const tags = await loadTagsCollection();
    await tags.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

async function loadTagsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://fiore123:SqUkUBRTjB0g6nbw@cluster0-rrbjc.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db('cluster0').collection('tags');
}

module.exports = router;