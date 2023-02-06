
var express = require('express');
const router = express.Router();

const writesonicController = require('../controllers/writeSonicApi.controller');

// YouTube Titles
// Data Example : 
/* {
    "video_description": "How To Spend Every Night - Elon Musk",
    "search_term": "Elon Musk about sleep",
    "tone_of_voice": "excited"
} */
router.post('/youtubetitles', writesonicController.callYoutubeTitleApi);

// Paragraph Writer
// Data Example : 
/* {
     "tone_of_voice": "Professional",
     "paragraph_title": "AI and Future",
     "keywords": "Voice"
} */
router.post('/paragraphwriter', writesonicController.callParagraphWriterApi);

// YouTube Intros V2
// Data Example : 
/* {
     "video_title": "Launch of Writesonic’s chrome extension that lets anyone rephrase, expand and shorten their content within seconds.",
     "hook": "Stuck into writer's block ? writesonic is for you",
     "tone": "excited"
} */
router.post('/youtubeintros', writesonicController.callYoutubeIntrosApi);

// Youtube Hooks
// Data Example : 
/* {
     "video_title": "Launch of Writesonic’s chrome extension that lets anyone rephrase, expand and shorten their content within seconds.",
     "tone": "excited"
} */
router.post('/youtubehooks', writesonicController.callYoutubeHooksApi);

// YouTube Descriptions
// Data Example : 
/* {
     "video_title": "How To Spend Every Night - Elon Musk",
     "search_term": "Elon Musk about sleep",
     "tone_of_voice": "excited"
} */
router.post('/youtubedescriptions', writesonicController.callYoutubeDescriptionsApi);

router.post('/tiktokscriptdescription', writesonicController.callTikTokScripterApi);

module.exports = router