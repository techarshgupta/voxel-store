<template>
  <header class="h-16 sticky top-0 z-30 w-full bg-white shadow-m px-4 lg:px-0 flex items-center">
    <div class="mx-auto container flex justify-between items-center">
      <a href="/" class="logo">
        <span class="voxel">Voxel</span>
        <span class="store">Store</span>
      </a>
      <div class="cursor-pointer" @click="onClickBag">
        <img src="../assets/bag.svg" alt="add to bag" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  methods: {
    onClickBag() {
      this.$store.commit('updateCartState', true);
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  font-size: 18px;
  line-height: 22px;
}
.voxel {
  font-family: 'InstrumentSans-SemiBold';
  font-weight: 600;
  color: #1a1a1a;
}
.store {
  font-family: 'InstrumentSans-Regular';
  font-weight: 400;
  color: #1a1a1a80;
}
</style>
