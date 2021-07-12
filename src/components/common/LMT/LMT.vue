<template>
  <div class="LMT">
    <div class="sr-widget sr-widget-1"></div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        timer: '',
      }
    },
    props: {
      matchId: {
        type: [Number, String],
        default: 22721857
      }
    },
    methods: {
      fn(a, b, c, d, e, f, g, h, i) {
        if (!a[e]) {
          i = a[e] = function() { (a[e].q = a[e].q || []).push(arguments) }
          i.l = 1 * new Date()
          i.o = f
          g = b.createElement(c)
          h = b.getElementsByTagName(c)[0]
          g.async = 1
          g.src = d
          g.setAttribute('n', e)
          h.parentNode.insertBefore(g, h)
        }
        // a[e] || (i = a[e] = function() { (a[e].q = a[e].q || []).push(arguments) }, i.l = 1 * new Date(), i.o = f,
        //     g = b.createElement(c), h = b.getElementsByTagName(c)[0], g.async = 1, g.src = d, g.setAttribute('n', e), h.parentNode.insertBefore(g, h)
        // )
      }
    },
    beforeDestroy() {
    },
    created() {},
    mounted() {
      this.timer = setInterval(() => {
        this.fn(window, document, 'script', process.env.VUE_APP_WIDGET_SPORTRADAR, 'SIR', {
          theme: false, // using custom theme
          // language: 'zh',
          // language: 'ko',
          language: 'en'
        })
        let flag = SIR('addWidget', '.sr-widget-1', 'match.lmtPlus', {scoreboard: 'extended', momentum: 'disable', matchId: this.matchId})
        if (flag) {
          clearInterval(this.timer)
        }
      }, 200)
      // 关闭LMT 监听
      this.eventBus.$on('closeLMT', (data) => {
        SIR('removeWidget', document.querySelector('.sr-widget'))
      })
    }
  }
</script>

<style scoped>
  @import "./theme.css";
  .LMT{
    min-height: 150px;
  }
</style>
