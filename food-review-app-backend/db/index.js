const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://swoldu01:ELUdhevn3WjRhIfT@cluster0.nnzbvds.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDB.')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db