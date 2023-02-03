const writerSonicService = require('../services/writeSonicApi.service') 

const callYoutubeTitleApi = async (req, res) => {
    
    let response =await writerSonicService.callYoutubeTitleApi(req.body)
    console.log(response);
    res.status(200).json(response);
}

const callParagraphWriterApi =async (req, res) => {
    let response=await  writerSonicService.callParagraphWriterApi(req.body)
    res.status(200).json(response);
}

const callYoutubeIntrosApi = (req, res) => {
    let response = writerSonicService.callYoutubeIntrosApi(req.body)
    res.status(200).json(response);
}

const callYoutubeHooksApi = (req, res) => {
    let response = writerSonicService.callYoutubeHooksApi(req.body)
    res.status(200).json(response);
}

const callYoutubeDescriptionsApi = (req, res) => {
    let response = writerSonicService.callYoutubeDescriptionsApi(req.body)
    res.status(200).json(response);
}

module.exports = {
    callYoutubeTitleApi,
    callParagraphWriterApi,
    callYoutubeIntrosApi,
    callYoutubeHooksApi,
    callYoutubeDescriptionsApi,
}