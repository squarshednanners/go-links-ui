/* eslint no-unused-expressions: 0 */
import moxios from 'moxios'
import sinon from 'sinon'
import LogService from '@/services/LogService'

describe('LogService.js', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })
  describe('getAllLogs', () => {
    it('should call success function on http 200', (done) => {
      moxios.stubRequest('/api/log/action/all?sortDirection=DESC', {
        status: 200,
        response: { successful: true, results: [] }
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new LogService().getAllLogs(successFunc, errorFunc)
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        expect(request.config.method).to.equal('get')
        expect(successFunc.calledOnce).to.be.true
        expect(errorFunc.called).to.be.false
        expect(successFunc.getCall(0).args[0].data).to.deep.equal({ successful: true, results: [] })
        done()
      })
    })
    it('should call error function on http error', (done) => {
      moxios.stubRequest('/api/log/action/all?sortDirection=DESC', {
        status: 404
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new LogService().getAllLogs(successFunc, errorFunc)
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        expect(request.config.method).to.equal('get')
        expect(successFunc.called).to.be.false
        expect(errorFunc.calledOnce).to.be.true
        expect(errorFunc.getCall(0).args[0].message).to.equal('Request failed with status code 404')
        done()
      })
    })
  })
})
