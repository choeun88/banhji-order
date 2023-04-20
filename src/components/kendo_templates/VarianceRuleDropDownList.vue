<template>
    <v-select
        :loading="loading"
        class="mt-1"
        placeholder="Select Variance Rule"
        v-model="varianceRule"
        :items="varianceRules"
        item-text="name"
        item-value="uuid"
        @change="emitVarianceRule();onChanged()"
        return-object
        clearable
        outlined/>
</template>

<script>
import {VarianceRuleModel} from "@/scripts/model/AppModels";

const {varianceRuleHandler} = require("@/scripts/AppHandlers");

export default {
    name: 'VarianceRuleDropDownList',
    props: {
        initVarianceRule: {
            type: VarianceRuleModel,
        },
    },
    data() {
        return {
            varianceRule: new VarianceRuleModel(),
            varianceRules: [],
            loading: false
        }
    },
    methods: {
        emitVarianceRule() {
            this.$emit('emitVarianceRule', new VarianceRuleModel(this.varianceRule));
        },
        onChanged() {
            this.$emit('onChanged');
        },
    },
    watch: {
        initVarianceRule() {
            this.varianceRule = this.initVarianceRule;
        }
    },
    created() {
        this.loading = true
        // Call Obj List
        varianceRuleHandler.getAll()
            .then(res => {
                if (res) {
                    let varianceRuleList = [];
                    res.data.forEach(value => {
                        let rule = new VarianceRuleModel(value);
                        varianceRuleList.push(rule);
                    });
                    this.varianceRules = varianceRuleList;
                }
                this.loading = false
            })
    },
    mounted() {
        /* Initial Obj */
        this.varianceRule = this.initVarianceRule;
    }
}
</script>