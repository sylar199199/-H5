<template>
  <div class="football14-top d-flex align-center justify-space-between">
    <v-img class="football14-top-icon" width="122" height="29" src="@/assets/img/views/pc/lottery/icon_football14.png"></v-img>

    <div class="football14-top-issue">
      <v-select
        v-model="selectIssue"
        height="30"
        :items="issueList"
        item-text="Issue"
        dense
        outlined
        @change="changeIssue"
      ></v-select>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    gameId: {
      default: ''
    }
  },
  data() {
    return {
      issueList: [],
      selectIssue: ''
    }
  },
  created() {
  },
  mounted() {
    this.getIssueList()
  },
  methods: {
    async getIssueList() {
      let data = {
        GameID: this.gameId,
        Issue: '-1',
        RecBegin: 0,
        QueryCount: 30
      }
      let res = await this.$api.gameIssue({ data })
      if (res.RetCode === '0') {
        this.issueList = res.Format02 || []
        if (this.issueList.length > 0) {
          this.selectIssue = this.issueList[0].Issue
          this.changeIssue(this.selectIssue)
        }
      }
    },
    changeIssue(item) {
      this.getGameIssueData(item)
      this.$emit('changeIssue', item)
    },
    getGameIssueData(issue) {
      for (let i = 0; i < this.issueList.length; i++) {
        if (this.issueList[i].Issue === issue) {
          this.$store.commit('SET_GAMEISSUEDATA', this.issueList[i])
          break
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.football14-top{
  height: 70px;
  padding: 0 10px;
  &-icon{
    flex-grow: 0;
  }
  &-issue{
    width: 180px;
    /deep/ .v-text-field__details{
      display: none;
    }
    /deep/ .v-input__slot{
      min-height: 32px !important;
      margin: 0 !important;
    }
    /deep/ .v-input__append-inner{
      margin-top: 4px !important;
    }
  }
}
</style>
