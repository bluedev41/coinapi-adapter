const request = require('request')

const createRequest = (input, callback) => {
  let url = 'https://rest.coinapi.io/v1/exchangerate/'
  const coin = input.data.coin || 'ETH'
  const market = input.data.market || 'USD'
  url = url + coin + '/' + market
  let options = {
    url: url,
    qs: {
      apikey: process.env.API_KEY
    },
    json: true
  }
  request(options, (error, response, body) => {
    if (error || response.statusCode >= 400 || body.error) {
      callback(response.statusCode, {
        jobRunID: input.id,
        status: 'errored',
        error: body,
        errorMessage: body.error,
        statusCode: response.statusCode
      })
    } else {
      const result = body.rate
      body.result = result
      callback(response.statusCode, {
        jobRunID: input.id,
        data: body,
        result: result,
        statusCode: response.statusCode
      })
    }
  })
}

exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data)
  })
}

exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data)
  })
}

exports.handlerv2 = (event, context, callback) => {
  createRequest(JSON.parse(event.body), (statusCode, data) => {
    callback(null, {
      statusCode: statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false
    })
  })
}

module.exports.createRequest = createRequest
