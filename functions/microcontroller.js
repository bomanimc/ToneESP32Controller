const axios = require('axios');

exports.handler = async function(event) {
  const bodyData = JSON.parse(event.body);
  const {ipAddress, binaryColumnData} = bodyData;
  // const requestURL = `http://${ipAddress}/${binaryColumnData}`;
  const requestURL = `tcp://2.tcp.ngrok.io:14834/${binaryColumnData}`;
  console.log(requestURL);

  axios.get(requestURL)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

  return {
    statusCode: 200,
  };
};