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

  if (user.plan == "premuim" && user.nbr_words > 20000)
    throw createError(401, "You have reached you limit as premium user!");

  if (user.plan == "custom" && user.nbr_words > 100000)
    throw createError(401, "You have reached you limit as custom user!");

  let engine = "";

  switch (user.plan) {
    case "free":
      engine = "economy";
      break;
    case "starter":
      engine = "good";
      break;
    case "premuim":
      engine = "premuim";
      break;
    case "custom":
      engine = "custom";
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
      await updateNbrWords({ userId, nbr_words: resp.data[0].text.length });
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

  try {
    const resp =
      await sdk.paragraphWriter_V2BusinessContentParagraphWriter_post(
        {
          paragraph_title: data.video_title,
          tone_of_voice: data.tone_of_voice,
        },
        {
          language: data.language,
          num_copies: data.num_copies,
        }
      );
    if (resp.data[0].text.length > 0)
      await updateNbrWords({ userId, nbr_words: resp.data[0].text.length });

    return resp;
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
      }
    );

    if (resp.data[0].text.length > 0)
      await updateNbrWords({ userId, nbr_words: resp.data[0].text.length });

    return resp;
  } catch (err) {
    throw createError(401, err);
  }
};

exports.callYoutubeIntrosApi = async function (userId, data) {
  let engine = await checkIfNrWord(userId);
  console.log(data);

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
      }
    );

    if (resp.data[0].text.length > 0)
      await updateNbrWords({ userId, nbr_words: resp.data[0].text.length });

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
      }
    );
    if (resp.data[0].text.length > 0)
      await updateNbrWords({ userId, nbr_words: resp.data[0].text.length });

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
        }
      );
    if (resp.data[0].text.length > 0)
      await updateNbrWords({ userId, nbr_words: resp.data[0].text.length });

    return resp;
  } catch (err) {
    throw createError(401, err);
  }
};
