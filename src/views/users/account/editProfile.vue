<template>
  <div class="edie-profile">
    <i-lot-toolbar @goBack="goBackSet"></i-lot-toolbar>
    <!--显示的列表内容-->
    <v-list class="edit-list pt-0 pb-8">
      <!--点击的信息列表-->
      <v-list-item-group
        color="primary"
      >
      <div
        v-for="(item, i) in userInfo"
        :key="i">
        <v-list-item class="pl-4 pr-4" @click="activeId(item)">
          <v-list-item-content>
            <!-- :class="[item.value !== '' ? '': 'grey--text text--lighten-1']"  -->
            <v-list-item-title class="text-body-2 font-weight-medium" v-text="item.label"></v-list-item-title>
          </v-list-item-content>
          <p class="mb-0 text-caption grey--text" :class="{'address-txt':item.label==='Address'}" style="line-height:1px;">{{item.value !== '' ? item.value : item.label}}</p>
          <!--箭头按钮-->
          <v-list-item-action class="ml-0 mr-n2" v-if="item.prop !== 'bvn' && item.prop !== 'firstName' && item.prop !== 'lastName' && item.prop !== 'mobile' && item.prop !== 'email' ">
            <v-btn icon>
              <v-icon class="grey--text darken-1">mdi-chevron-right</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider class="ml-4 mr-4 grey lighten-3"></v-divider>
      </div>
      </v-list-item-group>
      <!--保存按钮-->
      <v-row class="mt-4 ml-4 mr-4">
        <v-btn
          class="rounded-sm white--text primary text-capitalize"
          block
          large
          @click="saveProfile"
        >
        Save
        </v-btn>
      </v-row>
    </v-list>
    <!--编辑页面的内容-->
    <div class="edit-panel" v-if="editPanel" width="100%">
      <v-form
        ref="form"
        class="mt-0"
        :class="[editfiled.prop == 'gender' ? '': ' pl-4 pr-4']"
        style="word-wrap:break-word;"
        v-model="formValid"
      >
        <v-text-field
          v-model="form.playerNick"
          :rules="[rules.required]"
          label="Nick Name"
          required
          clearable
          oninput="if(value.length>50)value=value.slice(0,50)"
          v-if="editfiled.prop == 'playerNick'"
        ></v-text-field>
        <v-text-field
          v-model="form.email"
          :rules="[rules.required, rules.email]"
          label="Email"
          required
          clearable
          v-if="editfiled.prop == 'email'"
        ></v-text-field>
        <v-text-field
          v-model="form[editfiled.prop]"
          :label="editfiled.label"
          :counter="30"
          clearable
          v-if="editfiled.prop == 'firstName' || editfiled.prop == 'lastName'"
        ></v-text-field>
        <v-list class="pt-0">
          <v-list-item-group
            color="primary"
            v-if="editfiled.prop == 'gender'"
          >
            <div
              v-for="(item, index) in genderList"
              :key="index"
            >
              <v-list-item
                @change="changeGender(item.value)">
                <v-list-item-content >
                  <v-list-item-title v-text="item.value"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action class="mt-0 mb-0 ml-0 mr-n2" v-if="selectGender == item.value">
                  <v-btn icon>
                    <v-icon class="primary--text darken-1">mdi-check</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider color="#EAEBEC"></v-divider>
            </div>
          </v-list-item-group>
        </v-list>
        <v-text-field
          v-model="form.bvn"
          label="BVN"
          :counter="11"
          maxlength="11"
          clearable
          :rules="rules.bvn"
          v-if="editfiled.prop == 'bvn'"
        ></v-text-field>
          <v-select
          v-model="form.state"
          :items="stateOptions"
          item-text="name"
          item-value="id"
          label="State"
          persistent-hint
          return-object
          single-line
          v-if="editfiled.prop == 'regionAll'"
           @change="selectState"
        ></v-select>
          <v-select
          :disabled="!selectCity"
          v-model="form.city"
          :items="cityOptions"
          item-text="name"
          item-value="id"
          label="City"
          persistent-hint
          return-object
          single-line
          v-if="editfiled.prop == 'regionAll'"
        ></v-select>
        <v-textarea
          v-model="form.address"
          label="Address"
          maxlength="200"
          counter="200"
          auto-grow
          rows="1"
          clearable
          v-if="editfiled.prop == 'address'"
        ></v-textarea>
      </v-form>
    </div>
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="date"
      persistent
      width="290px"
    >
      <v-date-picker
        v-model="date"
        scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="modal = false"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="saveDate"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script type="text/javascript">
import editProfileMixins from './mixins/editProfileMixins'
export default {
  name: 'editProfile',
  mixins: [editProfileMixins],
  data() {
    return {}
  },
  components: {
  },
  mounted() {
    console.log('页面刷新了')
    this.getInfor()
    console.log('方法被调用了')
  }
}
</script>

<style lang="less" scoped>
.edie-profile {
  position: relative;
  .edit-list {
    height: calc(100vh - 48px);
    overflow-y: auto;
  }
}
.edit-panel {
  position: absolute;
  top: 48px;
  background: #fff;
  height: 100%;
  width: 100%;
}
  /deep/.address-txt{
    word-wrap: break-word;
    white-space: normal;
    word-break: break-all;
    width: 70%;
    text-align: right;
    line-height: initial !important;
  }
</style>

