<template>
<div>
    <v-menu
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                :value="time"
                append-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
                @click:append="menu2 = true"
            />
        </template>
        <v-time-picker
          v-if="menu2"
          v-model="time"
           ampm-in-title
          @change="emitTime(),onChanged()"
          @click:minute="$refs.menu.save(time)"
        />
      </v-menu>
    </div>
</template>

<script>

export default {
    name: 'TimePicker',
    props: ['initialTime'],
    data() {
        return {
            menu: false,
            menu2: false,
            time: '',
        }
    },
    methods: {
        emitTime() {
            this.menu2 = false;
            this.$emit('emitTime', this.time);
        },
        onChanged() {
            this.$emit('onChanged')
        },
    },
    watch: {
        initialTime() {
            this.time = this.initialTime
            window.console.log('in2', this.time)
        }
    }
   
}
</script>