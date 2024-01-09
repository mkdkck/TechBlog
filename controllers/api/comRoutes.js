const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create(req.body);
        res.json({ message: 'Comment has been sucessfully posted' })
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;