export default {
  clearAlerts(alerts) {
    alerts.splice(0, alerts.length)
  },
  addError(alerts, e) {
    if (
      e.response &&
      e.response.data &&
      e.response.data.error_description
    ) {
      this.addAlert(alerts, 'danger', e.response.data.error_description)
    } else if (e.message) {
      this.addAlert(alerts, 'danger', e.message)
    } else {
      this.addAlert(alerts, 'danger', e)
    }
  },
  addAlertList(alerts, variant, list) {
    for (let i = 0; i < list.length; i++) {
      this.addAlert(alerts, variant, list[i])
    }
  },
  addAlert(alerts, variant, description) {
    alerts.push({
      variant: variant,
      description: description
    })
  }
}
