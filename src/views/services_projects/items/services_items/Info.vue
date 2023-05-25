<template>
  <v-row class="px-1">
    <v-col sm="12" cols="12">
      <v-row>
        <v-col sm="12" cols="12" class="py-0">
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td class="text-uppercase">{{ $t("name") }}</td>
                  <td class="text-left text-bold">{{ service.name }}</td>
                </tr>
                <tr>
                  <td class="text-uppercase">{{ $t("categories") }}</td>
                  <td class="text-left text-bold">{{ category }}</td>
                </tr>
                <tr>
                  <td class="text-uppercase">{{ $t("group") }}</td>
                  <td class="text-left text-bold">{{ group }}</td>
                </tr>
                <tr>
                  <td class="text-uppercase">{{ $t("sub_group") }}</td>
                  <td class="text-left text-bold">{{ subGroup }}</td>
                </tr>
                <!-- <tr>
                  <td class="text-uppercase">{{ $t("uom") }}</td>
                  <td class="text-left text-bold">{{ uom }}</td>
                </tr> -->
                <tr>
                  <td class="text-uppercase">{{ $t("uom") }}</td>
                  <td class="text-left text-bold">
                    <div v-if="btnUOMEnabled">
                      {{ itemUOM }}
                    </div>
                    <div v-else-if="!btnUOMEnabled">
                      <v-select
                        class="mt-1"
                        tage="UOM"
                        v-model="uom_"
                        :disabled="btnUOMEnabled"
                        :items="uoms"
                        item-value="id"
                        item-text="name"
                        :rules="[(v) => !!v['id'] || $t('is_required')]"
                        return-object
                        outlined
                      />
                    </div>
                  </td>
                  <div v-if="!btnUOMEnabled">
                    <td class="text-left text-bold">
                      <v-btn
                        width="50"
                        color="primary"
                        :disabled="btnUOMEnabled"
                        @click="onConfirmSave"
                        class="white--text float-right text-capitalize"
                      >
                        {{ $t("save") }}
                      </v-btn>
                    </td>
                  </div>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-col>
    <!--        <v-col sm="12" cols="12" class="pb-0">-->
    <!--            &lt;!&ndash;            <v-simple-table>&ndash;&gt;-->
    <!--            &lt;!&ndash;                <template v-slot:default>&ndash;&gt;-->
    <!--            &lt;!&ndash;                    <tbody>&ndash;&gt;-->
    <!--            &lt;!&ndash;                    <tr>&ndash;&gt;-->
    <!--            &lt;!&ndash;                        <td class="text-uppercase third white&#45;&#45;text ">{{ $t('revenue') }}</td>&ndash;&gt;-->
    <!--            &lt;!&ndash;                        <td class="text-bold third white&#45;&#45;text text-right">$10,000</td>&ndash;&gt;-->
    <!--            &lt;!&ndash;                    </tr>&ndash;&gt;-->
    <!--            &lt;!&ndash;                    <tr>&ndash;&gt;-->
    <!--            &lt;!&ndash;                        <td class="text-uppercase third white&#45;&#45;text">{{ $t('monthly_revenue') }}</td>&ndash;&gt;-->
    <!--            &lt;!&ndash;                        <td class="text-bold third white&#45;&#45;text text-right"/>&ndash;&gt;-->
    <!--            &lt;!&ndash;                    </tr>&ndash;&gt;-->
    <!--            &lt;!&ndash;                    <tr>&ndash;&gt;-->
    <!--            &lt;!&ndash;                        <td class="secondary white&#45;&#45;text text-uppercase">{{ $t('cost') }}</td>&ndash;&gt;-->
    <!--            &lt;!&ndash;                        <td class="secondary white&#45;&#45;text text-right text-bold">$10,000</td>&ndash;&gt;-->
    <!--            &lt;!&ndash;                    </tr>&ndash;&gt;-->
    <!--            &lt;!&ndash;                    <tr>&ndash;&gt;-->
    <!--            &lt;!&ndash;                        <td  class="secondary white&#45;&#45;text text-uppercase">{{ $t('last_used') }}</td>&ndash;&gt;-->
    <!--            &lt;!&ndash;                        <td  class="secondary white&#45;&#45;text text-right text-bold">7/10/2020</td>&ndash;&gt;-->
    <!--            &lt;!&ndash;                    </tr>&ndash;&gt;-->
    <!--            &lt;!&ndash;                    </tbody>&ndash;&gt;-->
    <!--            &lt;!&ndash;                </template>&ndash;&gt;-->
    <!--            &lt;!&ndash;            </v-simple-table>&ndash;&gt;-->
    <!--        </v-col>-->
    <v-col sm="12" cols="12">
      <v-row>
        <v-col sm="12" cols="12" class="py-0">
          <router-link
            :to="{
              path: 'service' + `/${this.service ? this.service.id : ''}`,
              query: { type: 'edit' },
            }"
          >
            <v-btn
              width="120"
              color="primary"
              :disabled="btnEnabled && isPlan"
              class="white--text float-right text-capitalize ml-5"
            >
              {{ $t("edit_service") }}
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
const uomHandler = require("@/scripts/uomHandler");
const productVariantHandler = require("@/scripts/productVariantHandler");
import { i18n } from "@/i18n";
export default {
  name: "ServiceInfo",
  props: {
    service: {},
  },
  data() {
    return {
      pic: "amret.png",
      url: "https://s3-ap-southeast-1.amazonaws.com/images.banhji/",
      uoms: [],
      uom___: {},
    };
  },
  methods: {
    onUpdate() {
      this.$emit("onUpdate", this.service ? this.service : {});
    },
    callback() {
      if (
        this.$route.params !== null &&
        this.$route.params.hasOwnProperty("data")
      ) {
        // this.service = this.$route.params.data
        this.$emit("onUpdate", this.$route.params.data);
      }
      // window.console.log('im changed', this.service)
    },
    async loadUOM() {
      uomHandler.get().then((res) => {
        this.uoms = res;
        window.console.log("uoms", this.uoms);
      });
    },
    onConfirmSave() {
      const service = this.service || {};
      const uom_ = service.uom || {};
      const uomId = uom_.id || "";
      const oldUOM = this.uom___ || {};
      const oldUOMId = oldUOM.id || "";
      window.console.log("this.uom", this.uom___, "uom_", uom_);
      if (oldUOMId !== "") {
        if (uomId !== oldUOMId) {
          this.$swal({
            title: i18n.t("are_you_sure_you_want_to_update"),
            text: i18n.t("you_wont_be_able_to_revert_this"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4d4848",
            cancelButtonColor: "#ED1A3A",
            confirmButtonText: i18n.t("ok"),
          }).then((result) => {
            if (result.value) {
              this.onSaveBaseUOM();
            }
          });
        }
      }
    },
    async onSaveBaseUOM() {
      if (this.id === "") {
        return;
      }
      const uom_ = this.uom___ || {};
      const category = uom_.category || {};
      const uomCat = {
        id: category.id || "",
        name: category.name || "",
      };
      const uom = {
        id: uom_.id || {},
        category: uomCat,
        name: uom_.name || "",
      };
      const data = {
        id: this.id,
        uom: uom,
      };
      window.console.log('data', data)
      productVariantHandler
        .attributeUpdate(data)
        .then((response) => {
          if (response.data.statusCode === 201) {
            this.$snotify.success("Success");
          }
        })
        .catch((e) => {
          this.$snotify.error("Something went wrong");
          this.errors.push(e);
        });
    },
  },
  mounted: async function () {
    this.loadUOM();
  },
  computed: {
    subGroup() {
      if (this.service) {
        if (this.service.subGroup) {
          return this.service.subGroup.name;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    uom() {
      if (this.service) {
        if (this.service.uom) {
          return this.service.uom.name;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    group() {
      if (this.service) {
        if (this.service.group) {
          return this.service.group.name;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    category() {
      if (this.service) {
        if (this.service.category) {
          return this.service.category.name;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    imgURL() {
      if (this.service) {
        if (this.service.images) {
          let img = this.service.images;
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
      if (this.service) {
        return !this.service;
      } else {
        return false;
      }
    },
    isPlan() {
      if (this.service) {
        return this.service.isPlan;
      } else {
        return false;
      }
    },
    uom_: {
      get() {
        if (this.service) {
          const service = this.service || {};
          const uom_ = service.uom || {};
          const uomId = uom_.id || "";
          if (uomId !== "") {
            return uom_;
          } else {
            return {};
          }
        }
        return {};
      },
      set(newUOM) {
        this.uom___ = newUOM;
        return newUOM;
      },
    },
    btnUOMEnabled() {
      return this.service.hasTxn;
    },
    itemUOM() {
      if (this.service) {
        const service = this.service || {};
        const uom_ = service.uom || {};
        const uomId = uom_.id || "";
        if (uomId !== "") {
          return uom_.name || "";
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    id() {
      if (this.service) {
        return this.service.id;
      } else {
        return "";
      }
    },
  },
  watch: {
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

.v-application .secondary,
.v-application .third {
  border-color: #fff !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr.secondary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: #4d4848 !important;
}

.theme--light.v-data-table {
  background-color: transparent !important;
  border-top: thin solid #ddd;
  border-bottom: thin solid #ddd;
  border-radius: 0 !important;
}

/* .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    border-bottom: thin solid #ddd;
} */

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px !important;
}
</style>
