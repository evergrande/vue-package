<template>
  <div class="panel" :style="{borderRadius:!hdbdradius?'0': '5px'}">
    <div class="panel-heading"
         :style="{
           height: calcHdheight,
           backgroundColor:hdbgcolor?'#647FF5':'rgba(255,255,255,0.8)',
           color:hdbgcolor?'#fff':'#000'

       }">
      <strong class="title" v-if="!(title=='false')">{{title}}</strong>
      <slot name="left"></slot>
      <div class="right"><slot name="right"></slot></div>
    </div>
    <div class="panel-body" :style="{padding: padding + 'px', margin: margin + 'px'}">
       <slot></slot>
    </div>
    <div class="panel-footing" v-if="foot">
        <slot name="foot"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Panel",
  props: {
    title: {
      type: String
    },

    foot: {
      type: Boolean,
      default: true
    },

    hdheight: {
      type: Number|String,
      default: 40
    },

    hdbgcolor: {
      type: Boolean,
      default: false
    },

    hdbdradius: {
      type: Boolean,
      default: true
    },

    padding: {
      type: Number,
      default: 15
    },

    margin: {
      type: Number,
      default: 0
    }

  },
  computed: {
     calcHdheight() {
       if(this.hdheight.constructor == Number) {
         return this.hdheight + "px";
       }  else {
         return this.hdheight;
       }
     }
  }
}
</script>

<style scoped>
.panel {
  margin-bottom: 20px;
  /* border: 1px solid #ACBDCE; */
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.panel-heading {
  /* border-bottom: 1px solid #ACBDCE; */
  background-color: rgba(255,255,255,0.6);
  position: relative;
  height: 40px;
}

.panel-heading .right {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
}

.panel-heading::after {
  display: block;
  content: " ";
  width: 100%;
  height: 0;
  clear: both;
}

.panel-heading strong.title {
  line-height: 22px;
  font-size: 14px;
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 24px;
}

.panel-heading strong.title::before {
  display: inline-block;
  content: "●";
  font-size: 22px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
}

.panel-body {
  padding: 15px;
  background-color: #fff;
  width: 100%;
}

.panel-body .ivu-table-wrapper {
   margin:-15px;
}

.panel-footing {
  padding: 10px 15px;
  position: relative;
  background-color: #fff;
  width: 100%;
  min-height: 40px;
  /* border-top: 1px solid #ACBDCE; */
}
</style>
