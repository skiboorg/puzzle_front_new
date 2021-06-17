<template>
  <q-page>
<div class="profile">

	<div class="container">
		<div class="profile-content">
			<div class="profile-headernav">

        <div @click="$router.push('/lk/profile')" :class="{'active':$route.path==='/lk/profile'}" class="profile-nav  cursor-pointer">Profile</div>
				<div @click="$router.push('/lk/stats')" :class="{'active':$route.path==='/lk/stats'}" class="profile-nav  cursor-pointer">Stats</div>
				<div @click="$router.push('/lk/balance')" :class="{'active':$route.path==='/lk/balance'}" class="profile-nav cursor-pointer">Balance</div>
				<div @click="$router.push('/lk/settings')" :class="{'active':$route.path==='/lk/settings'}" class="profile-nav cursor-pointer">Settings</div>
			</div>
			<div class="profile-h1">Profile</div>
			<div class="profile-content_block">
				<div class="profile-content_block-top">
					<img v-if="$user.user.avatar" class="profile-content_block-l" :src="$user.user.avatar" alt="player">
					<img v-else class="profile-content_block-l" src="~assets/plus.svg" alt="player">
					<div class="profile-content_block-r">
						<div class="profile-content_block-r_top">{{$user.user.nickname}}</div>
						<div class="profile-content_block-r_bottom">{{$user.user.email}}</div>
					</div>
				</div>
				<div class="profile-content_block-params">Balance: <span>{{$user.user.balance + $user.user.add_balance}} QR</span></div>
				<div class="profile-content_block-params">Rating: <span>{{$user.user.rating}}</span></div>
				<div @click="$router.push('/lk/settings')" class="profile-content_block-settings cursor-pointer">Settings</div>
				<div @click="logoutUser" class="profile-content_block-logout cursor-pointer">Log out</div>
			</div>
		</div>
	</div>
</div>
  </q-page>
</template>
<script>

import { mapActions, mapGetters} from 'vuex'

export default {
  name: 'MainLayout',
  data () {
    return {


    }
  },
  methods:{
    ...mapActions('auth',['logoutUser'])

  }

}
</script>
<style lang="sass">
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
		max-width: 240px
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
