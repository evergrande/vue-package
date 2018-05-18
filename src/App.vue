<template>
  <div id="app">
     hello app
     <fa-icon type="bath" > 沐浴</fa-icon>
     <fa-icon type="play"> 播放</fa-icon>
     <fan-icon prefix="fab" type="digital-ocean"></fan-icon>
     <button @click="fn2">hello</button>
     <button @click="magnify">放大</button>
     <button @click="scale">缩小</button>

     <div>
          <div v-for="item in 1" :key="'index' + item">
           <hd-task-step :data="data"  :colors="colors" :editable="true" :delay="3" @dateChange="dateChange"></hd-task-step>
           <!-- <gantt :taskData="task" :type="type"/> -->

           <!-- <hdtree :nodes='nodes' title="组织结构"/> -->
          </div>
     </div>


        <hd-panel title="hello"></hd-panel>

  </div>
</template>

<script>

  import {combine, combine2vue} from "./tools/tool";
  //import HdTaskStep from "./components/hdtaskstep/TaskStep.vue";

  import Gantt from "./components/gantt/Gantt.vue";
  import Hdtree from "./components/hdtree/Hdtree.vue";




  let nodes =  [
  	{id: 1, name: "父节点1", children: [
  		{id: 2, name: "子节点1"},
  		{id:3, name: "子节点2", children: [
        {id: 4, name: "子节点1-1"}
      ]}
  	]}
  ];

  let a = {

     data: {
       type: 'week',
       task: toTask(),
       nodes: nodes,
       data: [],

       colors: [ /*进度正常*/ "#529DFF", /*延期7天内*/ "#FFC200", /*延期超7天*/ "#FF3D3D", /*完成*/ "#94C93A"]

     },

     methods: {
       fn2() {
         console.log(this, "fn2")
       },

       magnify() {
          this.type = "quarter"
       },

       scale() {
          this.type = "week"
       },
       fn() {

       },

       dateChange(result) {
          console.log(result)
          result.data.planstime = '';
          result.data.planotime = '';
          result.context.planTimeRange = ['', ''];
       }
     },

     components: {
       //HdTaskStep
       Gantt, Hdtree
     },

     mounted() {
       let data = [
         {
           title: "立项",
           planstime: "2017-12-09",
           planotime: "2017-12-15",
           // realstime: "2017-12-09",
           // realotime: "2017-12-16",
           total: 10,
           finished: 10,
           state: 1,
           callback: function(e) {
              console.log(e, this)
           }
         },

         {
           title: "选型",
           planstime: "2017-12-16",
           planotime: "2017-12-16",
           // realstime: "2017-12-09",
           // realotime: "2017-12-19",
           total: 10,
           finished: 10,
           state: 1,
           callback: function(e) {

           }
         },

         {
           title: "蓝图",
           planstime: "2017-12-17",
           planotime: "2018-03-16",
           // realstime: "2017-12-09",
           // realotime: "",
           total: 10,
           finished: 10,
           state: 2,
           callback: function(e) {

           }
         },

         {
           title: "开发测试",
           planstime: "2017-12-18",
           planotime: "2017-12-30",
           // realstime: "2017-12-09",
           total: 10,
           finished: 0,
           state: 0
         },

         {
           title: "上线",
           planstime: "2017-01-01",
           planotime: "2018-01-12",
           // realstime: "2017-12-09",
           total: 10,
           finished: 0,
           state: 0
         }

       ];

       setTimeout(()=>{
          this.data = data;
       }, 0)
     }
  }


 function toTask() {
     let data = []
     for(let i = 1; i < 50; i++) {
       let item = {
         id: "" + i,
         planstime: "2017-02-01",
         planetime: "2017-03-13",
         realstime: "2017-01-01",
         realetime: "2017-02-01",
         color: "#ff6600",
         manager: "张三0",
       }

       data.push(item);
     }
     return data;
 }



 let c = combine2vue({
   name: "app"
 }, a)


  export default c;
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
}
</style>
