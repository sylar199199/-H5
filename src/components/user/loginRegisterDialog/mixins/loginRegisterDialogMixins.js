import LoginDialog from '@/views/users/login/login'
import RegisterDialog from '@/views/users/register/register'
import RegisterCheck from '@/views/users/register/RegisterCheck'
import RegisterSuccess from '@/views/users/register/RegisterSuccess'
import RetrievePasswordDialog from '@/views/users/retrievePassword/retrievePassword'
import SetPasswordDialog from '@/views/users/register/resetPassword'
import ResetPasswordSuccess from '@/views/users/register/ResetPasswordSuccess'
import RegisterAgreementDialog from '@/views/users/register/registrationProtocol'
import ReceiveEmailFail from '@/views/users/receiveEmailFail/ReceiveEmailFail'
export default {
  components: {
    LoginDialog,
    RegisterDialog,
    RegisterCheck,
    RegisterSuccess,
    RetrievePasswordDialog,
    SetPasswordDialog,
    ResetPasswordSuccess,
    RegisterAgreementDialog,
    ReceiveEmailFail
  },
  props: {
    componentName: {
      default: ''
    }
  }
}
