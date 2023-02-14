const axios = require("axios");
const createError = require("http-errors");
const { getUserById, updateNbrWords } = require("./user.service");

const sdk = require("api")("@writesonic/v2.2#43xnsflcadmm1b");

async function checkIfNrWord(userId) {
  const user = await getUserById(userId);

  if (user.plan == "free" && user.nbr_words > 25000)
    throw createError(401, "You have reached you limit as free user!");

  if (user.plan == "starter" && user.nbr_words > 8000)
    throw createError(401, "You have reached you limit as starter user!");

  if (user.plan == "premium" && user.nbr_words > 20000)
    throw createError(401, "You have reached you limit as premium user!");

  if (user.plan == "custom" && user.nbr_words > 100000)
    throw createError(401, "You have reached you limit as custom user!");

  let engine = "";

  switch (user.plan) {
    case "free":
      engine = "good";
      break;
    case "starter":
      engine = "good";
      break;
    case "premium":
      engine = "premium";
      break;
    case "custom":
      engine = "premium";
      break;
    default:
      break;
  }

  return engine;
}

exports.callYoutubeTitleApi = async function (userId, data) {
  sdk.auth(process.env.WRITESONIC_API_KEY);

  let engine = await checkIfNrWord(userId);

  if (!engine) throw createError(401, "engine Failed");

  if (!data) {
    throw createError(401, "Failed to generate the text");
  }
  try {
    const resp = await sdk.youtubeTitles_V2BusinessContentYoutubeTitles_post(
      {
        video_description: data.video_description,
        search_term: data.search_term,
        tone_of_voice: data.tone_of_voice,
      },
      {
        language: data.language,
        num_copies: data.num_copies,
        engine,
      }
    );
    if (resp.data[0].text.length > 0)
      await updateNbrWords({
        userId,
        nbr_words: resp.data[0].text.split(" ").length,
      });
    return resp;
  } catch (err) {
    throw createError(401, err);
  }
};

exports.callParagraphWriterApi = async function (userId, data) {
  sdk.auth(process.env.WRITESONIC_API_KEY);

  let engine = await checkIfNrWord(userId);

  if (!engine) throw createError(401, "engine Failed");

  if (!data) {
    throw createError(401, "Failed to generate the text");
  }

  let str = "";
  try {
    if (data.timeline == 1) {
      const resp =
        await sdk.paragraphWriter_V2BusinessContentParagraphWriter_post(
          {
            paragraph_title: data.video_title,
            tone_of_voice: data.tone_of_voice,
          },
          {
            language: data.language,
            num_copies: data.num_copies,
            engine,
          }
        );
      if (resp.data[0].text.length > 0)
        await updateNbrWords({
          userId,
          nbr_words: resp.data[0].text.split(" ").length,
        });

      str = str + resp.data[0].text;
    } else {
      let newOutline = await youtubeOutline(userId, data);
      const resp =
        await sdk.paragraphWriter_V2BusinessContentParagraphWriter_post(
          {
            paragraph_title: data.video_title,
            tone_of_voice: data.tone_of_voice,
          },
          {
            language: data.language,
            num_copies: data.num_copies,
            engine,
          }
        );
      str = str + resp.data[0].text + "\n";

      let outline = newOutline.data[0].text.split("\n");

      for (let i = 0; i < parseInt(data.timeline) - 1; i++) {
        console.log(outline);
        const resp =
          await sdk.paragraphWriter_V2BusinessContentParagraphWriter_post(
            {
              paragraph_title: outline[i].slice(3),
              tone_of_voice: data.tone_of_voice,
            },
            {
              language: data.language,
              num_copies: data.num_copies,
              engine,
            }
          );
      }
      str = str + resp.data[0].text + "\n";
    }
    console.log(str.split(" ").length);
    return str;
  } catch (err) {
    throw createError(401, err);
  }
};

exports.callTikTokScripter = async function (userId, data) {
  sdk.auth(process.env.WRITESONIC_API_KEY);

  let engine = await checkIfNrWord(userId);

  if (!engine) throw createError(401, "engine Failed");

  if (!data) {
    throw createError(401, "Failed to generate the text");
  }
  try {
    const resp = await sdk.tiktokScripts_V2BusinessContentTiktokScripts_post(
      {
        description: data.description,
      },
      {
        language: data.language,
        num_copies: data.num_copies,
        engine,
      }
    );

    if (resp.data[0].text.length > 0)
      await updateNbrWords({
        userId,
        nbr_words: resp.data[0].text.split(" ").length,
      });

    return resp;
  } catch (err) {
    throw createError(401, err);
  }
};

const callYoutubeIntrosApi = async function (userId, data) {
  let engine = await checkIfNrWord(userId);

  if (!engine) throw createError(401, "engine Failed");

  sdk.auth(process.env.WRITESONIC_API_KEY);

  if (!data) {
    throw createError(401, "Failed to generate the text");
  }

  try {
    const resp = await sdk.youtubeIntros_V2BusinessContentYoutubeIntros_post(
      {
        video_title: data.video_title,
        search_term: data.search_term,
        tone_of_voice: data.tone_of_voice,
      },
      {
        language: data.language,
        num_copies: data.num_copies,
        engine,
      }
    );

    if (resp.data[0].text.length > 0)
      await updateNbrWords({
        userId,
        nbr_words: resp.data[0].text.split(" ").length,
      });

    return resp;
  } catch (err) {
    throw createError(401, err);
  }
};

exports.callYoutubeHooksApi = async function (userId, data) {
  sdk.auth(process.env.WRITESONIC_API_KEY);

  let engine = await checkIfNrWord(userId);

  if (!engine) throw createError(401, "engine Failed");

  if (!data) {
    throw createError(401, "Failed to generate the text");
  }
  try {
    const resp = await sdk.youtubeHooks_V2BusinessContentYoutubeHooks_post(
      {
        video_title: data.video_title,
        tone: data.tone_of_voice,
      },
      {
        language: data.language,
        num_copies: data.num_copies,
        engine,
      }
    );
    if (resp.data[0].text.length > 0)
      await updateNbrWords({
        userId,
        nbr_words: resp.data[0].text.split(" ").length,
      });

    return resp;
  } catch (err) {
    throw createError(401, err);
  }
};

exports.callYoutubeDescriptionsApi = async function (userId, data) {
  sdk.auth(process.env.WRITESONIC_API_KEY);

  let engine = await checkIfNrWord(userId);

  if (!engine) throw createError(401, "engine Failed");

  if (!data) {
    throw createError(401, "Failed to generate the text");
  }
  try {
    const resp =
      await sdk.youtubeDescriptionsV2_V2BusinessContentYoutubeDescriptionsV2_post(
        {
          video_title: data.video_title,
          keywords: data.search_term,
        },
        {
          language: data.language,
          num_copies: data.num_copies,
          engine,
        }
      );
    if (resp.data[0].text.length > 0)
      await updateNbrWords({
        userId,
        nbr_words: resp.data[0].text.split(" ").length,
      });

    return resp;
  } catch (err) {
    throw createError(401, err);
  }
};

exports.callWriteArticleWriter = async function (userId, data) {
  sdk.auth(process.env.WRITESONIC_API_KEY);

  const intro = await callYoutubeIntrosApi(userId, data);

  let newOutline = await youtubeOutline(userId, data);

  let outline = newOutline.data[0].text.split("\n");
  console.log(outline);

  let sections = [];

  for (let i = 0; i < parseInt(data.timeline); i++) {
    sections.push(outline[i].slice(3));
  }

  let engine = await checkIfNrWord(userId);

  if (!engine) throw createError(401, "engine Failed");

  if (!data) {
    throw createError(401, "Failed to generate the text");
  }

  console.log({
    article_sections: sections,
    article_title: data.video_title,
    article_intro: intro.data[0].text,
  });

  try {
    const resp =
      await sdk.aiArticleWriterV3_V2BusinessContentAiArticleWriterV3_post(
        {
          article_sections: sections,
          article_title: data.video_title,
          article_intro: intro.data[0].text,
        },
        {
          language: data.language,
          num_copies: data.num_copies,
          engine,
        }
      );
    if (resp.data.data[0].content.length > 0)
      await updateNbrWords({
        userId,
        nbr_words: resp.data.data[0].content.split(" ").length,
      });

    return resp;
  } catch (err) {
    throw createError(401, err);
  }
};

const youtubeOutline = async function (userId, data) {
  sdk.auth(process.env.WRITESONIC_API_KEY);

  let engine = await checkIfNrWord(userId);

  if (!engine) throw createError(401, "engine Failed");

  if (!data) {
    throw createError(401, "Failed to generate the text");
  }
  try {
    const resp =
      await sdk.youtubeOutlines_V2BusinessContentYoutubeOutlines_post(
        {
          video_title: data.video_title,
          search_term: data.search_term,
          tone_of_voice: data.tone_of_voice,
        },
        {
          language: data.language,
          num_copies: data.num_copies,
          engine,
        }
      );
    if (resp.data[0].text.length > 0)
      await updateNbrWords({
        userId,
        nbr_words: resp.data[0].text.split(" ").length,
      });
    return resp;
  } catch (err) {
    throw createError(401, err);
  }
};

exports.callWriteSonicChat = async function (userId, data) {
  sdk.auth(process.env.WRITESONIC_API_KEY);

  let engine = await checkIfNrWord(userId);

  if (!engine) throw createError(401, "engine Failed");

  if (!data) {
    throw createError(401, "Failed to generate the text");
  }
  try {
    const resp = await sdk.chatsonic_V2BusinessContentChatsonic_post(
      {
        enable_google_results: "true",
        enable_memory: false,
        input_text: data.text,
      },
      {
        engine,
      }
    );
    console.log(resp.data.message);
    if (resp.data.message.length > 0)
      await updateNbrWords({
        userId,
        nbr_words: resp.data.message.split(" ").length,
      });

    return resp;
  } catch (err) {
    throw createError(401, err);
  }
};

/*module.exports = {
  callYoutubeIntrosApi
}*/
