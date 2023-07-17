const apiUrl 	    = require('@/apiUrl.js')
const axios 	    = require('axios')

module.exports.posPost = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.telegrambot.posPost, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.champeiPointCreate = async function (data) {
    try {
        const response = await axios.post(apiUrl.telegrambot.champeiPointCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.amatakPointCreate = async function (data) {
    try {
        const response = await axios.post(apiUrl.telegrambot.amatakPointCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.totalPointCreate = async function (data) {
    try {
        const response = await axios.post(apiUrl.telegrambot.totalPointCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.madamnomPointCreate = async function (data) {
    try {
        window.console.log(data,'in handler')
        const response = await axios.post(apiUrl.telegrambot.madamnomPointCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.asdaPointCreate = async function (data) {
    try {
        const response = await axios.post(apiUrl.telegrambot.asdaPointCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.klassyPointCreate = async function (data) {
    try {
        const response = await axios.post(apiUrl.telegrambot.klassyPointCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.maju168PointCreate = async function (data) {
    try {
        const response = await axios.post(apiUrl.telegrambot.maju168PointCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}