import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        wht: [],
        zot: [],
        warehouseSetting: [],
        sectionSetting: [],
        zoneSetting: [],
        rackSetting: [],
        levelSetting: [],
        bin: [],
    },
    mutations: {
        setWht(state, value) {
            state.wht = value
        },
        setZot(state, value) {
            state.zot = value
        },
        setWarehouseSetting(state, value) {
            state.warehouseSetting = value
        },
        setZoneSetting(state, value) {
            state.zoneSetting = value
        },
        setSectionSetting(state, value) {
            state.sectionSetting = value
        },
        setRackSetting(state, value) {
            state.rackSetting = value
        },
        setLevelSetting(state, value) {
            state.levelSetting = value
        },
        setBin(state, value) {
            state.bin = value
        },
        pushWarehouseSetting(state, value) {
            state.warehouseSetting.push(value)
        },
        pushZone(state, value) {
            state.zoneSetting.push(value)
        },
        pushSection(state, value) {
            state.sectionSetting.push(value)
        },
        pushRackSetting(state, value) {
            state.rackSetting.push(value)
        },
        pushLevelSetting(state, value) {
            state.levelSetting.push(value)
        },
        pushBin(state, value) {
            state.bin.push(value)
        }
    },
    getters: {
        getWht: state => {
            return state.wht
        },
        getZot: state => {
            return state.zot
        },
        getWarehouseSetting: state => {
            return state.warehouseSetting
        },
        getZoneSetting: state => {
            return state.zoneSetting
        },
        getSectionSetting: state => {
            return state.sectionSetting
        },
        getRackSetting: state => {
            return state.rackSetting
        },
        getLevelSetting: state => {
            return state.levelSetting
        },
        getBin: state => {
            return state.bin
        }
    }
})

export default store
