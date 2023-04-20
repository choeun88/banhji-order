<template>
  <!-- <v-select
        :loading="languages.length <= 0"
        class="mt-1"
        placeholder="Select"
        v-model="language"
        :items="languages"
        item-text="text"
        item-value="value"
        @change="emitLanguage();onChanged();"
        outlined/> -->
  <div class="flex-end">
    <li class="my_dropdown" style="display: initial !important">
      <a href="#" class="pr-2 font_16 d-flex flex-column">
        <span class="fontLight font_10 line_12">
          {{ $t("reporting_language") }}
        </span>
        <span class="text-bold text-capitalize font_14 line_13">
          {{ language == "local"?'ភាសាខ្មែរ':'English' }}
        </span>
      </a>
      <ul class="dropdown_nav_report dropdown_nav">
        <li @click="emitLanguage('local')">ខ្មែរ</li>
        <li @click="emitLanguage('english')">English</li>
      </ul>
    </li>
  </div>
  <!-- <label style="font-size: 12px !important" class="" >{{ $t("reporting_language") }}:</label> -->
</template>

<script>
export default {
  name: "ReportingLanguageDropDownList",
  props: ["initLanguage"],
  data() {
    return {
      language: "english",
      languages: [
        { text: "English", value: "english" },
        { text: "ខ្មែរ", value: "local" },
      ],
    };
  },
  methods: {
    emitLanguage(val) {
      this.language = val;
      this.$emit("emitLanguage", this.language);
    },
    onChanged() {
      this.$emit("onChanged");
    },
  },
  watch: {
    initLanguage() {
      this.language = this.initLanguage;
    },
  },
  mounted() {
    /* Initial Obj */
    this.language = this.initLanguage;
  },
};
</script>