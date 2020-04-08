const assert = require('chai').assert
const createRequest = require('../index.js').createRequest

describe('createRequest', () => {

  context('when requesting the price', () => {
    const jobID = '278c97ffadb54a5bbb93cfec5f7b5503'
    const req = {
      id: jobID,
      data: {
        coin: 'DAI',
        market: 'USD'
      }
    }

    it('returns data to the node', (done) => {
      createRequest(req, (statusCode, data) => {
        assert.equal(statusCode, 200)
        assert.equal(data.jobRunID, jobID)
        assert.isNotEmpty(data.data)
        assert.isNumber(data.data.result)
        assert.isNumber(data.result)
        done()
      })
    })
  })

  context('when leaving coin and market unspecified', () => {
    const jobID = '278c97ffadb54a5bbb93cfec5f7b5504'
    const req = {
      id: jobID,
      data: {}
    }

    it('returns an error to the node', (done) => {
      createRequest(req, (statusCode, data) => {
        assert.isAbove(statusCode, 400)
        assert.equal(data.jobRunID, jobID)
        assert.isNotEmpty(data.error)
        assert.equal(data.status, 'errored')
        done()
      })
    })
  })

  context('when a bad request is sent', t => {
    const jobID = '278c97ffadb54a5bbb93cfec5f7b5505'
    const req = {
      id: jobID,
      data: {
        coin: 'notreal',
        market: 'notreal'
      }
    }

    it('returns an error to the node', (done) => {
      createRequest(req, (statusCode, data) => {
        assert.isAbove(statusCode, 400)
        assert.equal(data.jobRunID, jobID)
        assert.isNotEmpty(data.error)
        done()
      })
    })
  })
})
