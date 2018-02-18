/* eslint no-unused-expressions: 0 */
import moxios from 'moxios'
import sinon from 'sinon'
import UserService from '@/services/UserService'

describe('UserService.js', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })
  describe('getAllUsers', () => {
    it('should call success function on http 200', (done) => {
      moxios.stubRequest('/api/user/all', {
        status: 200,
        response: { successful: true, results: [] }
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new UserService().getAllUsers(successFunc, errorFunc)
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
      moxios.stubRequest('/api/user/all', {
        status: 404
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new UserService().getAllUsers(successFunc, errorFunc)
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
  describe('deleteUser', () => {
    it('should call success function on http 200', (done) => {
      moxios.stubRequest('/api/user/delete?username=test@test.com', {
        status: 200,
        response: { successful: true, results: [] }
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new UserService().deleteUser('test@test.com', successFunc, errorFunc)
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
      moxios.stubRequest('/api/user/delete?username=test@test.com', {
        status: 404
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new UserService().deleteUser('test@test.com', successFunc, errorFunc)
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
  describe('activateUser', () => {
    it('should call success function on http 200', (done) => {
      moxios.stubRequest('/api/user/activate?username=test@test.com&active=true', {
        status: 200,
        response: { successful: true, results: [] }
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new UserService().activateUser('test@test.com', true, successFunc, errorFunc)
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
      moxios.stubRequest('/api/user/activate?username=test@test.com&active=false', {
        status: 404
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new UserService().activateUser('test@test.com', false, successFunc, errorFunc)
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
  describe('addRole', () => {
    it('should call success function on http 200', (done) => {
      moxios.stubRequest('/api/user/addRole?username=test@test.com&role=FAKEROLE', {
        status: 200,
        response: { successful: true, results: [] }
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new UserService().addRole('test@test.com', 'FAKEROLE', successFunc, errorFunc)
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
      moxios.stubRequest('/api/user/addRole?username=test@test.com&role=FAKEROLE', {
        status: 404
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new UserService().addRole('test@test.com', 'FAKEROLE', successFunc, errorFunc)
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
  describe('changePassword', () => {
    it('should call success function on http 200', (done) => {
      moxios.stubRequest('/api/user/changePassword?password=newpass', {
        status: 200,
        response: { successful: true, results: [] }
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new UserService().changePassword('newpass', successFunc, errorFunc)
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
      moxios.stubRequest('/api/user/changePassword?password=newpass', {
        status: 404
      })
      let successFunc = sinon.spy()
      let errorFunc = sinon.spy()
      new UserService().changePassword('newpass', successFunc, errorFunc)
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
