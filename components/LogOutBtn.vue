<template>
  <div class="logoutBtn">
    <button @click="Logout" class="shadow">ログアウト</button>
  </div>
</template>

<script>
export default {
  methods: {
    async Logout() {
      await this.$auth.logout();
      this.$router.push('/login');
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

  }
}

</style>
