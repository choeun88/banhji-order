const axios = require('axios')
const apiUrl = require('../apiUrl.js')
const unknown = require('../api/unknown')

// Gender
module.exports.gender = function () {
    try {
        const gender = unknown.gender
        return gender
    } catch (error) {
        window.console.error(error)
    }
}
// Search
module.exports.search = function () {
    try {
        const response = apiUrl.supplier.supplier_search
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Center
// module.exports.center = async function (supplierTypeId, search) {
//     try {
//         let response = []
//         if (search !== '' && search !== null && search !== 'null') {
//             response = await axios.get(apiUrl.supplier.supplier_center + '/' + supplierTypeId + '/center/' + search)
//             return response
//         } else {
//             response = await axios.get(apiUrl.supplier.supplier_center + '/' + supplierTypeId + '/center')
//             return response
//         }
//     } catch (error) {
//         window.console.error(error)
//     }
// }
module.exports.centerV1 = async function (strFilter = '') {
    try {
        return await axios.post(apiUrl.supplier.supplier_center + '/center', strFilter)
    } catch (error) {
        window.console.error(error)
    }
}
// List
module.exports.list = async function () {
    try {
        const response = await axios.get(apiUrl.supplier.supplier_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.url = function () {
    try {
        return apiUrl.supplier.supplier_center + '/undefined/center'
    } catch (error) {
        window.console.error(error)
    }
}

// GET LIST BY DAWINE
module.exports.getAll = async () => {
    try {
        // const response = await axios.get(apiUrl.supplier.supplier_get);
        const response = await axios.get(apiUrl.supplier.supplier_search);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}
// Get One
module.exports.get = async function (id) {
    try {
        const response = await axios.get(apiUrl.supplier.supplier_getOne + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.supplier.supplier_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Search Dropdown
module.exports.searchVendor = async (strFilter = '') => {
    try {
        const response = await axios.get(apiUrl.supplier.supplier_search + strFilter)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.directory = async function (data) {
    try {
        // const response = await axios.post(apiUrl.supplier.supplier_directory, {
        //     params: {
        //         search: data.search,
        //         type: data.type
        //     }
        // })
        return await axios.post(apiUrl.supplier.supplier_directory, data)
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.importCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.supplier.importCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
//todo: supplier auto number generate
module.exports.lastNumber = async (strFilter) => {
    try {
        return await axios.post(apiUrl.supplier.customer_lastNumber, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

//todo: check supplier has transaction , can be delete
module.exports.hasTxn = async (strFilter) => {
    try {
        return await axios.get(apiUrl.supplier.has_txn + strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

//todo: update status supplier to delete
module.exports.update = async (strFilter) => {
    try {
        return await axios.put(apiUrl.supplier.supplier_put, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}
//todo: Import supplier from excel
module.exports.importSupplierCreate = async (strFilter) => {
    try {
        return await axios.post(apiUrl.supplier.import_supplier, strFilter)
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.supplierDetail = async function (strFilter = '') {
    try {
      return await axios.get(apiUrl.supplier.supplier_detail + strFilter)
    } catch (error) {
      window.console.error(error)
    }
  }