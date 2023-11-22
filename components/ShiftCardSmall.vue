 <template>
  <div class="card shadow">
    <div class="card__Header" v-if="Shift.StartTime">
      <div class="card__Header__time">
      {{ ShiftDate }}
      {{ StartTime }}～{{ EndTime }}
      </div>
      <div class="card__Header__ID">
        #{{ Shift.ShiftID }}
      </div>
    </div>
    <div class="card__content">
      <div class="card__content__title">
        {{ Shift.ShiftName }}
        <!-- {{ Shift.ShiftID }} -->
      </div>
      <div v-if="Shift.Location">
        集合場所：{{ Shift.Location }}
      </div>
      <div class="card__content__manual" v-if="Status != 'noShift' && Shift.ManualLink != 'NULL'">
        <a class="card__content__manual__btn shadow"
        v-if="Shift.ManualLink !='NULL'"
        target="_blank"
        :href=Shift.ManualLink

        :class="{ongoing: Status == 'ongoing',
          following:Status == 'following',
          ended:Status == 'ended',
          default:Status == 'default'}">
          シフトマニュアルを確認
        </a>
      </div>
    </div>
  </div>
</template>

<script>
//props StarTime, EndTime, Name, Manual, Status
export default {
  props: {
    Shift: {
      type: Object,
      required: true
    },
    Status: {
      type: String,
      required: true
    }
  },
  methods: {
    moveToManual(link){
      // this.$router.push(`/ManualLink/${link}`);
    }
  },
  computed:{
    ShiftDate(){
      // YYYY-MM-DDTHH:mm:ss.sssをMM-DD+1に変換
      let MM = this.Shift.Date.slice(5,7);
      let DD = Number(this.Shift.Date.slice(8,10));
      DD = DD
      return(MM + '/' + DD)
    },
    StartTime(){
      return(this.Shift.StartTime.slice(0,5))

    },
    EndTime(){
      return(this.Shift.EndTime.slice(0,5))
    }

  }
}

</script>

<style lang='scss' scoped>
.card{
  width: 100%;
  border-radius: 12px;
  background-color: rgba($white, 1);
  padding:0.5rem 0.5rem 1rem 0.5rem;
  font-weight: bold;

  &__Header{
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    &__time{
      font-size: 1rem;
      color:$black;
      }
      &__ID{
        font-size: 1rem;
        color:rgba($black, 0.1);
      }
    // font-weight: bold;
  }
  &__content{
    margin-top: 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:0.8rem;
    &__title{
      font-size: 1.2rem;
      color:$black;
    }
    &__manual{
      &__btn{
        border-radius: 12px;
        background-color: $red;
        color:$white;
        font-size: 0.8rem;
        padding: 0.25rem 1.5rem 0.25rem 1.5rem;
        border: none;
        cursor: pointer;
      }
    }
  }
}
.ongoing{
  background-color: $red;
}
.following{
  background-color: $orange;
}
.ended{
  background-color: $gray;
}
.default{
  background-color: $black;
}
</style>
