const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')

// GET
module.exports.getReport = async (params) => {
    try {
        const response = await axios.get(apiUrl.variance_analysist_report, params);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}