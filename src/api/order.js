
const url = 'https://6u53t680lh.execute-api.ap-southeast-1.amazonaws.com/dev/'

module.exports = {
    eventCreate                                : url + 'event/add',
    eventGet                                   : url + 'event/get',
    eventGets                                  : url + 'event/list',
    eventDel                                   : url + 'event/del',
    locationCreate                             : url + 'location/add',
    locationGet                                : url + 'location/get',
    locationGets                               : url + 'location/list',
    locationDel                                : url + 'location/del',
}