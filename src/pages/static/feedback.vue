<template>
<div class="stats">
	<div class="container">
		<div class="stats-content">
			<div class="container-div_h1">Feedback</div>
			<div class="feedback-content">
				<div class="feedback-content_h1">Write here your message</div>
				<q-form v-if="$user.loggedIn" class="q-gutter-sm" @submit="formSubmit">
   <q-input

          v-model="message"
          name="message"
          dark
          label-color="white"
          label="Write here your message... *"
          type="textarea"
          counter

          autogrow
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

      <div class="flex items-center justify-between">
        <q-file
          dark
        name="image"
        dense
        v-model="image"
        style="flex-basis: 49%"
        outlined
          class="text-bold"
        color="primary"
        label="Attach file"
      />
        <q-btn style="flex-basis: 49%" no-caps  label="Send" type="submit" class="text-bold rounded-borders" color="primary"/>

      </div>
    </q-form>

				<div class="feedback-content_fb-block">
					<div class="feedback-content_fb"
               v-for="feedback in feedbacks" :key="feedback.id"
          >
						<div class="feedback-content_fb-h1">
							<div class="feedback-content_fb-l">
								<img class="feedback-content_fb-img" v-if="feedback.user.avatar" :src="feedback.user.avatar" alt="player">
								<img class="feedback-content_fb-img" v-else src="~assets/ava.png" alt="player">
								<div class="feedback-content_fb-h2">{{feedback.user.nickname}}</div>
							</div>
							<div class="feedback-content_fb-r">{{feedback.date |formatDate}}</div>
						</div>
						<div class="feedback-content_feedback">{{feedback.text}}</div>
						<img v-if="feedback.image" class="feedback-content_fb-sber" :src="feedback.image" alt="feedback">
					</div>

				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      feedbacks:[],
      message:null,
      image:null,
      curImage:'',
      imgModal:false
    }
  },
  async mounted() {
    const response_feedbacks = await this.$api.get('/api/all_fb')
    this.feedbacks = response_feedbacks.data
    console.log(this.feedbacks)
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
    async formSubmit(evt){
      console.log('submit')
      const formData = new FormData(evt.target)
      const response = await this.$api.post('/api/add_fb',formData)
      this.$q.notify({
          message: 'Message sent',
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color: 'positive',
          icon: 'announcement'
        })
      this.message=null
      this.image=null
      console.log(response)
    }
  }
}
</script>
<style lang="sass">
.feedback-content
	max-width: 350px
	margin: 36px auto 0
	&_fb
		border-bottom: 1px solid #878AA4
		padding-bottom: 24px
		margin-top: 24px
	&_feedback
		font-size: 18px
		line-height: 24px
		letter-spacing: 0.246667px
		margin-top: 14px
	&_h1
		font-weight: 600
		font-size: 18px
		line-height: 21px
		color: #878AA4
	&_input
		border-bottom: 1px solid #878AA4
		text-align: right
		margin-top: 73px
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
	&_atach
		font-weight: 600
		font-size: 16px
		line-height: 19px
		color: #FFFFFF
		border: 2px solid #FFFFFF
		box-sizing: border-box
		border-radius: 8px
		padding: 10px
		cursor: pointer
		display: flex
		align-items: center
		justify-content: center
	&_send
		font-weight: 600
		font-size: 16px
		line-height: 19px
		color: #FFFFFF
		background: #2873D9
		border-radius: 8px
		padding: 10px
		cursor: pointer
		display: flex
		align-items: center
		justify-content: center
	&_fb-block
		margin-top: 56px
	&_fb-h1
		display: flex
		align-items: center
		justify-content: space-between
	&_fb-l
		display: flex
		align-items: center
	&_fb-img
		width: 62px
		height: 62px
		margin-right: 14px
		border-radius: 50%
	&_fb-h2
		font-size: 18px
		line-height: 24px
		letter-spacing: 0.246667px
		color: #FFFFFF
	&_fb-r
		font-size: 14px
		line-height: 17px
		letter-spacing: 0.246667px
		color: #878AA4
	&_fb-sber
		margin-top: 14px
		cursor: pointer
</style>
