const apiUrl 	    = require('@/apiUrl.js')
const axios 	    = require('axios')

module.exports.eventCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.nlfapp.eventCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.eventGets = async function () {
    try {
        const response = await axios.get(apiUrl.nlfapp.eventGets)
        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.eventGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.nlfapp.eventGet + '/' + id)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.eventDel = async (data) => {
    try {
        const response = await axios.post(apiUrl.nlfapp.eventDel, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// location
module.exports.locationCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.nlfapp.locationCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.locationGets = async function () {
    try {
        const response = await axios.get(apiUrl.nlfapp.locationGets)
        return response
    } catch (error) {
        window.console.log(error)
    }
}
module.exports.locationGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.nlfapp.locationGet + '/' + id)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.locationDel = async (data) => {
    try {
        const response = await axios.post(apiUrl.nlfapp.locationDel, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}