<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-chip
        class="ma-2"
        color="primary"
        small
        label
        outlined
        v-bind="attrs"
        v-on="on"
        v-show="
          segment.nature.toLowerCase() === 'balancing segment' ||
          segment.nature.toLowerCase() === 'multiple segment'
        "
      >
        %
      </v-chip>
    </template>

    <v-card color="white" elevation="0">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ $t("segment_allocation") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- Grid -->
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" class="pt-0">
              <kendo-grid
                class="custom_grid"
                ref="segmntGrid"
                :data-source="segmentDS"
                :noRecords="true"
                :editable="editable"
              >
                <kendo-grid-column
                  :field="'segment.name'"
                  :title="$t('segment')"
                  :editable="
                    () => {
                      return false;
                    }
                  "
                >
                </kendo-grid-column>
                <kendo-grid-column
                  :field="'rate'"
                  :title="$t('rate')"
                  :width="120"
                  :format="'{0:n}'"
                >
                </kendo-grid-column>
              </kendo-grid>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions v-show="editable">
        <v-spacer></v-spacer>
        <v-btn
          outlined
          color="primary"
          class="text-capitalize black--text"
          @click="cancel"
          >{{ $t("cancel") }}
        </v-btn>

        <v-btn color="primary" class="white--text text-capitalize" @click="onClickSave">
          {{ $t("save") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import kendo from "@progress/kendo-ui";
import { i18n } from "@/i18n";
import SegmentModel from "@/scripts/model/Segment";

export default {
  props: {
    initSegment: {
      type: Object,
      default: new SegmentModel(),
    },
  },
  data() {
    return {
      segment: new SegmentModel(),
      editable: false,
      dialog: false,
      /* Kendo */
      segmentDS: new kendo.data.DataSource(),
    };
  },
  methods: {
    initialData() {
      this.editable = false;

      if (this.initSegment) {
        this.segment = this.initSegment;
        this.segmentDS.data(this.segment.subSegment);
        if (this.segment.nature.toLowerCase() === "balancing segment") {
          this.editable = true;
        }
        this.emitShareRates();
      }
    },
    emitShareRates() {
      let shareRates = [];
      if (
        this.segment.nature.toLowerCase() === "balancing segment" ||
        this.segment.nature.toLowerCase() === "multiple segment"
      ) {
        if (this.segment.subSegment.length > 0) {
          this.segmentDS.data().forEach((value) => {
            shareRates.push({
              id: value.segment.id,
              rate: value.rate,
            });
          });
        }
      }

      this.$emit("emitShareRates", shareRates);
    },
    cancel() {
      /* Cancel changes datasource */
      this.segmentDS.cancelChanges();

      this.dialog = false;
    },
    validating() {
      let isValid = true;

      let rate = 0;
      this.segmentDS.data().forEach((value) => {
        rate += value.rate;
      });
      if (rate != 100) {
        isValid = false;
        this.$snotify.warning(i18n.t("rate_must_equal_100"));
      }

      return isValid;
    },
    onClickSave() {
      if (this.validating()) {
        this.save();
      }
    },
    save() {
      this.emitShareRates();
      this.dialog = false;
    },
  },
  watch: {
    initSegment: "initialData",
  },
  mounted() {
    this.initialData();
  },
};
</script>
