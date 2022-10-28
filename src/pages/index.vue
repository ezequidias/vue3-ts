<script>
import AnalyticsTransactions from '@/views/dashboards/analytics/AnalyticsTransactions.vue'

export default defineComponent({
  components:{
    AnalyticsTransactions
  },
  data() {
    return {
      data:{}
    }
  },
  created(){
    this.getData()
  },
  methods:{
    async getData() {
      try {
        const res = await this.$axios.get('/')
        this.data = res.data
      } catch (e) { 
      }
    }
  }
})
</script>
<template>
  <VRow class="match-height">
   
    <VCol
      cols="12"
      md="12"
    >
      <AnalyticsTransactions :data="data"/>
    </VCol>

  </VRow>
</template>
