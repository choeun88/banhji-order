<template>
  <v-row class="">
    <v-col sm="12" cols="12" class="pt-0">
      <v-tabs >

        <v-tab>
          <span class=" text-uppercase">
            {{ $t("service_categories") }}
          </span>
        </v-tab>
        <v-tab>
          <span class=" text-uppercase">
            {{ $t("service_group") }}
          </span>
        </v-tab>
        <v-tab>
          <span class="text-uppercase">
            {{ $t("service_sub_group") }}
          </span>
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="pt-3 pr-0">
              <Categories />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="pt-3 pr-0">
              <Group />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="pt-3 pr-0">
              <SubGroup />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-col>
  </v-row>
</template>
<script>
import { dataStore } from "@/observable/store";
export default {
  data: () => ({
    isHide: false,
  }),
  props: {},
  methods: {
    hideTabs() {
      this.isHide = !this.isHide;
    },
  },
  components: {
    Categories: () => import("./Categories"),
    Group: () => import("./Group"),
    SubGroup: () => import("./SubGroup"),
  },
  computed: {
    appType() {
      return dataStore.productType;
    },
  },
};
</script>
<style scoped>
.v-tab {
  justify-content: left;
  text-align: left;
  white-space: normal;
  font-size: 16px;
}
p {
  color: rgba(0, 0, 0, 0.87);
}

@media (max-width: 576px) {
}

.tab_setting {
  position: relative;
}

.arr_icon {
  color: #2ca01c;
}

.arr_icon1 {
  color: #2ca01c;
}
</style>
