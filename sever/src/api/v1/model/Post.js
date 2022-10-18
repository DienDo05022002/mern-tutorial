const mongoose = require('mongoose');
const { Schema, model } = mongoose

const postSchema = new Schema(
    {
        title: { type: String, required: true, },
        description: { type: String,required: true},
        url: { type: String},
        status: {type: String, enum: ['TO-LEARN','LEARNING', 'END']},
        user: { 
            type: Schema.Types.ObjectId,
            refPath: 'users'
        }
    }
);

const Post = model('posts', postSchema)

module.exports = Post