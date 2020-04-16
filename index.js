const { Requester, Validator } = require('external-adapter')

const customParams = {
  base: ['base', 'from', 'coin'],
  quote: ['quote', 'to', 'market']
}

const createRequest = (input, callback) => {
  let validator
  try {
    validator = new Validator(input, customParams)
  } catch (error) {
    Requester.errorCallback(input.id, error, callback)
  }
  const jobRunID = validator.validated.id
  const coin = validator.validated.data.base
  const market = validator.validated.data.quote
  const url = `https://rest.coinapi.io/v1/exchangerate/${coin}/${market}`
  const options = {
    url,
    qs: {
      apikey: process.env.API_KEY
    }
  }
  Requester.requestRetry(options)
    .then(response => {
      response.body.result = Requester.validateResult(response.body, ['rate'])
      Requester.successCallback(jobRunID, response.statusCode, response.body, callback)
    })
    .catch(error => {
      Requester.errorCallback(jobRunID, error, callback)
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
