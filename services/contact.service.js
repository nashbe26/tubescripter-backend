const Contact = require('../models/contact');
const createError = require('http-errors');

const createContact = async (data) =>{
    
    const onlyAlphabetRegex = /^[A-Za-z]+$/;
	const emailRegex = /^[a-z0-9]+(?:[.-][a-z0-9]+)*@(?!\.|\-)[a-z]+(?:\.[a-z]+)*$/;

    if (!(data && data.content && data.email &&  data.firstName  &&  data.lastName))
      throw createError(400, `Missing Information!`)


	// Verfiy FirstName
	if (data.firstName.length > 20 || !data.firstName.match(onlyAlphabetRegex))
		throw createError(400, 'Bad format firstName');

	// Verfiy LastName
	if (data.lastName.length > 20 || !data.lastName.match(onlyAlphabetRegex))
		throw createError(400, 'Bad format lastName');

	//Verify email
	if (!data.email.match(emailRegex))
		throw createError(400, 'Bad format email');

    const createContact = await Contact.create(data)
      
    if(!createContact)
      throw createError(400, `Failed to add the contact`)

    return createContact;
}

module.exports ={
    createContact
}