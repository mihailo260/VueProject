<template>
  <div>
    Hello {{userName}}
  </div>
</template>

<script>
export default {
  data(){
    return{
      userName: localStorage.getItem('usr_name')
    }
  }

}
</script>

<style>

</style>
