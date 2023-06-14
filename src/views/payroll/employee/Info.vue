<template>
  <v-row>
    <v-col sm="12" cols="12" class="grayBg px-3">
      <v-card color="white" class="pa-3 no_border" elevation="0">
        <v-row>
          <v-col sm="3" cols="12" class="py-0">
            <v-card elevation="1">
              <v-img style="margin: auto; display: block" :src="imgURL" />
            </v-card>
          </v-col>
          <v-col sm="9" cols="12" class="py-0">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="text-uppercase">{{ $t("name") }}</td>
                    <td class="">{{ employee.firstName }} {{ employee.lastName }}</td>
                  </tr>
                  <tr>
                    <td class="text-uppercase">{{ $t("employee_id") }}</td>
                    <td class="">{{ employee.employeeId }}</td>
                  </tr>
                  <tr>
                    <td class="text-uppercase">{{ $t("current_position") }}</td>
                    <td class="">{{ employeeInfo.position.name }}</td>
                  </tr>
                  <tr>
                    <td class="text-uppercase">{{ $t("status") }}</td>
                    <td class="">{{ formatStatus(employeeInfo.status) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
        <!-- <v-row>
					<v-col sm="6" cols="12" class="py-0">
						<h3 class="mt-2 black--text">{{ $t("key_information") }}</h3>
					</v-col>
				</v-row>
				<v-simple-table>
					<template v-slot:default>
						<tbody>
							<tr>
								<td class="text-uppercase">{{ $t("gross_pay") }}</td>
								<td style="text-align: right;" class="">{{ formatAmount(employeeInfo.grossSalary) }}</td>
							</tr>
							<tr>
								<td class="text-uppercase">{{ $t("net_salary") }}</td>
								<td style="text-align: right;" class="">{{ formatAmount(employeeInfo.netSalary) }}</td>
							</tr>
							<tr>
								<td class="text-uppercase">{{ $t("deduction") }}</td>
								<td style="text-align: right;" class="">{{ formatAmount(employeeInfo.deduction) }}</td>
							</tr>
							<tr>
								<td class="text-uppercase">{{ $t("bonus_benefit") }}</td>
								<td style="text-align: right;" class="">{{ formatAmount(employeeInfo.totalBenefit) }}</td>
							</tr>
							<tr>
								<td class="text-uppercase">{{ $t("last_used") }}</td>
								<td class="" />
							</tr>
							<tr>
								<td class="text-uppercase">{{ $t("outstanding_advance") }}</td>
								<td class="" />
							</tr>
							<tr>
								<td class="text-uppercase">{{ $t("type_of_employment_contract") }}</td>
								<td class="">{{ employeeInfo.natureContract.name }}</td>
							</tr>
							<tr>
								<td class="text-uppercase">{{ $t("department") }}</td>
								<td class="">{{ employeeInfo.department.name }}</td>
							</tr>
							<tr>
								<td class="text-uppercase">{{ $t("status") }}</td>
								<td class="">{{ formatStatus(employeeInfo.status) }}</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table> -->
        <v-row>
          <v-col cols="12">
            <router-link :to="{ path: routerTo, query: { type: 'edit' } }">
              <v-btn
                width="100"
                color="primary"
                :disabled="btnEnabled"
                class="white--text float-right text-capitalize"
                >{{ $t("edit") }}
              </v-btn>
            </router-link>
            <v-btn
              width="100"
              color="primary"
              :disabled="btnInactiveEnabled"
              class="white--text float-right text-capitalize"
              style="margin-right: 5px"
              @click="btnInactive()"
              >{{ $t("inactive") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <LoadingMe
        :isLoading="showLoading"
        :fullPage="false"
        type="loading"
        :myLoading="true"
      />
    </v-col>
  </v-row>
</template>
<script>
import kendo from "@progress/kendo-ui";
import { i18n } from "@/i18n";
const employeeHandler = require("@/scripts/employeeHandler");
export default {
  name: "EmployeeInfo",
  props: {
    employee: {},
  },
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  data() {
    return {
      showLoading: false,
      isLoaded: false,
      pic: "amret.png",
      url: "https://s3-ap-southeast-1.amazonaws.com/images.banhji/",
      employeeInfo: {
        grossSalary: 0,
        netSalary: 0,
        deduction: 0,
        totalBenefit: 0,
        position: {
          name: "",
        },
        natureContract: {
          name: "",
        },
        department: {
          name: "",
        },
      },
    };
  },
  methods: {
    formatStatus(val) {
      if (val === 0) return "Inactive";
      else return "Active";
    },
    formatAmount(val) {
      return kendo.toString(val, "n2");
    },
    goEdit() {},
    onUpdate() {
      this.$emit("onUpdate", this.employee ? this.employee : {});
    },
    callback() {
      if (this.$route.params !== null && this.$route.params.hasOwnProperty("data")) {
        this.$emit("onUpdate", this.$route.params.data);
        this.loadEmployeeInfo();
      }
    },
    async loadEmployeeInfo() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.employees = [];
          this.showLoading = true;
          employeeHandler
            .getEmployeeInfo(this.employee.id)
            .then((res) => {
              this.showLoading = true;
              if (res.statusCode === 200) {
                this.showLoading = false;
                let result = res.data[0];
                if (result) {
                  this.employeeInfo = result;
                  window.console.log(this.employeeInfo, "employeeInfo");
                }
              }
            })
            .catch();
          {
            this.showLoading = false;
          }
        }, 300);
      });
    },
    btnInactive() {
      this.$swal({
        title: i18n.t("msg_title_inactive"),
        text: i18n.t("msg_inactive"),
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: i18n.t("cancel"),
        confirmButtonColor: "#4d4848",
        cancelButtonColor: "#ED1A3A",
        confirmButtonText: i18n.t("ok"),
      }).then((result) => {
        if (result.value) {
          new Promise((resolve) => {
            setTimeout(() => {
              resolve("resolved");
              this.employees = [];
              this.showLoading = true;
              employeeHandler
                .update(this.employee.id)
                .then((res) => {
                  this.showLoading = true;
                  if (res.data.statusCode === 200) {
                    this.showLoading = false;
                    this.$snotify.success("Successfully");
                    this.loadEmployeeInfo();
                  }
                })
                .catch();
              {
                this.showLoading = false;
              }
            }, 300);
          });
        }
      });
    },
  },
  computed: {
    routerTo() {
      return "employee" + `/${this.employee ? this.employee.id : ""}`;
    },
    imgURL() {
      if (this.employee) {
        if (this.employee.image) {
          let img = this.employee.image;
          let imgDefault = img.default;
          if (imgDefault) {
            return this.url + imgDefault.thumb;
          } else {
            return "";
          }
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    btnEnabled() {
      if (this.employee) {
        return !this.employee.id;
      } else {
        return false;
      }
    },
    btnInactiveEnabled() {
      if (this.employee.status == 0 || !this.employee.id) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    employee() {
      if (this.employee !== undefined) {
        this.loadEmployeeInfo();
      }
    },
    $route: "callback",
  },
};
</script>
<style scoped>
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.theme--light.v-data-table {
  background-color: transparent !important;
  border-top: thin solid rgba(0, 0, 0, 0.12);
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  border-radius: 0 !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
}
</style>
