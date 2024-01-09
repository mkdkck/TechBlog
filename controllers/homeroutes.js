const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userData.get({ plain: true });
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/newblog', withAuth, (req, res) => {
    res.render('newblog', {
        user_id: req.session.user_id,
        logged_in: true
    });
});

router.get('/blogs/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        const blog = blogData.get({ plain: true });

        const commentData = await Comment.findAll({
            where: { blog_id: req.params.id },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });


        const comments = commentData.map(comment => comment.get({ plain: true }));

        res.render('comments', {
            ...blog,
            comments,
            logged_in: req.session.logged_in,
            commentsUser_id: req.session.user_id
        });


    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/');
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;