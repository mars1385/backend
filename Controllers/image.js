const Clarifai = require('clarifai');

const api = new Clarifai.App({
    apiKey: 'af74fa3fca1d4ab6a058e8f7126f932e'
});

const handelApi = (req , res) => {
    api.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      req.body.userInput)
    .then(data => res.json(data))
    .catch (error => res.status(400).json('api not working'));
}

const handelImage = (req , res , db) => {
    const {id} = req.body;
    
    db('users').where('id', '=', id)
    .increment('entries' , 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(error => res.status(400).json('unable to found entries'));
}

module.exports = {
    handelImage,
    handelApi
}