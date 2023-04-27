<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col sm="12" cols="12">
          <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
            <v-row>
              <v-col
                class="bigSide py-0"
                sm="8"
                cols="12"
                style="transition: 0.3s ease-in"
                :class="{ hide_big_bar_class: isHideBar }"
              >
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-card outlined dense class="no_border">
                    <h2 class="mb-0">
                      {{ $t("inventory_adjustment") }} #{{
                        inventoryAdjustment.referenceNo
                      }}
                    </h2>
                    <v-icon
                      v-if="isHideBar"
                      onclick="window.history.go(-1)"
                      class="float-right close_icon"
                      >close
                    </v-icon>
                    <span
                      style="transition: 0.3s ease-in; z-index: 10"
                      :class="{
                        iconArrow: !isHideBar,
                        iconArrowHide: isHideBar,
                      }"
                    >
                      <v-icon
                        size="22"
                        class="arr_icon"
                        @click="hideSmallSidebar"
                        v-if="isHideBar"
                      >
                        mdi-chevron-left-circle
                      </v-icon>
                      <v-icon
                        size="22"
                        class="arr_icon"
                        @click="hideSmallSidebar"
                        v-if="!isHideBar"
                      >
                        mdi-chevron-right-circle
                      </v-icon>
                    </span>
                  </v-card>

                  <v-card outlined dense class="px-3 no_border" color="grayBg">
                    <v-row>
                      <v-col sm="3" cols="12" class="py-1">
                        <label class="label mb-0">{{ $t("date") }}</label>
                        <h3 class="text-bold py-1">{{ transactionDate }}</h3>
                      </v-col>
                      <v-col sm="3" cols="12" class="py-1">
                        <label class="label mb-0">{{ $t("account") }}</label>
                        <h3 class="text-bold py-1">{{ account }}</h3>
                      </v-col>
                      <v-col sm="3" cols="12" class="py-1">
                        <label class="label mb-0">{{ $t("adjustment_memo") }}</label>
                        <h3 class="text-bold py-1">{{ memo }}</h3>
                      </v-col>
                      <v-col sm="3" cols="12" class="py-1">
                        <label class="label mb-0">{{ $t("message_for_journal") }}</label>
                        <h3 class="text-bold py-1">{{ journalNote }}</h3>
                      </v-col>
                    </v-row>
                  </v-card>

                  <v-row style="background-color: #fff">
                    <v-col sm="12" cols="12">
                      <kendo-datasource ref="itemLineAdjustViewDS" :data="itemLines" />
                      <kendo-grid
                        id="gridAdjustmentViewItemLine"
                        class="grid-function"
                        :data-source-ref="'itemLineAdjustViewDS'"
                        :sortable="false"
                        :column-menu="true"
                        :editable="true"
                        :scrollable-virtual="true"
                      >
                        <!-- <kendo-grid-column
                          :title="$t('no.')"
                          :width="55"
                          :column-menu="false"
                          :template="rowNumberTmpl"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5;',
                            class: 'text-products',
                          }"
                          :attributes="{
                            style: 'text-align: products',
                          }"
                        /> -->
                        <kendo-grid-column
                          :field="'item'"
                          :title="$t('item')"
                          :template="itemTemplate"
                          :width="200"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />
                        <kendo-grid-column
                          :field="'description'"
                          :title="$t('description')"
                          :template="'<span>#=description#</span>'"
                          :width="200"
                          :headerAttributes="{
                            style: 'background-color: #EDF1F5',
                          }"
                        />

                        <kendo-grid-column
                          :field="'buom'"
                          :title="$t('uom')"
                          :width="170"
                          :template="UOMTemplate"
                          :editable="
                            () => {
                              return false;
                            }
                          "
                          :headerAttributes="{
                            style: 'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{
                            style: 'text-align: left',
                          }"
                        />
                        <kendo-grid-column
                          :field="'cost'"
                          :title="$t('cost')"
                          :template="'<span>#=kendo.toString(cost || 0, decimalFormat) || 0#</span>'"
                          :width="170"
                          :editable="
                            () => {
                              return false;
                            }
                          "
                          :headerAttributes="{
                            style: 'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: right; ' }"
                        />
                        <kendo-grid-column
                          :field="'qoh'"
                          :title="$t('on_hand')"
                          :template="'<span>#=kendo.toString(qoh || 0, decimalFormat) || 0#</span>'"
                          :width="170"
                          :editable="
                            () => {
                              return false;
                            }
                          "
                          :headerAttributes="{
                            style: 'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: right; ' }"
                        />
                        <kendo-grid-column
                          :field="'count'"
                          :title="$t('count')"
                          :template="'<span>#=kendo.toString(count || 0, decimalFormat)#</span>'"
                          :width="170"
                          :editable="
                            () => {
                              return false;
                            }
                          "
                          :headerAttributes="{
                            style: 'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{ style: 'text-align: right; ' }"
                        />
                        <kendo-grid-column
                          :field="'different'"
                          :title="$t('different')"
                          :editable="
                            () => {
                              return false;
                            }
                          "
                          :width="170"
                          :template="'<span>#=kendo.toString(different || 0, decimalFormat)#</span>'"
                          :headerAttributes="{
                            style: 'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{
                            style: 'text-align: right',
                          }"
                        />
                        <kendo-grid-column
                          :field="'amount'"
                          :title="$t('amount')"
                          :width="170"
                          :editable="
                            () => {
                              return false;
                            }
                          "
                          :template="'<span>#=kendo.toString(amount || 0, decimalFormat)#</span>'"
                          :headerAttributes="{
                            style: 'text-align: left; background-color: #EDF1F5',
                          }"
                          :attributes="{
                            style: 'text-align: right',
                          }"
                        />
                      </kendo-grid>
                    </v-col>
                  </v-row>

                  <v-divider />
                  <v-card outlined dense class="no_border function_footer mt-0 py-2">
                    <p class="float-left color_grey py-3 mb-0">
                      {{ $t("standard_inventory_adjustment") }}
                    </p>
                    <v-btn @click="printHandle" class="float-right save_print mx-1">
                      {{ $t("print") }}
                    </v-btn>
                    <v-btn @click="onDelete" class="float-right btn_delete mx-1">
                      {{ $t("delete") }}
                    </v-btn>
                    <v-btn
                      class="float-right btn_save_draft mx-1"
                      @click="onEdit('edit')"
                    >
                      {{ $t("edit") }}
                    </v-btn>
                  </v-card>
                  <v-divider />
                </v-form>
              </v-col>
              <v-col
                class="smallSide"
                sm="4"
                style="transition: 0.3s ease-in"
                :class="{ hide_small_bar_class: isHideBar }"
              >
                <h3
                  style="color: #b3b5bc; font-size: 20px"
                  v-if="!isHideBar"
                  class="text-uppercase float-right mt-n3"
                >
                  Help
                  <v-icon
                    onclick="window.history.go(-1)"
                    style="cursor: pointer; color: #333; font-size: 40px"
                    class="float-right mt-n1"
                    >close
                  </v-icon>
                </h3>

                <div v-if="!isHideBar" class="small_sidebar mt-9 grayBg">
                  <v-row>
                    <v-col sm="12" cols="12" class="pb-0">
                      <h4 class="my-2 text-uppercase">{{ $t("analysis") }}</h4>
                      <v-row>
                        <v-col sm="6" cols="6" class="py-1">
                          <label class="label">{{ $t("segment") }}</label>
                          <h4 class="text-bold py-1">{{ segment }}</h4>
                        </v-col>
                        <v-col sm="6" cols="6" class="py-1">
                          <label class="label">{{ $t("location") }}</label>
                          <h4 class="text-bold py-1">{{ location }}</h4>
                        </v-col>
                        <v-col sm="6" cols="6" class="py-1">
                          <label class="label">{{ $t("project") }}</label>
                          <h4 class="text-bold py-1">{{ project }}</h4>
                        </v-col>
                        <v-col sm="6" cols="6" class="py-1">
                          <label class="label">{{ $t("employee") }}</label>
                          <h4 class="text-bold py-1">{{ employee }}</h4>
                        </v-col>
                        <!--                                                <v-col sm="6" cols="6" class="py-0">-->
                        <!--                                                    <label class="label">{{ $t('batch_session_no') }}</label>-->
                        <!--                                                    <h4 class="text-bold py-1">1010101</h4>-->
                        <!--                                                </v-col>-->
                      </v-row>
                    </v-col>
                  </v-row>
                  <div
                    class="my-2 mt-3"
                    style="height: 3px; background-color: #ffffff; width: 100%"
                  ></div>
                  <p class="mb-0 font_14">
                    {{ $t("inventory_adjustment_func_desc") }}
                  </p>
                  <div
                    class="my-2 mt-3"
                    style="height: 3px; background-color: #ffffff; width: 100%"
                  ></div>
                  <p class="color_grey mt-4 mb-2">
                    {{ $t("transaction_history") }}
                  </p>
                  <v-simple-table>
                    <template v-slot:default>
                      <tbody>
                        <tr v-for="item in history" v-bind:key="item.id">
                          <td class="text-left px-0 font_12">
                            {{ item.name }}
                          </td>
                          <td class="text-center px-0 font_12">
                            {{ formatDateTime(item.createdAt) }} &nbsp; ({{
                              item.timeSince
                            }})
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <LoadingMe
        :isLoading="showLoading"
        :fullPage="false"
        type="loading"
        :myLoading="true"
        :alertMessage="loadingAlert"
        :color="loadingColorAlert"
        :alertText="loadingTextAlert"
      />
    </v-container>
  </v-app>
</template>

<script>
import LoadingMe from "@/components/Loading";
import kendo from "@progress/kendo-ui";
import InventoryAdjustment from "@/scripts/model/inventoryAdjustment";
// print
import { print } from "@/form/productForm.js";
const { inventoryCountNoteDefaultSetting } = require("@/form/defaultSetting");
const { getFormSetting } = require("@/scripts/settingsHandler.js");

const billingHandler = require("@/scripts/invoice/handler/billingHandler");
import { isDeleteAble, notAcessRight } from "@/utils";
import { i18n } from "@/i18n";
export default {
  name: "InventoryAdjustView",
  components: {
    LoadingMe: LoadingMe,
  },
  props: ["id"],
  data: () => ({
    valid: false,
    isEdit: false,
    itemLines: [],
    showLoading: true,
    loadingAlert: false,
    loadingColorAlert: "",
    loadingTextAlert: "",
    col_expand: 9,
    col_hide: 3,
    isHideBar: false,
    transaction: [],
    dateFormat: "",
    history: [],
    inventoryAdjustment: new InventoryAdjustment({}),
    reason: "",
  }),
  methods: {
    formatDateTime(value) {
      return kendo.toString(new Date(value), this.dateFormat + ` hh:mm tt`);
    },
    printHandle() {
      let params = "?formType=InventoryCountNote";
      window.console.log(this.inventoryAdjustment);
      getFormSetting(params).then((res) => {
        if (res.data.statusCode === 200) {
          if (res.data.data.length > 0) {
            print(this.inventoryAdjustment, 2, res.data.data["0"].settings);
          } else {
            print(this.inventoryAdjustment, 2, inventoryCountNoteDefaultSetting());
          }
        } else {
          print(this.inventoryAdjustment, 2, inventoryCountNoteDefaultSetting());
        }
      });
    },
    onDelete() {
      if (!isDeleteAble(5, 5.6, "Delete")) {
        notAcessRight("you_not_allow_to_perform_action");
        return;
      }
      this.$swal({
        title: i18n.t("are_you_sure_you_want_to_delete_it"),
        text: i18n.t("you_wont_be_able_to_revert_this"),
        icon: "warning",
        showCancelButton: true,
        input: "text",
        inputPlaceholder: "Input some reason",
        confirmButtonColor: "#4d4848",
        cancelButtonColor: "#ED1A3A",
        confirmButtonText: i18n.t("ok"),
      }).then((result) => {
        if (result.value) {
          if (result.value.length > 1) {
            this.reason = result.value;
            this.onSaveInventoryAdjustment();
          }
          // this.clear()
          // this.$router.go(-1)
        }
      });
    },
    async onSaveInventoryAdjustment() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          const txnId = this.$route.params.id;
          if (txnId) {
            const data = {
              id: txnId,
              transactionDateTZ: new Date().toISOString(),
              transactionDate: new Date().toISOString(),
              loggedUser: this.loggedUser,
              reason: this.reason,
              actionType: "delete",
              type: "Inventory Adjustment",
            };
            billingHandler
              .inventoryAdjustment(data)
              .then((response) => {
                if (response.data.statusCode === 201) {
                  this.$snotify.success(i18n.t("successfully"));
                  window.history.go(-1);
                }
              })
              .catch((e) => {
                this.$snotify.error("Something went wrong", e);
                // this.errors.push(e);
              });
          }
        }, 10);
      });
    },
    onEdit(type) {
      if (!isDeleteAble(5, 5.6, "Edit")) {
        notAcessRight("you_not_allow_to_perform_action");
        return;
      }
      const id = this.$route.params.id;
      this.$router.push({
        path: "inventory_adjustment/" + id,
        name: "Inventory Adjustment",
        params: { id: id },
        query: { type: type },
      });
    },
    async loadAdjustmentHistory() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          billingHandler
            .history(this.$route.params.id)
            .then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                this.history = res.data.data;
              }
            })
            .catch();
          {
            this.showLoading = false;
          }
        }, 10);
      });
    },
    async loadViewAdjustment() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          const params = {
            id: this.$route.params.id,
            type: "Inventory Adjustment",
          };
          billingHandler
            .inventoryAdjustmentList(params)
            .then((res) => {
              if (res.data.statusCode === 200) {
                this.showLoading = false;
                this.inventoryAdjustment = res.data.data[0];
                this.dateFormat = this.inventoryAdjustment.dateFormat || "dd-MM-yyyy";
                this.itemLines = this.inventoryAdjustment.itemLine;
              }
            })
            .catch();
          {
            this.showLoading = false;
          }
        }, 10);
      });
    },
    itemTemplate(dataItem) {
      const item = dataItem.item;
      if (item) {
        return `<span>${item.name ? item.name : ``}</span>`;
      } else {
        return ``;
      }
    },
    UOMTemplate(dataItem) {
      const uom = dataItem.buom;
      if (uom) {
        return `<span>${uom.name ? uom.name : ``}</span>`;
      } else {
        return ``;
      }
    },
    rowNumberTmpl(dataItem) {
      let ds = this.$refs.itemLineAdjustViewDS.kendoWidget(),
        index = ds.indexOf(dataItem);
      return index + 1;
    },
    hideSmallSidebar() {
      this.isHideBar = !this.isHideBar;
    },
    clear() {},
  },
  watch: {
    id() {
      if (this.$route.params.id === undefined) {
        this.clear();
      } else {
        this.showLoading = true;
        this.loadViewAdjustment();
        this.loadAdjustmentHistory();
      }
    },
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    // this.loadObj()
  },
  async mounted() {
    await this.loadViewAdjustment();
    await this.loadAdjustmentHistory();
  },
  computed: {
    transactionDate() {
      if (this.inventoryAdjustment) {
        if (this.inventoryAdjustment.hasOwnProperty("transactionDate")) {
          return kendo.toString(
            new Date(this.inventoryAdjustment.transactionDate),
            this.dateFormat
          );
        }
      }
      return "";
    },
    account() {
      if (this.inventoryAdjustment) {
        if (this.inventoryAdjustment.hasOwnProperty("account")) {
          return this.inventoryAdjustment.account.name;
        }
      }
      return "";
    },
    memo() {
      if (this.inventoryAdjustment) {
        if (this.inventoryAdjustment.hasOwnProperty("transactionNote")) {
          return this.inventoryAdjustment.transactionNote;
        }
      }
      return "";
    },
    journalNote() {
      if (this.inventoryAdjustment) {
        if (this.inventoryAdjustment.hasOwnProperty("journalNote")) {
          return this.inventoryAdjustment.journalNote;
        }
      }
      return "";
    },
    segment() {
      if (this.inventoryAdjustment) {
        if (this.inventoryAdjustment.hasOwnProperty("segment")) {
          if (this.inventoryAdjustment.segment.hasOwnProperty("id")) {
            return this.inventoryAdjustment.segment.name;
          }
        }
      }
      return "";
    },
    location() {
      if (this.inventoryAdjustment) {
        if (this.inventoryAdjustment.hasOwnProperty("location")) {
          if (this.inventoryAdjustment.location.hasOwnProperty("id")) {
            return this.inventoryAdjustment.location.name;
          }
        }
      }
      return "";
    },
    project() {
      if (this.inventoryAdjustment) {
        if (this.inventoryAdjustment.hasOwnProperty("project")) {
          if (this.inventoryAdjustment.project.hasOwnProperty("id")) {
            return this.inventoryAdjustment.project.name;
          }
        }
      }
      return "";
    },
    employee() {
      if (this.inventoryAdjustment) {
        if (this.inventoryAdjustment.hasOwnProperty("employee")) {
          if (this.inventoryAdjustment.employee.hasOwnProperty("id")) {
            return (
              this.inventoryAdjustment.employee.firstName +
              " - " +
              this.inventoryAdjustment.employee.lastName
            );
          }
        }
      }
      return "";
    },
  },
};
</script>

<style scoped>
.small_sidebar {
  height: 95%;
  position: relative;
  padding: 12px;
}

.hide_small_bar_class {
  max-width: 0;
  transition: 0.5s ease-in;
  flex: 0 0 0;
  padding: 0;
}

.hide_big_bar_class {
  max-width: 100%;
  transition: 0.5s ease-in;
  flex: 0 0 100%;
}

.iconArrow {
  right: -35px;
  position: absolute;
  bottom: -10px;
}

.iconArrowHide {
  position: absolute;
  right: -7px;
  bottom: -10px;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: transparent !important;
}

.detial_smallside_p {
  position: absolute;
  bottom: 10px;
}
</style>
