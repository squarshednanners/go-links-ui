// import Vue from 'vue'
import Logs from '@/components/logs/Logs'

describe('Logs.vue', () => {
  // it('should render correct contents', () => {
  //   const Constructor = Vue.extend(HelloWorld)
  //   const vm = new Constructor().$mount()
  //   expect(vm.$el.querySelector('.hello h1').textContent)
  //   .to.equal('Welcome to Your Vue.js App')
  // })
  it('has a mounted hook', () => {
    expect(typeof Logs.mounted).to.equal('function')
  })
  it('should define default data', () => {
    expect(Logs.data()).to.deep.equal({
      logTable: {
        fields: [
          { key: 'username', sortable: true },
          { key: 'linkName', sortable: true },
          { key: 'time', sortable: true },
          'action'
        ],
        data: [],
        filter: null,
        currentCount: 0,
        currentPage: 1
      },
      alerts: [],
      isLoading: false
    })
  })
})
