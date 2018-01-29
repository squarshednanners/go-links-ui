<template>
  <b-container style="max-width: 97%;">
    <b-row>
      <b-col>
        <div v-if="alerts.length">
          <br />
          <div v-for="alert of alerts" v-bind:key="alert.description">
            <b-alert v-if="alert.variant === 'primary'" dismissible variant="primary" show>{{alert.description}}</b-alert>
            <b-alert v-if="alert.variant === 'secondary'" dismissible variant="secondary" show>{{alert.description}}</b-alert>
            <b-alert v-if="alert.variant === 'success'" dismissible variant="success" show>{{alert.description}}</b-alert>
            <b-alert v-if="alert.variant === 'danger'" dismissible variant="danger" show>{{alert.description}}</b-alert>
            <b-alert v-if="alert.variant === 'warning'" dismissible variant="warning" show>{{alert.description}}</b-alert>
            <b-alert v-if="alert.variant === 'info'" dismissible variant="info" show>{{alert.description}}</b-alert>
            <b-alert v-if="alert.variant === 'light'" dismissible variant="light" show>{{alert.description}}</b-alert>
            <b-alert v-if="alert.variant === 'dark'" dismissible variant="dark" show>{{alert.description}}</b-alert>
          </div>
        </div>
      </b-col>
    </b-row>
    <br />
    <b-row>
      <b-col cols="8">
        <span style="text-align: center;">
          <h3>Top 25 Links</h3>
        </span>
        <div v-if="totalSummary.isLoading">
          <div class="inlineLoader">
            <div class="orbit-spinner">
              <div class="orbit"></div>
              <div class="orbit"></div>
              <div class="orbit"></div>
            </div>
            Loading Top Links
          </div>
        </div>
        <div v-if="!totalSummary.isLoading">
          <bar-chart :chart-data="charts.topUsed" :options="defaultChartOptions" :height="600"></bar-chart>
        </div>
      </b-col>
      <b-col cols="4">
        <span style="text-align: center;">
          <h3>All Used Links</h3>
        </span>
        <div v-if="totalSummary.isLoading">
          <div class="inlineLoader">
            <div class="orbit-spinner">
              <div class="orbit"></div>
              <div class="orbit"></div>
              <div class="orbit"></div>
            </div>
            Loading Used Links
          </div>
        </div>
        <div v-if="!totalSummary.isLoading">
          <b-row>
            <b-col cols="5">
              <b-form-input v-model="sortedLinkTable.filter" type="text" placeholder="Link Filter"></b-form-input>
            </b-col>
            <b-col>
              <b-pagination v-model="sortedLinkTable.currentPage" :per-page="10" :total-rows="sortedLinkTable.currentCount" align="right" size="md"></b-pagination>
            </b-col>
          </b-row>
          <b-table dark striped hover bordered :items="totalSummary.sortedLinkCountData" :fields="sortedLinkTable.fields" :current-page="sortedLinkTable.currentPage" :per-page="10" :filter="sortedLinkTable.filter" @filtered="onFiltered">
          </b-table>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="totalSummary.rawData">
      <b-col offset="5">
        <i>* data derived from usage since {{totalSummary.rawData.startTime | date}}</i>
      </b-col>
    </b-row>
    <br />
    <b-row>
      <b-col offset="11">
        <switches v-model="hourlyEnabled" theme="bootstrap" color="danger" text-enabled="Hourly" text-disabled="Daily"></switches>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <span v-if="hourlyEnabled">
          <span style="text-align: center;">
            <h3>Usage By Hour</h3>
          </span>
          <div v-if="hourlySummary.isLoading">
            <div class="inlineLoader">
              <div class="orbit-spinner">
                <div class="orbit"></div>
                <div class="orbit"></div>
                <div class="orbit"></div>
              </div>
              Loading Hourly Summary
            </div>
          </div>
          <div v-if="!hourlySummary.isLoading">
            <hourly-chart :chart-data="charts.hourlyUsage" :options="defaultChartOptions" :height="600"></hourly-chart>
          </div>
        </span>
        <span v-if="!hourlyEnabled">
          <span style="text-align: center;">
            <h3>Usage By Day</h3>
          </span>
          <div v-if="dailySummary.isLoading">
            <div class="inlineLoader">
              <div class="orbit-spinner">
                <div class="orbit"></div>
                <div class="orbit"></div>
                <div class="orbit"></div>
              </div>
              Loading Daily Summary
            </div>
          </div>
          <div v-if="!dailySummary.isLoading">
            <daily-chart :chart-data="charts.dailyUsage" :options="defaultChartOptions" :height="600"></daily-chart>
          </div>
        </span>
      </b-col>
    </b-row>
    <br />
  </b-container>
</template>

<script>
import UsageSummaryService from '@/services/UsageSummaryService'
import moment from 'moment'
import Switches from 'vue-switches'
import BarChart from '@/charts/HorizontalBarChart'
import LineChart from '@/charts/LineChart'
const summaryService = new UsageSummaryService()
export default {
  components: {
    BarChart,
    'hourly-chart': LineChart,
    'daily-chart': LineChart,
    Switches
  },
  data() {
    return {
      charts: { topUsed: null, hourlyUsage: null, dailyUsage: null },
      totalSummary: {
        isLoading: false,
        rawData: null,
        sortedLinkCountData: null
      },
      dailySummary: {
        isLoading: false,
        rawData: null
      },
      hourlySummary: {
        isLoading: false,
        rawData: null
      },
      sortedLinkTable: {
        fields: [
          { key: '0', sortable: true, label: 'Link Name' },
          { key: '1', sortable: true, label: 'Times Used' }
        ],
        filter: null,
        currentCount: 0,
        currentPage: 1
      },
      hourlyEnabled: false,
      alerts: [],
      defaultChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        legend: { display: false, position: 'bottom' }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fetchTotalSummary()
      this.fetchDailySummary()
      this.fetchHourlySummary()
    })
  },
  methods: {
    fetchTotalSummary() {
      this.totalSummary.isLoading = true
      summaryService.getTotalSummary(response => {
        this.parseSummaryResults(this.totalSummary, response)
        if (response.data.successful) {
          this.totalSummary.sortedLinkCountData = this.reverseSortNumericList(
            this.totalSummary.rawData.linkCountMap
          )
          this.charts.topUsed = this.buildTopUsedChart(
            this.totalSummary.sortedLinkCountData
          )
        }
        this.totalSummary.isLoading = false
      }, this.parseError)
    },
    fetchDailySummary() {
      this.dailySummary.isLoading = true
      summaryService.getDailySummary(response => {
        this.parseSummaryResults(this.dailySummary, response)
        if (response.data.successful) {
          this.charts.dailyUsage = this.buildUsageCountChart(
            this.dailySummary.rawData,
            this.$options.filters.date
          )
        }
        this.dailySummary.isLoading = false
      }, this.parseError)
    },
    fetchHourlySummary() {
      this.hourlySummary.isLoading = true
      summaryService.getHourlySummary(response => {
        this.parseSummaryResults(this.hourlySummary, response)
        if (response.data.successful) {
          this.charts.hourlyUsage = this.buildUsageCountChart(
            this.hourlySummary.rawData,
            this.$options.filters.time
          )
        }
        this.hourlySummary.isLoading = false
      }, this.parseError)
    },
    parseSummaryResults(summary, response) {
      if (response.data.successful) {
        summary.rawData = response.data.results
      } else {
        this.$alert.addAlertList(
          this.alerts,
          'danger',
          response.data.messageList
        )
      }
    },
    parseError(e) {
      this.$alert.addError(this.alerts, e)
    },
    buildTopUsedChart(sortedLinkCountData) {
      const chartData = this.getChartData()
      const maxNumLinks = 25
      for (let i = 0; i < maxNumLinks && i < sortedLinkCountData.length; i++) {
        chartData.labels.push(sortedLinkCountData[i][0])
        chartData.datasets[0].data.push(sortedLinkCountData[i][1])
      }
      return chartData
    },
    buildUsageCountChart(rawData, filter) {
      const chartData = this.getChartData()
      for (let i = 0; i < rawData.length; i++) {
        chartData.labels.push(filter(rawData[i].startTime))
        chartData.datasets[0].data.push(rawData[i].totalCount)
      }
      return chartData
    },
    getChartData() {
      return {
        labels: [],
        datasets: [
          {
            label: 'Times Used',
            data: [],
            backgroundColor: '#f87979'
          }
        ]
      }
    },
    reverseSortNumericList(obj) {
      const sortable = []
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) sortable.push([key, obj[key]])
      }
      sortable.sort((a, b) => {
        return b[1] - a[1]
      })
      return sortable // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
    },
    onFiltered(filteredItems) {
      this.sortedLinkTable.currentCount = filteredItems.length
      this.sortedLinkTable.currentPage = 1
    }
  },
  filters: {
    time(value) {
      return moment(value).format('MM/DD/YY HH:mm')
    },
    date(value) {
      return moment(value).format('MM/DD/YY')
    }
  }
}
</script>
