const axios = require('axios')
const apiUrl = require('@/apiUrl.js')

// GET JOURNAL REPORT
module.exports.getJournalReport = async (params) => {
	try {
		const response = await axios.get(apiUrl.journal_report_get, params);

		return response;
	} catch (error) {
		window.console.error(error);
	}
}