<template>
  <div class="bet-slip-single">
    <v-checkbox v-model="calcCheckBox">
      <template v-slot:label>
        <div class="bet-slip-single-main d-flex justify-space-between">
          <div class="bet-slip-single-main-l">
            <div class="bet-slip-single-main-l-team font-weight-medium">
              CA Victorano Arenas<span>vs</span>Western Sydney rn Syd
            </div>
            <div class="bet-slip-single-main-l-state">
              over 3<span>1.79</span>
            </div>
            <div class="bet-slip-single-main-l-win">
              potential win<span>8.00</span>
            </div>
          </div>
          <div class="bet-slip-single-main-r d-flex flex-column justify-space-between align-end">
            <div class="bet-slip-single-main-r-t d-flex align-center">
              <div class="bet-slip-single-main-r-t-disabled">Unavailable</div>
              <div class="bet-slip-single-main-r-t-close" @click.stop.prevent="remove">
                <v-icon color="info-hover">mdi-close-circle</v-icon>
              </div>
            </div>
            <div class="bet-slip-single-main-r-b">₦200.00</div>
          </div>
        </div>
      </template>
    </v-checkbox>
    <v-divider></v-divider>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      defaul() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    calcCheckBox: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    remove() {

    }
  }
}
</script>

<style lang="less" scoped>
.bet-slip-single{
  padding: 0 20px;
  &-main{
    width: 100%;
    &-l{
      width: 300px;
      &-team{
        font-size: 14px;
        color: @font-color1;
        line-height: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-bottom: 8px;
        span{
          color: @font-color2;
          padding: 0 10px;
        }
      }
      &-state{
        font-size: 14px;
        color: @font-color1;
        margin-bottom: 8px;
        span{
          padding-left: 19px;
        }
      }
      &-win{
        font-size: 14px;
        color: @font-color2;
        line-height: 20px;
        span{
          color: @font-color1;
          padding-left: 20px;
        }
      }
    }
    &-r{
      &-t{
        margin-right: -10px;
        margin-top: -10px;
        &-disabled{
          font-size: 12px;
          color: @font-color2;
          padding: 1px 5px;
          background: rgba(0, 0, 0, .2);
        }
        &-close{
          padding: 10px;
          /deep/ i{
            color: @font-color2;
          }
        }
      }
      &-b{
        width: 80px;
        height: 20px;
        box-sizing: border-box;
        border: 1px solid @input-box-color;
        border-radius: 4px;
        padding: 0 7px;
        font-size: 14px;
        text-align: right;
        line-height: 18px;
      }
    }
  }
}
</style>
