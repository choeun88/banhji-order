<template>
  <div>
    <input :id="id" style="width: 100%; margin-top: 4px" />
  </div>
</template>

<script>
import kendo from "@progress/kendo-ui";
import ProductSubGroup from "@/scripts/model/ProductSubGroup";

const apiUrl = require("@/api/product");
export default {
  name: "ProductSubGroupDropDownList",
  components: {},
  props: {
    initProductGroup: {
      type: Object,
    },
    initModel: {
      type: Object,
    },
    // cateId: {
    //     type: String
    // }
  },
  data() {
    return {
      subGroup: new ProductSubGroup({}),
      selectValue: {},
      url: apiUrl.subgroup_getallv2,
      id: "ddlProductSubGroup_" + Math.floor(Math.random() * 1000),
    };
  },
  // computed: mapState({
  //     segments: state => state.segments.all
  // }),
  methods: {
    async onChange(ev) {
      if (ev) {
        const selectedIndex = ev.sender.select();
        const selectedItem = ev.sender.dataItem(selectedIndex).toJSON();
        this.subGroup = new ProductSubGroup(selectedItem);
        this.$emit("onChange", this.subGroup);
      }
    },
    bindData(url) {
      kendo.jQuery("#" + this.id).kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        dataSource: new kendo.data.DataSource({
          transport: {
            read: {
              url: url,
              contentType: "application/json",
              data: function () {
                return {
                  pattern: "sgr#Product",
                };
              },
              type: "POST",
              dataType: "json",
            },
            parameterMap: function (options) {
              return kendo.stringify(options);
            },
            dataType: "json",
          },
          schema: {
            model: {
              id: "id",
            },
            data: (response) => {
              // if (response.data.length > 0) {
              //     const row = response.data[0]
              //     this.$emit('onChange', row);
              // }
              this.selectItem();
              return response.data;
              //   return response.data.filter(
              //     (row) => row.group.category.type.name === "Product"
              //   );
            },
          },
          subGroup: { field: "category.name" },
        }),
        change: this.onChange,
        filter: "contains",
        optionLabel: "-- Select --",
      });
    },
    async selectItem() {
      // do stuff
      if (this.initModel) {
        const id = this.initModel.id || "";
        if (id !== "") {
          const dropId = kendo.jQuery("#" + this.id).data("kendoDropDownList");
          dropId.value(id);
        }
      }
    },
  },
  watch: {
    initProductGroup() {
      this.subGroup = this.initProductGroup;
    },
    initModel() {
      if (this.selectValue) {
        this.selectValue = this.initModel;
        this.selectItem();
      }
    },
    // initCateId() {
    //     this.cateId = this.initCateId;
    // },
  },
  async created() {
    // this.loadData(this.url);
  },
  async mounted() {
    this.bindData(this.url);
    /* Initial obj */
    this.subGroup = this.initProductGroup;
    this.selectValue = this.initModel;
    // this.cateId = this.initCateId;
    // this.$emit('onChange', this.pmOption);
    // create DropDownList from input HTML element
    // await this.loadData('', this.supBaseUrl);
  },
};
</script>