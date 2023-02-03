const axios = require('axios');
const createError = require('http-errors');

const sdk = require('api')('@writesonic/v2.2#43xnsflcadmm1b');

exports.callYoutubeTitleApi =async  function(data) {
    
    sdk.auth(process.env.WRITESONIC_API_KEY);
    
    if(!data){
        throw createError(401,'Failed to generate the text');
    }
    try{

        const resp = await sdk.youtubeTitles_V2BusinessContentYoutubeTitles_post({
            video_description: data.video_description,
            search_term: data.search_term,
            tone_of_voice: data.tone_of_voice
          },{
            language:data.language,
            num_copies: data.num_copies
          })
    
        return resp;
    }catch(err){
        throw createError(401,err);
    }
    
}

exports.callParagraphWriterApi =async  function(data) {

    sdk.auth(process.env.WRITESONIC_API_KEY);
    console.log(data);
    
    if(!data){
        throw createError(401,'Failed to generate the text');
    }
    try{

        const resp = await sdk.paragraphWriter_V2BusinessContentParagraphWriter_post({
            paragraph_title: data.video_title,
            tone_of_voice: data.tone_of_voice
          },{
            language:data.language,
            num_copies: data.num_copies
          })
    
        return resp;
    }catch(err){
        throw createError(401,err);
    }
    

}

exports.callYoutubeIntrosApi =async  function(data) {

    sdk.auth(process.env.WRITESONIC_API_KEY);
    
    if(!data){
        throw createError(401,'Failed to generate the text');
    }
    try{

        const resp = await sdk.youtubeIntros_V2BusinessContentYoutubeIntros_post({
            video_title: data.video_title,
            search_term: data.search_term,
            tone_of_voice: data.tone_of_voice
          },{
            language:data.language,
            num_copies: data.num_copies
          })
    
        return resp;
    }catch(err){
        throw createError(401,err);
    }
}

exports.callYoutubeHooksApi =async  function(data) {
    sdk.auth(process.env.WRITESONIC_API_KEY);
    
    if(!data){
        throw createError(401,'Failed to generate the text');
    }
    try{

        const resp = await sdk.youtubeHooks_V2BusinessContentYoutubeHooks_post({
            video_title: data.video_title,
            tone: data.tone_of_voice
          },{
            language:data.language,
            num_copies: data.num_copies
          })
    
        return resp;
    }catch(err){
        throw createError(401,err);
    }
}

exports.callYoutubeDescriptionsApi =async  function(data) {
    sdk.auth(process.env.WRITESONIC_API_KEY);
    
    if(!data){
        throw createError(401,'Failed to generate the text');
    }
    try{

        const resp = await sdk.youtubeDescriptionsV2_V2BusinessContentYoutubeDescriptionsV2_post({
            video_title: data.video_title,
            keywords: data.search_term
          },{
            language:data.language,
            num_copies: data.num_copies
          })
    
        return resp;
    }catch(err){
        throw createError(401,err);
    }

}