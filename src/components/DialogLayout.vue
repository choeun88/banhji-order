<template>
    <v-dialog v-model="dialogM2" max-width="700px">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" class=" text-capitalize white--text float-right" v-on="on"
                    @click="onNewClick">
                {{ $t('create_new') }}
            </v-btn>
        </template>
        <v-card>
            <div class="card_header">
                <v-card-title>{{ $t('tax_setting') }}</v-card-title>
                <v-icon class="btn_close" @click="dialogM2 = false">close</v-icon>
            </div>
            <v-divider/>
            <v-card-text :class="{'setCardHeight': setCardHeight,'setCardHeightOther': !setCardHeight}"
                            style=" background-color: #EDF1F5; color: #333;">
            
            </v-card-text>
            <v-divider/>
            <v-card-actions class="px-5 py-2">
                <v-row>
                    <v-col sm="6" cols="6" class="py-0 text-left">
                        <v-btn color="black" outlined
                                class=" text-capitalize  black--text float-left"
                                @click="dialogM2 = false">{{ $t('cancel') }}
                        </v-btn>
                    </v-col>
                    <v-col sm="6" cols="6" class="py-0 text-right">
                        <v-btn color="primary" class="px-3  white--text text-capitalize"
                                @click.native="onSaveClose()">{{ $t('save_close') }}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    
}
</script>