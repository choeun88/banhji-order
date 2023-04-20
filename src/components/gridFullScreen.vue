<template>
    <div :class="{'grid_fullscreen': isFullScreen,'grid_not_fullscreen': !isFullScreen }">
        <div style="position: absolute; z-index: 200; right: -10px;padding: 10px; top:-3px;">
                <v-card elevation="0" @click=" isFullScreen = !isFullScreen" >
                    <span>{{isFullScreen ? $t('exit_full_screen') :  $t('full_screen')}}</span>
                </v-card>
        </div>
        <slot/>
    </div>
</template>
<script>
export default {
    name: 'gridFullScreen',
    data() {
        return {
            isFullScreen: false
        }
    },
}
</script>