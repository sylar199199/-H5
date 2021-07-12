<template>
    <ul class="time-list d-flex">
      <li class="num">
        <span class="time-item">{{ m1 }}</span>
      </li>
      <li class="num">
        <span class="time-item">{{ m2 }}</span>
      </li>
      <li class="colon"></li>
      <li class="num">
        <span class="time-item">{{ s1 }}</span>
      </li>
      <li class="num">
        <span class="time-item">{{ s2 }}</span>
      </li>
    </ul>
</template>

<script type="text/javascript">
export default {
  name: 'ilotCountDown',
  props: {
    time: {
      Type: String
    }
  },
  data() {
    return {
      m1: '0',
      m2: '0',
      s1: '0',
      s2: '0',
    }
  },
  watch: {
    time: {
      handler(newArr) {
        let timeArr = [...newArr]
        let min = timeArr[2].time
        let second = timeArr[3].time
        if (this.lottoFlag === true) {
          if (min > 9) {
            let minArr = (min + '').split('')
            this.m1 = minArr[0]
            this.m2 = minArr[1]
          } else {
            this.m1 = '0'
            this.m2 = min || '0'
          }
          if (second > 9) {
            let secondArr = (second + '').split('')
            this.s1 = secondArr[0]
            this.s2 = secondArr[1]
          } else {
            this.s1 = '0'
            this.s2 = second || '0'
          }
        } else {
          this.m1 = timeArr[0].time
          this.m2 = timeArr[1].time
          this.s1 = timeArr[2].time
          this.s2 = timeArr[3].time
        }
      },
      deep: true
    },
  },
  components: {
    
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {
    
  },
}
</script>

<style lang="" scoped>
</style>
