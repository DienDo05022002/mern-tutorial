var express = require('express');
var router = express.Router();
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Post = require('../model/Post')
const verifyToken = require('../middleware/verifytoken')

//MONGOOSE
mongoose.connect('mongodb://localhost:27017/mern');

//----------------------------------------------------------
// Get Posts
router.get('/post',verifyToken, async (req, res, next) => {
	try {
        const newPosts = await Post.find()
        res.json({ success: true, newPosts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  });
router.get('/postAll', verifyToken, async (req, res, next) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user')
        res.json({posts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
});
//------------------------------------------------------------------------------------------------------------------------------
//   CREATE POST/ Post Api
//------------------------------------------------------------------------------------------------------------------------------
// POST: register user
router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body
    // if(!title) 
    // return 
    //     res.status(400).json({ success: false, message: 'Title is required' })
        try {
            const newPost = new Post({
                title,
                description,
                url: url.startsWith('https://') ? url : `https://${url}`,
                status: status || 'TO LEARN',
                user: req.userId
            })
    
            await newPost.save()
    
            res.json({ success: true, message: 'Happy learning!', post: newPost })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server errorL' })
        }
});

//------------------------------------------------------------------------------------------------------------------------------
//   PUT/ SỬA
//------------------------------------------------------------------------------------------------------------------------------

router.patch('/:id',verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

	try {
		let updatedPost = {
			title,
			description: description || '',
			url: (url.startsWith('https://') ? url : `https://${url}`) || '',
			status: status || 'TO LEARN'
		}

		const postUpdateCondition = { _id: req.params.id, user: req.userId }

		updatedPost = await Post.findOneAndUpdate(
			postUpdateCondition,
			updatedPost,
			{ new: true }
		)

		// User not authorised to update post or post not found
		if (!updatedPost)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({
			success: true,
			message: 'Excellent progress!',
			post: updatedPost
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server errorLL' })
	}
});
//------------------------------------------------------------------------------------------------------------------------------
//   DELETE/ XÓA
//------------------------------------------------------------------------------------------------------------------------------
router.delete('/:id',verifyToken, async (req, res) => {
    try {
		const postDeleteCondition = { _id: req.params.id, user: req.userId }
		const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

		// User not authorised or post not found
		if (!deletedPost)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({ success: true, post: deletedPost })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server errorLLL' })
	}
    //________________
    // try {
    //     const { id } = req.params;
    //     const deletedPost = await deleteDocument(id);
    //     res.json({ ok: true, deletedPost });
    // } catch (error) {
    //     res.status(500).json(error);
    // }
});

router.get('/users', function (req, res, next) {
    res.send('v1/users');
});

module.exports = router;