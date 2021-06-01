import * as d3 from 'd3'
const json = require('../dataset/corr_data_cc1.json');


let matched_count = json.matched_count;
let matched_dis = json.matched_dis;
function process(json) {
  
  
  for (const i in matched_count) {
    let max = d3.max(matched_count[i]);
    let scale = d3.scaleLinear()
      .domain([0,max])
      .range([0,29])
      matched_count[i] = matched_count[i].map(value => scale(value));
    console.log(matched_count[i])
  }

  for (const i in matched_dis) {
    let max = d3.max(matched_dis[i]);
    console.log(max)
    let scale = d3.scaleLinear()
      .domain([0,max])
      .range([0,1])
    matched_dis[i] = matched_dis[i].map(value => scale(value));

  }
  
}


function draw() {
  const cc_num = json.cc_num
  const car_list = json.car_id
  console.log(cc_num)


  // 图形边距
  const margin = {top:60, right:0, bottom:30, left: 60};
  // 大矩形边长
  const rectHeight = 30;
  
  const width = (rectHeight + 2) * car_list.length + margin.left;
  const height = (rectHeight + 2) * cc_num.length + margin.bottom;
  // 比例尺
  const x = d3.scaleBand()
    .domain(car_list)
    .range([margin.left, width ])

  const y = d3.scaleBand()
    .domain(cc_num)
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
            .tickValues(cc_num))
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('text')
                  .style('font-size', '14')
                  .style('font-weight', 'bold'));
  
    svg.append('g')
      .attr('transform', `translate(0,${margin.top})`)
      .call(d3.axisTop(x)
              .tickValues(car_list)
              .tickSize(10))
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('text').style('font-size','14'));
    

  // 画图
  
  // let rectgroup = svg.append('g')
  //                 .selectAll('g')
  //                 .data(matched_count)
  //                 .join('g')
  //                 .attr('class','rectgroup');
  
  // rectgroup.each(function(d,i) {
  //     // 添加大矩形
  //     d3.select(this)
  //     .append('g')
  //     .selectAll('rect')
  //     .data(d,j)
  //     .join('rect')
  //     .attr('width',rectHeight)
  //     .attr('height',rectHeight)
  //     .attr('x', x(car_list[j] ))
  //     .attr('y', y( cc_num[i]))
  //     .attr('fill','white')
  //     .attr('stroke','black')
  //     .attr('stroke-width','1px')
    

  // })
  
  for (const i in matched_count) {

    let car = svg.append('g')
        .attr('class','cc')
        .selectAll('g')
        .data(matched_count[i])
        .join('g')
        .attr('class','car');
    
    
    car.each(function (d,j) {
      console.log(d,j);
      d3.select(this)
          // 添加大矩形
        .append('g')
        .append('rect')
        .attr('width',rectHeight)
        .attr('height',rectHeight)
        .attr('x', x(car_list[j] ))
        .attr('y', y( cc_num[i]))
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
        .attr('x', x(car_list[j] ))
        .attr('y', y( cc_num[i]))
        .attr('transform', `translate(${(rectHeight - d) / 2}, ${(rectHeight - d) / 2})`)
        .attr('fill', color(matched_dis[i][j]))
        .attr('stroke','black')
        .attr('stroke-width','0.5px') 
    })

    


      
    
  }    
    


}

process(json);
draw();


