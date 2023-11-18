<template>
  <div class="shiftpage">
    <div class="header">
      <div class="header__hi">
        Hi👋 {{ $auth.user.userId }}
      </div>
      <LogOutBtn />
    </div>
    <TheContainer>
      {{ NowShowing }}
      <button @click="changeDate('1123')">準備日のシフトを見る</button>
      <button @click="changeDate('1124')">1日目のシフトを見る</button>
      <button @click="changeDate('1125')">2日日のシフトを見る</button>
      <button @click="changeDate('1126')">整理日のシフトを見る</button>
      <button @click="changeDate('Today')">今日のシフトを見る</button>


      <section class="ongoing">
        <h1 class="ongoing__heading">現在のシフト</h1>
        <div class="shifts">
          <div class="shift" v-for="shift in ongoing" :key="shift.ShiftId">
            <ShiftCard :Shift=shift Status="ongoing"/>
          </div>
          <div class="shift" v-if="ongoing.length == 0">
            <ShiftCard :Shift=noShiftNow Status="noShift"/>
          </div>

        </div>

      </section>

      <section class="following">
        <h1 class="following__heading">次のシフト</h1>
        <div class="shifts">
          <div class="shift" v-for="shift in following" :key="shift.ShiftId">
            <ShiftCard :Shift=shift Status="following" />
          </div>
          <div class="shift" v-if="following.length == 0">
            <ShiftCard :Shift=noShiftNext Status="noShift"/>
          </div>
        </div>
      </section>

      <section class="ended">
        <h1 class="ended__heading">終了したシフト</h1>
        <div class="shifts">
          <div class="shift" v-for="shift in ended" :key="shift.ShiftId">
            <ShiftCard :Shift=shift Status="ended"/>
          </div>
          <div class="shift" v-if="ended.length == 0">
            <ShiftCard :Shift=noShidtEnded Status="noShift"/>
            </div>
        </div>
      </section>

      {{ shifts }}


    </TheContainer>




  </div>
</template>


<script>
import LogOutBtn from '~/components/LogOutBtn.vue';
import ShiftCard from '~/components/ShiftCard.vue';

export default {
  data() {
    return {
      userDate: {},
      noShiftNow:{
        ShiftName: '現在のシフトはありません',
      },
      noShiftNext:{
        ShiftName: '次のシフトはありません',
      },
      noShidtEnded:{
        ShiftName: '終了したシフトはありません',
      },
      date: null,
      NowShowing: '',
      ongoing:[],
      shifts:[],
      following:[],
      ended:[],
      currentTime: ''
        }
  },
   middleware: 'auth',
    components: { LogOutBtn },
    async mounted() {
    const userId = this.$auth.user.userId;
    const getUserResponse = await this.$axios.$get(`/api/getInfo/user/${userId}`);
    console.log(getUserResponse); // レスポンスをコンソールに出力
    this.userDate = getUserResponse;
    console.log(this.userDate);

    const getShiftByUserresponse = await this.$axios.$get(`/api/getinfo/shiftByUser/${userId}`);
    console.log(getShiftByUserresponse); // レスポンスをコンソールに出力
    this.shifts = getShiftByUserresponse;
  },

  //updateStatusを10秒に1回実行する
  created() {
    this.updateStatus();
    setInterval(this.updateStatus, 1000);
  },

  methods: {
    changeDate(date){
      if(date == '1123'){
        this.date = 23
      }
      else if(date == '1124'){
        this.date = 24
      }
      else if(date == '1125'){
        this.date = 25
      }
      else if(date == '1126'){
        this.date = 26
      }
      else if(date == 'Today'){
        this.date = null
      }
    },

    updateStatus(){
      let currentTime = new Date();

      //時間をJSTでHH:MM形式にする

      let currentHour = currentTime.getHours() ;
      let currentMinute = currentTime.getMinutes();
      if(currentHour > 24){
        currentHour = currentHour - 24;
      }
      if(currentMinute < 10){
        currentMinute = '0' + currentMinute;
      }

      let currentTimeJST = currentHour + ':' + currentMinute;
      this.currentTime = currentTimeJST;
      let currentTimeNum = currentHour * 60 + currentMinute;

      //Dateを今日の日付と比較し、今日のものだけフィルタリングする
      let today = new Date();
      let todayYear = today.getFullYear();
      let todayMonth = today.getMonth() + 1;
      let todayDate = this.Date
      // let todayMonth = 11
      let todayString = todayYear + '-' + todayMonth + '-' + todayDate + 'T00:00:00.000Z'; //なぜかT15:00:00.000Z設定になっているのでこれにする
      this.NowShowing = todayString;
      let todayDateObject = new Date(todayString);
      //todayDateObjectとShiftsのDateを比較し、一致したものをTodayShiftsに入れる
      let todayShifts = [];
      for(let i = 0; i < this.shifts.length; i++){
        let shiftDate = this.shifts[i].Date;
        let shiftDateObject = new Date(shiftDate);
        if(todayDateObject.getTime() == shiftDateObject.getTime()){
          todayShifts.push(this.shifts[i]);
        }
      }



      //現在の時刻とstartimeの時刻を比較する
      //現在の時刻がstartimeより大きく、endtimeより小さい場合、statusをongoingにする。
      //startimeより小さい場合、statusをfollowingにする。
      //endtimeより大きい場合、statusをendedにする。
      let ongoingnow =[]
      let followingnow =[]
      let endednow =[]
      for(let i = 0; i < todayShifts.length; i++){
        //HH:MM形式の文字列を比較するために、HHとMMに分け、数値にする
        let shiftStartTime = todayShifts[i].StartTime;
        let shiftEndTime = todayShifts[i].EndTime;
        // let shiftStatus = this.shifts[i].Status;
        let shiftStatus = '';
        let shiftStartHour = Number(shiftStartTime.split(':')[0]);
        let shiftStartMinute = Number(shiftStartTime.split(':')[1]);
        let shiftEndHour = Number(shiftEndTime.split(':')[0]);
        let shiftEndMinute = Number(shiftEndTime.split(':')[1]);
        let startTimenum = shiftStartHour * 60 + shiftStartMinute;
        let endTimenum = shiftEndHour * 60 + shiftEndMinute;

        //現在の時刻とstartimeの時刻を比較する
        //現在の時刻がstartimeより大きく、endtimeより小さい場合、statusをongoingにする。
        //startimeより小さい場合、statusをfollowingにする。
        //endtimeより大きい場合、statusをendedにする。

        if(currentTimeNum >= startTimenum && currentTimeNum <= endTimenum){
          shiftStatus = 'ongoing';
        }
        else if(currentTimeNum < startTimenum){
          shiftStatus = 'following';
        }
        else if(currentTimeNum > endTimenum){
          shiftStatus = 'ended';
        }



        //振り分けられたところにpushする
        if(shiftStatus == 'ongoing'){
          ongoingnow.push(this.shifts[i]);
        }
        else if(shiftStatus == 'following'){
          followingnow.push(this.shifts[i]);
        }
        else if(shiftStatus == 'ended'){
          endednow.push(this.shifts[i]);
        }
      }
      this.ongoing = ongoingnow;
      this.following = followingnow;
      this.ended = endednow;


    }
  }


}
</script>

<style lang="scss" scoped>
.shiftpage{
  background-image: url(~/assets/images/pattern.webp);
  background-size: cover;
  background-repeat: repeat-y;
}
.shifts{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:1rem;


}
.shift{
  width: 100%;
}
.ongoing{
  &__heading{
    color:$red;
  }
}
.following{
  &__heading{
    color:$orange;
  }
}
.ended{
  &__heading{
    color:$gray;
  }
}
.header{
  background-color: $white;
  top:0rem;
  position:sticky;
  padding:1rem 0.5rem 1rem 0.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap:1rem;
  &__hi{
    font-size: 1.2rem;
    font-weight: bold;
    color:$black;
  }
}
</style>
