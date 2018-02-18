/* eslint no-unused-expressions: 0 */
import moxios from 'moxios'
import sinon from 'sinon'
import LinkService from '@/services/LinkService'

describe('LinkService.js', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })
  describe('getAllLinks', () => {
    it('should call success function on http 200', (done) => {
      moxios.stubRequest('/api/go/all', {
        status: 200,
        response: { successful: true, results: [] }
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new LinkService().getAllLinks(successFunc, errorFunc)
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
      moxios.stubRequest('/api/go/all', {
        status: 404
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new LinkService().getAllLinks(successFunc, errorFunc)
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
  describe('createLink', () => {
    it('should call success function on http 200', (done) => {
      moxios.stubRequest('/api/go/create', {
        status: 200,
        response: { successful: true, results: [] }
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      const createLinkData = {
        name: 'test',
        url: 'http://test.com',
        parameter: { name: 'a', type: 'NAMED' }
      }
      new LinkService().createLink(createLinkData, successFunc, errorFunc)
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        expect(request.config.method).to.equal('post')
        expect(JSON.parse(request.config.data)).to.deep.equal(createLinkData)
        expect(successFunc.calledOnce).to.be.true
        expect(errorFunc.called).to.be.false
        expect(successFunc.getCall(0).args[0].data).to.deep.equal({ successful: true, results: [] })
        done()
      })
    })
    it('should call error function on http error', (done) => {
      moxios.stubRequest('/api/go/create', {
        status: 404
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      const createLinkData = {
        name: 'test',
        url: 'http://test.com',
        parameter: { name: 'a', type: 'NAMED' }
      }
      new LinkService().createLink(createLinkData, successFunc, errorFunc)
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        expect(request.config.method).to.equal('post')
        expect(JSON.parse(request.config.data)).to.deep.equal(createLinkData)
        expect(successFunc.called).to.be.false
        expect(errorFunc.calledOnce).to.be.true
        expect(errorFunc.getCall(0).args[0].message).to.equal('Request failed with status code 404')
        done()
      })
    })
  })
  describe('deleteLink', () => {
    it('should call success function on http 200', (done) => {
      moxios.stubRequest('/api/go/delete?name=test', {
        status: 200,
        response: { successful: true, results: [] }
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new LinkService().deleteLink('test', successFunc, errorFunc)
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        expect(request.config.method).to.equal('delete')
        expect(successFunc.calledOnce).to.be.true
        expect(errorFunc.called).to.be.false
        expect(successFunc.getCall(0).args[0].data).to.deep.equal({ successful: true, results: [] })
        done()
      })
    })
    it('should call error function on http error', (done) => {
      moxios.stubRequest('/api/go/delete?name=test', {
        status: 404
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new LinkService().deleteLink('test', successFunc, errorFunc)
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        expect(request.config.method).to.equal('delete')
        expect(successFunc.called).to.be.false
        expect(errorFunc.calledOnce).to.be.true
        expect(errorFunc.getCall(0).args[0].message).to.equal('Request failed with status code 404')
        done()
      })
    })
  })
  describe('searchLinks', () => {
    it('should call success function on http 200', (done) => {
      moxios.stubRequest('/api/go/search', {
        status: 200,
        response: { successful: true, results: [] }
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new LinkService().searchLinks('test', successFunc, errorFunc)
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        expect(request.config.method).to.equal('post')
        expect(request.config.data).to.equal('test')
        expect(request.config.headers['Content-Type']).to.equal('text/plain')
        expect(successFunc.calledOnce).to.be.true
        expect(errorFunc.called).to.be.false
        expect(successFunc.getCall(0).args[0].data).to.deep.equal({ successful: true, results: [] })
        done()
      })
    })
    it('should call error function on http error', (done) => {
      moxios.stubRequest('/api/go/search', {
        status: 404
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new LinkService().searchLinks('test', successFunc, errorFunc)
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        expect(request.config.method).to.equal('post')
        expect(request.config.data).to.equal('test')
        expect(request.config.headers['Content-Type']).to.equal('text/plain')
        expect(successFunc.called).to.be.false
        expect(errorFunc.calledOnce).to.be.true
        expect(errorFunc.getCall(0).args[0].message).to.equal('Request failed with status code 404')
        done()
      })
    })
  })
})
