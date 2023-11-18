<template>
  <div class="wrapper">
    <div class="login">
      <TheContainer>

        <section class="login__forms shadow">
          <p class="login__forms__title">
            野田地区理大祭2023 シフト閲覧サイト
          </p>
          <p class="login__forms__title__desc">
          委員の方はログインしてください
          </p>
            <form @submit.prevent="submitForm" class="login__forms__form">
              <div class="login__forms__form__inputs">
                <div>
                  <p class="login__forms__form__inputs__title">
                    学籍番号
                  </p>
                  <input v-model="userId" type="text">
                </div>
                <div>
                  <p class="login__forms__form__inputs__title">
                    所属局
                  </p>
                  <select v-model="department">
                    <option value="">所属局を選択して下さい</option>
                    <option value="三役">三役</option>
                    <option value="総務局">総務局</option>
                    <option value="企画局">企画局</option>
                    <option value="広報局">広報局</option>
                    <option value="管理局" >管理局</option>
                    <option value="渉外局">渉外局</option>
                    <option value="システム局">システム局</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="login__forms__form__btn shadow">
                ログインする
              </button>
            </form>

        </section>
      </TheContainer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: '',
      department: ''
    };
  },
methods: {
  async submitForm() {
//nuxtauthでログイン処理を行う
    await this.$auth.loginWith('local', {
      data: {
        userId: this.userId,
        department: this.department
      }
    });
    this.$router.push('/');




  },

}
}
</script>

<style lang="scss" >
.wrapper{
  background: url("~assets/images/KeyVisual.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  background-color: black;
  }
  .login{
    color: $black;
    height: 100svh;
    backdrop-filter: blur(6px);
    display: flex;
    justify-content: center;
    align-items: center;
    &__forms{
      border-radius: 1rem;
      background-color: $white;
      padding:3rem 1rem 5rem 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap:2px;
      &__title{
        font-size: 1.1rem;
        font-weight: bold;
        color: $black;
        &__desc{
          color: $red;
          font-size: 14px;
        }
      }
      &__form{
        margin-top: 2.5rem;
        width: 220px;
        display: flex;
        flex-direction: column;
        gap:3rem;
        &__inputs{
          display:flex;
          flex-direction: column;
          gap: 1rem;
          & input, select{
            width: 100%;
          }
          &__title{
            font-size: 12px;
          }
        }
        &__btn{
          background-color: $red;
          color:$white;
          border-radius: 1rem;
          font-size: 1rem;
          padding-top: 4px;
          padding-bottom: 4px;
          border: none;
        }
      }
    }
  }
</style>
