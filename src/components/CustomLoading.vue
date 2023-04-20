<template>
    <div class="loading">
        <img hight="150" width="150" src="../assets/images/banhji-loading.gif" />
        <!-- <v-card>
            <v-snackbar
                v-model="snackbar"
                :bottom="y === 'bottom'"
                :color="color"
                :left="x === 'left'"
                :multi-line="mode === 'multi-line'"
                :right="x === 'right'"
                :timeout="timeout"
                :top="y === 'top'"
                :vertical="mode === 'vertical'"
            >
                {{ text }}
        
                <template v-slot:action="{ attrs }">
                <v-btn
                    dark
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                >
                    Close
                </v-btn>
                </template>
            </v-snackbar>
        </v-card> -->
    </div>
</template>
<script>
export default {
    name: "CustomLoading",
    data:() => ({
    //   color: '',
    //   mode: '',
    //   snackbar: true,
    //   text: 'Hello, I\'m a snackbar',
    //   timeout: 6000,
    //   x: 'right',
    //   y: 'top',
    })
}
</script>
<style scoped>
</style>
