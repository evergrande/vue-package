<template>
    <div class="task-step">
      <div class="task-step-label">
          <div class="field-item" v-if="showItem[0]">计划开始时间:</div>
          <div class="field-item" v-if="showItem[1]">计划完成时间:</div>
          <div class="field-item" v-if="showItem[2]">实际完成时间:</div>
          <div class="field-item" v-if="showItem[3]">延期情况:</div>
          <div class="field-item" v-if="showItem[4]">任务情况:</div>
      </div>
      <div class="task-step-items">
        <task-step-item v-for="(item, index) in data" :key="item.title" :editable="editable" :colors="colors"
         :data="item" :showItem="showItem"
         />
      </div>

    </div>
</template>

<script>
import TaskStepItem from "./TaskStepItem";
  export default {
     name: "TaskStep",

     props: {

       data:{
         type:Array,
         default: ()=>[]
       },

       editable: {
         type:Boolean,
         default: false
       },

       colors: {
         type: Array,
         default: ()=>[ /*进度正常*/ "#529DFF", /*延期7天内*/ "#FFC200", /*延期超7天*/ "#FF3D3D", /*完成*/ "#94C93A"]
       },

       showItem: {
         type: Array,
         default:()=>[false, true, true, true, true]
       }
     },

     components: {
        TaskStepItem
     }
  }
</script>

<style>
.task-step {
  font-size: 0;
}
.task-step::after {
  display: block;
  content: " ";
  height: 0;
  clear: both;
}

.task-step-label {
  padding-top: 48px;
  float: left;
  font-size: 12px;
  width: 12%;
  text-align: right;
}

.task-step-items {
  width: 88%;
  float: left;
}

.task-step .task-step-item:first-child .step-bar {
  width: 0;
}

.field-item {
  height: 18px;
  margin: 5px 0;
}

</style>
