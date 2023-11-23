<template>
  <div>
    <div class="popup" v-if="popupshow">
      <PopUp  @closepopup="closepopup()" :shift='popupShift'/>
    </div>
    <div class="Index">
      <div class="Index__time">
        時間
      </div>
      <div class="Index__cellwrap">
          <div class="Index__cells" v-for="time in timeIndex" :key="time.id">
            {{ time.time }}
            <!-- 次のtimeを指定したい -->

          </div>

        </div>
    </div>


  <div class="allshift">
    <!-- {{ AllShift }} -->
    <!-- {{ allUser }} -->
    <div>
      <div v-for="user in allUser" :key="user.id" class="User User__Height">
        {{ user.UserID }}
        {{ user.Department }}
        {{ user.Abbreviation }}
      </div>
    </div>
    <div class="Shift">
      <div class="Shift__Row User__height">

      </div>
      <div v-for="user in allUser" :key="user.id" class="User__Height Shift__Row">
        <div v-for="shift in AllShiftByDate" :key="shift.ShiftID" >
         <div v-if="user.UserID.toString() == shift.UserID.toString()"
         >
          <div :style="{'width': shift.width + 'px', 'left':shift.StartPercentage + 'px'}"  class="Shift__cells" @click="changeShift(shift.ShiftID)">
            {{ shift.ShiftName }}
            <!-- {{ shift.Date }} -->
            <!-- {{ shift.StartTime }}
            {{ shift.EndTime }}
            {{ shift.StartPercentage  }}
            {{ shift.EndPercentage}} -->

          </div>

        </div>
        </div>
      </div>
    </div>
    <!-- {{ allUser }} -->
  </div>
</div>
</template>

<script>

export default {
  data() {
    return {
      popupshow: false,
      popupShift: [],
      allUser: [],
      allShift: [],
      timeIndex:[
  {id: 1, time: "07:00~07:30"},
  {id: 2, time: "07:30~08:00"},
  {id: 3, time: "08:00~08:30"},
  {id: 4, time: "08:30~09:00"},
  {id: 5, time: "09:00~09:30"},
  {id: 6, time: "09:30~10:00"},
  {id: 7, time: "10:00~10:30"},
  {id: 8, time: "10:30~11:00"},
  {id: 9, time: "11:00~11:30"},
  {id: 10, time: "11:30~12:00"},
  {id: 11, time: "12:00~12:30"},
  {id: 12, time: "12:30~13:00"},
  {id: 13, time: "13:00~13:30"},
  {id: 14, time: "13:30~14:00"},
  {id: 15, time: "14:00~14:30"},
  {id: 16, time: "14:30~15:00"},
  {id: 17, time: "15:00~15:30"},
  {id: 18, time: "15:30~16:00"},
  {id: 19, time: "16:00~16:30"},
  {id: 20, time: "16:30~17:00"},
  {id: 21, time: "17:00~17:30"},
  {id: 22, time: "17:30~18:00"},
  {id: 23, time: "18:00~18:30"},
  {id: 24, time: "18:30~19:00"},
  {id: 25, time: "19:00~19:30"},
  {id: 26, time: "19:30~20:00"},
  {id: 27, time: "20:00~20:30"},
  {id: 28, time: "20:30~21:00"},
  {id: 29, time: "21:00~21:30"},
  {id: 30, time: "21:30~22:00"}
],
      // selectedDate: ""

    }
  },
  middleware: 'auth',
  async mounted() {
    const gotallUser = await this.$axios.$get(`/api/getInfo/alluser/`);
    this.allUser = gotallUser

    const gotallShift = await this.$axios.$get(`/api/getInfo/allshift/`);
    this.allShift = gotallShift
  },
  computed: {
    AllShiftByDate() {
      //selectedDateがthis.allShiftのDateと一致するものをフィルタリングする
      let FilterdByDate = this.allShift.filter((shift) => {
        return shift.Date == this.selectedDate
      })
      //FilterdByDateの1つ1つの要素に対して、StartDateとEndDateをすべて分換算の数字にする
      FilterdByDate.forEach((shift) => {
        let StartTimeHour = Number(shift.StartTime.slice(0, 2)) - 7
        let StartTimeMinute = Number(shift.StartTime.slice(3, 5))
        let EndTimeHour = Number(shift.EndTime.slice(0, 2)) - 7
        let EndTimeMinute = Number(shift.EndTime.slice(3, 5))
        let StartNum = (StartTimeHour * 60 + StartTimeMinute) * 1500 / 900
        let EndTimenum = (EndTimeHour * 60 + EndTimeMinute) * 1500 / 900
        shift.StartPercentage = StartNum
        shift.EndPercentage = EndTimenum
        shift.width = shift.EndPercentage - shift.StartPercentage
      })




      return FilterdByDate
    },
    selectedDate() {
      //今日の日付をを取得、月はいらない
      let today = new Date()
      let date = today.getDate()
      console.log(date)
      return "2023-11-" + date + "T15:00:00.000Z"
    }
  },
  methods:{
    closepopup(){
      this.popupshow = false;
    },
    changeShift(shiftID){
     //ShiftIDが一致するものをallShiftから捜す
     let selectedShift = this.allShift.find((shift) => {
       return shift.ShiftID == shiftID
      })
      console.log(selectedShift)
      this.popupShift = selectedShift
      this.popupshow = true;

    }
  }
}

</script>

<style lang='scss' scoped>
.allshift{
  display:flex;
  width: 100%;
  // overflow: scroll;

}
.User{
  display: flex;
  flex-direction: row;
  width:300px;
  // margin-top:1rem;
  &__Height{
    height: 80px;

    // background-color: $gray;
    // width: 100px;
    border: solid 1px black;
  }
}
.Shift{
  // overflow: scroll;
  background-color: rgba($gray, 0.2);
  &__Row{
    // overflow-x: scroll;
    position: relative;
    width:1500px;

  }
  &__cells{
    position: absolute;
    background-color:$white ;
    border: solid 1px $black;
    &:hover{
      // transform: scale(1.01);
      // box-shadow: 0 0 1px rgba($black, 0.5);
      border: solid 1px rgba($red, 0.8);
    }

  }
}
.Index{
  z-index: 100000;
  position: sticky;
  top:0;
  // display: flex;
  display: grid;
  grid-template-columns: 300px 1500px;
  background-color: $white;
  // width:100%;
  // overflow: scroll;
  &__time{
    // width:300px !important;
    height: 40px;
  }
  &__cellwrap{
    display: flex;
    width:1500px;
    background-color: $white;
  }
  &__cells{
    width: 50px;
    height: 40px;
    // background-color: $gray;
    position:flex;
    justify-content: center;
    align-items: center;
    font-size: 0.6rem;
    border: solid 1px $black;
    background-color: $white;
  }
}

</style>
