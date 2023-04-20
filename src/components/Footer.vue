<template>
    <v-container class="pb-0">
        <v-row>
            <v-col class="py-0">
                <p class="mb-2">Time start: {{h}}:{{m}}:{{s}}:{{ms}}</p>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: "",
    data: () => ({
        intervalid: '',
        time: '00:00:00.000',
        hours : 0,
        minutes : 0,
        seconds : 0,
        milliseconds : 0,
        h: 0,
        m: 0,
        s: 0,
        ms: 0
    }),
    
    methods: {
        startTimer(){
            this.milliseconds++;
            //Add 0 before millisecond count under 10
            if (this.milliseconds < 10){
                this.ms = "0" + this.milliseconds;
            }
            //Remove 0 above 10
            if (this.milliseconds > 10){
                this.ms = this.milliseconds;
            }
            //Add a second, reinitiate millisecond count 
            if (this.milliseconds > 99){
                this.seconds++;
                this.s = this.seconds;
                this.milliseconds = 0;
                this.ms = "0" + 0;
            }
            //Add 0 before second count under 10
            if (this.seconds < 10){
                this.s = "0" + this.seconds;
            }
            //Remove 0 above 10
            if (this.seconds > 10){
                this.s = this.seconds;
            }
            //Add a minute, reinitiate second count   
            if (this.seconds > 59){
                this.minutes++;
                this.m = this.minutes;
                this.seconds = 0;
                this.s = "0" + 0;
            }
            //Add 0 before minute count under 10 
            if (this.minutes < 10){
                this.m = "0" + this.minutes;
            }
            //Remove 0 above 10
            if (this.minutes > 10){
                this.m = this.minutes;
            }
            //Add a hour, reinitiate minute count 
            if (this.minutes > 59){
                this.hours++;
                this.h = this.hours;
                this.minutes = 0;
                this.m = "0" + 0;
            }
            //Add 0 if hour under 10
            if (this.hours < 10) {
                this.h = "0" + this.hours;
            }
        },
        startTime(){
            const selft = this
            setInterval(() => {
                    selft.startTimer()
            }, 10);
        }
    },
    mounted(){
      this.startTime()
    }
}
</script>