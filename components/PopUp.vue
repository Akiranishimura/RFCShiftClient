<template>
  <div class="popupwrap" @click="closepopup">
    <div class="popup">

      {{ shift.ShiftName  }}
      <div class="popup__close__wrapper">
        <button class="popup__close" @click="closepopup">✖　閉じる</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popupshow: false
    }
  },
  props: {
    shift: {
      type: Object,
      // required: true
    }
  },
  methods: {
    closepopup(){
      //emitで親にpopupshowを渡す
      this.popupshow = false;
      this.$emit('closepopup', this.popupshow);
    }
  }
}

</script>

<style lang='scss' scoped>
.popupwrap{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: rgba(0,0,0,0.5);
  z-index: 100;
}
.popup{
  width:500px;
  height:400px;
  background-color: $white;
  &__close{
    background-color: $black;
    padding: 1rem;
    border: none;
    border-radius: 1rem;
    color: $white;
    &__wrapper{
      width: 100%;
      display: grid;
      place-items: center;
    }
  }
}

</style>
