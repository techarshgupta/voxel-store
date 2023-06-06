<template>
  <footer class="p-4 lg:px-0 flex items-center footer">
    <a href="/" class="logo container mx-auto text-center">
      <span class="voxel">Voxel</span>
      <span class="store">Store</span>
    </a>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid rgba(26, 26, 26, 0.1);
}
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
