// calling add photo service

const contactService = require('../services/contact.service')
const asyncHandler = require('express-async-handler');

const createContact = asyncHandler(async (req, res) => {

    let users = await contactService.createContact(req.body);

    res.status(200).json(users);
});

module.exports = {
    createContact
}