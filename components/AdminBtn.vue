<template>
  <div class="logoutBtn">
    <button @click="gotoadmin" class="shadow">管理者画面</button>
  </div>
</template>

<script>
export default {
  methods: {
    async gotoadmin() {
      // await this.$auth.logout();
      this.$router.push('/admin/');
    }
  },
}

</script>

<style lang='scss' scoped>
.logoutBtn{
  button{
    background-color: $white;
    border:1px solid $black;
    border-radius: 25px;
    display: grid;
    place-items: center;
    padding:3px 10px 3px 10px;
    font-weight: bold;
    font-size: 0.8rem;

  }
}

</style>
