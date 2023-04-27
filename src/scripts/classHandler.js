const axios = require('axios');
const apiUrl = require('@/apiUrl.js');

// GET LIST
module.exports.getAll = async () => {
    try {
        const response = await axios.get(apiUrl.setting.class_get, {
            params: {
                type: "class_item",
                clazzId: "",
                classTypeId: "",
                classGroupId: "",
            }
        });
        
        return response;
    } catch (error) {
        window.console.error(error)
    }
}