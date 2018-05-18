<template id="">

 <i :class="prefix + ' fa-' + type"><slot></slot></i>

</template>

<script>

 export default {
   props: {
     prefix: {
       default: "fa",
       type: String
     },
     type: {
       type: String,
       required: true
     }
   }
 }
</script>

<style>

</style>
