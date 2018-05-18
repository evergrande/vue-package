<template id="">
<div class="task-step-item">
  <div class="step-info">
    <div class="step-point">
      <span :class="{active: selected}" :style="{backgroundColor: color}">
        <i :style="{borderTopColor: color}"></i>
      </span>
      <strong>{{data.title}}</strong>
    </div>

    <div class="field-item step-start-time" v-if="showItem[0]">
       <span v-if="!editable">{{pstime}}</span>
       <input v-model="data.planstime" v-if="editable"/>
    </div>
    <div class="field-item step-pover-time" v-if="showItem[1]">
      <span v-if="!editable">{{potime}}</span>
      <input v-model="data.planotime" v-if="editable"/>
    </div>
    <div class="field-item step-rover-time" v-if="showItem[2]">
      <span v-if="!editable">{{rotime}}</span>
      <input v-model="data.realotime" v-if="editable"/>
    </div>
    <div class="field-item step-state" v-html="stateMsg" v-if="showItem[3]"></div>
    <div class="field-item steop-numbers" v-if="showItem[4]">已完成{{data.finished}}个 / {{data.total}}总任务</div>

  </div>
  <div class="step-bar" :style="{backgroundColor: color}"></div>
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
      stateMsg: ""
    }
  },

  computed: {
    pstime() {
      return new Date(Date.parse(new Date(this.data.planstime))).toFormat("YYYY.MM.DD");
    },

    potime() {
      return new Date(Date.parse(new Date(this.data.planotime))).toFormat("YYYY.MM.DD");
    },

    rotime() {
      const t = new Date(Date.parse(this.data.realotime)).toFormat("YYYY.MM.DD");
      if (t.indexOf("NaN") > -1) return "  ";
      return t;
    }
  },


  props: {
    data: {
      type: Object,
      default: ()=>{}
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
    }
  },

  mounted() {
    const fc = new FilterControl(this);
    fc.action();
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
     let day = new Date(Date.parse(new Date(this.context.data.planotime))).getDaysBetween(new Date());
     if(this.context.data.state == 2 && day <= 0) {
         this.context.color = this.context.colors[0]
     }
  }
}

function MilestoneFilter(context) {
   this.context = context;
   this.action = function() {
     if(this.context.data.state == 2) {
       this.context.selected = true;
     } else {
       this.context.selected = false;
     }
   }
}

function PostponeIn7Filter(context) {
  this.context = context
  this.action = function() {
    let day = new Date(Date.parse(new Date(this.context.data.planotime))).getDaysBetween(new Date());
    if (day > 0 && day <= 7) {
      this.context.color = this.context.colors[1];
    }

  }
}

function PostponeStateMSg(context) {
  this.context = context;
  this.action = function() {
    let day = new Date(Date.parse(new Date(this.context.data.planotime))).getDaysBetween(new Date());
    if (day > 0 && this.context.data.state != 1) {
      this.context.stateMsg = "已延期<strong class='tc-danger'>" + day + "</strong>天";
    }

    if (day < 0 && this.context.data.state == 0) {
      this.context.stateMsg = "未完成";
    }

    if(day < 0 && this.context.data.state == 2) {
       this.context.stateMsg = "进度正常"
    }
  }
}


function PostponeOver7Filter(context) {
  this.context = context
  this.action = function() {
    let day = new Date(Date.parse(new Date(this.context.data.planotime))).getDaysBetween(new Date());
    if (day > 0 && day > 7) {
      this.context.color = this.context.colors[2];
    }
  }
}

function FinishedFilter(context) {
  this.context = context
  this.action = function() {
    if (this.context.data.state == 1) {
      this.context.color = this.context.colors[3];
      this.context.stateMsg = "已完成";
    }
  }
}
</script>

<style>
.task-step-item {
  display: inline-block;
  color: #000;
  position: relative;
  width: 20%;
  font-size: 11px;
}

.step-info {
  text-align: center;
  position: relative;
}

.step-point {
  position: relative;
  z-index: 900
}

.step-point span {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  background-color: #eee;
}

.step-point span.active {
  background-color: #eee;
  position: relative;
}

.step-point span.active::before {
  position: absolute;
  display: block;
  content: " ";
  width: 6px;
  height: 6px;
  border-radius: 6px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.step-point span.active i {
  display: block;
  position: absolute;
  bottom: -11px;
  left: 50%;
  transform: translateX(-50%);
  border: #eee 7px solid;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
}

.step-point strong {
  display: block;
  margin-top: 8px;
}



.step-bar {
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #eee;
  top: 7px;
  left: -50%;
}
</style>
