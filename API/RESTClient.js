const axios = require("axios");
const config = require("../config/config");
const { MESSAGE } = require("../config/constants");

const CoreLayerAPI = ({ url, params = {}, data = {}, method }) => {
    return axios({
        method,
        url: config.coreLayerURL + url,
        data,
        params,
    })
        .then((response) => {
            if (
                response.data.constructor != Array &&
                response.data.length === 0
            )
                return null;
            else return response.data;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
};


module.exports = {
    CoreLayerAPI,
};
