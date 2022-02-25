<template>
   <div class="robot-search">
    <a @click="toggle">
      <svg width="100%" height="100%" fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path d="M24,15.71v.79a.5.5,0,0,0,1,0v-9A2.5,2.5,0,0,0,22.5,5H5.5A2.5,2.5,0,0,0,3,7.5v13A2.5,2.5,0,0,0,5.5,23h13a.5.5,0,0,0,0-1H5.5A1.5,1.5,0,0,1,4,20.5v-.79l6.48-6.52,3.16,3.16h0l2.5,2.49a.49.49,0,0,0,.7-.7L14.71,16l4.78-4.8ZM19.49,10a.51.51,0,0,0-.36.15L14,15.29l-3.17-3.16a.47.47,0,0,0-.35-.15h0a.47.47,0,0,0-.35.15L4,18.29V7.5A1.5,1.5,0,0,1,5.5,6h17A1.5,1.5,0,0,1,24,7.5v6.79l-4.16-4.15a.47.47,0,0,0-.35-.15ZM16,10a1,1,0,1,1-1-1A1,1,0,0,1,16,10ZM28.85,26.15l-1.7-1.71a4,4,0,1,0-.71.71l1.71,1.7a.49.49,0,0,0,.7-.7ZM24,25a3,3,0,1,1,3-3A3,3,0,0,1,24,25Z" />
      </svg>
    </a>

    <robot-eyes url="https://m12.exedio.com.br/imagio/search" v-pre />
  </div>
</template>

<script>
export default {
  name: 'RobotSearch',
  mounted() {
    require('robot-eyes');
    this.robotEyes = document.querySelector('robot-eyes');
  },
  methods: {
    toggle() {
      this.robotEyes.open = !this.robotEyes.open;
    }
  }
};
</script>

<style lang="scss" scoped>
.robot-search {
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  robot-eyes {
    position: absolute;
    z-index: 1000;
  }
}
</style>
