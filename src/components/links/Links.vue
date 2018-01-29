<template>
  <b-container>
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
    <b-row>
      <b-col>
        <div v-if="isLoading">
          <div class="loader">
            <div class="orbit-spinner">
              <div class="orbit"></div>
              <div class="orbit"></div>
              <div class="orbit"></div>
            </div>
            Please Wait
          </div>
        </div>
        <div v-if="!isLoading">
          <br />
          <b-row>
            <b-col>
              <span style="font-weight: bold; font-size: large;">Links</span>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col xs="12" sm="3" md="2" lg="1">
              <span v-if="linkTable.currentCount !== linkTable.data.length">{{linkTable.currentCount}}/</span>{{linkTable.data.length}}&nbsp;Link(s)</b-col>
            <b-col xs="12" sm="6" md="5" lg="4">
              <b-form-input v-model="linkTable.filter" type="text" placeholder="Link Filter"></b-form-input>
            </b-col>
            <b-col xs="12" sm="3" md="2" lg="1">
              <b-btn variant="primary" size="sm" v-on:click="clearAll()">Clear</b-btn>
            </b-col>
            <b-col xs="12" sm="4" md="3" lg="2">
              <b-form-checkbox id="displayParamsCheckbox" v-model="linkTable.displayParams">
                Show Params
              </b-form-checkbox>
            </b-col>
            <b-col xs="12" sm="8" md="12" lg="4">
              <b-pagination v-model="linkTable.currentPage" :per-page="10" :total-rows="linkTable.currentCount" align="right" size="md"></b-pagination>
            </b-col>
          </b-row>
          <form>
            <b-table dark striped hover bordered foot-clone :items="linkTable.data" :fields="linkTable.fields" :current-page="linkTable.currentPage" :per-page="10" :filter="linkTable.filter" @filtered="onFiltered">
              <template slot="name" slot-scope="data">
                {{data.value}}
                <span style="float:right;">
                  <b-link v-b-tooltip.hover title="Copy" v-clipboard:copy="generateGoLinkUrl(data.value)" size="sm">
                     <font-awesome-icon :icon="icon" />
                  </b-link>
                </span>
              </template>
              <template slot="url" slot-scope="data">
                <a v-bind:href="data.item.url" target="_blank">{{data.item.url}}</a>
              </template>
              <template slot="parameter" slot-scope="data">
                <span v-if="data.value">{{data.value.type | camel}}: {{data.value.name}}</span>
              </template>
              <template slot="action" slot-scope="data">
                <b-btn variant="danger" size="sm" v-on:click="deleteLink(data.item)">Delete Link</b-btn>
              </template>
              <template slot="FOOT_name" slot-scope="data">
                <b-form-input @click.stop @click.native.stop v-model="createLinkInput.name" type="text" placeholder="Link Name"></b-form-input>
              </template>
              <template slot="FOOT_url" slot-scope="data">
                <b-form-input v-model="createLinkInput.url" type="text" placeholder="Link URL"></b-form-input>
              </template>
              <template slot="FOOT_parameter" slot-scope="data">
                <b-row>
                  <b-col>
                    <b-form-select v-model="createLinkInput.parameter.type">
                      <option :value="null">Param Type</option>
                      <option value="NAMED">Named</option>
                      <option value="PATH">Path</option>
                      <option value="PROVIDED">Provided</option>
                    </b-form-select>
                  </b-col>
                  <b-col>
                    <b-form-input v-model="createLinkInput.parameter.name" type="text" placeholder="Param Name"></b-form-input>
                  </b-col>
                </b-row>
              </template>
              <template slot="FOOT_action" slot-scope="data">
                <b-btn variant="primary" size="sm" v-on:click="createLink()" type="submit">Create Link</b-btn>
              </template>
            </b-table>
          </form>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LinkService from '@/services/LinkService'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faCopy from '@fortawesome/fontawesome-free-solid/faCopy'
const linkService = new LinkService()
export default {
  components: { FontAwesomeIcon },
  data() {
    return {
      background: {
        default: '#ffffff'
      },
      linkTable: {
        fields: [
          { key: 'name', sortable: true },
          { key: 'url', label: 'URL' },
          {
            key: 'parameter',
            label: 'Parameter',
            tdClass: 'hideColumn',
            thClass: 'hideColumn'
          },
          'action'
        ],
        data: [],
        filter: null,
        currentCount: 0,
        currentPage: 1,
        displayParams: false
      },
      createLinkInput: {
        name: null,
        url: null,
        parameter: { name: null, type: null }
      },
      alerts: [],
      isLoading: false
    }
  },
  mounted() {
    this.linkTable.filter = this.$route.query.name
    this.$nextTick(() => {
      this.getLinks()
    })
  },
  computed: {
    displayParams() {
      return this.linkTable.displayParams
    },
    icon() {
      return faCopy
    }
  },
  watch: {
    displayParams() {
      this.toggleParamColumns()
    }
  },
  methods: {
    getLinks() {
      this.isLoading = true
      this.$alert.clearAlerts(this.alerts)
      linkService.getAllLinks(
        response => {
          if (response.data.successful) {
            this.$alert.addAlertList(
              this.alerts,
              'info',
              response.data.messageList
            )
            this.linkTable.data = response.data.results
          } else {
            this.$alert.addAlertList(
              this.alerts,
              'danger',
              response.data.messageList
            )
          }
          this.isLoading = false
        },
        e => {
          this.$alert.addError(this.alerts, e)
          this.isLoading = false
        }
      )
    },
    createLink() {
      this.isLoading = true
      this.$alert.clearAlerts(this.alerts)
      linkService.createLink(
        this.createLinkInput,
        response => {
          if (response.data.successful) {
            this.$alert.addAlertList(
              this.alerts,
              'success',
              response.data.messageList
            )
            this.linkTable.data.push(response.data.results)
            this.clearCreateInput()
          } else {
            this.$alert.addAlertList(
              this.alerts,
              'danger',
              response.data.messageList
            )
          }
          this.isLoading = false
        },
        e => {
          this.$alert.addError(this.alerts, e)
          this.isLoading = false
        }
      )
    },
    deleteLink(link) {
      this.isLoading = true
      this.$alert.clearAlerts(this.alerts)
      linkService.deleteLink(
        link.name,
        response => {
          if (response.data.successful) {
            this.$alert.addAlertList(
              this.alerts,
              'success',
              response.data.messageList
            )
            for (let i = 0; i < this.linkTable.data.length; i++) {
              if (this.linkTable.data[i].name === response.data.results.name) {
                this.linkTable.data.splice(i, 1)
                break
              }
            }
          } else {
            this.$alert.addAlertList(
              this.alerts,
              'danger',
              response.data.messageList
            )
          }
          this.isLoading = false
        },
        e => {
          this.$alert.addError(this.alerts, e)
          this.isLoading = false
        }
      )
    },
    clearAll() {
      this.$alert.clearAlerts(this.alerts)
      this.clearCreateInput()
      this.linkTable.filter = null
      this.onFiltered(this.linkTable.data)
    },
    clearCreateInput() {
      this.createLinkInput.name = null
      this.createLinkInput.url = null
      this.createLinkInput.parameter = { name: null, type: null }
    },
    onFiltered(filteredItems) {
      this.linkTable.currentCount = filteredItems.length
      this.linkTable.currentPage = 1
    },
    toggleParamColumns() {
      if (this.linkTable.displayParams) {
        this.linkTable.fields[2].tdClass = null
        this.linkTable.fields[2].thClass = null
      } else {
        this.linkTable.fields[2].tdClass = 'hideColumn'
        this.linkTable.fields[2].thClass = 'hideColumn'
      }
    },
    generateGoLinkUrl(name) {
      return `${process.env.API_URL}/api/go/route/${name}`
    }
  },
  filters: {
    camel(value) {
      let lowercase = value.toLowerCase()
      return lowercase.charAt(0).toUpperCase() + lowercase.slice(1)
    }
  }
}
</script>
<style>
.hideColumn {
  display: none;
}
</style>

