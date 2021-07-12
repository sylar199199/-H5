export default {
  methods: {
    async queryPayState() {
      const res = await this.$api.checkDeposit({
        // message: '查询成功',
        data: {
          channelCode: 'paystack',
          paymentNo: this.ussdData.reference,
          thirdTransNo: this.ussdData.orderNo
        }
      })
      if (res.code !== 0) return
      console.log(res)
    }
  }
}
