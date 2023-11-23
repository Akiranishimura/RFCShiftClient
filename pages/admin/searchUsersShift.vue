<template>
  <div>
    search
    <!--userSearchにテキストをインプット  -->
    <input type="text" v-model="userSearched">
    <!--ボタンを押すとsearchUserを実行  -->
    <button @click="searchUser">search</button>
    <div v-if="isItseatched">
      該当するユーザは
    <div v-for="user in searchedResult" :key="user.UserId">
      <div class="searchedUser" @click="showShift(user.UserID)">
        {{ user.UserID }}
        {{user.Name}}
        {{ user.Department }}
      </div>
      <!-- {{ user.Abbreviation }} -->
      <!-- <ShiftCard :Shift=shift Status="ongoing" v-for="shift in shifts" :key="shift.ShiftId" class="shadow"/> -->
    </div>

    </div>
    <SelectedDate :UserID="selectedUserID" v-if="showThisUserShift"/>
  </div>
</template>

<script>
export default{
  data(){
    return{
      userSearched: '',
      searchedResult: [],
      isItseatched: false,
      shifts:[],
      selectedUserID: '',
      showThisUserShift: false
    }
  },
  methods:{
    async searchUser(){
      this.isItseatched = true;
      console.log(this.userSearched);
      const searched = this.userSearched;
      const UserResult =await this.$axios.$get(`/api/getInfo/userSearch/${searched}`);
      console.log(UserResult);
      this.searchedResult = UserResult;
    },
    async showShift(userId){
    //   const getShiftByUserresponse = await this.$axios.$get(`/api/getinfo/shiftByUser/${userId}`);
    // console.log(getShiftByUserresponse); // レスポンスをコンソールに出力
    // // this.isGetShift = true
    // // this.updateStatus()
    this.showThisUserShift = false
    //0.5秒待つ
    await new Promise(resolve => setTimeout(resolve, 250));
    this.showThisUserShift = true
    this.selectedUserID = userId;
    return this.selectedUserID;

    }
  }
}
</script>

<style lang='scss' scoped>

</style>
