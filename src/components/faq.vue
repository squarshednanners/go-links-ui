<template>
  <b-container>
    <br />
    <b-row>
      <b-col>
        <span style="font-weight: bold; font-size: large;">FAQ</span>
      </b-col>
    </b-row>
    <br />
    <b-row>
      <b-col>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion2 variant="info">How do I use a go link?</b-btn>
          </b-card-header>
          <b-collapse id="accordion2" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <p class="card-text">
                <ul>
                  <li>Preferred method: Go links can be configured through a search engine setting for quickest use (instructions for chrome browser below)</li>
                  <li>Go links are also accessible using the full URL with go link name. Example (go link name timesheet):
                    <span style="font-weight: bold;">{{url}}/api/go/route/timesheet</span>
                  </li>
                </ul>
              </p>
            </b-card-body>
          </b-collapse>
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion3 variant="info">How do I configure go link searches in chrome?</b-btn>
          </b-card-header>
          <b-collapse id="accordion3" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <p class="card-text">
                <ul>
                  <li>
                    If using chrome, you can add the following search engine settings under settings -> Manage search engines<br />
                    <span style="font-weight: bold;">Search engine: </span>go<br />
                    <span style="font-weight: bold;">Keyword: </span>go<br />
                    <span style="font-weight: bold;">Query URL: </span>{{url}}/api/go/route/%s</li>
                  <li>Once configured, you can simply type "go" in your browser's address bar followed by the go link name and it will be forwareded to the configured URL. Example (go link name timesheet):
                    <span style="font-weight: bold;">go timesheet</span>
                  </li>
                </ul>
              </p>
            </b-card-body>
          </b-collapse>
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion1 variant="info">How do I use parameters?</b-btn>
          </b-card-header>
          <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <p class="card-text">
                To use a parameter, you can simply add a backslash after the go link name followed by the parameter value. Example (go link name "timesheet" param "50"):
                <span style="font-weight: bold;">go timesheet/50</span><br /><br />Parameters can be configured as follows:
                <br />
                <table class="table b-table table-striped table-hover table-dark table-bordered">
                  <thead>
                    <tr>
                      <th>Param Type</th>
                      <th>Description</th>
                      <th>Required</th>
                      <th>Configuration</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Named</td>
                      <td>Appends the paremter to the end of the URL as a key/value at time of use</td>
                      <td>No - can be used without passing in a parameter value</td>
                      <td>URL: http://myurl.com<br />Param Name: myParam</td>
                      <td>
                        <span style=" white-space: nowrap;">http://myurl.com?myParam=50</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Path</td>
                      <td>Appends the parameter to the end of a URL path at time of use</td>
                      <td>No - can be used without passing in a parameter value</td>
                      <td>URL: http://myurl.com<br />Param Name:
                        <i>Not Required</i>
                      </td>
                      <td>http://myurl.com/50</td>
                    </tr>
                    <tr>
                      <td>Provided</td>
                      <td>Allows for parameter to be placed anywhere within a URL given a param name. <br />The param name is replaced with the value at time of use. <br />Provided parameters require the parameter be configured in the url between brackets {} <br />The param name in the URL must match the configured param name</td>
                      <td>yes - if configured, it must be passed in at time of use</td>
                      <td>
                        <span style=" white-space: nowrap;">URL: http://myurl.com/{myParam}/somePage</span><br />Param Name: myParam</td>
                      <td>http://myurl.com/50/somePage</td>
                    </tr>
                  </tbody>
                </table>
              </p>
            </b-card-body>
          </b-collapse>
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion4 variant="info">Why should I use go links over bookmarks?</b-btn>
          </b-card-header>
          <b-collapse id="accordion4" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <p class="card-text">
                Go links offer two advantages over bookmarks:
                <ul>
                  <li>Go links are collaborative. You can simply give each other the name of a go link rather than sending links amongst each other</li>
                  <li>Go links take the administrative work out of managing bookmarks. Simply name a web page, or link, something memorable and quickly find it at any time in the future by simply using its name</li>
                </ul>
              </p>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return { url: process.env.API_URL }
  }
}
</script>

<style>

</style>
