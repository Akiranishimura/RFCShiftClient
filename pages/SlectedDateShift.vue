<template>
  <div class="shiftpage">
    <div class="top">
      <div class="header">
        <div class="header__hi">
          {{ fuckyoustate }} {{ $auth.user.userId }}
        </div>
        <div class="header__btn">
          <LogOutBtn />
          <TodayShiftBtn />
        </div>
      </div>
      <TheContainer>
        <div class="selectbtns">
          <button  class= 'shadow' @click="changeDate('1123')">準備日<br><span class='time'>（11/23）</span></button>
          <button class="shadow" @click="changeDate('1124')">1日目<br><span class='time'>（11/24）</span></button>
          <button class="shadow" @click="changeDate('1125')">2日日<br><span class='time'>（11/25）</span></button>
          <button class="shadow" @click="changeDate('1126')">整理日<br><span class='time'>（11/26）</span></button>
        </div>
      </TheContainer>

    </div>
    <TheContainer>
      <!-- {{ NowShowing }} -->
      <!-- {{ TodayShift1 }} -->


      <section class="TodayShift">
        <h1 class="shiftwrap__heading">11/{{date}}のシフト</h1>
        <div class="shifts">
          <div class="shift" v-for="shift in TodayShift1" :key="shift.ShiftId">
            <ShiftCardSmall :Shift=shift Status="default"/>
          </div>
          <div class="shift" v-if="TodayShift1.length == 0">
            <ShiftCardSmall :Shift=noShiftNow Status="default"/>
          </div>

        </div>

      </section>

      <!-- {{ shifts }} -->


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
        ShiftName: '今日のシフトはありません',
      },
      noShiftNext:{
        ShiftName: '次のシフトはありません',
      },
      noShidtEnded:{
        ShiftName: '終了したシフトはありません',
      },
      date: 24,
      NowShowing: '',
      shifts:[],
      ongoing:[],
      following:[],
      ended:[],
      currentTime: '',
      TodayShift1:[],
      fuckyoustate:''
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
    this.fuckyou();
    this.updateStatus();
    setInterval(this.updateStatus, 1000);
  },

  methods: {
    changeDate(date){
      if(date == '1123'){
        this.date = 23
        console.log(this.date + 'is23?')
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
    },
    fuckyou(){
      const gakuseki = this.$auth.user.userId;
      console.log(gakuseki);
      const fucked = ['7221067', '7421116', '6222053', '6222156', '7321154'];

      // gakusekiがfucked配列に含まれているかどうかを確認
      const isMatched = fucked.includes(gakuseki);
      console.log(isMatched); // 結果: trueまたはfalse
          //fuckedのうちgakusekiがひとつ当てはまったときtrueになる変数をつくる
      if (isMatched){
         this.fuckyoustate = 'Hey Yo Fuck 🖕'
         return this.fuckyoustate
      }
      else{
        this.fuckyoustate = 'Hi👋'
        return this.fuckyoustate
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
      let todayDate = this.date - 1; //今日の日付を取得する
      let todayDatePlus1 = todayDate + 1;
      // let todayMonth = 11
      let todayString = todayYear + '-' + todayMonth + '-' + todayDate + 'T15:00:00.000Z'; //なぜかT15:00:00.000Z設定になっているのでこれにする
      let todayStringPlus1 = todayYear + '-' + todayMonth + '-' + todayDatePlus1 + 'T15:00:00.000Z'; //なぜかT15:00:00.000Z設定になっているのでこれにする
      this.NowShowing = todayStringPlus1;
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
      this.TodayShift1 = todayShifts;



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

          ongoingnow.push(todayShifts[i]);
          // ongoingnowのすべてのDateをTodayStringPlus1にする
          ongoingnow[i].Date = todayStringPlus1;



        }
        else if(shiftStatus == 'following'){
          followingnow.push(todayShifts[i]);
          followingnow[i].Date = todayStringPlus1;
        }
        else if(shiftStatus == 'ended'){
          endednow.push(todayShifts[i]);
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
.time{
  font-size: 0.7rem;
  color: $gray;
}
.top{
  position: sticky;
  top:0;
  padding-bottom: 0.5rem;
}
.selectbtns{
  margin-top: 0.25rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap:1rem;
  & button{
    background-color: $white;
    border:1px solid $black;
    border-radius: 15px;
    display: grid;
    place-items: center;
    padding:3px 10px 3px 10px;
    font-weight: bold;
    font-size: 0.8rem;
  }
}

.shiftpage{
  background-image: url(~/assets/images/pattern.webp);
  background-size: cover;
  background-repeat: repeat-y;
}
.shifts{
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:1.75rem;


}
.shift{
  width: 100%;
}
.shiftwrap{
  &__heading{
    color:$black;
  }
}



.header{
  background-color: $white;
  // top:0rem;
  // position:sticky;
  padding:0.5rem 0.5rem 0.5rem 0.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap:1rem;
  &__btn{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap:0.5rem;
  }
  &__hi{
    font-size: 1rem;
    font-weight: bold;
    color:$black;
  }
}
</style>
