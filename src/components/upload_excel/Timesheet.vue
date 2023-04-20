<template>
  <div>
    <input ref="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
  </div>
</template>
<script>
import XLSX from 'xlsx'
export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function// eslint-disable-line
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    }
  },
  methods: {
    generateData({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    async readerData(rawFile) {
        this.loading = true
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = e => {
                const data = e.target.result
                const workbook = XLSX.read(data, {type: 'array'})
                const firstSheetName = workbook.SheetNames[0]
                if (firstSheetName === 'Timesheet') {
                    const worksheet = workbook.Sheets[firstSheetName]
                    const header = this.getHeaderRow(worksheet)
                    // const header_result = XLSX.utils.sheet_to_json(worksheet, {header: 1})
                    // skip row
                    const range = XLSX.utils.decode_range(worksheet['!ref'])
                    range.s.r = 10
                    worksheet['!ref'] = XLSX.utils.encode_range(range)
                    // skip row

                    let results = XLSX.utils.sheet_to_json(worksheet, {header: 1})
                    results = results.filter(i => {
                        return i[1] !== undefined
                    })
                    this.generateData({header, results})
                    this.loading = false
                    resolve()
                } else {
                    this.$toast.error('Please Upload Sale file!')
                }
            }
            reader.readAsArrayBuffer(rawFile)
        })
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C 
      // const R = range.s.r
      const R = 9
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
  }
}
</script>

<style scoped>
.excel-upload-input{
  display: none;
  z-index: -9999;
}
.drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>