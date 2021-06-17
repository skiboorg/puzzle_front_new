<template>
  <q-page>
<div class="stats">
	<div class="container">
		<div class="stats-content">
		<div class="profile-headernav">

        <div @click="$router.push('/lk/profile')" :class="{'active':$route.path==='/lk/profile'}" class="profile-nav  cursor-pointer">Profile</div>
				<div @click="$router.push('/lk/stats')" :class="{'active':$route.path==='/lk/stats'}" class="profile-nav  cursor-pointer">Stats</div>
				<div @click="$router.push('/lk/balance')" :class="{'active':$route.path==='/lk/balance'}" class="profile-nav cursor-pointer">Balance</div>
				<div @click="$router.push('/lk/settings')" :class="{'active':$route.path==='/lk/settings'}" class="profile-nav cursor-pointer">Settings</div>
			</div>
			<div class="profile-h1">Stats</div>
			<div class="container-div_h2">Here you can see your statistics of all games and the results of your games</div>
			<div class="container-div_content"
      v-for="game in games" :key="game.id">
				<div class="container-div_content-l">
					<div class="container-div_content-l_h1">{{game.game_type | formatGameType}}</div>
					<div class="container-div_content-l_h2">{{game.start | formatDate}}</div>
				</div>
				<img class="headeroff-img" :src="game.image" alt="image">
				<div class="container-div_content-r">
					<div class="container-div_content-r_stats "
               :class="[game.result ? 'text-green' : 'text-red']"
          >{{game.result ? `WIN + ${game.level.rating} rating` : `LOOSE`}}</div>
					<q-icon  :name="game.result ? 'check' : 'close'" :color="game.result ? 'positive' : 'red'" />
				</div>
			</div>

		</div>
	</div>
</div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters} from 'vuex'
import { date } from 'quasar'
export default {
  data () {
    return {
      games:[],


    }
  },
  async mounted() {
    const response_games = await this.$api.get('/api/game_history')
    this.games = response_games.data
    console.log(this.games)
  },
  filters:{
    formatDate(val){
      let timeStamp = new Date(val)
      let formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm')
      return formattedString
    },
    formatGameType(val){
      switch(val) {
        case 'puzzle_qr':
          return  'QR PUZZLE'
        case 'puzzle_image':
          return  'ART PUZZLE'

      }
    }
  },

  methods: {

  }
}
</script>
<style lang="sass">
.stats
	&-content
		padding: 0 56px
		@media (max-width: 1080px)
			padding: 0
	.container
		max-width: 1080px
		background: #0F1049
		margin: 0 auto
		height: 100vh
		position: relative
		&-div
			padding: 0 56px
			@media (max-width: 1080px)
				padding: 0 32px
			&_headeron
				display: none
				position: absolute
				top: 0
				left: 0
				width: 100%
				background: #141259
				@media (max-width: 1080px)
					background: #fff
					height: 100%
				&-padding
					display: flex
					align-items: center
					padding: 49px 56px
					@media (max-width: 1080px)
						padding: 48px 32px
					.close
						@media (max-width: 1080px)
							display: none
					.close-mob
						display: none
						@media (max-width: 1080px)
							display: block
					.languageselectmob
						display: none
						.select
							margin-left: 14px
						@media (max-width: 1080px)
							display: block
							font-size: 18px
							line-height: 24px
							letter-spacing: 0.246667px
							color: #878AA4
				&-menu
					display: none
					padding: 120px 32px 0
					@media (max-width: 1080px)
						display: block
				&-nav
					font-weight: 600
					font-size: 32px
					line-height: 38px
					color: #878AA4
					margin-bottom: 36px
				.headeron-navigation_block
					@media (max-width: 1080px)
						display: none
			&_headeroff
				display: grid
				grid-template-columns: repeat(3,1fr)
				align-items: center
				padding: 56px
				@media (max-width: 1080px)
					padding: 48px 32px 38px
				.burger
					cursor: pointer
				.logo
					display: block
					margin: 0 auto
					cursor: pointer
					@media (max-width: 1080px)
						display: none
				&-r
					display: flex
					align-items: center
					justify-content: flex-end
				&-coins
					display: flex
					align-items: center
					padding: 4px
					background: #FFFFFD
					box-shadow: 0px 8px 25px #00000024
					border-radius: 24px
					font-weight: 500
					font-size: 14px
					line-height: 17px
					text-align: center
					color: #000000
					margin-right: 24px
					@media (max-width: 1080px)
						margin-right: 0
					.coins
						cursor: pointer
					.coins-number
						margin: 0 4px
					.plus
						cursor: pointer
				&-player
					margin-right: 14px
					text-align: right
					@media (max-width: 1080px)
						display: none
					&_h1
						font-size: 14px
						line-height: 17px
						color: #FFFFFF
					&_h2
						font-size: 12px
						line-height: 14px
						color: #C3C4D1
				&_player
					border-radius: 50%
					cursor: pointer
					@media (max-width: 1080px)
						display: none
			&_h1
				font-weight: 600
				font-size: 32px
				line-height: 38px
				color: #FFFFFF
			&_h2
				font-size: 18px
				line-height: 24px
				letter-spacing: 0.246667px
				color: #C3C4D1
				max-width: 350px
				width: 100%
				margin-top: 36px
				margin-bottom: 36px
			&-content
				margin-top: 56px
			&_content
				display: grid
				grid-template-columns: repeat(3,1fr)
				padding-bottom: 32px
				border-bottom: 1px solid #878AA4
				margin-bottom: 32px
				align-items: center
				&-l_h1
					font-size: 18px
					line-height: 24px
					letter-spacing: 0.246667px
					color: #FFFFFF
				&-l_h2
					font-size: 12px
					line-height: 24px
					letter-spacing: 0.246667px
					color: #878AA4
				&-r
					display: flex
					align-items: center
					justify-content: flex-end
					&_stats
						margin-right: 14px
						text-align: right
						font-size: 14px
						line-height: 17px
						letter-spacing: 0.246667px
						color: #878AA4
						&.loose
							color: #EB5757

	&-img
		margin: 0 auto
		display: block
		@media (max-width: 1080px)
			width: 64px
			height: 64px
</style>
