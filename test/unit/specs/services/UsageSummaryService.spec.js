/* eslint no-unused-expressions: 0 */
import moxios from 'moxios'
import sinon from 'sinon'
import UsageSummaryService from '@/services/UsageSummaryService'

describe('UsageSummaryService.js', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })
  describe('getTotalSummary', () => {
    it('should call success function on http 200', (done) => {
      moxios.stubRequest('/api/summary/usage/total', {
        status: 200,
        response: { successful: true, results: [] }
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new UsageSummaryService().getTotalSummary(successFunc, errorFunc)
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
      moxios.stubRequest('/api/summary/usage/total', {
        status: 404
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new UsageSummaryService().getTotalSummary(successFunc, errorFunc)
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
  describe('getHourlySummary', () => {
    it('should call success function on http 200', (done) => {
      moxios.stubRequest('/api/summary/usage/hour', {
        status: 200,
        response: { successful: true, results: [] }
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new UsageSummaryService().getHourlySummary(successFunc, errorFunc)
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
      moxios.stubRequest('/api/summary/usage/hour', {
        status: 404
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new UsageSummaryService().getHourlySummary(successFunc, errorFunc)
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
  describe('getDailySummary', () => {
    it('should call success function on http 200', (done) => {
      moxios.stubRequest('/api/summary/usage/day', {
        status: 200,
        response: { successful: true, results: [] }
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new UsageSummaryService().getDailySummary(successFunc, errorFunc)
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
      moxios.stubRequest('/api/summary/usage/day', {
        status: 404
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new UsageSummaryService().getDailySummary(successFunc, errorFunc)
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
