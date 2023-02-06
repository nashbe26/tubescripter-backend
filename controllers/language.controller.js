const geoip = require('fast-geoip');
const asyncHandler = require('express-async-handler');
const requestIp = require('request-ip');

const getLanguage = asyncHandler(async (req, res) => {
    const clientIp = requestIp.getClientIp(req); 
    
    const geo = await geoip.lookup("207.97.227.239");

    let data

    if(geo.country == "FR" || geo.country == "BE" || geo.country == "CH" || geo.country == "CA")
        data = {language:"fr"}
    else
        data = {language:"en"}

    res.status(200).json(data)
});

module.exports = {
    getLanguage
}