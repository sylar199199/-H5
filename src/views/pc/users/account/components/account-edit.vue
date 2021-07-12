<template>
  <div class="account-edit">
    <v-list class="edit-list pt-0 pb-8">
      <div
        v-for="(item, i) in userInfo"
        :key="i"
      >
        <v-list-item class="edit-list-single pl-4 pr-4" :class="item.type">
          <v-list-item-content>
            <v-list-item-title class="edit-list-single-l text-body-2" :class="[item.disabled ?  'grey--text text--lighten-1': '' ]">
              <template v-if="item.type === 'region'">
                Address
              </template>
              <template v-else-if="item.type !== 'address'">
                {{item.label}}
              </template>
            </v-list-item-title>
          </v-list-item-content>

          <template v-if="item.disabled || !isEdit">
            <v-list-item-content
              class="edit-list-single-r content"
              :class="[item.disabled || !item.value ?  'grey--text text--lighten-1': '' ]"
            >
              <template>
                {{item.value || 'Empty'}}
              </template>
            </v-list-item-content>
          </template>
          <template v-else>
            <template v-if="item.type === 'date'">
              <div class="edit-list-single-date d-flex align-center" @click="modal = true">
                <v-icon>mdi-calendar-range</v-icon>{{form[item.prop] ? form[item.prop].split('T')[0] : ''}}
              </div>
            </template>
            <template v-else-if="item.type === 'gender'">
              <v-select
                class="edit-list-single-r"
                v-model="form.gender"
                :items="genderList"
                item-text="label"
                outlined
              ></v-select>
            </template>
            <template v-else-if="item.type === 'region'">
              <v-select
                class="edit-list-single-r region region-f"
                v-model="form.state"
                :items="stateOptions"
                item-text="name"
                item-value="id"
                placeholder="State"
                persistent-hint
                return-object
                outlined
                @change="selectState"
              ></v-select>
              <v-select
                class="edit-list-single-r region"
                :disabled="!selectCity"
                v-model="form.city"
                :items="cityOptions"
                item-text="name"
                item-value="id"
                placeholder="city"
                persistent-hint
                return-object
                outlined
              ></v-select>
            </template>
            <template v-else-if="item.type === 'address'">
              <v-textarea
                class="edit-list-single-r textarea"
                v-model="form.address"
                :placeholder="item.tips"
                maxlength="200"
                height="74"
                counter="200"
                clearable
                outlined
              ></v-textarea>
            </template>
            <template v-else>
              <v-text-field
                class="edit-list-single-r"
                v-model="form[item.prop]"
                :rules="rules[item.rules] ? [rules[item.rules]] : []"
                :placeholder="item.tips"
                oninput="if(value.length>50)value=value.slice(0,50)"
                required
                outlined
              ></v-text-field>
            </template>
          </template>
        </v-list-item>
      </div>
      <div class="edit-list-single d-flex">
        <div class="edit-list-single-l spacer"></div>
        <v-btn
          class="edit-list-single-r btn rounded-sm white--text primary text-capitalize"
          block
          large
          @click="changeEditState"
        >
          {{isEdit ? 'Save' : 'Edit'}}
        </v-btn>
      </div>
    </v-list>

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
<script>
import editProfileMixins from '@/views/users/account/mixins/editProfileMixins'

export default {
  components: {
  },
  mixins: [editProfileMixins],
  data() {
    return {
      isEdit: false,
      type: '2'
    }
  },
  watch: {
  },
  methods: {
    async changeEditState() {
      if (this.isEdit) {
        this.editFinish(true)
        await this.saveProfile()
      }
      this.isEdit = !this.isEdit
    }
  }
}
</script>

<style lang="less" scoped>
.account-edit{
  padding: 20px 0 !important;
  background: #fff;
  .edit-list{
    &-single{
      min-height: auto;
      margin-bottom: 22px;
      padding: 0 60px 0 10px !important;
      &.address{
        .edit-list-single-r{
          min-height: 74px !important;
          /deep/ .v-input__slot{
            height: 74px !important;
            overflow: hidden;
            textarea{
              height: 60px !important;
              margin-top: 10px;
            }
          }
        }
      }
      .v-list-item__content{
        flex: 0 0 auto;
        padding: 0;
      }
      &-l{
        width: 150px;
        margin-right: 50px;
        text-align: right;
        font-size: 16px !important;
        color: @font-color1;
        line-height: 24px;
        &.spacer{
          flex: 0 0 auto !important;
        }
      }
      &-r{
        min-height: 42px !important;
        width: calc(100% - 200px);
        line-height: 22px;
        overflow: hidden;
        flex: 0 0 auto;
        word-break: break-all;
        &.content{
          font-size: 16px;
          padding: 0 10px;
          color: @font-color2;
        }
        &.region{
          width: calc(50% - 110px);
          &.region-f{
            margin-right: 20px;
          }
        }
        &.textarea{
          width: calc(100% - 200px);
        }
        /deep/ .v-text-field__slot{
          height: 42px !important;
          min-height: auto;
        }
        /deep/ .v-input__slot{
          height: 42px !important;
          min-height: auto;
          padding: 0 10px !important;
          background: @bg-color;
          margin-bottom: 4px;
        }
        /deep/ fieldset{
          display: none;
        }
        /deep/ input, /deep/ .v-select__selection{
          font-size: 16px;
          color: @font-color2;
          &::placeholder{
            color: @font-color4;
          }
        }
        /deep/ .v-input__append-inner{
          margin-top: 10px;
        }
        &.v-input--is-focused{
          /deep/ .v-input__slot{
            background: none;
          }
          /deep/ fieldset{
            display: block;
          }
        }
        /deep/ .v-text-field__details{
          display: none;
        }
        &.btn{
          width: 200px;
          flex-grow: 0 !important;
          min-width: auto !important;
          box-shadow: none !important;
        }
      }
      &-date{
        width: 100%;
        height: 42px;
        font-size: 16px;
        color: @font-color2;
        padding: 0 10px;
        background: @bg-color;
        cursor: pointer;
        i{
          margin-right: 11px;
        }
      }
    }
  }
}
</style>
