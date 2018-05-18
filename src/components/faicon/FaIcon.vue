<template id="">

 <i :class="'tfa fa-' + type"><slot></slot></i>

</template>

<script>

 export default {
   props: {
     type: {
       type: String,
       required: true
     }
   }
 }
</script>

<style>

</style>
