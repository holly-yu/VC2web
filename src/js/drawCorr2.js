import * as d3 from 'd3'
const json = require('../dataset/corr_data_cc_sorted_1500.json');


let matched_count = json.matched_count;
let matched_dis = json.matched_dis;
function process(json) {
  
  // let maxlist = []
  // for (const i in matched_count) {
  //   maxlist.push(d3.max(matched_count[i]));
  // }

  // let max = d3.max(maxlist);

  for (const i in matched_count) {
    let scale = d3.scaleLinear()
      .domain([0,1])
      .range([0,27])
      matched_count[i] = matched_count[i].map(value => scale(value));
  }

  for (const i in matched_dis) {
    
    let scale = d3.scaleLinear()
      // .domain([0,3000])
      .domain([0,1500])
      .range([0,1])
    matched_dis[i] = matched_dis[i].map(value => scale(value));

  }
  
}


function draw_cc() {
  const cc_num = json.cc_num;
  const car_list = json.car_id;
  console.log(cc_num);
  console.log(car_list);


  // 图形边距
  const margin = {top:60, right:0, bottom:30, left: 60};
  // 大矩形边长
  const rectHeight = 29;
  
  const height = (rectHeight + 4) * car_list.length + margin.bottom;
  const width = (rectHeight + 4) * cc_num.length + margin.left;
  // 比例尺
  const x = d3.scaleBand()
    .domain(cc_num)
    .range([margin.left, width])

  const y = d3.scaleBand()
    .domain(car_list)
    .range([margin.top, height - margin.bottom])

  

  // 添加画布
  const svg = d3.select('body')
    .append('svg')
    .attr('width',width)
    .attr('height',height)
    // .attr('viewBox', [margin.top, 0, width + margin.left, 0]);

  // 添加坐标轴
  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y)
            .tickValues(car_list))
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('text')
                  .style('font-size', '14')
                  .style('font-weight', 'bold'));
  
    svg.append('g')
      .attr('transform', `translate(0,${margin.top})`)
      .call(d3.axisTop(x)
              .tickValues(cc_num)
              .tickSize(10))
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('text')
                .style('font-size','12')
                .style('font-weight', 'bold')
                
                .attr('transform',`translate(5,0) rotate(-30)`));
    

  // 画图
  for (const i in matched_count) {

    let cc = svg.append('g')
        .attr('class','car')
        .selectAll('g')
        .data(matched_count[i])
        .join('g')
        .attr('class','cc');
    
    
    cc.each(function (d,j) {
      d3.select(this)
          // 添加大矩形
        .append('g')
        .append('rect')
        .attr('width',rectHeight)
        .attr('height',rectHeight)
        .attr('x', x(cc_num[j] ))
        .attr('y', y(car_list[i] ))
        .attr('fill','white')
        .attr('stroke','black')
        .attr('stroke-width','0.5px') 
      
      
      let color = d3.interpolate('blue','white');

      // 添加小矩形
      d3.select(this)
        .append('g')
        .append('rect')
        .attr('width',d)
        .attr('height',d)
        .attr('x', x(cc_num[j] ))
        .attr('y', y( car_list[i]))
        .attr('transform', `translate(${(rectHeight - d) / 2}, ${(rectHeight - d) / 2})`)
        .attr('fill', color(matched_dis[i][j]))
        .attr('stroke','black')
        .attr('stroke-width','0.5px') 
    })   
    
  }    
}

function draw_loy() {
  const loy_num = json.loy_num;
  const car_list = json.car_id;
  console.log(loy_num);
  console.log(car_list);


  // 图形边距
  const margin = {top:60, right:0, bottom:30, left: 60};
  // 大矩形边长
  const rectHeight = 29;
  
  const height = (rectHeight + 4) * car_list.length + margin.bottom;
  const width = (rectHeight + 4) * loy_num.length + margin.left;
  // 比例尺
  const x = d3.scaleBand()
    .domain(loy_num)
    .range([margin.left, width])

  const y = d3.scaleBand()
    .domain(car_list)
    .range([margin.top, height - margin.bottom])

  

  // 添加画布
  const svg = d3.select('body')
    .append('svg')
    .attr('width',width)
    .attr('height',height)
    // .attr('viewBox', [margin.top, 0, width + margin.left, 0]);

  // 添加坐标轴
  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y)
            .tickValues(car_list))
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('text')
                  .style('font-size', '14')
                  .style('font-weight', 'bold'));
  
    svg.append('g')
      .attr('transform', `translate(0,${margin.top})`)
      .call(d3.axisTop(x)
              .tickValues(loy_num)
              .tickSize(10))
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('text')
                .style('font-size','12')
                .style('font-weight', 'bold')
                
                .attr('transform',`translate(5,0) rotate(-30)`));
    

  // 画图
  for (const i in matched_count) {

    let loy = svg.append('g')
        .attr('class','car')
        .selectAll('g')
        .data(matched_count[i])
        .join('g')
        .attr('class','loy');
    
    
    loy.each(function (d,j) {
      d3.select(this)
          // 添加大矩形
        .append('g')
        .append('rect')
        .attr('width',rectHeight)
        .attr('height',rectHeight)
        .attr('x', x(loy_num[j] ))
        .attr('y', y(car_list[i] ))
        .attr('fill','white')
        .attr('stroke','black')
        .attr('stroke-width','0.5px') 
      
      
      let color = d3.interpolate('blue','white');

      // 添加小矩形
      d3.select(this)
        .append('g')
        .append('rect')
        .attr('width',d)
        .attr('height',d)
        .attr('x', x(loy_num[j] ))
        .attr('y', y( car_list[i]))
        .attr('transform', `translate(${(rectHeight - d) / 2}, ${(rectHeight - d) / 2})`)
        .attr('fill', color(matched_dis[i][j]))
        .attr('stroke','black')
        .attr('stroke-width','0.5px') 
    })   
    
  }    
}

process(json);
draw_cc();

// draw_loy();
