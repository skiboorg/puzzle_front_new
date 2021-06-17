<template>
  <div class="stats">
	<div class="container">
		<div class="stats-content">
			<div class="container-div_h1">Contacts</div>
			<div class="contacts-content">
				<div class="contacts-content_top">
					<div class="contacts-content_h1"><span>Our company:</span> 注册YY产品与服相关号（以下统称“YY号”）</div>
					<div class="contacts-content_h1"><span>Our address:</span>  相关, 以下称 32 街道</div>
					<div class="contacts-content_h1"><span>Our mail:</span> info@puzpays.com</div>
					<div class="contacts-content_h1"><span>Our WeChat:</span> +38701249218949 支持24 7</div>
				</div>
				<div class="contacts-content_h2">Your message:</div>
				<div class="contacts-content_h3">We will answer you within 24 hours to your specified mail for your support request, question or suggestion!</div>
				 <q-form  class="q-gutter-sm"  @submit="formSubmit"  >
      <div class="form-grid ">
        <q-input
          class="col-6"
          label-color="white"
          v-model="email"
          :label="$t('email')"

          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
            <q-input
        label-color="white"
        v-model="name"
        :label="$t('name')"

        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      </div>
   <q-input
          label-color="white"
          v-model="message"
          class="col-6"
          :label="$t('contacts_form_message')"
          type="textarea"
          dark
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />



      <div>
        <div class="flex items-center justify-between">
          <q-file
        name="image"
        dense
        dark
        v-model="image"
        style="flex-basis: 49%"
        outlined
        color="primary"

        :label="$t('contacts_form_attach')"
      />

        <q-btn style="flex-basis: 49%" label="Send" type="submit" color="primary"/>

        </div>

      </div>
    </q-form>
			</div>
		</div>
	</div>
</div>
</template>
<script>


export default {
  name: 'MainLayout',

  data () {
    return {
      image:null,
      name:'',
      email:'',
      message:'',

    }
  },
  methods:{
    formSubmit(){
      this.$q.notify({
          message: 'Message sent',
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color: 'positive',
          icon: 'announcement'
        })
      this.$user.loggedIn ? this.$router.push('/game') : this.$router.push('/auth')
    }
  }

}
</script>
<style lang="sass">
.contacts-content
	max-width: 350px
	width: 100%
	margin: 62px auto 0
	&_h1
		font-size: 18px
		line-height: 40px
		letter-spacing: 0.246667px
		color: #C3C4D1
		span
			font-weight: 600
			font-size: 18px
			line-height: 40px
			letter-spacing: 0.246667px
			color: #FFFFFF
	&_h2
		margin-top: 56px
		font-weight: 500
		font-size: 24px
		line-height: 29px
	&_h3
		font-size: 18px
		line-height: 24px
		letter-spacing: 0.246667px
		color: #C3C4D1
		margin-top: 24px
	&_input
		font-size: 18px
		line-height: 24px
		letter-spacing: 0.246667px
		color: #878AA4
		margin-top: 38px
		&_email
			margin-top: 24px
			padding-bottom: 14px
			border-bottom: 1px solid #fff
			cursor: text
		&-email_top
			font-weight: 500
			font-size: 12px
			line-height: 24px
			letter-spacing: 0.246667px
			color: #878AA4
		&-email
			font-size: 18px
			line-height: 24px
			letter-spacing: 0.246667px
		&-name
			font-size: 18px
			line-height: 24px
			letter-spacing: 0.246667px
			color: #878AA4
			margin-top: 38px
			padding-bottom: 14px
			border-bottom: 1px solid #878AA4
			cursor: text
		&_bottom
			text-align: right
			border-bottom: 1px solid #878AA4
			margin-top: 70px
			cursor: text
			span
				font-size: 12px
				line-height: 24px
				letter-spacing: 0.246667px
				color: #878AA4
	&_button
		margin-top: 42px
		display: grid
		grid-template-columns: repeat(2,1fr)
		grid-gap: 16px
		.attach
			font-weight: 600
			font-size: 16px
			line-height: 19px
			display: flex
			align-items: center
			justify-content: center
			color: #FFFFFF
			padding: 10px
			border: 2px solid #FFFFFF
			box-sizing: border-box
			border-radius: 8px
			cursor: pointer
		.send
			font-weight: 600
			font-size: 16px
			line-height: 19px
			display: flex
			align-items: center
			justify-content: center
			color: #FFFFFF
			padding: 10px
			background: #2873D9
			border-radius: 8px
			cursor: pointer
</style>
