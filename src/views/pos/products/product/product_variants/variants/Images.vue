<template>
    <v-row>
        <v-col cols="12" sm="12" class=" pt-0">
            <v-row>
                <v-col sm="7" class="py-0">
                    <p class="font_18 mb-0 mt-3">{{ product.name }}</p>
                </v-col>
                <v-col sm="5" class="py-0">
                    <input
                        type="file"
                        name="image"
                        id="image"
                        :rules="fileSizeRules"
                        accept=".png, .jpg, .jpeg"
                        ref="fileUpload"
                        @change="onFileChange"/>
                </v-col>
            </v-row>
            <v-divider/>
            <v-row>
                <v-col sm="5" style="height: 400px; overflow: hidden; overflow-x: auto;
                overflow-y: scroll; white-space: nowrap; ">
                    <v-row>
                        <v-col sm="6" cols="12" class="pb-0 px-3">
                            <v-img v-bind:src="`${defaultThumb}`" style="width:70%;" @click="defaultPreview"/>
                        </v-col>
                    </v-row>
                    <v-row v-for="img in galleryThumb" v-bind:key="img.thumb">
                        <v-col sm="6" cols="12" class="pb-0 px-3">
                            <v-img v-bind:src="url + `${img.thumb}`" style="width:70%;" @click="preview(img)"/>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col sm="7" cols="12" class="pb-0">
                    <v-img :src="imgPreview"/>
                    <p class="mb-0 text-center font_16">
                        <v-icon size="13" class="mr-2 primary--text">fa fa-check</v-icon>
                        {{ $t('default_image') }}
                    </p>
                    <p class="mt-4 text-center text-grey">{{ $t('hint_you_can') }}</p>
                </v-col>

            </v-row>
            <v-divider class="mb-3"/>
            <v-row>
                <v-col sm="6" cols="6" class="py-0 text-left">
                    <!--                    <v-btn color="black" outlined-->
                    <!--                           class=" text-capitalize  black&#45;&#45;text float-left"-->
                    <!--                           @click="dialogm2 = false">{{ $t('cancel') }}-->
                    <!--                    </v-btn>-->
                </v-col>
                <v-col sm="6" cols="6" class="py-0 text-right">
                    <v-btn color="primary" :disabled="btnEnabled" class="px-3  white--text text-capitalize"
                           @click="uploadImage">
                        {{ $t('upload') }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
const productVariantHandler = require("@/scripts/productVariantHandler")
export default {
    props: ['product'],
    data: () => ({
        product_img: "aba.png",
        url: 'https://s3-ap-southeast-1.amazonaws.com/images.banhji/',
        src: '',
        imgPreview: '',
        fileSizeRules: [
            files => !files || !files.some(file => file.size > 1024 * 1024) || 'Image size should be less than 1 MB!'
        ],
    }),
    methods: {
        onUpdate() {
            this.$emit('onUpdate', this.product)
        },
        preview(img) {
            if (img) {
                if (img.hasOwnProperty('bigThumb')) {
                    this.imgPreview = this.url + img.bigThumb
                } else {
                    this.imgPreview = ''
                }
            } else {
                this.imgPreview = ''
            }
        },
        defaultPreview() {
            if (this.product) {
                if (this.product.id) {
                    if (this.product.hasOwnProperty('images')) {
                        const images = this.product.images
                        if (images.hasOwnProperty('default')) {
                            if (images.default.hasOwnProperty('bigThumb')) {
                                this.imgPreview = this.url + images.default.bigThumb
                            }
                        } else {
                            this.imgPreview = ''
                        }
                    }

                } else {
                    this.imgPreview = ''
                }
            }

        },
        onFileChange(e) {
            let input = e.target
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                if (input.files[0].size > 1024 * 1024) {
                    e.preventDefault();
                    alert('File too big (> 1MB)');
                    this.src = ''
                    this.imgFile = ''
                    this.$refs.fileUpload.value = null;
                } else {
                    // create a new FileReader to read this image and convert to base64 format
                    let reader = new FileReader()
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onloadend = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.imgFile = e.target.result
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsBinaryString(input.files[0])
                    this.src = URL.createObjectURL(e.target.files[0])
                }
            }
        },
        async uploadImage() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    if (this.imgFile) {
                        let data = {
                            id: this.product.id,
                            productId: this.product.productId,
                            file: this.imgFile
                        }
                        productVariantHandler.upload(data).then(response => {
                            if (response.data.statusCode === 201) {
                                this.$emit('onUpdate', response.data.data)
                                this.$snotify.success('Success')
                            }
                        }).catch(e => {
                            this.errors.push(e)
                        })
                    } else {
                        this.$snotify.error('Please browse to upload image')
                    }

                }, 100)
            })
        }
    }
    ,
    computed: {
        btnEnabled() {
            return !this.product.id;
        }
        ,
        defaultThumb() {
            if (this.product) {
                if (this.product.id) {
                    if (this.product.hasOwnProperty('images')) {
                        const images = this.product.images
                        if (images.hasOwnProperty('default')) {
                            if (images.default.hasOwnProperty('thumb')) {
                                return this.url + images.default.thumb
                            }
                        }
                    }
                }
            }
            return ''
        }
        ,
        galleryThumb() {
            if (this.product) {
                if (this.product.id) {
                    if (this.product.hasOwnProperty('images')) {
                        const images = this.product.images
                        if (images.hasOwnProperty('gallery')) {
                            return images.gallery
                        }
                    }
                }
            }
            return []
        }

    }
    ,
    watch: {
        defaultThumb() {
            if (this.product) {
                if (this.product.id) {
                    if (this.product.hasOwnProperty('images')) {
                        const images = this.product.images
                        if (images.hasOwnProperty('default')) {
                            if (images.default.hasOwnProperty('thumb')) {
                                return this.url + images.default.thumb
                            }
                        }
                    }
                }
            }
            return ''
        }
    }
}
</script>