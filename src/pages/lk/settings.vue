<template>
  <q-page>
<div class="settings">

	<div class="container">
		<div class="profile-content">
			<div class="profile-headernav">

        <div @click="$router.push('/lk/profile')" :class="{'active':$route.path==='/lk/profile'}" class="profile-nav  cursor-pointer">Profile</div>
				<div @click="$router.push('/lk/stats')" :class="{'active':$route.path==='/lk/stats'}" class="profile-nav  cursor-pointer">Stats</div>
				<div @click="$router.push('/lk/balance')" :class="{'active':$route.path==='/lk/balance'}" class="profile-nav cursor-pointer">Balance</div>
				<div @click="$router.push('/lk/settings')" :class="{'active':$route.path==='/lk/settings'}" class="profile-nav cursor-pointer">Settings</div>
			</div>
			<div class="profile-h1">Settings</div>
			<div class="profile-content_block">
				 <q-form
      @submit="onSubmit"

      class="q-gutter-sm form full-width">
      <div class=" full-width">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-lg-md q-pr-md-md q-pr-sm-md q-pr-xs-none">
          <div class="flex items-center justify-between q-mb-md">


          <q-avatar   class="relative-position" size="100px">
            <img :src="$user.user.avatar">
            <label class="absolute-bottom-right cursor-pointer" for="avatar_img">
            <q-icon size="md" color="primary" name="photo_camera"></q-icon>
            <input id="avatar_img" ref="avatar_img" @change="avatarChange($event)" style="display: none" type="file">
          </label>
          </q-avatar>
            <div class="">
              <p class="no-margin">Avatar</p>
            <p class="no-margin">Tap to change</p>
            </div>
          </div>
          <q-input

            label-color="white"
            v-model="userData.email"
             :label="$t('email')+ '*'"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"/>
          <q-input

            label-color="white"
            v-model="userData.nickname"
            :label="$t('nickname')"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"/>
          <q-input

            label-color="white"
            v-model="userData.age"
            type="number"
            class="q-mb-md"
            :label="$t('age')"/>
          <q-select  class="q-mb-md" label-color="white" v-model="userData.sex" :options="sex_options" :label="$t('sex')" />
          <q-input
            label-color="white"

            class="q-mb-md"
            v-model="userData.study"
            :label="$t('study')"
          />
          <q-input

            label-color="white"
            class="q-mb-md"
            v-model="userData.work"
            :label="$t('work')"
          />
          <q-input
            label-color="white"
            v-model="userData.profession"
            :label="$t('profession')"
            class="q-mb-lg"
          />
        </div>
      </div>
      <div style="margin-left: -8px" class="text-center">
        <q-btn label="Save" color="white" text-color="secondary" rounded  type="submit" class=" full-width text-bold" />
      </div>
    </q-form>
			</div>
		</div>
	</div>
</div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters} from 'vuex'
export default {
  data () {
    return {
      sex_options:[
        'Male', 'Female'
      ],
      avatar:null,
      userData:{


        email:this.$user.user.email,
        nickname:this.$user.user.nickname,
        age:this.$user.user.age,
        sex:this.$user.user.sex,
        study:this.$user.user.study,
        work:this.$user.user.work,
        profession:this.$user.user.profession,

      }

    }
  },
  methods: {
    ... mapActions('auth',['getUser']),

    onSubmit () {
      console.log('submit')
      this.updateUser()
    },
    async avatarChange(evt){
      this.avatar = evt.target.files[0]
      await this.updateUser()
    },
    async updateUser(){
      let formData = new FormData()
      formData.set('userData', JSON.stringify(this.userData))
      if (this.avatar){
        formData.set('avatar',this.avatar)
      }
      const response = await this.$api({
        method: 'post',
        headers:{
          'content-type': 'multipart/form-data'
        },
        url: '/api/user/update',
        data: formData
      })
      this.$q.notify({
          message: 'Profile updated',
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color: 'positive',
          icon: 'announcement'
        })
      console.log(response.data)
      await this.getUser()
    },

  }
}
</script>
<style lang="sass" scoped>
.container
	max-width: 1080px
	width: 100%
	margin: 0 auto
	background: #0F1049
	@media (max-width: 1080px)
		padding: 0 32px
		width: auto
.profile
	height: 100vh
	background: #0E0F44
	@media (max-width: 1080px)
		background: #0f1049
	&-content
		padding: 0 56px
		@media (max-width: 1080px)
			padding: 0
	.container-div_header-r
		position: relative
		.profile-select
			position: absolute
			top: 60px
			right: 0
			background: #fff
			border-radius: 8px
			font-size: 12px
			line-height: 14px
			text-align: center
			color: #0F1549
			.select-profile
				padding: 9px 19px
			.hr
				height: 1px
				background: #0F1549
			.select-logout
				padding: 9px 19px
	&-headernav
		display: flex
		@media (max-width: 1080px)
			//display: none
	&-nav
		font-size: 18px
		line-height: 21px
		color: #878AA4
		margin-right: 24px
		&.active
			color: #fff
			border-bottom: 4px solid #fff
			padding-bottom: 12px
	&-h1
		font-weight: 600
		font-size: 32px
		line-height: 38px
		margin-top: 36px
		@media (max-width: 1080px)
			margin-top: 0
	&-content_block
		max-width: 350px
		width: 100%
		margin: 69px auto 0
		@media (max-width: 1080px)
			max-width: 100%
			margin: 36px auto 0
		&-top
			display: flex
			align-items: center
			border-bottom: 1px solid #fff
			padding-bottom: 36px
			margin-bottom: 22px
		&-l
			border-radius: 50%
			width: 64px
			height: 64px
			margin-right: 28px
			@media (max-width: 1080px)
				width: 124px
				height: 124px
		&-r
			&_top
				font-size: 18px
				line-height: 24px
				letter-spacing: 0.246667px
				color: #FFFFFF
				@media (max-width: 1080px)
					font-weight: bold
					font-size: 24px
					line-height: 24px
					letter-spacing: 0.246667px
			&_bottom
				font-weight: 500
				font-size: 16px
				line-height: 24px
				letter-spacing: 0.246667px
				color: #878AA4
				@media (max-width: 1080px)
					font-size: 18px
					color: #878AA4
					margin-top: 8px
		&-params
			font-weight: 500
			font-size: 18px
			line-height: 24px
			letter-spacing: 0.246667px
			color: #C3C4D1
			margin-top: 14px
			span
				font-weight: bold
				color: #fff
		&-settings
			font-weight: 600
			font-size: 16px
			line-height: 19px
			text-align: center
			color: #0F1049
			background: #FFFFFF
			border-radius: 8px
			padding: 10px
			margin-top: 56px
			@media (max-width: 1080px)
				font-size: 18px
				line-height: 21px
				text-align: center
				color: #0F1049
				padding: 25px 0
				border-radius: 16px
		&-logout
			font-weight: 600
			font-size: 16px
			line-height: 19px
			text-align: center
			color: #FFFFFF
			padding: 10px
			margin-top: 16px
			border: 1px solid #FFFFFF
			box-sizing: border-box
			border-radius: 8px
			@media (max-width: 1080px)
				font-size: 18px
				line-height: 21px
				border-radius: 16px
				padding: 25px 0
				text-align: center
				margin-top: 28px
</style>
