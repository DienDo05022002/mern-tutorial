const mongoose = require('mongoose');
const { Schema, model } = mongoose

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, default: 'hahaha' },
        password: { type: String,required: true},
        createdAt: { type: Date , default: Date.now()}
    }
);

// userSchema.set('validateBeforeSave', true);

const User = model('User', userSchema)

module.exports = User