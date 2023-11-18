<template>
  <div class="card shadow">
    <div class="card__time" v-if="Shift.StartTime">
      {{ Shift.StartTime }}～{{ Shift.EndTime }}
    </div>
    <div class="card__content">
      <div class="card__content__title">
        {{ Shift.ShiftName }}
      </div>
      <div class="card__content__manual" v-if="Status != 'noShift'">
        <button class="card__content__manual__btn shadow" @click="moveToManual(Shift.ManualLink)"
        :class="{ongoing: Status == 'ongoing',
          following:Status == 'following',
          ended:Status == 'ended',}">
          シフトマニュアルを確認
        </button>
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
      this.$router.push(`/ManualLink/${link}`);
    }
  }
}

</script>

<style lang='scss' scoped>
.card{
  width: 100%;
  border-radius: 12px;
  background-color: rgba($white, 1);
  padding:1rem 1rem 2rem 1rem;
  font-weight: bold;

  &__time{
    font-size: 1rem;
    color:$black;
    // font-weight: bold;
  }
  &__content{
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:1.2rem;
    &__title{
      font-size: 1.5rem;
      color:$black;
    }
    &__manual{
      &__btn{
        border-radius: 12px;
        background-color: $red;
        color:$white;
        font-size: 1rem;
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
</style>
