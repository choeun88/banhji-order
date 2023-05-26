<template>
    <v-row class="">
        <!-- Online Email Modal -->
        <v-dialog v-model="dialogEmail" max-width="460px">
            <v-card class="pb-0">
                 <v-card-text class="modal_text_content">
                    <!--                    <p class="pt-3 mb-0 grey&#45;&#45;text">{{ $t('default_email_send_with_forms') }}</p>-->
                    <!--                    <v-row>-->
                    <!--                        <v-col sm="4" class="pr-0 py-1 my_checkbox pt-3">-->
                    <!--                            <input type="checkbox"/>-->
                    <!--                            <label for="1">{{ $t('use_greeting') }}</label>-->
                    <!--                        </v-col>-->
                    <!--                        <v-col sm="3" class="pl-0  py-1 pr-1">-->
                    <!--                            <v-select class="mt-1"-->
                    <!--                                      outlined-->
                    <!--                                      :placeholder="$t('dear')"-->
                    <!--                                      return-object/>-->
                    <!--                        </v-col>-->
                    <!--                        <v-col sm="4" class="px-0 py-1">-->
                    <!--                            <v-select class="mt-1"-->
                    <!--                                      outlined-->
                    <!--                                      :placeholder="$t('full_name')"-->
                    <!--                                      return-object/>-->
                    <!--                        </v-col>-->
                    <!--                    </v-row>-->
                    <!--                    <p class="mb-1 grey&#45;&#45;text">{{ $t('sale_form') }}-->
                    <!--                        <v-icon class="grey&#45;&#45;text" size="12">fas fa-question-circle</v-icon>-->
                    <!--                    </p>-->
                    <v-row>
                        <!--                        <v-col sm="3" class="py-0 pr-1">-->
                        <!--                            <v-select class="mt-1"-->
                        <!--                                      :items="saleForms"-->
                        <!--                                      outlined-->
                        <!--                                      :placeholder="$t('invoice')"-->
                        <!--                                      return-object/>-->
                        <!--                        </v-col>-->
                        <!--                        <v-col sm="8" class="px-0 py-0">-->
                        <!--                            <v-btn class="float-left  mt-1 white&#45;&#45;text capitalize" color="primary">-->
                        <!--                                {{ $t("use_standard_message") }}-->
                        <!--                            </v-btn>-->
                        <!--                        </v-col>-->
                        <v-col sm="12" cols="12" class="py-0 pr-1">
                            <!--                            <label>{{ // $t('email_subject')  }}</label>-->
                            <!--                            <v-text-field class="mt-1"-->
                            <!--                                          outlined-->
                            <!--                                          :placeholder="$t('subject')"-->
                            <!--                                          return-object/>-->
                            <!--                            <v-textarea class="mt-1" no-resize height="80px"-->
                            <!--                                        :placeholder="$t('subject')"-->
                            <!--                                        outlined-->
                            <!--                                        rows="4"-->
                            <!--                            />-->
                        </v-col>
                        <v-col sm="12" cols="12" class="py-0 pr-1 my_checkbox">
                            <label>{{ $t('email_subject') }}</label>
                            <v-textarea class="mt-1" no-resize height="80px"
                                        v-model="saleFormContent.email.subject"
                                        outlined
                                        rows="4"
                            />
                            <!--                            <input type="checkbox"/>-->
                            <!--                            <label for="1" class="mt-1">{{ $t('email_me_copy_at') }} chhai@gmail.com</label>-->

                            <label>{{ $t('send_a_copy_to') }}</label>
                            <v-text-field class="mt-1"
                                          outlined
                                          v-model="saleFormContent.email.copyTo"
                                          :placeholder="$t('cc_separate_multiple')"
                                          return-object/>

                            <!--                            <label>{{ $t('blind_copy_cc') }}</label>-->
                            <!--                            <v-text-field class="mt-0"-->
                            <!--                                          outlined-->
                            <!--                                          :placeholder="$t('bcc_separate_multiple')"-->
                            <!--                                          return-object/>-->
                        </v-col>
                        <!--                        <v-col sm="4" cols="12" class="py-0 pr-0">-->
                        <!--                            <p class="mb-2 grey&#45;&#45;text">{{ $t('sale_form') }} </p>-->
                        <!--                            <v-select class="mt-0"-->
                        <!--                                      outlined-->
                        <!--                                      :placeholder="$t('estimate')"-->
                        <!--                                      return-object/>-->
                        <!--                        </v-col>-->
                        <!--                        <v-col sm="6" cols="12" class="py-0 pl-0 ">-->
                        <!--                            <v-icon class="grey&#45;&#45;text mt-11 pl-2" size="14">fas fa-question-circle</v-icon>-->
                        <!--                        </v-col>-->
                        <!--                        <v-col cols="12" class="py-0">-->
                        <!--                            <v-textarea class="mb-1" no-resize height="80px"-->
                        <!--                                        outlined-->
                        <!--                                        rows="4"-->
                        <!--                            />-->
                        <!--                        </v-col>-->
                    </v-row>

                    <!-- footer -->
                    <v-row>
                        <v-col cols="12" class="pb-0">
                            <v-btn class="text-capitalize  mr-3  float-left"
                                   color="black"
                                   outlined
                                   @click="dialogEmail = false">{{ $t('cancel') }}
                            </v-btn>
                            <v-btn class=" float-left   mx-1 white--text capitalize" color="primary">
                                {{ $t("save") }}
                            </v-btn>

                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Modal Online Incoie -->
        <!--        <v-dialog v-model="dialogmOnlineInvoice" max-width="380px">-->
        <!--            <v-card class="pb-0">-->
        <!--                <v-card-text class="pt-2" style="background-color: #EDF1F5; color: #333;">-->
        <!--                    <p class="pt-3 mb-0">{{$t('email_option_for_all_sale_forms')}}</p>-->
        <!--                    <v-row>-->
        <!--                       <v-col sm="12" cols="12" class="py-0 my_radio my_checkbox pl-8">-->
        <!--                            <input id="radio1" v-model="show_email" value="1" name="radio" type="radio"> <label for="radio1">{{$t('show_short_summary_in_email')}}</label>-->
        <!--                            <input id="radio2" v-model="show_email" value="0"  name="radio" type="radio"> <label for="radio2">{{$t('show_full_detail_email')}}</label>-->
        <!--                            <input class="pl-3" type="checkbox" id="1"><label class="ml-1" for="1">{{ $t('pdf_attached') }}</label>-->
        <!--                       </v-col>-->
        <!--                       <v-col cols="12" class="py-0">-->
        <!--                            <p class="mb-1 mt-2">{{$t('additional_email_option_for_invoices')}}</p>-->
        <!--                       </v-col>-->
        <!--                       <v-col sm="8" cols="12" class="py-0">-->
        <!--                            <v-select class="mt-0"-->
        <!--                                outlined-->
        <!--                                placeholder="Invoice"-->
        <!--                                return-object/>-->
        <!--                       </v-col>-->
        <!--                    </v-row>-->
        <!--                    &lt;!&ndash; footer &ndash;&gt;-->
        <!--                    <v-row>-->
        <!--                        <v-col cols="12" class="pb-0">-->
        <!--                                <v-btn  class="text-capitalize  mr-3  float-left"-->
        <!--                                    color="black"-->
        <!--                                    outlined-->
        <!--                                    @click="dialogmOnlineInvoice = false">{{ $t('cancel') }}</v-btn>-->
        <!--                            <v-btn class=" float-left   mx-1 white&#45;&#45;text capitalize" color="primary">-->
        <!--                                {{ $t("save") }}-->
        <!--                            </v-btn>-->
        <!--                                -->
        <!--                        </v-col>-->
        <!--                    </v-row>-->
        <!--                </v-card-text>-->
        <!--            </v-card>-->
        <!--        </v-dialog>-->
        <!-- Modal Statment -->
        <!--        <v-dialog v-model="dialogmStatement" max-width="460px">-->
        <!--            <v-card class="pb-0">-->
        <!--                <v-card-text style="pt-2 background-color: #EDF1F5; color: #333;">-->
        <!--                    <v-row>-->
        <!--                        <v-col sm="12" cols="12" class="py-0  my_radio pt-5 pb-0">-->
        <!--                            <input id="radio1" v-model="show_email" value="1" name="radio" type="radio">-->
        <!--                            <label class="float-left" for="radio1"/>-->
        <!--                            <p class="float-left mb-0 mt-2 ml-n1">{{ $t('list_each_transaction_as') }}-->
        <!--                                <v-icon class=" grey&#45;&#45;text" size="14">fas fa-question-circle</v-icon>-->
        <!--                            </p>-->
        <!--                        </v-col>-->
        <!--                        <v-col sm="12" cols="12" class="py-0  my_radio  pb-0">-->
        <!--                            <input id="radio2" v-model="show_email" value="0" name="radio" type="radio">-->
        <!--                            <label for="radio2">{{ $t('list_each_transaction_include') }}</label>-->
        <!--                        </v-col>-->

        <!--                        <v-col cols="12" class="py-0">-->
        <!--                            <p class="mb-1 mt-2 float-left">{{ $t('show_again_table_at_bottom_of_statement') }}-->
        <!--                                <v-icon class="grey&#45;&#45;text" size="14">fas fa-question-circle</v-icon>-->
        <!--                            </p>-->
        <!--                            <v-switch-->
        <!--                                class="float-right"-->
        <!--                                v-model="show_more_statment"-->
        <!--                                color="primary"-->
        <!--                            />-->
        <!--                        </v-col>-->
        <!--                    </v-row>-->
        <!--                    &lt;!&ndash; footer &ndash;&gt;-->
        <!--                    <v-row>-->
        <!--                        <v-col cols="12" class="pb-0">-->
        <!--                            <v-btn class="text-capitalize  mr-3  float-left"-->
        <!--                                   color="black"-->
        <!--                                   outlined-->
        <!--                                   @click="dialogmStatement = false">{{ $t('cancel') }}-->
        <!--                            </v-btn>-->
        <!--                            <v-btn class=" float-left   mx-1 white&#45;&#45;text capitalize" color="primary">-->
        <!--                                {{ $t("save") }}-->
        <!--                            </v-btn>-->

        <!--                        </v-col>-->
        <!--                    </v-row>-->
        <!--                </v-card-text>-->
        <!--            </v-card>-->
        <!--        </v-dialog>-->
        <!-- Modal Statment -->
        <v-dialog v-model="dialogmReminder" max-width="560px">
            <v-card class="pb-0">
                <v-card-text class="modal_text_content">
                    <p class="pt-3  font_14 mb-0 text-bold">{{ $t('default_email_for_invoice') }}</p>
                    <v-divider/>
                    <v-row>
                        <v-col cols="12" class="pt-3 pb-0">
                            <p class="mb-1 text-bold pr-2 pt-1  float-left">{{ $t('automatic_invoice_reminders') }}</p>
                            <v-switch
                                class="float-left"
                                v-model="saleFormContent.invoiceReminder"
                                color="primary"
                            />
                        </v-col>
                        <v-col cols="12" class="py-1">
                            <p class="mb-1 ">{{ $t('automatic_email_reminder_desc') }}</p>
                        </v-col>
                        <v-col cols="12">
                            <v-card elevation="1" height="40" class="pa-3" @click="dialogRemind1 = true">
                                <span class="float-left grey--text">{{ $t('reminder') }} 1 <span
                                    class="pl-2">({{ $t('3day_before_due_date') }})</span> </span>
                                <span class="float-right">{{
                                        !saleFormContent.reminder1.reminder ? $t('off') : $t('on')
                                    }}</span>
                            </v-card>
                            <v-card elevation="1" height="40" class="pa-3 mt-3" @click="dialogRemind2 = true">
                                <span class="float-left grey--text">{{ $t('reminder') }} 2 <span
                                    class="pl-2">({{ $t('on_due_date') }})</span> </span>
                                <span class="float-right">{{
                                        !saleFormContent.reminder2.reminder ? $t('off') : $t('on')
                                    }}</span>
                            </v-card>
                            <v-card elevation="1" height="40" class="pa-3 mt-3" @click="dialogRemind3 = true">
                                <span class="float-left grey--text">{{ $t('reminder') }} 3 <span
                                    class="pl-2">({{ $t('3day_after_due_date') }})</span> </span>
                                <span class="float-right">{{
                                        !saleFormContent.reminder3.reminder ? $t('off') : $t('on')
                                    }}</span>
                            </v-card>
                        </v-col>
                    </v-row>
                    <!-- footer -->
                    <v-row>
                        <v-col cols="12" class="pb-0">
                            <v-btn class="text-capitalize  mr-3  float-left"
                                   color="black"
                                   outlined
                                   @click="dialogmReminder = false">{{ $t('cancel') }}
                            </v-btn>
                            <v-btn class=" float-left   mx-1 white--text capitalize" color="primary">
                                {{ $t("save") }}
                            </v-btn>

                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Modal remind 1 -->
        <v-dialog v-model="dialogRemind1" max-width="500px">
            <v-card class="pb-0">
                <v-card-text class="modal_text_content">
                    <v-row>
                        <v-col cols="12" class="pt-3 pb-0">
                            <p class="mb-1 text-bold pr-2 pt-1 float-left">{{ $t('reminder') }} {{ 1 }}</p>
                            <v-switch
                                class="float-left"
                                v-model="saleFormContent.reminder1.reminder"
                                color="primary"
                            />
                            <v-icon class="float-right" @click="dialogRemind1 = false">close</v-icon>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col sm="4" cols="10" class=" py-1 pr-0">
                            <v-select class="mt-2"
                                      outlined
                                      v-model="saleFormContent.reminder1.reminderDay"
                                      :items="reminderDays"
                                      placeholder="Day"
                                      return-object/>
                        </v-col>
                        <v-col sm="2" cols="2" class="px-0 pt-5">
                            <span class="pt-4 pl-1">day(s)</span>
                        </v-col>
                        <v-col sm="4" cols="10" class="px-0 py-1">
                            <v-select class="mt-2"
                                      v-model="saleFormContent.reminder1.reminderPeriod"
                                      :items="reminderPeriod"
                                      outlined
                                      placeholder="Before"
                                      return-object/>
                        </v-col>
                        <v-col sm="2" cols="2" class="px-0 pt-5">
                            <span class="pt-4 pl-1">{{ $t('due_date') }}</span>
                        </v-col>
                        <v-col sm="12" cols="12" class="py-0">
                            <p>{{ $t('use') }} <span class="greenSky--text">[{{ $t('invoice_num') }}]</span>
                                {{ $t('and') }} <span class="greenSky--text">[{{ $t('company_name') }}]</span>
                                {{ $t('as_placeholder_in_email') }}</p>
                            <label>{{ $t('subject_line') }}</label>
                            <v-text-field class="mt-0"
                                          v-model="saleFormContent.reminder1.subjectLine"
                                          outlined
                                          return-object/>
                            <v-row>
                                <v-col sm="4" class="pr-0 py-1 my_checkbox pt-3">
                                    <input type="checkbox" id="1" v-model="saleFormContent.reminder1.greeting">
                                    <label for="1">{{ $t('use_greeting') }}</label>
                                </v-col>
                                <v-col sm="4" class="pl-0  py-1">
                                    <v-select
                                        outlined
                                        v-model="saleFormContent.reminder1.title"
                                        :items="greetingR1"
                                        placeholder="Dear"
                                        return-object/>
                                </v-col>
                                <v-col sm="4" class="pl-1 py-1">
                                    <v-select
                                        outlined
                                        v-model="saleFormContent.reminder1.title1"
                                        :items="subjectNameR1"
                                        placeholder="Full Name"
                                        return-object/>
                                </v-col>
                            </v-row>

                            <label>{{ $t('email_message') }}</label>
                            <v-textarea no-resize height="80px"
                                        v-model="saleFormContent.reminder1.emailMessage"
                                        outlined
                                        rows="4"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogRemind2" max-width="500px">
            <v-card class="pb-0">
                <v-card-text class="modal_text_content">
                    <v-row>
                        <v-col cols="12" class="pt-3 pb-0">
                            <p class="mb-1 text-bold pr-2 pt-1 float-left">{{ $t('reminder') }} {{ 2 }}</p>
                            <v-switch
                                class="float-left"
                                v-model="saleFormContent.reminder2.reminder"
                                color="primary"
                            />
                            <v-icon class="float-right" @click="dialogRemind2 = false">close</v-icon>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col sm="4" cols="10" class=" py-1 pr-0">
                            <v-select class="mt-2"
                                      outlined
                                      v-model="saleFormContent.reminder2.reminderDay"
                                      :items="reminderDays"
                                      placeholder="Day"
                                      return-object/>
                        </v-col>
                        <v-col sm="2" cols="2" class="px-0 pt-5">
                            <span class="pt-4 pl-1">day(s)</span>
                        </v-col>
                        <v-col sm="4" cols="10" class="px-0 py-1">
                            <v-select class="mt-2"
                                      v-model="saleFormContent.reminder2.reminderPeriod"
                                      :items="reminderPeriod"
                                      outlined
                                      placeholder="Before"
                                      return-object/>
                        </v-col>
                        <v-col sm="2" cols="2" class="px-0 pt-5">
                            <span class="pt-4 pl-1">{{ $t('due_date') }}</span>
                        </v-col>
                        <v-col sm="12" cols="12" class="py-0">
                            <p>{{ $t('use') }} <span class="greenSky--text">[{{ $t('invoice_num') }}]</span>
                                {{ $t('and') }} <span class="greenSky--text">[{{ $t('company_name') }}]</span>
                                {{ $t('as_placeholder_in_email') }}</p>
                            <label>{{ $t('subject_line') }}</label>
                            <v-text-field class="mt-0"
                                          v-model="saleFormContent.reminder2.subjectLine"
                                          outlined
                                          return-object/>
                            <v-row>
                                <v-col sm="4" class="pr-0 py-1 my_checkbox pt-3">
                                    <input type="checkbox" id="2" v-model="saleFormContent.reminder2.greeting">
                                    <label for="2">{{ $t('use_greeting') }}</label>
                                </v-col>
                                <v-col sm="4" class="pl-0  py-1">
                                    <v-select
                                        outlined
                                        v-model="saleFormContent.reminder2.title"
                                        :items="greetingR1"
                                        placeholder="Dear"
                                        return-object/>
                                </v-col>
                                <v-col sm="4" class="pl-1 py-1">
                                    <v-select
                                        outlined
                                        v-model="saleFormContent.reminder2.title1"
                                        :items="subjectNameR1"
                                        placeholder="Full Name"
                                        return-object/>
                                </v-col>
                            </v-row>

                            <label>{{ $t('email_message') }}</label>
                            <v-textarea no-resize height="80px"
                                        v-model="saleFormContent.reminder2.emailMessage"
                                        outlined
                                        rows="4"
                            />
                        </v-col>
                    </v-row>
                    <!-- footer -->
                    <!-- <v-row
                        <v-col cols="12" class="pb-0">
                                <v-btn  class="text-capitalize  mr-3  float-left"
                                    color="black"
                                    outlined
                                    @click="dialogRemind1 = false">{{ $t('cancel') }}</v-btn>
                            <v-btn class=" float-left   mx-1 white--text capitalize" color="primary">
                                {{ $t("save") }}
                            </v-btn>

                        </v-col>
                    </v-row> -->
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogRemind3" max-width="500px">
            <v-card class="pb-0">
                <v-card-text class="modal_text_content">
                    <v-row>
                        <v-col cols="12" class="pt-3 pb-0">
                            <p class="mb-1 text-bold pr-2 pt-1 float-left">{{ $t('reminder') }} {{ 3 }}</p>
                            <v-switch
                                class="float-left"
                                v-model="saleFormContent.reminder3.reminder"
                                color="primary"
                            />
                            <v-icon class="float-right" @click="dialogRemind3 = false">close</v-icon>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col sm="4" cols="10" class=" py-1 pr-0">
                            <v-select class="mt-2"
                                      outlined
                                      v-model="saleFormContent.reminder3.reminderDay"
                                      :items="reminderDays"
                                      placeholder="Day"
                                      return-object/>
                        </v-col>
                        <v-col sm="2" cols="2" class="px-0 pt-5">
                            <span class="pt-4 pl-1">day(s)</span>
                        </v-col>
                        <v-col sm="4" cols="10" class="px-0 py-1">
                            <v-select class="mt-2"
                                      v-model="saleFormContent.reminder3.reminderPeriod"
                                      :items="reminderPeriod"
                                      outlined
                                      placeholder="Before"
                                      return-object/>
                        </v-col>
                        <v-col sm="2" cols="2" class="px-0 pt-5">
                            <span class="pt-4 pl-1">{{ $t('due_date') }}</span>
                        </v-col>
                        <v-col sm="12" cols="12" class="py-0">
                            <p>{{ $t('use') }} <span class="greenSky--text">[{{ $t('invoice_num') }}]</span>
                                {{ $t('and') }} <span class="greenSky--text">[{{ $t('company_name') }}]</span>
                                {{ $t('as_placeholder_in_email') }}</p>
                            <label>{{ $t('subject_line') }}</label>
                            <v-text-field class="mt-0"
                                          v-model="saleFormContent.reminder3.subjectLine"
                                          outlined
                                          return-object/>
                            <v-row>
                                <v-col sm="4" class="pr-0 py-1 my_checkbox pt-3">
                                    <input type="checkbox" id="3" v-model="saleFormContent.reminder3.greeting">
                                    <label for="3">{{ $t('use_greeting') }}</label>
                                </v-col>
                                <v-col sm="4" class="pl-0  py-1">
                                    <v-select
                                        outlined
                                        v-model="saleFormContent.reminder3.title"
                                        :items="greetingR1"
                                        placeholder="Dear"
                                        return-object/>
                                </v-col>
                                <v-col sm="4" class="pl-1 py-1">
                                    <v-select
                                        outlined
                                        v-model="saleFormContent.reminder3.title1"
                                        :items="subjectNameR1"
                                        placeholder="Full Name"
                                        return-object/>
                                </v-col>
                            </v-row>

                            <label>{{ $t('email_message') }}</label>
                            <v-textarea no-resize height="80px"
                                        v-model="saleFormContent.reminder3.emailMessage"
                                        outlined
                                        rows="4"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- not modal -->
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class=" font_20">{{$t('sale_automation')}}</h2>
            <template>
                <v-simple-table class="attachment_table">
                    <template>
                        <tbody>
                        <tr>
                            <td class="text-bold">{{ $t('negative_inventory') }}</td>
                            <td>{{ $t('negative_inventory_desc') }}</td>
                            <td class="align-center justify-center d-flex text-bold">
                                <v-switch
                                    v-model="saleFormContent.negativeInventory"
                                    color="primary"
                                    :label="saleFormContent.negativeInventory ? 'ON' : 'OFF'"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{ $t('late_free') }}</td>
                            <td>{{ $t('late_free_desc') }}</td>
                            <td class="primary--text talign-center justify-center d-flex  text-bold">
                                <v-switch
                                    v-model="saleFormContent.lateFee"
                                    color="primary"
                                    :label="saleFormContent.lateFee ? 'ON' : 'OFF'"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{ $t('email') }}</td>
                            <td>{{ $t('email_desc') }}</td>
                            <td class="primary--text text-center text-bold">
                                <v-btn class="btn_edit_setting"  @click=" dialogEmail = true ">
                                    <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                    <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                </v-btn>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{ $t('pdf_attachment') }}</td>
                            <td>{{ $t('online_invoice_desc') }}</td>
                            <td class="primary--text align-center justify-center d-flex  text-center text-bold">
                                <v-switch
                                    v-model="saleFormContent.pdfAttachment"
                                    color="primary"
                                    :label="saleFormContent.pdfAttachment ? 'ON' : 'OFF'"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{ $t('reminders') }}</td>
                            <td>{{ $t('reminders_desc') }}</td>
                            <td class="primary--text text-center text-bold">
                                <v-btn class="btn_edit_setting" @click="dialogmReminder = true">
                                    <v-icon class="white--text" size="14">mdi-pen</v-icon>
                                    <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                </v-btn>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold">{{ $t('statement') }}</td>
                            <td>{{ $t('statement_desc') }}</td>
                            <td class="primary--text align-center justify-center d-flex  text-center text-bold">
                                <v-switch
                                    v-model="saleFormContent.statement"
                                    color="primary"
                                    :label="saleFormContent.statement ? 'ON' : 'OFF'"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
            <v-divider/>

            <v-card outlined dense class="no_border function_footer">
                <v-btn class="float-right btn_save white--text" color="primary" @click="onSaveClose">
                    {{ $t('save') }}
                </v-btn>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import SaleFormContentModel from "@/scripts/model/SaleFormContent";

const saleFormContentModel = new SaleFormContentModel({})
const saleFormContentHandler = require("@/scripts/saleFormContentHandler")

export default {
    components: {},
    data: () => ({
        // dialogmOnlineInvoice: false,
        dialogmReminder: false,
        // dialogmStatement: false,
        dialogRemind1: false,
        dialogRemind2: false,
        dialogRemind3: false,
        dialogEmail: false,
        // show_more_statment: false,
        // show_email: 1,
        // dialogm2: '',
        // service_date: true,
        reminderDays: [0, 3, 7, 14, 30, 90],
        reminderPeriod: ['Before', 'After'],
        reminder1: false,
        reminder2: false,
        reminder3: false,
        reminder_num: 1,
        saleFormContent: saleFormContentModel,
        subjectLine1: 'Reminder: Invoice [Invoice No] from [Name]',
        emailMessage1: 'Just a reminder that we have not received a payment for this invoice yet. Let us know if you have questions.\n' +
            '\n' +
            'Thanks for your business!',
        greetingR1: ['Dear', 'To'],
        subjectNameR1: ['[Name]', '[Company Name]'],
        saleForms: ['Invoice', 'Quote', 'Sale Order', 'Cash Receipt', 'Sale Return', 'Statement'],
        default1: {
            reminder: false,
            reminderDay: 3,
            reminderPeriod: 'Before',
            subjectLine: 'Reminder: Invoice [Invoice No] from [Name]',
            greeting: true,
            title: 'Dear',
            title1: '[Name]',
            emailMessage: 'Just a reminder that we have not received a payment for this invoice yet. Let us know if you have questions.\n' +
                '\n' +
                'Thanks for your business!'

        },
        default2: {
            reminder: false,
            reminderDay: 0,
            reminderPeriod: 'Before',
            subjectLine: 'Reminder: Invoice [Invoice No] from [Name]',
            greeting: true,
            title: 'Dear',
            title1: '[Name]',
            emailMessage: 'Just a reminder that we have not received a payment for this invoice yet. Let us know if you have questions.\n' +
                '\n' +
                'Thanks for your business!'

        },
        default3: {
            reminder: false,
            reminderDay: 3,
            reminderPeriod: 'After',
            subjectLine: 'Reminder: Invoice [Invoice No] from [Name]',
            greeting: true,
            title: 'Dear',
            title1: '[Name]',
            emailMessage: 'Just a reminder that we have not received a payment for this invoice yet. Let us know if you have questions.\n' +
                '\n' +
                'Thanks for your business!'

        },
        emailSubject: '#fromTransaction #referenceNo from #name ',
        emailCopyTo: 'nimol@banhji.com'
    }),
    props: {},
    computed: {},
    watch: {},
    created() {
    },
    methods: {
        async onSaveClose() {
            // if (!this.$refs.form.validate()) {
            //   this.$refs.form.validate()
            //   return
            // }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        id: this.saleFormContent.id ? this.saleFormContent.id : '',
                        serviceDate: this.saleFormContent.serviceDate,
                        serviceDateTo: this.saleFormContent.serviceDateTo,
                        discountItem: this.saleFormContent.discountItem,
                        specificTax: this.saleFormContent.specificTax,
                        otherTax: this.saleFormContent.otherTax,
                        publicLightingTax: this.saleFormContent.publicLightingTax,
                        saleUnit: this.saleFormContent.saleUnit,
                        modifier: this.saleFormContent.modifier,
                        employee: this.saleFormContent.employee,
                        decimal: this.saleFormContent.decimal,
                        saleQuote: this.saleFormContent.saleQuote,
                        saleOrder: this.saleFormContent.saleOrder,

                        negativeInventory: this.saleFormContent.negativeInventory,
                        lateFee: this.saleFormContent.lateFee,
                        email: this.saleFormContent.email,
                        pdfAttachment: this.saleFormContent.pdfAttachment,
                        invoiceReminder: this.saleFormContent.invoiceReminder,
                        reminder1: this.saleFormContent.reminder1,
                        reminder2: this.saleFormContent.reminder2,
                        reminder3: this.saleFormContent.reminder3,
                        statement: this.saleFormContent.statement
                    }
                    saleFormContentHandler.create(data).then(response => {
                        if (response.data.statusCode === 201) {
                            const res = response.data.data
                            this.saleFormContent = res
                            this.$snotify.success('Update Successfully')
                            // this.$refs.form.reset()
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })

                }, 300);
            })
        },
        async loadSaleFormContent() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    saleFormContentHandler.list().then(res => {
                        if (res.data.statusCode === 200) {
                            const data = res.data.data
                            if (data.length > 0) {
                                this.saleFormContent = data[0]
                                if (!this.saleFormContent.reminder1.hasOwnProperty('reminder')) {
                                    this.saleFormContent.reminder1 = this.default1
                                }
                                if (!this.saleFormContent.reminder2.hasOwnProperty('reminder')) {
                                    this.saleFormContent.reminder2 = this.default2
                                }
                                if (!this.saleFormContent.reminder3.hasOwnProperty('reminder')) {
                                    this.saleFormContent.reminder3 = this.default3
                                }
                                if (!this.saleFormContent.email.hasOwnProperty('subject')) {
                                    this.saleFormContent.email.subject = this.emailSubject
                                }
                                if (!this.saleFormContent.email.hasOwnProperty('copyTo')) {
                                    this.saleFormContent.email.copyTo = this.emailCopyTo
                                }
                            }
                        }

                    })
                }, 300)
            })
        },
    },
    mounted: async function () {
        await this.loadSaleFormContent()
    }
};
</script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td:not(.v-data-table__mobile-row) {
    border-top: 3px solid rgba(0, 0, 0, 0.12) !important;
}

.float-right {
    margin-top: 0px !important;
}

.float-left {
    margin-top: 0px !important;

}

.v-input--switch {
    margin-top: 0px;
    height: 30px;
}

.lightBlue {
    color: #68cbfb;
}


</style>