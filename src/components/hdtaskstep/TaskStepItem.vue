<template id="">
<div class="hd-task-step-item">

  <div class="hd-step-info">

    <div class="hd-field-item step-start-time" v-if="showItem[0]">
       <ul>
         <li v-if="!editable">
            <span v-html="pstime"></span>
            <!-- <input v-model="data.planstime" v-if="editable"/> -->
         </li>
         <li v-if="!editable">-</li>
         <li v-if="!editable">
            <span v-html="potime"></span>
            <!-- <input v-model="data.planotime" v-if="editable"/> -->
         </li>

         <li v-if="editable">
            <DatePicker placement="bottom" :transfer="true" @on-change="planTimeChange" :value="planTimeRange" format="yyyyMMdd" type="datetimerange" placeholder="选择日期"></DatePicker>
         </li>

       </ul>

    </div>

    <div class="hd-field-item step-rover-time" v-if="showItem[1]">
      <ul>
        <li v-if="!editable">
          <span v-html="rstime"></span>
          <!-- <input v-model="data.realstime" v-if="editable"/> -->
        </li>
        <li v-if="!editable">-</li>
        <li v-if="!editable">
          <span v-html="rotime"></span>
          <!-- <input v-model="data.realotime" v-if="editable"/> -->
        </li>
        <li v-if="editable">
           <DatePicker placement="bottom" :transfer="true" @on-change="realTimeChange"  :value="realTimeRange" format="yyyyMMdd" type="datetimerange" placeholder="选择日期"></DatePicker>
        </li>
      </ul>
    </div>
    <div class="hd-field-item hd-step-state" v-html="stateMsg" v-if="showItem[3]"></div>
    <div class="hd-field-item hd-steop-numbers" v-if="showItem[4]">已完成{{data.finished}}个 / {{data.total}}总任务</div>

    <div class="hd-split-line"></div>
  </div>

  <div class="hd-step-bar" :style="{backgroundColor: color}">

      <strong :class="['hd-title', data.callback&&'hd-editable']" @click.prevent="callback">
        {{data.title}}
        <fa-icon :type="arrowstate?'chevron-up':'chevron-down'"></fa-icon>
      </strong>
      <span :class="['hd-step-point', selected&&'active']" :style="{backgroundColor: color}">
        <i :style="{borderTopColor: color}"></i>
      </span>

  </div>
</div>
</template>

<script>
require("../../tools/dateutil")

export default {
  name: "TaskStepItem",

  data() {

    return {
      selected: false,
      color: '#eee',
      stateMsg: "",
      arrowstate: false,
      planTimeRange:[],
      realTimeRange:[]
       
    }
  },

  computed: {
    pstime() {

      let date = new Date(Date.parse(this.data.planstime.split(" ")[0]));
      return date.toFormat("YYYY.MM.DD");
    },

    potime() {
      let date = new Date(Date.parse(this.data.planotime.split(" ")[0]));
      return date.toFormat("YYYY.MM.DD");
    },

    rotime() {
      if( this.data.realotime && this.data.realotime.trim().length > 0) {
        let date = new Date(Date.parse(this.data.realotime.split(" ")[0]));
        const t = date.toFormat("YYYY.MM.DD");
        // if (t.indexOf("NaN") > -1) return "0000.00.00";
        if (t.indexOf("NaN") > -1) return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        return t;
      }

      return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

    },

    rstime() {
      if(this.data.realstime && this.data.realstime.trim().length > 0) {
        let date = new Date(Date.parse(this.data.realstime.split(" ")[0]));
        const t = date.toFormat("YYYY.MM.DD");
        // if (t.indexOf("NaN") > -1) return "0000.00.00";
        if (t.indexOf("NaN") > -1) return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        return t;
      }
      return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
  },

  watch: {

    data: {
      deep:true,
      handler(val) {
         if(!this.editable) {
           const fc = new FilterControl(this);
           fc.action();
         }
         // this.initTimeRange();
      }
    }

  },


  props: {
    data: {
      type: Object,
      default: ()=>{}
    },

    datas: {
      type: Array,
      default: ()=>[]
    },

    editable: {
      type: Boolean,
      default: false
    },

    colors: {
      type: Array
    },

    showItem: {
      type: Array
    },

    states: {
      type: Array,
      default: ()=> [0, 2, 1] //第一个为未开始, 第二个为进行中, 第三个为已完成
    },
    delay: {
      type: Number,
      default: 7
    },
    index: {
      type: Number,
      default: -1
    }
  },

  mounted() {
    if(!this.editable) {
      const fc = new FilterControl(this);
      fc.action();
    }

    this.initTimeRange();

    // console.log("log for TaskStepItem: mounted, planTimeRange", this.planTimeRange);
  },

  methods: {

    initTimeRange() {
      this.planTimeRange.splice(0, this.planTimeRange.length);
      let ps = this.data.planstime?new Date(this.data.planstime):"";
      let pe = this.data.planotime?new Date(this.data.planotime):"";
      this.planTimeRange.push(ps, pe);

      if(this.data.realstime) {
        this.realTimeRange.splice(0, this.realTimeRange.length);
        let rs = this.data.realotime?new Date(this.data.realstime):"";
        let re = this.data.realotime?new Date(this.data.realotime):"";
        this.realTimeRange.push(rs, re);
      }
    },


    planTimeChange(val) {

      let ps = new Date(Date.parse(val[0], "yyyyMMdd"));
      let pe = new Date(Date.parse(val[1], "yyyyMMdd"));
      this.data.planstime = ps.toFormat("YYYY-MM-DD");
      this.data.planotime = pe.toFormat("YYYY-MM-DD");

     // console.log("--->", val, this.data.planstime, this.data.planotime )
      // this.planTimeRange = [ps.toFormat("YYYYMMDD"), pe.toFormat("YYYYMMDD")];
      this.$emit("dateChange", {context: this, data: this.data, index: this.index});
       


    },

    realTimeChange(val) {
      let ds = new Date(Date.parse(val[0], "yyyyMMdd"));
      let de = new Date(Date.parse(val[1], "yyyyMMdd"));
      this.data.realstime = ds.toFormat("YYYY-MM-DD");
      this.data.realotime = de.toFormat("YYYY-MM-DD");
      this.$emit("dateChange", {context: this, data: this.data, index: this.index});
    },

    callback(e) {
      //  console.log(this.$parent)
       if(!this.data.callback) return;

       this.$parent.$children.forEach(item=>{
         if(item.$vnode.tag.indexOf("TaskStepItem")>=0) {
           (item!=this)&&(item.arrowstate = false);
         }
       })

       //console.log(this.arrowstate)

       if(this.arrowstate) {
         this.arrowstate = false
       } else {
         this.arrowstate = true;
       }

       if(this.data.callback) this.data.callback(e, this.data, this.arrowstate);


    }
  }


}


/**
 * 计算时间.
 * 有计划完成时间, 代表已经完成
 * 没有计划完成时间, 代表任务还在进行:
 * 计划完成时间 < 当前时间 => 状态正常
 * 计划完成时间 > 当前时间 => 状态延期:
 * |计划完成时间 - 当前时间| < 7天 状态延期7天内,
 * |计划完成时间 - 当前时间| > 7天 状态延期超过7天
 */
function FilterControl(context) {
  this.filter = [
    new MilestoneFilter(context),
    new PostponeIn7Filter(context),
    new PostponeOver7Filter(context),
    new FinishedFilter(context),
    new PostponeStateMSg(context),
    new NormalFilter(context)
  ];
  this.context = context;
  this.action = function() {
    this.filter.forEach(item => {
      item.action();
    })
  }
}

function NormalFilter(context) {
  this.context = context
  this.action = function() {
     let date = new Date(Date.parse(this.context.data.planotime.split(" ")[0]));
     let day = date.getDaysBetween(new Date());
     if(day < 0 && Math.abs(day) > (this.context.delay-1) && this.context.data.state == this.context.states[1]) {
         this.context.color = this.context.colors[0]
     }
  }
}

function MilestoneFilter(context) {
   this.context = context;
   this.action = function() {
     if(this.context.data.state == this.context.states[2]) {
       this.context.selected = true;
     } else {
       this.context.selected = false;
     }
   }
}


/**
 * PostponeIn7Filter - 变成预警前几天的处理方式
 *
 * @param  {type} context description
 * @return {type}         description
 */
function PostponeIn7Filter(context) {
  this.context = context
  this.action = function() {
    let date = new Date(Date.parse(this.context.data.planotime.split(" ")[0]));
    let day = date.getDaysBetween(new Date());
    //console.log("预警: ", Math.abs(day) <= (this.context.delay-1))
    if (day <= 0 && Math.abs(day) <= (this.context.delay-1) && this.context.data.state == this.context.states[1]) {
       this.context.color = this.context.colors[1];
    }

  }
}

function PostponeStateMSg(context) {
  this.context = context;
  this.action = function() {
    let date = new Date(Date.parse(this.context.data.planotime.split(" ")[0]));
    let day = date.getDaysBetween(new Date());
    if (day > 0 && this.context.data.state == this.context.states[1]) {
       this.context.stateMsg = "已延期<strong class='tc-danger'>" + day + "</strong>天";
    }

    if (this.context.data.state == this.context.states[0]) {
       this.context.stateMsg = "未开始";
    }

    if(day < 0 && this.context.data.state == this.context.states[1]) {
       this.context.stateMsg = "进行中"
    }
  }
}


/**
* 延期处理
* 
* @update  2018-05-18 towaywu@gmail.com
*  更加需求调整为不需要判断日期来限制延期
 */
function PostponeOver7Filter(context) {
  this.context = context
  this.action = function() {
    let date = new Date(Date.parse(this.context.data.planotime.split(" ")[0]));
    let day = date.getDaysBetween(new Date());
    //console.log("延期", day, this.context.data.title, this.context.data.state)

    //this.context.data.state == this.context.states[1]
    if (day > 0) {
       this.context.color = this.context.colors[2];
    }
  }
}

function FinishedFilter(context) {
  this.context = context
  this.action = function() {
    if (this.context.data.state == this.context.states[2]) {
      this.context.color = this.context.colors[3];
      this.context.stateMsg = "已完成";
    }
  }
}
</script>

<style>
.hd-task-step-item {
  display: inline-block;
  color: #000;
  position: relative;
  width: 20%;
  font-size: 11px;
  min-width: 160px;
}


.hd-step-info {
  position: relative;
  text-align: center;
  margin-top: 30px;
  padding: 8px 0;
  background-color: #EAF1FF;

}

.hd-step-info .ivu-input, .hd-step-info .ivu-input-icon {
  height: 20px;
  line-height: 20px;
}

.hd-split-line {
  width: 1px;
  height: 50%;
  position: absolute;
  background-color: #D4E3FF ;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
}

.hd-step-point {
  position: relative;
  z-index: 900
}


.hd-step-bar {
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #eee;
  top: 7px;

}

.hd-step-bar .hd-title {
  width: 100%;
  display: block;
  text-align: center;
  position: relative;
  top: -30px;
}

.hd-step-bar .hd-step-point {
   width: 16px;
   height: 16px;
   border-radius: 100%;
   display: inline-block;
   position: absolute;
   right: -8px;
   top: -8px;
   padding: 4px;
}

.hd-step-bar .hd-step-point::after {
  display: block;
  content: " ";
  border-radius: 100%;
  background-color: #fff;
  width: 100%;
  height: 100%;
}


.hd-task-step-item:first-child .hd-step-bar::after, .hd-task-step-item:first-child .hd-step-bar::before {
    display: block;
    content:  " ";
    position: absolute;
    left: -8px;
    top: -8px;
    width: 16px;
    height: 16px;
    border-radius: 16px;
    background-color: #94C93A;
}


.hd-task-step-item:first-child .hd-step-bar::before {
  border-radius: 100%;
   background-color: #fff;
   left: -4px;
   top: -4px;
   width: 8px;
   height: 8px;
   z-index: 2;
}

.hd-field-item ul, .hd-field-item li {
  list-style: none;
  margin: 0;
  padding: 0;
  white-space: nowrap;
}

 .hd-field-item li  {
   display: inline-block;
 }

.hd-title i {
  display: none;
}
 .hd-editable {
   color: #4170F5;
   text-decoration: underline;
   cursor: pointer;
 }
 .hd-editable i {
   display: inline-block;
 }
</style>
