const myUrl = require("@/url")
const baseUrl = myUrl.url
const url = baseUrl + '/telegrambot/'

module.exports = {
    posPost                                 : url + 'telegram/banhji/post',
    champeiPointCreate                      : url + 'telegram/champei/post',
    amatakPointCreate                       : url + 'telegram/amatak/post',
    totalPointCreate : url + 'telegram/totalenergy/post',
    madamnomPointCreate : url + 'telegram/madamnom/post',
    asdaPointCreate : url + 'telegram/asda/post',
    klassyPointCreate : url + 'telegram/klassy/post',
    maju168PointCreate :url + 'telegram/majuwatphnom/post',
}
