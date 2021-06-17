<template>
   <div class="stats rating">
	<div class="container">
		<div class="content">
			<div class="container-div_h1">Rating</div>
			<div class="container-div_h3">On this page, you can select the statistics of our portal you are interested in: the total number of games of users, the history of deposits and withdrawals of funds of our users</div>
			<div class="rating-content">
				<div class="balance-content-deposit">
					<div :class="{'active':type==='Rating'}" @click="type='Rating'" class="balance-content_deposit withdraw ">Rating</div>
					<div :class="{'active':type==='Withdraw'}" @click="type='Withdraw'" class="balance-content_deposit deposit">Withdraw</div>
				</div>
				<div v-if="type==='Rating'" class="rating-content_block">
					<div class="rating-content_player"
               v-for="player in players" :key="player.id"
          >
						<div class="rating-content_player-l">
							<img class="rating-content_img" v-if="player.avatar" :src="player.avatar" alt="player">
							<img class="rating-content_img" v-else src="~assets/ava.png" alt="player">
							<div>
								<div class="rating-content_h1">{{player.nickname}}</div>
								<div class="rating-content_h2">Games: {{player.games}}</div>
							</div>
						</div>
						<div class="rating-content_h3">Rating: {{player.rating}}</div>
					</div>

				</div>
        <div v-else class="rating-content_block">
					<div class="rating-content_player"
               v-for="player in add_money_players" :key="player.id"
          >
						<div class="rating-content_player-l">
							<img class="rating-content_img" v-if="player.avatar" :src="player.avatar" alt="player">
							<img class="rating-content_img" v-else src="~assets/ava.png" alt="player">
							<div>
								<div class="rating-content_h1">{{player.nickname}}</div>
								<div class="rating-content_h2">Games: {{player.games}}</div>
							</div>
						</div>
						<div class="rating-content_h3">Withdraw: {{player.total_remove}}</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import { mapActions, mapGetters} from 'vuex'
import { date } from 'quasar'
export default {
  data () {
    return {
      type:'Rating',
      players:[],
      add_money_players:[],

    }
  },
  async mounted() {
    const response_players = await this.$api.get('/api/ratings')
    this.players = response_players.data
    const response_add_money_players = await this.$api.get('/api/add_money_ratings')
    this.add_money_players = response_add_money_players.data
    console.log(this.add_money_players)
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
.balance-content
	margin: 36px auto 0
	max-width: 350px
	width: 100%
	&-h1
		font-size: 14px
		line-height: 24px
		letter-spacing: 0.246667px
		color: #C3C4D1
	&-deposit
		margin-top: 24px
		display: flex
		justify-content: space-between
		background: #FFFFFF
		border-radius: 8px
		font-weight: 600
		font-size: 16px
		line-height: 19px
		color: #0F1549
	&_deposit
		text-align: center
		width: 100%
		padding: 10px 0
		cursor: pointer
		@media (max-width: 1080px)
			padding: 25px 0
		&.withdraw
			border-radius: 8px 0px 0px 8px
		&.deposit
			border-radius: 0px 8px 8px 0px
		&.active
			background: #2873D9
			color: #fff
.rating
	.container-div_h3
		max-width: 442px
		margin-top: 36px
		font-size: 14px
		line-height: 24px
		letter-spacing: 0.246667px
		color: #C3C4D1
	&-content
		max-width: 350px
		width: 100%
		margin: 24px auto 0
		&_block
			margin-top: 56px
		&_player
			border-bottom: 1px solid #878AA4
			padding-bottom: 24px
			display: flex
			justify-content: space-between
			align-items: center
			margin-top: 24px
			&-l
				display: flex
				align-items: center
		&_img
			margin-right: 14px
			width: 62px
			height: 62px
			border-radius: 50%
		&_h1
			font-size: 18px
			line-height: 24px
			letter-spacing: 0.246667px
		&_h2
			font-size: 14px
			line-height: 17px
			letter-spacing: 0.246667px
			color: #878AA4
		&_h3
			font-size: 14px
			line-height: 17px
			letter-spacing: 0.246667px
			color: #878AA4
</style>
