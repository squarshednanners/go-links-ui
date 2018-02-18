import AlertService from '@/services/AlertService'

describe('AlertService.js', () => {
  describe('clearAlerts', () => {
    it('clears all alerts', () => {
      let alerts = [{
        variant: 'danger',
        description: 'alert1'
      }, {
        variant: 'info',
        description: 'alert2'
      }]
      AlertService.clearAlerts(alerts)
      expect(alerts).to.deep.equal([])
    })
  })
  describe('addError', () => {
    it('adds alert with business error description', () => {
      let alerts = []
      AlertService.addError(alerts, { response: { data: { error_description: 'oh no an error!' } } })
      expect(alerts).to.deep.equal([{
        variant: 'danger',
        description: 'oh no an error!'
      }])
    })
    it('falls back to default add error when no error description', () => {
      let alerts = []
      AlertService.addError(alerts, { response: { data: { random_response: 'oh no an error!' } } })
      expect(alerts).to.deep.equal([{
        variant: 'danger',
        description: { response: { data: { random_response: 'oh no an error!' } } }
      }])
    })
    it('falls back to default add error when no data', () => {
      let alerts = []
      AlertService.addError(alerts, { response: { random_response: 'oh no an error!' } })
      expect(alerts).to.deep.equal([{
        variant: 'danger',
        description: { response: { random_response: 'oh no an error!' } }
      }])
    })
    it('adds alert with error message', () => {
      let alerts = []
      AlertService.addError(alerts, new Error('oh no another error!'))
      expect(alerts).to.deep.equal([{
        variant: 'danger',
        description: 'oh no another error!'
      }])
    })
    it('adds alert without error message or description', () => {
      let alerts = []
      AlertService.addError(alerts, { blah: 'unknown error format' })
      expect(alerts).to.deep.equal([{
        variant: 'danger',
        description: { blah: 'unknown error format' }
      }])
    })
  })
  describe('addAlertList', () => {
    it('adds all alerts', () => {
      let alerts = []
      AlertService.addAlertList(alerts, 'info', ['alert1', 'alert2'])
      expect(alerts).to.deep.equal([
        {
          variant: 'info',
          description: 'alert1'
        }, {
          variant: 'info',
          description: 'alert2'
        }
      ])
    })
  })
  describe('addAlert', () => {
    it('adds one alert', () => {
      let alerts = []
      AlertService.addAlert(alerts, 'warning', 'alert1')
      expect(alerts).to.deep.equal([{
        variant: 'warning',
        description: 'alert1'
      }])
    })
  })
})
