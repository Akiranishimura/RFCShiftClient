<template>
  <div class="logoutBtn">
    <button @click="Logout" class="shadow">期間日のシフトを確認する</button>
  </div>
</template>

<script>
export default {
  methods: {
    async Logout() {
      // await this.$auth.logout();
      this.$router.push('/SlectedDateShift/');
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
