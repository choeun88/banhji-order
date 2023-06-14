<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card outlined dense class="no_border">
                <h2 class="mb-0">{{ $t("employee") }}</h2>
                <v-icon
                  @click="cancel()"
                  style="cursor: pointer; color: #333; font-size: 40px"
                  class="float-right"
                  >close
                </v-icon>
              </v-card>

              <v-card outlined dense class="px-3 no_border" color="grayBg" height="350px">
                <v-row>
                  <v-col sm="4" cols="12" class="pb-0">
                    <label class="label">{{ $t("employee_id") }}</label>
                    <v-row class="py-0">
                      <v-col sm="3" cols="3" class="py-0" style="padding-right: 0">
                        <v-text-field
                          class="mt-1"
                          outlined
                          tage="Abbr"
                          style="text-align: center !important"
                          v-model="employee.abbr"
                          :placeholder="$t('abbr')"
                          :rules="[(v) => !!v || $t('required')]"
                          required
                        />
                      </v-col>
                      <v-col sm="9" cols="12" class="py-0" style="padding-left: 0">
                        <v-text-field
                          class="mt-1"
                          outlined
                          tage="Employee number"
                          v-model="employee.number"
                          :placeholder="$t('number')"
                          :rules="[(v) => !!v || $t('field_is_required')]"
                          required
                        />
                      </v-col>
                    </v-row>
                    <label class="label">{{ $t("first_name") }}</label>
                    <v-text-field
                      class="mt-1"
                      :placeholder="$t('first_name')"
                      v-model="employee.firstName"
                      outlined
                      tage="First Name"
                      :rules="[(v) => !!v || $t('field_is_required')]"
                      required
                    />
                    <label class="label">{{ $t("last_name") }}</label>
                    <v-text-field
                      class="mt-1"
                      :placeholder="$t('last_name')"
                      v-model="employee.lastName"
                      tage="Last Name"
                      :rules="[(v) => !!v || $t('field_is_required')]"
                      outlined
                      required
                    />
                    
                  </v-col>
                  <v-col sm="4" cols="12">
                    <label class="label">{{ $t("gender") }}</label>
                    <v-autocomplete
                      :items="genderItem"
                      class="mt-1"
                      tage="Gender"
                      v-model="employee.gender"
                      placeholder="Male"
                      :rules="[(v) => !!v || $t('field_is_required')]"
                      outlined
                    >
                    </v-autocomplete>
                    <label class="label">{{ $t("department") }}</label>
                    <v-autocomplete
                      class="mt-1"
                      :items="departments"
                      item-value="id"
                      item-text="name"
                      return-object
                      tage="Department"
                      v-model="employee.department"
                      placeholder="Department"
                      :rules="[(v) => (v ? !!v['id'] || $t('is_required') : '')]"
                      outlined
                    >
                    </v-autocomplete>
                    <label class="label">{{ $t("position") }}</label>
                    <v-autocomplete
                      class="mt-1"
                      :items="positions"
                      item-value="id"
                      item-text="name"
                      return-object
                      tage="Position"
                      v-model="employee.position"
                      placeholder="Position"
                      :rules="[(v) => (v ? !!v['id'] || $t('is_required') : '')]"
                      outlined
                    >
                    </v-autocomplete>
                    
                  </v-col>
                  <v-col sm="4" cols="12" class="my_box_min_heihgt pb-0">
                    <h2 class="mb-2 font_20">
                      {{ $t("employee_image") }}
                    </h2>
                    <v-row>
                      <v-col sm="12" cols="12" class="py-0">
                        <p class="color_grey font_14">
                          {{ $t("these_image_of_the_employee") }}
                        </p>
                      </v-col>
                      <v-col sm="12" cols="12" class="py-0">
                        <v-img width="100px" height="150px" :src="src" />
                        <label>
                          <input
                            type="file"
                            name="image"
                            id="image"
                            :rules="fileSizeRules"
                            accept=".png, .jpg, .jpeg"
                            ref="fileupload"
                            @change="onFileChange"
                          />
                        </label>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>

              <v-card outlined dense color="white pl-3">
                <v-row>
                 
                </v-row>
              </v-card>
              <v-card outlined dense class="no_border function_footer">
                <v-btn
                  color="black"
                  @click="cancel"
                  class="text-capitalize white--text float-left"
                >
                  {{ $t("cancel") }}
                </v-btn>
                <v-btn
                  class="float-right text-capitalize white--text"
                  color="primary"
                  @click="onSaveClose('close')"
                >
                  {{ $t("save_close") }}
                </v-btn>
                <v-btn
                  class="float-right text-capitalize white--text mr-3"
                  color="secondary"
                  @click="onSaveClose('new')"
                  :hidden="hiddenButton"
                >
                  {{ $t("save_new") }}
                </v-btn>
              </v-card>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
      <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true" />
    </v-container>
  </v-app>
</template>

<script>
import { i18n } from "@/i18n";
import EmployeeModel from "@/scripts/model/Employee";
import PrefixModel from "@/scripts/model/payrollsetting/Prefix";
const employeeHandler = require("@/scripts/employeeHandler");
const payrollHandler = require("@/scripts/payrollHandler");
const currencyHandler = require("@/scripts/currency/handler/currencyHandler");
const employeeModel = new EmployeeModel({});
const prefixModel = new PrefixModel({});
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();
const { instituteId } = cookieJS.getCookie()
import { dataStore } from "@/observable/store";
import { uuid } from "vue-uuid";
const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
export default {
  name: "AddEmployee",
  props: ["id"],
  components: {
    LoadingMe: () => import(`@/components/Loading`),
  },
  data: () => ({
    isEditImg: false,
    isEdit: false,
    genderItem: ["Male", "Female", "Others"],
    gender: "Male",
    departments: [],
    department: {},
    positions: [],
    position: {},
    currencies: [],
    costCurrency: {},
    feeCurrency: {},
    costRate: 0,
    feeRate: 0,
    minValue: 0,
    rules: [(v) => v >= 0 || "rate >= 0", (v) => v <= 100 || "rate < 100"],
    employees: [],
    reviewedTime: {},
    approvedTime: {},
    reviewedExpense: {},
    approvedExpense: {},
    approvedAdvance: {},
    reviewedAdvance: {},
    employee: employeeModel,
    // LoadingMe
    showLoading: false,
    loadingAlert: false,
    loadingColorAlert: "",
    loadingTextAlert: "",
    src: "",
    imgFile: "",
    fileSizeRules: [
      (files) =>
        !files ||
        !files.some((file) => file.size > 1024 * 1024) ||
        "Image size should be less than 1 MB!",
    ],
    files: [],
    // Form validation
    valid: true,
    loggedUser: {
      id: cookie.creator,
      name: cookie.email,
    },
    prefix: prefixModel,
    filter: "",
    textField: "name",
    dataItemKey: "id",
    store: localStorage.getItem(instituteId + 'commStore') != null ? JSON.parse(localStorage.getItem(instituteId + 'commStore')) : {},
  }),
  methods: {
    close(data) {
      // if (this.$route.params.query !== undefined) {
      //   window.console.log(1, this.$route.params.query);
      //   window.history.go(-1);
      // } else {
      //   window.console.log(2, this.$route.params.query);
      //   if (this.appType !== "Standard") {
      //     this.$router.push({
      //       name: "Payroll",
      //       params: {
      //         data: data,
      //       },
      //     });
      //   } else {
      //     window.history.go(-1);
      //   }
      // }
      window.console.log(data)
      window.history.go(-1);
    },
    onFileChange(e) {
      // const file = e.target.files[0];
      let input = e.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        if (input.files[0].size > 1024 * 1024) {
          e.preventDefault();
          alert("File too big (> 1MB)");
          this.src = "";
          this.imgFile = "";
          this.$refs.fileupload.value = null;
        } else {
          // create a new FileReader to read this image and convert to base64 format
          let reader = new FileReader();
          // Define a callback function to run, when FileReader finishes its job
          reader.onloadend = (e) => {
            // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
            // Read image as base64 and set to imageData
            this.imgFile = e.target.result;
          };
          // Start the reader job - read file as a data url (base64 format)
          reader.readAsBinaryString(input.files[0]);
          // this.url = input.files[0]
          this.src = URL.createObjectURL(e.target.files[0]);
          this.isEditImg = true
        }
      }
    },
    async onSaveClose(isSave) {
      window.console.log(isSave, 'save emp')
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
      let prefix = this.employee.prefix || {};
      let data = new EmployeeModel({
        pk: this.employee.id ? this.employee.id : "emp-" + uuid.v1(),
        sk: this.store.pk,
        abbr: this.employee.abbr,
        number: this.employee.number,
        prefix: this.employee.prefix,
        employeeId: this.employee.abbr + prefix.separator + this.employee.number,
        name: this.employee.name,
        firstName: this.employee.firstName,
        lastName: this.employee.lastName,
        gender: this.employee.gender,
        image: this.employee.image,
        status: this.employee.status,
        img: this.imgFile,
        department: this.employee.department,
        position: this.employee.position,
        loggedUser: this.employee.loggedUser,
      });
      
      this.showLoading = true;
      let dd = []
      dd.push(data)
      // let d = {
      //   data: dd,
      //   db: 'entity',
      //   type: 'single'
      // }
      // await commerceHandler.contactPost(d).then(response => {
      //     window.console.log(response)
      //     if (response.status == 200) {
      //       this.showLoading = false;
      //       this.$snotify.success("Successfully");
      //       if (isSave == "new") {
      //         this.clear();
      //       } else if (isSave == "close") {
      //         this.clear();
      //         this.close(response.data.data);
      //       }
      //     } else {
      //       this.showLoading = false;
      //     }
      // })
    },
    async onSaveCloseBK(isSave) {
      window.console.log(isSave, 'save emp')
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate();
        return;
      }
      let prefix = this.employee.prefix || {};
      let reviewedTime = this.employee.reviewedTime || {};
      let approvedTime = this.employee.approvedTime || {};
      let reviewedAdvance = this.employee.reviewedAdvance || {};
      let approvedAdvance = this.employee.approvedAdvance || {};
      let reviewedExpense = this.employee.reviewedExpense || {};
      let approvedExpense = this.employee.approvedExpense || {};
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          let data = new EmployeeModel({
            id: this.employee.id ? this.employee.id : "",
            abbr: this.employee.abbr,
            number: this.employee.number,
            prefix: this.employee.prefix,
            employeeId: this.employee.abbr + prefix.separator + this.employee.number,
            name: this.employee.name,
            firstName: this.employee.firstName,
            lastName: this.employee.lastName,
            gender: this.employee.gender,
            image: this.employee.image,
            status: this.employee.status,
            imgFile: this.imgFile,
            department: this.employee.department,
            position: this.employee.position,
            costCurrency: this.employee.costCurrency,
            costRate: this.employee.costRate,
            feeCurrency: this.employee.feeCurrency,
            feeRate: this.employee.feeRate,
            reviewedTime: {
              employeeId: reviewedTime.employeeId || "",
              firstName: reviewedTime.firstName || "",
              gender: reviewedTime.gender || "",
              id: reviewedTime.id || "",
              lastName: reviewedTime.lastName || "",
              name: reviewedTime.name || "",
              number: reviewedTime.number || "",
              status: reviewedTime.status || "",
            },
            approvedTime: {
              employeeId: approvedTime.employeeId || "",
              firstName: approvedTime.firstName || "",
              gender: approvedTime.gender || "",
              id: approvedTime.id || "",
              lastName: approvedTime.lastName || "",
              name: approvedTime.name || "",
              number: approvedTime.number || "",
              status: approvedTime.status || "",
            },
            reviewedAdvance: {
              employeeId: reviewedAdvance.employeeId || "",
              firstName: reviewedAdvance.firstName || "",
              gender: reviewedAdvance.gender || "",
              id: reviewedAdvance.id || "",
              lastName: reviewedAdvance.lastName || "",
              name: reviewedAdvance.name || "",
              number: reviewedAdvance.number || "",
              status: reviewedAdvance.status || "",
            },
            approvedAdvance: {
              employeeId: approvedAdvance.employeeId || "",
              firstName: approvedAdvance.firstName || "",
              gender: approvedAdvance.gender || "",
              id: approvedAdvance.id || "",
              lastName: approvedAdvance.lastName || "",
              name: approvedAdvance.name || "",
              number: approvedAdvance.number || "",
              status: approvedAdvance.status || "",
            },
            reviewedExpense: {
              employeeId: reviewedExpense.employeeId || "",
              firstName: reviewedExpense.firstName || "",
              gender: reviewedExpense.gender || "",
              id: reviewedExpense.id || "",
              lastName: reviewedExpense.lastName || "",
              name: reviewedExpense.name || "",
              number: reviewedExpense.number || "",
              status: reviewedExpense.status || "",
            },
            approvedExpense: {
              employeeId: approvedExpense.employeeId || "",
              firstName: approvedExpense.firstName || "",
              gender: approvedExpense.gender || "",
              id: approvedExpense.id || "",
              lastName: approvedExpense.lastName || "",
              name: approvedExpense.name || "",
              number: approvedExpense.number || "",
              status: approvedExpense.status || "",
            },
            loggedUser: this.employee.loggedUser,
          });
          window.console.log(data, 'model');
          this.showLoading = true;
          employeeHandler
            .create(data)
            .then((response) => {
              this.showLoading = true;
              if (response.data.statusCode === 201) {
                if (isSave == "new") {
                  this.clear();
                } else if (isSave == "close") {
                  this.clear();
                  this.close(response.data.data);
                }
                this.showLoading = false;
                this.$snotify.success("Successfully");
              }
            })
            .catch((e) => {
              this.$snotify.error("Something went wrong");
              this.errors.push(e);
            });
        }, 300);
      });
    },
    async initData() {
      if (this.$route.params.id !== undefined) {
        await this.loadSingleEmployee();
      } else {
        this.clear();
      }
    },
    async loadSingleEmployee() {
      if (this.$route.params.id) {
        let data = {
            sk: this.store.pk,
            pk: this.$route.params.id,
            db: 'entity',
        }
        await commerceHandler.generalGet(data).then(res=>{
            this.showLoading = false
            if(res.data.data.Items.length > 0){
              let d = res.data.data.Items[0]
              this.employee = d
              this.employee.id = d.pk
              if(Object.keys(this.employee.img).length > 0){
                if(this.employee.img.hasOwnProperty('default')){
                  this.src = 'https://s3-ap-southeast-1.amazonaws.com/images.banhji/' + this.employee.img.default.thumb
                }
              }
              this.isEditImg = false
            }
        })
        window.console.log(1);
      } else {
        this.loadPrefix();
      }
    },
    async loadSingleEmployeebk() {
      if (this.$route.params.id) {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("resolved");
            this.showLoading = true;
            employeeHandler.get(this.$route.params.id).then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                let result = res.data.data || {};
                let prefix = result.prefix || {};
                this.employee = result;
                this.employee.abbr = prefix.abbr;
                window.console.log("employee", this.employee);
                const hasImg = this.employee.hasOwnProperty("image");
                this.src = "";
                let imgUrl = "";
                if (hasImg) {
                  if (this.employee.image.hasOwnProperty("default")) {
                    imgUrl = this.employee.image.default.thumb;
                    this.src =
                      "https://s3-ap-southeast-1.amazonaws.com/images.banhji/" + imgUrl;
                  }
                }
              }
            });
          }, 300);
        });
        window.console.log(1);
      } else {
        this.loadPrefix();
      }
    },
    cancel() {
      this.$swal({
        title: i18n.t("msg_title_warning"),
        text: i18n.t("msg_discard"),
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: i18n.t("cancel"),
        confirmButtonColor: "#4d4848",
        cancelButtonColor: "#ED1A3A",
        confirmButtonText: i18n.t("discard"),
      }).then((result) => {
        if (result.value) {
          this.$router.go(-1);
        }
      });
    },
    clear() {
      this.employee = new EmployeeModel({});
      this.gender = "Male";
      this.loadPrefix();
    },
    async loadPrefix() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          payrollHandler.getPrefix().then((res) => {
            if (res.statusCode === 200) {
              let result = res.data;
              if (result.length > 0) {
                this.prefix = result[0];
              }
              this.generateNumber(this.prefix);
            }
          });
        }, 300);
      });
    },
    generateNumber(prefix) {
      let params = {
        abbr: prefix.abbr,
        id: "",
      };
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          employeeHandler.getLastNumber(params).then((res) => {
            this.showLoading = true;
            if (res.statusCode === 200) {
              let resultLast = res.data;
              const lastNumber = this.zeroPad(
                parseInt(resultLast.lastNumber),
                prefix.format
              );
              this.employee.abbr = prefix.abbr || "";
              this.employee.prefix = prefix;
              this.employee.number = lastNumber;
              this.showLoading = false;
            }
          });
        }, 300);
      });
    },
    zeroPad(num, places) {
      return String(num).padStart(places, "0");
    },
    async loadDepartment() {
      let param = {
        location_id: "",
      };
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          payrollHandler.getDepartment(param).then((res) => {
            this.departments = res;
            this.showLoading = false;
          });
        }, 300);
      });
    },
    async loadPosition() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          payrollHandler.getPosition().then((res) => {
            this.positions = res;
          });
        }, 300);
      });
    },
    async loadCurrency() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          currencyHandler.getAll().then((res) => {
            this.currencies = res.data.data;
          });
        }, 300);
      });
    },
    async loadEmployee() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          employeeHandler
            .center(this.filter)
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
  },
  mounted: async function () {
    await this.initData();
    await this.loadDepartment();
    await this.loadPosition();
    await this.loadCurrency();
    await this.loadEmployee();
  },
  watch: {
    $route: "initData",
  },
  computed: {
    hiddenButton() {
      if (this.$route.query.type == "edit") {
        return true;
      } else {
        return false;
      }
    },
    appType() {
      return dataStore.productType;
    },
  },
};
</script>

<style scoped>
.function_content {
  padding: 0 25px 25px;
  border-bottom: 0;
  background-color: #fff !important;
}

@media (min-width: 1264px) {
  .container {
    /* max-width: 1185px; */
    max-width: 1080px !important;
  }
}

.grayBg {
  background-color: #f8f8f9;
}

@media (max-width: 576px) {
  .mb-6 {
    margin-bottom: 0 !important;
  }
}

.section2 {
  border: 1px solid #d6d7d8;
}

.border_grey {
  border: 1px solid #d6d7d8;
}

.attachment_table {
  width: 100%;
}

.greyDark {
  background-color: #f2f2f2;
}

.upload_btn {
  width: 54%;
  margin: auto;
  padding: 10px 6px;
  text-align: center;
  color: #ffff;
  border-radius: 22px;
  background: #92d050;
}

.my_box_min_heihgt {
  height: 295px;
}

.width_100 {
  width: 100px;
}
</style>
