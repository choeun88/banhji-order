<template>
  <v-row class="pa-4 pt-0">
    <v-col sm="4" cols="12" class="pt-0 pr-3 pb-0">
      <div class="d-flex">
        <v-card class="pa-3 white--text" elevator="0" style="width: 80%" color="primary">
          <div class="d-flex justify-space-between">
            <h3 class="center_left_title text-uppercase">
              {{ $t("total_employees") }}
            </h3>
            <h1>{{ employeeResult.totalEmployee }}</h1>
          </div>
        </v-card>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              @click="rotate = !rotate"
              style="height: 47px !important"
              class="text-bold ml-2 px-2 white--text"
              v-on="on"
              to="employee"
            >
              {{ $t("new") }}
            </v-btn>
          </template>
        </v-menu>
      </div>
      <v-card
        outlined
        dense
        color="grayBg"
        class="pa-3 no_border mb-md-4 mb-xs-0"
        height="65px"
      >
        <div class="d-flex">
          <v-text-field
            class=""
            @change="onSearchChanged"
            v-model="search"
            outlined
            :placeholder="$t('number_or_name')"
            append-icon="search"
            clearable
          />
          <v-btn icon @click="loadData">
            <v-icon>refresh</v-icon>
          </v-btn>
        </div>
      </v-card>
      <v-card outlined dense color="grayBg" class="pa-3 no_border hidden-sm-and-down">
        <!-- loading -->
        <div v-if="!isLoaded">
          <LoadingMe
            :isLoading="showLoading"
            type="loading"
            :fullPage="false"
            :myLoading="true"
          />
        </div>
        <kendo-datasource
          ref="employeeDS"
          :data="employees"
          :schema="schemaDefinition"
          :sort="sort"
        />
        <kendo-grid
          id="gridEmployeeCenter"
          class="grid-center"
          :change="onChanged"
          :data-source-ref="'employeeDS'"
          :selectable="true"
          :persistSelection="true"
          :noRecords="true"
          :scrollable="true"
          :height="488"
          :pageable-numeric="false"
          :pageable-previous-next="false"
          :pageable-messages-display="'Showing {2} data items'"
        >
          <kendo-grid-column
            :field="'name'"
            :attributes="{ class: 'tb_name_td' }"
            :title="'name'"
            :hidden="true"
            :group-header-template="'#=value#'"
          />
          <kendo-grid-column
            :field="'employeeId'"
            :title="'&nbsp;'"
            :template="'<span>#=employeeId# #=firstName# #=lastName#</span>'"
          />
        </kendo-grid>
      </v-card>
    </v-col>
    <v-col sm="8" cols="12" class="pt-0">
      <div v-if="isLoaded">
        <LoadingMe :isLoading="showLoading" :fullPage="false" :myLoading="true" />
      </div>
      <v-row>
        <v-col sm="12" cols="12" class="pt-0 pl-0">
          <v-tabs>
            <v-tab>
              <span class="hidden-sm-and-up"
                ><v-icon left>mdi-information-variant</v-icon></span
              >
              <span class="hidden-sm-and-down">{{ $t("info") }}</span>
            </v-tab>
            <!-- <v-tab>
              <span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
              <span class="hidden-sm-and-down">{{ $t("txn_") }}</span>
            </v-tab> -->

            <!-- <v-tab>
              <span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
              <span class="hidden-sm-and-down">{{ $t("timesheet") }}</span>
            </v-tab> -->
            <v-tab>
              <span class="hidden-sm-and-up"><v-icon left>mdi-pen</v-icon></span>
              <span class="hidden-sm-and-down">{{ $t("attachments") }}</span>
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text class="pt-0">
                  <Info :employee="employee" @onUpdate="callback" />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <!-- <v-tab-item>
              <v-card flat>
                <v-card-text class="pt-0">
                  <Transaction :employee="employee" @onUpdate="callback" />
                </v-card-text>
              </v-card>
            </v-tab-item> -->

            <!-- <v-tab-item>
              <v-card flat>
                <v-card-text class="pt-0">
                  <Timesheet :employee="employee" @onUpdate="callback" />
                </v-card-text>
              </v-card>
            </v-tab-item> -->
            <v-tab-item>
              <v-card flat>
                <v-card-text class="pt-0">
                  <Attachment :initAccount="attachment" />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import EmployeeModel from "@/scripts/model/Employee";

const employeeModel = new EmployeeModel({});
// const $ = require("jquery")
import kendo from "@progress/kendo-ui";
import { dataStore } from "@/observable/store";
const employeeHandler = require("@/scripts/employeeHandler");

export default {
  name: "EmployeeCenter",
  components: {
    LoadingMe: () => import(`@/components/Loading`),
    Info: () => import(`./Info`),
    // Transaction: () => import(`./Transaction`),
    // Histories: () => import(`./Histories`),
    // Timesheet: () => import(`./Timesheet`),
    Attachment: () => import(`@/components/Attachment`),
  },
  data: () => ({
    rotate: false,
    showLoading: true,
    showLoading1: false,
    isLoaded: false,
    info: {},
    employees: [],
    start_date: "",
    end_date: "",
    customerTypes: [],
    mCustomerType: {},
    dateSorters: [],
    headers: [],
    customerGroups: [],
    mCustomerGroup: {},
    journal_entries: [],
    forwarded: "",
    files: "",
    search: "",
    employee: employeeModel,
    schemaDefinition: {
      model: { id: "id" },
    },
    groupDefinition: {
      field: "type",
    },
    sort: [{ field: "employeeId", dir: "asc" }],
    attachment: {},
    employeeResult: {
      totalEmployee: 0
    },
  }),
  methods: {
    onSearchChanged() {
      this.showLoading = true;
      this.loadEmployeeCenter();
    },
    loadEmployee() {
      employeeHandler.getEmployeeDashboard().then((res) => {
        this.showLoading1 = true;
        if (res.statusCode === 200) {
          this.showLoading1 = false;
          this.employeeResult = res.data;
        }
      });
    },
    async customerInfo() {
      this.$emit("onUpdate", this.customer);
    },
    async onChanged() {
      let grid = kendo.jQuery("#gridEmployeeCenter").data("kendoGrid");
      let selectedItem = grid.dataItem(grid.select());
      this.employee = selectedItem;
      window.console.log("selectedItem", selectedItem);
      this.attachment = {
        uuid: selectedItem.id || "",
        name: selectedItem.name || "",
      };
      this.$emit("onUpdate", selectedItem);
    },
    async loadEmployeeCenter() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          employeeHandler
            .center(this.search)
            .then((res) => {
              window.console.log(res);
              this.showLoading = true;
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                this.employees = res.data.data;
              }
            })
            .catch();
          {
            this.showLoading = false;
          }
        }, 300);
      });
    },
    callback() {
      if (this.$route.params !== null && this.$route.params.hasOwnProperty("data")) {
        const employee = this.$route.params.data;
        const index = this.employees.findIndex((item) => {
          return employee.id === item.id;
        });
        if (index < 0) {
          this.employees.push(employee);
        } else {
          this.employees.splice(index, 1, employee);
        }
      }
    },
    async loadData() {
      await this.loadEmployeeCenter();
    },
  },
  mounted: async function () {
    await this.loadEmployeeCenter();
    this.loadEmployee();
  },
  computed: {
    btnEnabled() {
      return !this.employee.name;
    },
    appType() {
      return dataStore.productType;
    },
  },
  watch: {
    $route: "callback",
  },
};
</script>

<style scoped>
@media (max-width: 576px) {
  .v-tab {
    min-width: auto !important;
  }
  .paddingLeft {
    margin-left: 15px;
  }
}
</style>
