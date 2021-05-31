import * as d3 from 'd3'
const json = require('../dataset/corr_data_cc1.json');



// function process(json) {
  let matched_count = json.matched_count;
  let matched_dis = json.matched_dis;
  
  for (const count_row of matched_count) {
    let max = d3.max(count_row);
    let scale = d3.scaleLinear()
      .domain([0,max])
      .range([0,25])
    count_row.map(function(params) {
      
    });

  }
  
  for (const dis_row of matched_dis) {
    let max = d3.max(dis_row);
    let scale = d3.scaleLinear()
      .domain([0,max])
      .range([0,1])
    dis_row.map(function(value) {
      return scale(value);
    });
    console.log(dis_row);
  }

  
// }


function draw() {
  const cc_num = json.cc_num
  const car_list = json.car_id
  console.log(cc_num)


  // 图形边距
  const margin = {top:60, right:0, bottom:30, left: 60};
  // 大矩形边长
  const rectHeight = 30;
  
  const width = (rectHeight + 2) * car_list.length;
  const height = (rectHeight + 2) * cc_num.length;
  // 比例尺
  const x = d3.scaleBand()
    .domain(car_list)
    .range([margin.left, width - margin.right])

  const y = d3.scaleBand()
    .domain(cc_num)
    .range([margin.top, height - margin.bottom])

  const data = d3.scaleLinear()
  
}

// draw();


