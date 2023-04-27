const axios = require('axios')
const apiUrl = require('@/apiUrl.js')
const store = require("@/store/warehouse")
module.exports.getBalance = async (data) => {
    try {
        const response = await axios.get(apiUrl.warehouse.balance_get + data.itmId + '/list', {
            params: {
                'date': data.date,
                'whId': data.whId
            }
        })
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getAllBalance = async (data) => {
    try {
        const response = await axios.get(apiUrl.warehouse.balance_getAll, {
            params: {
                'date': data.date,
                'whId': data.whId
            }
        })
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getTxn = async (data) => {
    try {
        const response = await axios.get(apiUrl.warehouse.txn_get, {
            params: {
                'startDate': data.startDate,
                'endDate': data.endDate
            }
        })
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

// GET LIST Warehouse, Zone, Section, Rack, Level Setting
module.exports.getZotAll = async () => {
    try {
        const response = await axios.get(apiUrl.warehouse.zone_type_get)
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getZonAll = async () => {
    // const api = "http://localhost:3000/dev/v2/warehouse/zone/institute/institute-effdc070-808d-11ea-9131-1d2fe2a803b1/listAll"
    try {
        const response = await axios.get(apiUrl.warehouse.zone_setting_get)

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getWhtAll = async () => {
    try {
        const response = await axios.get(apiUrl.warehouse.wht_get)
        if (store.default.state.wht.length === 0) {
            store.default.commit("setWht", response.data)
        }
        return store.default.getters.getWht
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getWarehouseSettingAll = async () => {
    try {
        const response = await axios.get(apiUrl.warehouse.wh_setting_get)
        return response.data.data //store.default.getters.getWarehouseSetting
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getSectionSettingAll = async () => {
    // const api = "http://localhost:3000/dev/v2/warehouse/section/institute/institute-effdc070-808d-11ea-9131-1d2fe2a803b1/listAll"
    try {
        if (store.default.state.sectionSetting.length === 0) {
            const response = await axios.get(apiUrl.warehouse.section_setting_get)
            store.default.commit("setSectionSetting", response.data.data)
        }
        return store.default.getters.getSectionSetting
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getRackSettingAll = async () => {
    // const api = "http://localhost:3000/dev/v2/warehouse/rack/institute/institute-effdc070-808d-11ea-9131-1d2fe2a803b1/listAll"
    try {
        if (store.default.state.rackSetting.length === 0) {
            const response = await axios.get(apiUrl.warehouse.rack_setting_get)
            store.default.commit("setRackSetting", response.data.data)
        }
        return store.default.getters.getRackSetting
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getLevelSettingAll = async () => {
    // const api = "http://localhost:3000/dev/v2/warehouse/level/institute/institute-effdc070-808d-11ea-9131-1d2fe2a803b1/listAll"
    try {
        if (store.default.state.levelSetting.length === 0) {
            const response = await axios.get(apiUrl.warehouse.level_setting_get)
            store.default.commit("setLevelSetting", response.data.data)
        }
        return store.default.getters.getLevelSetting
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getBin = async () => {
    try {
        if (store.default.state.bin.length === 0) {
            const response = await axios.get(apiUrl.warehouse.bin_get)
            store.default.commit("setBin", response.data.data)
        }
        return store.default.getters.getBin
    } catch (error) {
        window.console.error(error)
    }
}
//
// //SAVE Warehouse, Zone, Section, Rack, Level Setting
module.exports.saveWarehouseSetting = async (data) => {
    try {
        return await axios.post(apiUrl.warehouse.wh_setting_post, data)
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.updateWarehouse = async (id, data) => {
    try {
        return await axios.put(apiUrl.warehouse.wh_setting_put + id, data)
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.updateZone = async (id, data) => {
    try {
        return await axios.put(apiUrl.warehouse.zone_setting_put + id, data)
    } catch (err) {
        window.console.log(err)
    }
}
module.exports.updateSection = async (id, data) => {
    try {
        return await axios.put(apiUrl.warehouse.section_setting_put + id, data)
    } catch (err) {
        window.console.log(err)
    }
}
module.exports.updateRack = async (id, data) => {
    try {
        return await axios.put(apiUrl.warehouse.rack_setting_put + id, data)
    } catch (err) {
        window.console.log(err)
    }
}
module.exports.updateLevel = async (id, data) => {
    try {
        return await axios.put(apiUrl.warehouse.level_setting_put + id, data)
    } catch (err) {
        window.console.log(err)
    }
}

module.exports.saveZoneSetting = async (data) => {
    // const api = "http://localhost:3000/dev/v2/warehouse/zone/institute/institute-effdc070-808d-11ea-9131-1d2fe2a803b1/add"
    try {
        store.default.commit("pushZone", data)
        return await axios.post(apiUrl.warehouse.zone_setting_post, data)
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.saveSectionSetting = async (data) => {
    // const api = "http://localhost:3000/dev/v2/warehouse/section/institute/institute-effdc070-808d-11ea-9131-1d2fe2a803b1/add"
    try {
        store.default.commit("pushSection", data)
        return await axios.post(apiUrl.warehouse.section_setting_post, data)
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.saveRackSetting = async (data) => {
    // const api = "http://localhost:3000/dev/v2/warehouse/rack/institute/institute-effdc070-808d-11ea-9131-1d2fe2a803b1/add"
    try {
        store.default.commit("pushRackSetting", data)
        return await axios.post(apiUrl.warehouse.rack_setting_post, data)
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.saveLevelSetting = async (data) => {
    // const api = "http://localhost:3000/dev/v2/warehouse/level/institute/institute-effdc070-808d-11ea-9131-1d2fe2a803b1/add"
    try {
        store.default.commit("pushLevelSetting", data)
        return await axios.post(apiUrl.warehouse.level_setting_post, data)
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.saveBin = async (data) => {
    try {
        store.default.commit("pushBin", data)
        return await axios.post(apiUrl.warehouse.bin_post, data)
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.saveItem = async (data) => {
    try {
        return await axios.post(apiUrl.warehouse.item_post, data)
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getItem = async () => {
    try {
        const resp = await axios.get(apiUrl.warehouse.item_get)
        return resp.data.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.addItemLine = async (txnId, data) => {
    try {
        return  await axios.post(apiUrl.warehouse.itemline_add + txnId + '/add', data)
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.checkNumber = async (whId, num, itmId) => {
    try {
        let data = {
            whId: whId,
            itemId: itmId,
            number: num
        }
        return  await axios.post(apiUrl.warehouse.checknumber, data)
    } catch (error) {
        window.console.error(error)
    }
}
