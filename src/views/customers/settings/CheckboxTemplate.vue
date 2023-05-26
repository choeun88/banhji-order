<template>
  <input type="checkbox" class="k-checkbox" @change="onChanged" v-model="checked"/>
</template>

<script>
export default {
  name: "rowTemplate",
  methods: {
    onChanged: function () {
      // this.item['tick'] = this.checked
      // return this.item
      // window.console.log(this.checked, 'value', this.item)
      // this.templateArgs.parentComponent.updateSelection(this.item, this.checked);
    }
  },
  data() {
    return {
      templateArgs: {},
      isEditing: false,
      isDeleting: false
    };
  },
  computed: {
    item() {
      return this.templateArgs.dataItem;
    },
    checked: {
      get() {
        return this.item.tick;
      },
      set(value) {
        // window.console.log(value, 'computed value')
        // this.item['tick'] = value
        this.templateArgs.parentComponent.updateSelection(this.item, value);
      }
    }
  }
};
</script>
<style scoped>
.k-checkbox:checked, .k-checkbox.k-checked {
  border-color: #ff6358;
  color: #ffffff;
  background-color: #ff6358;
}

input[type=checkbox], input[type=radio] {
  box-sizing: border-box;
  padding: 0;
}
</style>