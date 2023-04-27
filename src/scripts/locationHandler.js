const axios = require('axios')
const apiUrl = require('@/apiUrl.js')

// GET LIST
module.exports.list = async function (status) {
  try {
    let st = status != undefined ? status : ''
    const response = await axios.get(apiUrl.setting.location_get + `?status=${st}`)

    return response
  } catch (error) {
    window.console.error(error)
  }
}
// GET LIST (BY DAWINE)
module.exports.getAll = async (status) => {
  try {
    let st = status !== undefined ? status : ''
    const response = await axios.get(apiUrl.setting.location_get + `?status=${st}`)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

// save
module.exports.create = async (data) => {
  try {
    const response = await axios.post(apiUrl.setting.location_post, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.locationType = async function (status) {
  try {
    let st = status != undefined ? status : ''
    const response = await axios.get(apiUrl.setting.location_type_get + `?status=${st}`)

    return response
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.defaultNature = async function () {
  return [
    {
      id: 'nature-default-1',
      name: 'Cost Center',
      name_local: 'Cost Center',
      description: 'The management of costs'
    },
    {
      id: 'ature-default-2',
      name: 'Revenue Center',
      name_local: 'Revenue Center',
      description: 'The management of revenues'
    },
    {
      id: 'ature-default-3',
      name: 'Profit Center',
      name_local: 'Profit Center',
      description: 'The management of both costs and revenues'
    },
    {
      id: 'ature-default-4',
      name: 'Investment Center',
      name_local: 'Investment Center',
      description: 'The management over costs, revenues and assets'
    }
  ]
}

module.exports.createLocationType = async (data) => {
  try {
    const response = await axios.post(apiUrl.setting.location_type_post, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}
