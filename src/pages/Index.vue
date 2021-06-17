<template>
  <q-page >
  <div class="start">
	<div class="centr-block">
		<img class="start-logo" src="~assets/logo.svg" alt="logo">
		<div class="h1">
			我一起!<br>
			系遵循双方<br>
			共同利益的原
		</div>
		<div class="h2">
			We work, you collect, we earn together!<br><br>
			The system works on the principle of mutual interest of the parties!
		</div>
		<div @click="$router.push('/enter')" class="btn">Get Started</div>
	</div>
</div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
<style lang="sass">

</style>
