<template>
  <div>
    <app-hero />
    <app-tabs />
    <app-products />
  </div>
</template>

<script>
import appHero from '~/components/appHero.vue'
import AppProducts from '~/components/appProducts.vue'
import AppTabs from '~/components/appTabs.vue'
export default {
  name: 'IndexPage',
  components: { appHero, AppTabs, AppProducts },
}
</script>
