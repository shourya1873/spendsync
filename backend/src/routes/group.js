const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {createGroup, deleteGroup} = require('@/models/group.model');
const auth = require('@/middleware/auth');
const jwt = require('jsonwebtoken');
const getUserId = require('@/utils/getLoggedInUser');

router.post('/create', auth, async (req, res) => {
    try {
        const createdBy = getUserId(req);
        const data = {
            ...req.body,
            createdBy,
        }
        const group = await createGroup(data);
        return res.status(200).json({ message: 'Group created successfully!', group });
    } catch (error) {
        return res.status(200).json({ message: error.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    const createdBy = getUserId(req);
    try{
        const { id } = req.params;
        await deleteGroup(id,createdBy);
    } catch (e) {
        return res.status(200).json({ message: e.message });
    }
    return res.status(200).json({ message: 'Group deleted successfully!' });
})

module.exports = router;