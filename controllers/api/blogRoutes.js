const router = require('express').Router();
const { Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
        const blogData = await Blog.create(req.body);
        res.json({ message: 'Blog has been sucessfully posted' })
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        // Serialize data so the template can read it
        const blogs = blogData.get({ plain: true });
        res.render('blogEdit', {
            ...blogs,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({ message: 'Blog has been sucessfully updated' })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }
        res.status(200).json({ message: 'Blog has been sucessfully deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;