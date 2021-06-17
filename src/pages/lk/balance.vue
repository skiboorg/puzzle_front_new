<template>
  <q-page>
<div class="balance">
	<div class="container">
		<div class="content">
			<div class="profile-headernav">

        <div @click="$router.push('/lk/profile')" :class="{'active':$route.path==='/lk/profile'}" class="profile-nav  cursor-pointer">Profile</div>
				<div @click="$router.push('/lk/stats')" :class="{'active':$route.path==='/lk/stats'}" class="profile-nav  cursor-pointer">Stats</div>
				<div @click="$router.push('/lk/balance')" :class="{'active':$route.path==='/lk/balance'}" class="profile-nav cursor-pointer">Balance</div>
				<div @click="$router.push('/lk/settings')" :class="{'active':$route.path==='/lk/settings'}" class="profile-nav cursor-pointer">Settings</div>
			</div>
			<div class="profile-h1">Balance</div>
			<div class="balance-content">
				<div class="balance-content-h1">In this section, you can withdraw funds in the withdrawal section and replenish your balance in the deposit section</div>
				<div class="balance-content-deposit">
					<div :class="{'active':pay_type==='WITHDRAW'}" @click="pay_type='WITHDRAW'" class="balance-content_deposit withdraw ">Withdraw</div>
					<div :class="{'active':pay_type==='DEPOSIT'}" @click="pay_type='DEPOSIT'" class="balance-content_deposit deposit">Deposit</div>
				</div>
				<div class="balance-content-attention q-mb-md">Attention! 1 QR = 1 ¥</div>
				<q-form v-if="pay_type==='WITHDRAW'" @submit="formWithDrawSubmit" class=" q-gutter-sd q-mb-lg">
          <q-input
            filled
            v-model="remove_amount"
            :label="`Amount * (max. ${$user.user.add_balance})`"
            type="number"
            style="width: 320px"
            label-color="white"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Input amount',
             val => val <= $user.user.add_balance || `Можно снять ${$user.user.add_balance} или меньше` ,
             ]"
          />
        	<div class="balance-content-pay q-mb-lg">
					<div class="balance-content-pays "
               @click="pay_system=item.value"
               :class="{'active':pay_system===item.value}"
          v-for="(item,index) in pay_options "
               :key="index"
          >{{item.label}}</div>

				</div>

          <q-btn size="md" color="white" text-color="secondary" rounded label="WITHDRAW" type="submit"  class="q-my-sm full-width text-bold"/>
        </q-form>
          <q-form v-else @submit="formDepositSubmit" class=" q-gutter-sd q-mb-lg">
          <q-input
            filled
            v-model="add_amount"
            label="Amount *"
            type="number"
            label-color="white"
            style="width: 320px"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Input amount']"
          />
        <div class="balance-content-pay q-mb-lg">
					<div class="balance-content-pays "
               @click="pay_system=item.value"
               :class="{'active':pay_system===item.value}"
          v-for="(item,index) in pay_options "
               :key="index"
          >{{item.label}}</div>

				</div>

          <q-btn size="md" color="white" text-color="secondary" rounded label="DEPOSIT" type="submit"  class="q-my-sm full-width text-bold"/>
        </q-form>



			</div>
		</div>
	</div>
</div>
  </q-page>
</template>
<script>

import {mapActions} from "vuex";

export default {
  name: 'MainLayout',

  data () {
    return {
      pay_type:'WITHDRAW',
      pay_system:'visa',
      add_amount:null,
      remove_amount:null,
      pay_options: [
        { label: 'VISA', value: 'visa' },
        { label: 'MASTER CARD', value: 'mc' },
        { label: 'AliPay', value: 'alipay' },
        { label: 'WeChatPay', value: 'wechat' },

      ]
    }
  },
  methods:{
    ... mapActions('auth',['getUser']),
    async formWithDrawSubmit(){
      console.log('submit')
      await this.$api.post('/api/user/remove_money',{amount:this.remove_amount})
      await this.getUser()

      this.$q.notify({
          message: 'Operation complete',
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color: 'positive',
          icon: 'announcement'
        })

    },
    async formDepositSubmit(){
      console.log('submit')
      await this.$api.post('/api/user/add_money',{amount:this.add_amount})
      await this.getUser()

      this.$q.notify({
          message: 'Operation complete',
          position: this.$q.screen.lt.sm ? 'bottom' : 'bottom-right',
          color: 'positive',
          icon: 'announcement'
        })
    },
  }

}
</script>
<style lang="sass" >
.content
	padding: 0 56px
	@media (max-width: 1080px)
		padding: 0
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
	&-attention
		margin-top: 36px
		font-size: 14px
		line-height: 24px
		letter-spacing: 0.246667px
	&-input
		font-size: 14px
		line-height: 24px
		letter-spacing: 0.246667px
		color: #878AA4
		padding-bottom: 14px
		border-bottom: 1px solid #878AA4
		margin-top: 24px
		cursor: text
	&-pay
		margin-top: 36px
		display: grid
		grid-template-columns: repeat(2, 1fr)
		grid-gap: 16px
	&-pays
		padding: 10px 0
		text-align: center
		font-size: 16px
		line-height: 19px
		border: 1px solid #C3C4D1
		box-sizing: border-box
		border-radius: 8px
		cursor: pointer
		@media (max-width: 1080px)
			padding: 25px 0
		&.active
			background: #2873D9
			border: 1px solid #2873D9
	&-button
		font-weight: 600
		font-size: 16px
		line-height: 19px
		text-align: center
		color: #0F1049
		margin-top: 56px
		background: #FFFFFF
		border-radius: 8px
		padding: 10px 0
		cursor: pointer
		@media (max-width: 1080px)
			padding: 25px 0
</style>
