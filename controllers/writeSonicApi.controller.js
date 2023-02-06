const writerSonicService = require('../services/writeSonicApi.service') 

const callYoutubeTitleApi = async (req, res) => {
    let userId= req.user
    let response =await writerSonicService.callYoutubeTitleApi(userId,req.body)
    res.status(200).json(response);
}

const callParagraphWriterApi =async (req, res) => {
    let userId= req.user
    let response=await  writerSonicService.callParagraphWriterApi(userId,req.body)
    res.status(200).json(response);
}

const callYoutubeIntrosApi = async (req, res) => {
    let userId= req.user
    let response =await  writerSonicService.callYoutubeIntrosApi(userId,req.body)
    res.status(200).json(response);
}

const callYoutubeHooksApi = async (req, res) => {
    let userId= req.user
    let response = await writerSonicService.callYoutubeHooksApi(userId,req.body)
    res.status(200).json(response);
}

const callYoutubeDescriptionsApi = async (req, res) => {
    let userId= req.user
    let response = await writerSonicService.callYoutubeDescriptionsApi(userId,req.body)
    res.status(200).json(response);
}

const callTikTokScripterApi = async (req, res) => {
    let userId= req.user
    let response = await writerSonicService.callTikTokScripter(userId,req.body)
    res.status(200).json(response);
}


module.exports = {
    callYoutubeTitleApi,
    callParagraphWriterApi,
    callYoutubeIntrosApi,
    callTikTokScripterApi,
    callYoutubeHooksApi,
    callYoutubeDescriptionsApi,
}