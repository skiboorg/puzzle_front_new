<template>
  <q-page class="flex flex-center">
  <div v-if="!is_register" class="login loginmob">

		<div class="login-block">
			<div class="login-logo">
				<img class="lt-sm" src="~assets/loginmob.svg" alt="logo">
			</div>
			<div class="login-block_h1">Login</div>

      <q-form  style="max-width: 240px" @submit="userLoginAction" class=" q-gutter-sd q-mb-lg">
      <q-input
        label-color="white"
        :dense="!$q.screen.gt.md"
        v-model="userLogin.email"
        :label="$t('email')+ '*'"


        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Введите email']"
      />
      <q-input
        :dense="!$q.screen.gt.md"
        label-color="white"
        :type="isPwd ? 'password' : 'text'"
        v-model="userLogin.password"
        :label="$t('password')+ '*'"
        lazy-rules
        :rules="[val => val !== null && val !== '' || 'Введите пароль' ]">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div class="text-center">
        <q-btn size="md" text-color="secondary" rounded :label="$t('login_btn')" type="submit" color="white" class="q-px-xl q-mb-md text-bold" />
      <p class="text-body2">{{$t('no_account')}} <a class="text-accent" href="#" @click.prevent="is_register=true">{{$t('sign_up')}}</a></p>
      <p class="text-body2">{{$t('lost_password')}} <router-link class="text-accent" to="contacts">{{$t('contact_us')}}</router-link> </p>


      </div>

    </q-form>


		</div>

</div>
   <div v-else class="register">

		<div class="register-block">
			<div class="register-block_h1">Register</div>
		<q-form
      @submit="onSubmit"
      style="max-width: 240px"
      class="q-gutter-sm form">

      <q-input
      label-color="white"
      :dense="!$q.screen.gt.md"
      v-model="userData.email"
      :label="$t('email')"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type email',
      val => email_re.test(String(val)) || 'Please type correct email'
      ]"/>
      <q-input
      label-color="white"
      :dense="!$q.screen.gt.md"
      v-model="userData.nickname"
      :label="$t('nickname')"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type something']"/>
      <q-input
      label-color="white"
      :dense="!$q.screen.gt.md"
      v-model="userData.age"
      type="number"
      :label="$t('age')"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type your age']"/>
      <q-select class="q-mb-lg" label-color="white" :dense="!$q.screen.gt.md" v-model="userData.sex" :options="sex_options" label="Sex" />


      <q-input
      label-color="white"
      :dense="!$q.screen.gt.md"
      v-model="userData.password1"
      :label="$t('password')"
      :type="isPwd ? 'password' : 'text'"
      lazy-rules
      :rules="[ val => val && val.length >= 4|| 'Password must at least 4 letters']">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input
      label-color="white"
      :dense="!$q.screen.gt.md"
      v-model="userData.password2"
      :type="isPwd ? 'password' : 'text'"
      :label="$t('password_repeat')"
      lazy-rules
      :rules="[ val => val && val===this.userData.password1 || 'Passwords not match']">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <div class="text-center">
          <q-btn :label="$t('register_btn')"  text-color="secondary" rounded :disable="!accept" type="submit" class="q-px-xl q-mb-md text-bold" color="white "/>
         <p class="text-body2">{{$t('have_account')}} <a href="#" class="text-accent" @click.prevent="is_register=false">{{$t('sign_in')}}</a></p>
        </div>


      </div>
    </q-form>
	</div>

</div>

  </q-page>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'
export default {
  data () {
    return {
      name: null,
      age: null,
      accept: false,
      is_register:false,
      isPwd: true,
      lang: this.$i18n.locale,
      email_re:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      userLogin:{
        email:'1@1.11',
        password:'123',
      },
      sex_options:[
        'Male', 'Female'
      ],
      userData:{
       password1:null,
       password2:null,
        email:null,
        age:null,
        sex:'Male',
        nickname:null,
      }

    }
  },
  methods: {
    ... mapActions('auth',['loginUser','logoutUser']),
    userLoginAction() {
      this.loginUser(this.userLogin)

    },
    onSubmit () {
      console.log('submit')
        this.completeRegistration()
    },
    async completeRegistration() {
      try {
        let response = await this.$api.post('/auth/users/', {
          nickname: this.userData.nickname,
          email: this.userData.email,
          age: this.userData.age,
          sex: this.userData.sex,
          password: this.userData.password2,
        })
        this.$q.notify({
          message: 'Аккаунт создан',
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color: 'positive',
          icon: 'announcement'
        })
        this.loading = false
        this.is_register = false
      } catch (e) {
        this.$q.notify({
          message: 'Проверьте введеные данные',
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color: 'red',
          icon: 'announcement'
        })
      }
    }
  }
}
</script>
<style lang="sass">
.login
	height: 100vh
	display: flex
	align-items: center
	justify-content: center
	.centr-block
		max-width: 240px
		width: 100%
		@media (max-width: 1080px)
			max-width: 350px
			padding: 0 32px
		.login-logo
			display: none
			margin: 0 auto 84px
			width: 84px
			height: 84px
			@media (max-width: 1080px)
				display: block
		.h1
			font-weight: bold
			font-size: 32px
			line-height: 40px
		.mail
			margin-top: 48px
			padding-bottom: 14px
			border-bottom: 1px solid #fff
			font-size: 14px
			line-height: 24px
			letter-spacing: 0.246667px
			@media (max-width: 1080px)
				font-size: 18px
		.pass
			margin-top: 38px
			padding-bottom: 14px
			border-bottom: 1px solid #fff
			font-size: 14px
			line-height: 24px
			letter-spacing: 0.246667px
			@media (max-width: 1080px)
				font-size: 18px
		.btn
			font-weight: 600
			font-size: 16px
			line-height: 19px
			display: flex
			align-items: center
			justify-content: center
			color: #0F1049
			padding: 10px 0
			background: #FFFFFF
			border-radius: 8px
			margin-top: 44px
			@media (max-width: 1080px)
				margin-top: 42px
				padding: 25px 0
				font-size: 18px
				line-height: 21px
				border-radius: 16px
		.lost
			font-size: 14px
			line-height: 16px
			text-align: center
			margin-top: 56px
			@media (max-width: 1080px)
				margin-top: 84px
				font-size: 18px
				line-height: 21px
		.sign
			font-size: 14px
			line-height: 16px
			text-align: center
			margin-top: 29px
			@media (max-width: 1080px)
				margin-top: 24px
				font-size: 18px
				line-height: 21px
.register
	display: flex
	align-items: center
	justify-content: center
	height: 100vh
	.centr-block
		max-width: 240px
		width: 100%
		@media (max-width: 1080px)
			max-width: 350px
			padding: 0 35px
		.h1
			font-weight: bold
			font-size: 32px
			line-height: 40px
		.mail
			margin-top: 48px
			padding-bottom: 14px
			border-bottom: 1px solid #fff
			font-size: 14px
			line-height: 24px
			@media (max-width: 1080px)
				font-size: 18px
				line-height: 24px
				letter-spacing: 0.246667px
		.nick
			margin-top: 38px
			padding-bottom: 14px
			border-bottom: 1px solid #fff
			font-size: 14px
			line-height: 24px
			letter-spacing: 0.246667px
			@media (max-width: 1080px)
				font-size: 18px
				line-height: 24px
				letter-spacing: 0.246667px
		.sex
			margin-top: 38px
			padding-bottom: 14px
			border-bottom: 1px solid #fff
			font-size: 14px
			line-height: 24px
			letter-spacing: 0.246667px
			display: flex
			align-items: center
			justify-content: space-between
			padding-right: 10px
			@media (max-width: 1080px)
				font-size: 18px
				line-height: 24px
				letter-spacing: 0.246667px
		.pass
			margin-top: 38px
			padding-bottom: 14px
			border-bottom: 1px solid #fff
			font-size: 14px
			line-height: 24px
			letter-spacing: 0.246667px
			@media (max-width: 1080px)
				font-size: 18px
				line-height: 24px
				letter-spacing: 0.246667px
		.reppass
			margin-top: 38px
			padding-bottom: 14px
			border-bottom: 1px solid #fff
			font-size: 14px
			line-height: 24px
			letter-spacing: 0.246667px
			@media (max-width: 1080px)
				font-size: 18px
				line-height: 24px
				letter-spacing: 0.246667px
		.btn
			font-weight: 600
			font-size: 16px
			line-height: 19px
			display: flex
			align-items: center
			justify-content: center
			color: #0F1049
			padding: 10px 0
			background: #FFFFFF
			border-radius: 8px
			margin-top: 42px
			@media (max-width: 1080px)
				border-radius: 16px
				font-size: 18px
				line-height: 21px
				padding: 25px 0
		.sign
			font-size: 18px
			line-height: 21px
			text-align: center
			margin-top: 84px
</style>
