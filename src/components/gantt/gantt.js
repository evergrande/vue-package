import moment from "moment";

function point(x, y) {
  return {
    x,
    y
  };
}

export function drawDay(time) {
  // console.log(time)
  this.times = [];
  let start = parseInt(time[0].split("-")[0]);
  let end = parseInt(time[1].split("-")[0]);
  let years = [];
  let months = [];
  let days = [];
  this.cellwidth = 20;
  this.totalwidth = 0;

  for (let y = start; y <= end; y++) {
    let yearval = {
      value: y,
      width: (moment([y]).isLeapYear() ? 366 : 365) * this.cellwidth,
      label: y + "年"
    };
    years.push(yearval);
    this.totalwidth += yearval.width;
    //let item_m = [];
    for (let m = 1; m <= 12; m++) {
      //item_m.push(m);

      let dtotal = new Date(y, m, 0).getDate();
      months.push({
        value: m,
        width: dtotal * this.cellwidth,
        label: yearval.label + m + "月"
      });

      for (let d = 1; d <= dtotal; d++) days.push({
        value: d,
        width: this.cellwidth,
        label: d
      });
    }

  }

  let smonth = months[0].value;
  if(smonth < 10) {
    smonth = '0' + smonth;
  }

  let sday = days[0].value;
  if(sday < 10) {
    sday = '0' + sday;
  }

  this.start = moment(years[0].value + "-" + smonth + "-" + sday);


  this.times.push(months, days);
}


/**
 * drawQuarter - 按季度
 *
 * @param  {type} times description
 * @return {type}       description
 */
export function drawQuarter(times) {
  this.times = [];
  this.cellwidth = 100;
  let years = getYears.call(this, times, "quarter");
  this.times.push(years);
  this.times.push(getQuarter.call(this, years));
  this.start = moment(years[0].value + "-01" + "-01");
  this.end = moment(years[years.length - 1].value + "-12" + "-30");
}



/**
 * drawWeek - 以周的形式
 *
 * @param  {type} times description
 * @return {type}       description
 */
export function drawWeek(times) {
  this.cellwidth = 80;
  this.times = [];
  let weeks = [];
  let days = [];
  let weeklabel = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]

  let start = moment(times[0]);
  let end = moment(times[1]);
  end.add(1, "d");
  start.subtract(7, 'd');
  while (start.add(1, 'd').day() != 1) start.add(1, "d");

  this.start = moment(start); //设置

  days.push({
    value: start.day(),
    label: weeklabel[start.day()],
    width: this.cellwidth
  }); //当前
  while (start <= end) {
    let week = {
      label: start.format("YYYY-MM-DD"),
      value: start,
      width: this.cellwidth * 7
    };
    if (start.day() == 0) {
      week.label = week.label + "," + start.format("YYYY-MM-DD");
    }
    for (let i = 0; i < 7; i++) {
      let dw = start.add(1, "days");
      days.push({
        value: dw.day(),
        label: weeklabel[dw.day()],
        width: this.cellwidth
      });
      if (dw.day() == 0) {
        week.label = week.label + "," + dw.format("YYYY-MM-DD");
      }
    }
    this.totalwidth += week.width;
    weeks.push(week);
    //start = start.add(8, "days");
  }
  days.pop();

  this.times.push(weeks, days);


}


function calcYearWidth(type, year) {
  if (type == "days") {
    return (moment([year]).isLeapYear() ? 366 : 365) * this.cellwidth;
  }
  if (type == "quarter") {
    return 4 * this.cellwidth;
  }
}

export function getYears(time, type) {
  let stime = new Date(time[0]);
  let etime = new Date(time[1]);
  //计算年
  let syear = stime.getFullYear();
  let eyear = etime.getFullYear();
  if(type=="quarter") {
    syear -= 1;
    eyear += 1;
  }

  let years = [];
  for (let y = syear; y <= eyear; y++) {
    let yo = {
      value: y,
      width: calcYearWidth.call(this, type, y),
      label: y + "年"
    };
    years.push(yo);
    this.totalwidth += yo.width;
  }
  return years;
}


/**
 * getQuarter - 处理季度
 *
 * @param  {type} years description
 * @return {type}       description
 */
export function getQuarter(years) {
  let quarters = []
  years.forEach(item => {
    let quarter = [{
        value: 1,
        label: "第一季度",
        width: this.cellwidth
      },
      {
        value: 2,
        label: "第二季度",
        width: this.cellwidth
      },
      {
        value: 3,
        label: "第三季度",
        width: this.cellwidth
      },
      {
        value: 4,
        label: "第四季度",
        width: this.cellwidth
      }
    ]
    quarters = quarters.concat(quarter);
  })

  return quarters;
}



export function drawTask(type) {
  let i = 0;
  this.datas.forEach(item => {
    let start = moment(item.planstime);
    let end = moment(item.planetime);

    let cell = this.cellwidth;
    if (type == "quarter") {
      cell = this.totalwidth / this.end.diff(this.start, "days");
    }

    let sunit = start.diff(this.start, "days");
    let eunit = end.diff(this.start, "days") + 1;
  //  console.log(sunit, eunit);

    item.left = sunit * cell;

    item.top = i * this.cellheight + 5 * (i * 2) + 5;

    item.width = eunit * cell - item.left;

    i++;

  })

  //console.log(this.datas);
}


export function drawLink(type) {

  //获取链接点
  let points = [];
  for (let i = 0; i < this.datas.length; i++) {
    let start = this.datas[i];
    for (let j = 0; j < this.datas.length; j++) {
      let end = this.datas[j];
      if (end.pretask&&(end.pretask == start.id)) {
        points.push([point(start.left + start.width, start.top), point(end.left, end.top)])
      }
    }
  }

  if(points.length <=0) return; //没有点就不需要执行下面的

  this.lines = [];
  points.forEach(item => {
    let start = item[0];
    let end = item[1];
    let line = [];
  //  console.log(start, end)
    //第一条线
    let line1 = {
      left: start.x,
      top: start.y + this.cellheight / 2,
      width: 10,
      height: 1
    };
    //第二条竖线
    let line2 = {
      left: line1.left + line1.width,
      top: line1.top,
      width: 1,
      height: Math.abs(end.y - start.y) / 2
    };
    if (start.y > end.y) {
      line2.top = (start.y - end.y) / 2 + this.cellheight / 2
    }
    //第三天横线

    let line3 = {
      left: end.x - line1.width,
      top: line2.top + line2.height,
      width: Math.abs(line2.left - end.x) + line1.width,
      height: 1
    };
    if (start.x < end.x) {
      line3.left = start.x + line1.width;
      line3.width = Math.abs(line2.left - end.x) - line1.width;
      // console.log(line3.left)

    }

    if (start.y > end.y) {
      line3.top = line2.top;
    }
    //第四条竖线
    let line4 = {
      left: line3.left,
      top: line3.top,
      height: line2.height,
      width: 1
    }
    if (start.x < end.x) {
      line4.left = line3.left + line3.width;
    }

    if (start.y > end.y) {
      line4.top = end.y + this.cellheight / 2;
    }

    let line5 = {
      left: line4.left,
      width: line1.width,
      top: line4.top + line4.height,
      height: 1
    }

    if (start.y > end.y) {
      line5.top = line4.top;
    }


    line.push(line1, line2, line3, line4, line5);

    this.lines.push(line);

  })

  // console.log(this.lines);



}
