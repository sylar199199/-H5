<template>
  <div class="LMT">
    <div><div class="sr-widget sr-widget-1"></div></div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {}
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
    created() {

    },
    beforeCreate() {
      if (this.$vuetify.theme.dark) {
        require('./theme.css')
      } else {
        require('./themeWhite.css')
      }
    },
    mounted() {
      this.fn(window, document, 'script', process.env.VUE_APP_WIDGET_SPORTRADAR, 'SIR', {
        theme: false, // using custom theme
        // language: 'zh',
        // language: 'ko',
        language: 'en'
      })
      // this.fn(window,document,"script", "https://widgets.sir.sportradar.com/a151755c47ce845be6d279ca2c9c86c1/widgetloader", "SIR", {
      //   theme: false, // using custom theme
      //   language: "en"
      // })
      // console.log(SIR)
      // setTimeout(() => {
      //   SIR("addWidget", ".sr-widget-1", "match.lmtPlus", {layout: "topdown", matchId:23950127});
      // }, 1000)
      window.SIR('addWidget', '.sr-widget-1', 'headToHead.standalone', {scoreboard: 'extended', momentum: 'disable', matchId: this.matchId})
    }
  }
</script>

<style scoped>
  /*@import "./themeWhite.css";*/
  /*@import "./theme.css";*/
</style>
