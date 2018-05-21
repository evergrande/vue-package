<template>
    <div class="hd-task-step">

      <div class="hd-step-info hd-task-step-label">
          <div class="hd-field-item" v-if="showItem[0]">计划:</div>
          <div class="hd-field-item" v-if="showItem[1]">实际:</div>
          <div class="hd-field-item" v-if="showItem[2]">延期情况:</div>
          <div class="hd-field-item" v-if="showItem[3]">任务情况:</div>
      </div>

      <div class="hd-task-step-items">
        <template v-for="(item, index) in data">
          <task-step-item :style="{width: 100/data.length + '%'}" :key="'step' + index" :editable="editable" :colors="colors"
           :data="item" :showItem="showItem" :states="states" :delay="delay" :index="index" @dateChange="dateChange" :datas="data"
           :clickItem="clickItem"
           />
        </template>

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
         default:()=>[true, true, false, false]
       },

       states: {
         type: Array,
         default: ()=> [0, 2, 1] //第一个为未开始, 第二个为进行中, 第三个为已完成
       },
       delay: {
         type: Number,
         default: 7
       },
       clickItem: {
         type: Function,
         default: null,
       }
     },

     methods: {
        dateChange(result) {
            this.$emit("dateChange", result);
        }
     },

     components: {
        TaskStepItem
     }
  }
</script>

<style>
.hd-task-step {
  font-size: 0;
  margin-top: 30px;
  white-space: nowrap;
}

.hd-task-step::after {
  display: block;
  content: " ";
  height: 0;
  clear: both;
}

.hd-task-step * {
  box-sizing: border-box;
}

.hd-task-step .hd-task-step-label  {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  position: relative;
  top: 1px;
}
.hd-task-step .hd-task-step-item:last-child .hd-step-info{
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}


.hd-task-step-label {
  padding-top: 48px;
  padding-right: 10px !important;
  display: inline-block;
  font-size: 12px;
  width: 10%;
  text-align: right!important;
}

.hd-task-step-items {
  width: 88%;
  display: inline-block;
}



.hd-field-item {
  height: 18px;
  margin: 5px 0;
}

</style>
