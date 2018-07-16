<template>
<div class="gantt-container">
  <!-- <div class="gantt-grid"></div> -->
  <div class="gantt-task-panel">
    <a href="#"
       class="gantt-control gantt-control-left"
       @click.prevent="toleft">
      <fa-icon type="angle-double-left"></fa-icon>
    </a>
    <a href="#"
       class="gantt-control gantt-control-right"
       @click.prevent="toright">
      <fa-icon type="angle-double-right"></fa-icon>
    </a>
    <div class="gantt-task-row">
      <ul>
        <li :key="'row' + index"
            v-for="(item,index) in row"
            :style="{height: (cellheight+10) + 'px', lineHeight: (cellheight+10) + 'px'}">{{item}}</li>
      </ul>
    </div>
    <div class="gantt-task"
         @scroll="scroll"
         ref="task">
      <!-- <div class="gantt-data-display"> -->
        <div class="gantt-task-scale"
             ref="scale">
          <div class="gantt-scale-line"
               v-for="(item,i) in times"
               :key="'line' + i"
               :style='{width: totalwidth + "px"}'>
            <div class="gantt-scale-cell"
                 v-for="(sub,si) in item"
                 :key="'cell' + si"
                 :style="{width: sub.width + 'px', height: '15px', lineHeight: '15px'}"
                 v-html="sub.label" />
            <!-- >{{sub.label}}</div> -->
          </div>
        </div>

        <div class="gantt-data-area"
             ref="data-area">
          <div class="gantt-task-bg">
          </div>
          <div class="gantt-links-area">
            <div class="gantt-link"
                 v-for="(line,i) in lines"
                 :key="'link' + i">
              <div class="gantt-line"
                   v-for="(item,index) in line"
                   :style="{ left: item.left + 'px', top: item.top + 'px',
                        width: item.width + 'px', height: item.height + 'px'  }"
                   :key="'line' + index">
                <fa-icon type="angle-left"
                         v-if="index==0"></fa-icon>
              </div>
            </div>
          </div>

          <div class="gantt-bars-area"
               :style="{height: (cellheight+10)*(row) + 'px',
            width:totalwidth + 'px',
            backgroundSize: bgsize + 'px',
            backgroundImage: 'url(' + bg[type] + ')'}">
            <div class="gantt-bar"
                 v-for="(item,i) in datas"
                 :key="'bar' + i"
                 :style="{height: cellheight +'px',left: item.left + 'px', top: item.top + 'px',
           width: item.width + 'px', backgroundColor:item.color}">
              <span :style="{left: (item.width + 15) + 'px'}">{{item.manager}}</span>
            </div>

          </div>
        </div>
      <!-- </div> -->
    </div>
  </div>
</div>
</template>

<script>
import us from "underscore";
import moment from "moment";
import {
  drawDay,
  drawWeek,
  drawMonth,
  drawQuarter,
  drawLink,
  drawTask
} from "./gantt";
import bg100 from "./bg100.jpg";
import bg80 from "./bg80.jpg";
import bgweek from "./bgweek.jpg";

export default {

  data() {

    return {

      times: [],
      cellwidth: 1960 / 12,
      totalwidth: 0,
      start: 0,
      end: 0,
      points: [],
      lines: [],
      target: null,
      bg: {
        week: bgweek,
        day: bgweek,
      },
      bgsize: 0,
      datas: JSON.parse(JSON.stringify(this.taskData)),

      ganttType: this.type
    }
  },

  props: {

    row: {
      type: Number,
      default: 25
    },

    cellheight: {
      type: Number,
      default: 10
    },

    taskData: {
      type: Array,
      default: () => []
    },

    type: {
      type: String,
      default: "day" //day, week, quarter
    }

  },

  watch: {
    type(val) {
      this.redraw(val);
      if (val == 'week') {
        this.bgsize = this.cellwidth;
      } else if (val == 'day') {
        this.bgsize = this.cellwidth * 7;
      }
      console.log("hello type")
    },
    taskData(val) {
      this.datas = JSON.parse(JSON.stringify(val));
      this.redraw(this.type);
    }
  },

  mounted() {
    this.redraw(this.type)
    this.target = this.$refs.task;
  },

  methods: {
    redraw(type) {
      this.times = [];
      this.points = [];
      this.lines = [];
      this.start = 0;
      this.end = 0;
      this.totalwidth = 0;
      this.datas = JSON.parse(JSON.stringify(this.taskData));

      let timeRange = findMinMax(this.datas);
      if (timeRange) {
        drawHead.call(this, timeRange, type);
        drawTask.call(this, type);
        drawLink.call(this);
      }
      //console.log(this.times);
    },
    scroll(e) {
      this.target = e.target;
      this.$refs.scale.style.top = this.target.scrollTop + "px";

    },
    toleft() {
      if (this.target.scrollLeft <= 0) return;
      this.target.scrollLeft -= 100;
    },
    toright() {
      if (this.target.scrollLeft >= this.target.scrollWidth) return;
      this.target.scrollLeft += 100;
    }
  }
}

/**
 * 1. 找出最小时间: 最小时间从计划开始时间找
 * 2. 找出最大时间: 最大时间, 从计划结束时间与实际结束时间中找
 * 3. 找出时间后, 来对整个甘特画框架, 实现缩放功能: 目前有星期, 月, 季进行缩放
 * 4. 更加任务的计划开始时间和任务的计划完成时间, 画出每一条任务条.
 * 5. 任务有前置任务的需要进行连接. 起始点为前置任务的计划完成时间, 结束点为当前任务的计划开始时间点.
 */
function findMinMax(data) {
  if (data.length == 0) return;
  let min = us.sortBy(data, "planstime")[0].planstime;
  let max = us.sortBy(data, "planetime")[data.length - 1].planetime;
  let rmax = us.sortBy(data, "realetime")[data.length - 1].realetime;

  if (rmax > max) {
    max = rmax;
  }
  return [min, max];
}

//1. 计算出年
// 2. 计算出月
// 3. 计算出日
//
/**
 * 按天来说, 就是年月日, [最大年, 最小年]
 * [2016, 2017]
 * [1..12,...]
 * [1...31,...]
 * 按周来说, 就是[年月日时间段][日(周)],
 * [2017 1月 10-17]
 * [星期一, 星期二, 星期三]
 * 按季度, 就是[年][季度] 一年四个季度,
 * [2016, 2017]
 * [1-2-3, 4-5-6, 7-8-9, 10-11-12]
 */
function drawHead(time, type) {
  if (type == "day") {
    drawDay.call(this, time);
  }

  if (type == "quarter") {
    drawQuarter.call(this, time);
  }

  if (type == "month") {
    drawMonth.call(this, time);
  }

  if (type == "week") {
    drawWeek.call(this, time);
  }
}
</script>

<style>
@import "./gantt.css"
</style>
