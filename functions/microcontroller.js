const axios = require('axios');

exports.handler = async function(event) {
  const bodyData = JSON.parse(event.body);
  const {ipAddress, binaryColumnData} = bodyData;

  axios.get(`http://${ipAddress}/${binaryColumnData}`)
    .catch((error) => console.log(error));

  return {
    statusCode: 200,
  };
};