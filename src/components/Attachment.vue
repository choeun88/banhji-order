<template>
    <v-row class="white">
        <v-col sm="12" cols="12" class="py-0">
            <p class="mb-2 grey--text font_14">{{$t('file_type')}} [PDF, JPG, JPEG, TIFF, PNG, GIF]</p>
            <template>
                <v-file-input
                    v-model="files"
                    @change="onFileChange"
                    accept="image/jpg, image/jpeg, application/pdf"
                    :placeholder="$t('attachments')"
                    single
                    prepend-icon="mdi-paperclip">
                    <template v-slot:selection="{ text }">
                        <v-chip small label color="primary">
                            {{ text }}
                        </v-chip>
                    </template>
                </v-file-input>
                <v-text-field
                    v-model="fileDesc"
                    outlined
                    :placeholder="$t('description')"
                    clearable/>
            </template>
                <v-btn
                    color="primary"
                    class="text-capitalize white--text"
                    @click="uploadFile">
                    <v-icon size="15" class="mr-2">fa-check</v-icon>{{ $t("upload") }}
                </v-btn> 
                <template>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        type="loading"
                        :myLoading="true"/>
                    <kendo-datasource
                        ref="attachmentDS"
                        :data="attachmentList"/>
                        <kendo-grid
                            id="gridAttachment"
                            class="grid-function"
                            :data-source-ref="'attachmentDS'"
                            :editable="false"
                            :scrollable-virtual="true">
                            <kendo-grid-column
                                :field="''"
                                :title="$t('open')"
                                :width="70"
                                :template="fileUrl"
                                :attributes="{ style: 'text-align: center' }"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :field="'fileName'"
                                :title="$t('file_name')"
                                :width="250"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :field="'description'"
                                :title="$t('description')"
                                :width="250"
                                :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                            <kendo-grid-column
                                :field="'fileType'"
                                :title="$t('file_type')"
                                :width="150"
                                :headerAttributes="{style:'background-color: #EDF1F5, color: green !important'}"/>
                            <kendo-grid-column
                                :field="'size'"
                                :title="$t('size')"
                                :width="150"
                                :template="byteToMB"
                                :headerAttributes="{style:'background-color: #EDF1F5, color: green !important'}"/>
                            <kendo-grid-column
                                :field="'createdAt'"
                                :title="$t('date')"
                                :width="120"
                                :template="'<span>#= kendo.toString(new Date(createdAt), dateFormat)#</span>'"
                                :headerAttributes="{style:'background-color: #EDF1F5, color: green !important'}"/>
                            <kendo-grid-column
                                :field="''"
                                :title="$t('action')"
                                :width="100"
                                :visible="true"
                                :command="[{iconClass: 'k-icon k-i-delete', text: ' ', click: deletedFunction }]"
                                :headerAttributes="{style: 'text-align: center; background-color: #EDF1F5'}"
                                :attributes="{ style: 'text-align: center'}"/>
                        </kendo-grid>
                </template>
        </v-col>
    </v-row>
</template>
<script>
    import kendo from "@progress/kendo-ui"
    import {i18n} from "@/i18n";
    const billingHandler = require("@/scripts/invoice/handler/billingHandler");
    export default {
        name: "",
        props: ['initAccount'],
        components: {
            LoadingMe: () => import(`@/components/Loading`),
        },
        data() {
            return {
                showLoading: false,
                files: [],
                attachments: [],
                attachment: {},
                fileDesc: '',
                attachmentList: []
            }
        },
        methods: {
            onFileChange(e) {
                window.console.log('e',e)
                this.$emit('initData', this.attachment);
                if (e) {
                    this.fileDesc = e.name;
                    this.fileName = e.name;
                    this.fileSize = e.size;
                    this.fileType = e.type;
                    let input = this.files;
                    // Ensure that you have a file before attempting to read it
                    if (input) {
                        let reader = new FileReader();
                        // Define a callback function to run, when FileReader finishes its job
                        reader.onloadend = (e) => {
                            // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                            // Read image as base64 and set to imageData
                            this.imgFile = e.target.result;
                        };
                        // Start the reader job - read file as a data url (base64 format)
                        reader.readAsBinaryString(input);
                        this.src = URL.createObjectURL(input);
                    }
                }
            },
            uploadFile(){
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        if (this.imgFile) {
                            const id = this.attachment.uuid || "";
                            const name = this.attachment.name || "";
                            let data = {
                                file: this.imgFile,
                                info: {
                                    name: this.fileName,
                                    description: this.fileDesc,
                                    size: this.fileSize,
                                    type: this.fileType,
                                },
                                type: "Account",
                                id: id,
                                name: name,
                            };
                            this.showLoading = true;
                            if(id !==''){
                                billingHandler.attachment(data).then((res) => {
                                    if (res.data.statusCode === 201) {
                                        this.showLoading = false;
                                        this.imgFile = null;
                                        this.src = "";
                                        this.fileDesc = "";
                                        this.fileName = "";
                                        this.fileSize = 0;
                                        this.fileType = "";
                                        this.files      = []
                                        this.$snotify.success("Success");
                                        this.loadAttachment();
                                        // // this.txnList = JSON.parse(JSON.stringify(res.data.data))
                                        // // window.console.log('transactions', this.txnList)
                                    }
                                });
                            }else{
                                this.showLoading = false;
                                this.$snotify.error("Please check again!");
                            }
                        } else {
                            this.showLoading = false;
                            this.$snotify.error("Please browse to upload image");
                        }
                    }, 10);
                });
            },
            async loadAttachment() {
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        // if (this.$route.params.hasOwnProperty('id')) {
                        this.showLoadingAtch = true;
                        const strFilter = "?id=" + this.attachment.uuid;
                        billingHandler.attachmentList(strFilter).then((res) => {
                            if (res.data.statusCode === 200) {
                                this.showLoadingAtch = false;
                                this.attachmentList = res.data.data;
                            }
                        });
                        // }
                    }, 10);
                });
            },
            fileUrl(dataItem) {
                if (dataItem.fileUrl) {
                    return `<a target="_blank" style="color:#ED1A3A !important" href="${dataItem.fileUrl}"><span>Open</span></a>`;
                }
                return ``;
            },
            byteToMB(dataItem) {
                const FileSize = dataItem.size || 0; // in MiB
                const marker = 1024; // Change to 1000 if required
                const decimal = 3; // Change as required
                const kiloBytes = marker; // One Kilobyte is 1024 bytes
                const megaBytes = marker * marker; // One MB is 1024 KB
                const gigaBytes = marker * marker * marker; // One GB is 1024 MB
                // const teraBytes = marker * marker * marker * marker; // One TB is 1024 GB

                // return bytes if less than a KB
                if (FileSize < kiloBytes) {
                    return FileSize + " Bytes";
                }
                // return KB if less than a MB
                else if (FileSize < megaBytes) {
                    return (FileSize / kiloBytes).toFixed(decimal) + " KB";
                }
                // return MB if less than a GB
                else if (FileSize < gigaBytes) {
                    return (FileSize / megaBytes).toFixed(decimal) + " MB";
                }
                // return GB if less than a TB
                else {
                    return (FileSize / gigaBytes).toFixed(decimal) + " GB";
                }

                /* var FileSize = file.files[0].size / 1024 / 1024; // in MiB
                    if (FileSize > 2) {
                        alert('File size exceeds 2 MiB');
                        // $(file).val(''); //for clearing with Jquery
                    } else {
                                alert('File size' + FileSize);
                    } */
            },
            deletedFunction(e){
                this.$swal({
                    title: i18n.t("msg_title_warning"),
                    text: i18n.t("msg_deleted"),
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: i18n.t("cancel"),
                    confirmButtonColor: "#4d4848",
                    cancelButtonColor: "#ED1A3A",
                    confirmButtonText: i18n.t("discard"),
                }).then((result) => {
                    if (result.value) {
                        e.preventDefault();
                        let grid = kendo.jQuery("#gridAttachment").data("kendoGrid");
                        let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
                        window.console.log('dataItem', dataItem)
                        let params = {
                            id: dataItem.attachId,
                            key: dataItem.key
                        }
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve("resolved");
                                this.showLoadingAtch = true;
                                billingHandler.attachmentDelete(params).then((res) => {
                                    if (res.data.statusCode === 200) {
                                        this.showLoadingAtch = false;
                                        this.loadAttachment()
                                    }
                                });
                                // }
                            }, 10);
                        });
                    }
                });
            }
        },
        watch: {
            initAccount () {
                this.attachment = this.initAccount;
                this.loadAttachment()
            },
        },
        mounted () {
            this.loadAttachment()
            this.attachment = this.initAccount;
        }
    }
</script>
<style scoped>
</style>