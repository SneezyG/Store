

const chartButtons = document.querySelectorAll('#span > span');
const svgCharts = document.querySelectorAll('svg');

for (let button of chartButtons) {
   button.addEventListener('click', Draw)
}

// initial array for setting graph dimention label
const base = {
  'svg': 780,
  'label1': 200,
  'label2': 400,
  'label3': 600
}
const month1 = {
  'svg': 1380,
  'label1': 300,
  'label2': 700,
  'label3': 1100
}
const month2 = {
  'svg': 2780,
  'label1': 350,
  'label2': 1000,
  'label3': 2200
}
const month4 = {
  'svg': 5580,
  'label1': 350,
  'label2': 2500,
  'label3': 5000
}

// drwa on document.
Draw("1");

function Draw(e) {
  for (let svg of svgCharts) {
    //reset svg chart content.
    svg.replaceChildren();
  }
  const duration = e.target ? e.target.dataset.week : e;
  switch (duration) {
    case '1':
      profits = profitData.slice(0, 7);
      sales = saleData.slice(0, 7);
      break;
    case '2':
      profits = profitData.slice(0, 14);
      sales = saleData.slice(0, 14);
      break;
    case '4':
      profits = profitData.slice(0, 28);
      sales = saleData.slice(0, 28);
      break;
    case '8':
      profits = profitData.slice(0, 56);
      sales = saleData.slice(0, 56);
      break;
    case '16':
      profits = profitData.slice(0, 112);
      sales = saleData.slice(0, 112);
      break;
  }

// draw charts
ProfitChart();
saleChart();

}



function saleChart() {

  // set useful variables.
  const soldMax = d3.max(sales, data => data.sold + 50);
  const dayMax = sales.length + 1;
  const dayArray = [];
  
  let count = 1;
  for (let day of sales) {
     dayArray.push(count);
     count ++;
  }
  
  let span;
  let length = dayArray.length;
  // set dimension to use for chart.
  if (length <= 7 || length <= 14) {
    span = base; 
  } else if (length <= 28) {
    span = month1;
  } else if (length <= 56) {
    span = month2;
  } else if (length <= 112) {
    span = month4; 
  } else {
    span = base; 
  }
  
  // set the width dimension of the svg element.
  const svg = document.querySelector('#svg1 > svg');
  svg.style.width = span.svg + 20 + 'px';
  
  
  // create a label for the y-axis
  d3.select(svg)
    .append('text')
    .text('Sold Count')
    .attr('id', 'ylabel')
    .attr('x', 20)
    .attr('y', 15)
    
  // create series of label for the x-axis
  d3.select(svg)
    .append('text')
    .text('Days')
    .attr('id', 'ylabel')
    .attr('x', span.label1)
    .attr('y', 325)
  d3.select(svg)
    .append('text')
    .text('Days')
    .attr('id', 'ylabel')
    .attr('x', span.label2)
    .attr('y', 325)
  d3.select(svg)
    .append('text')
    .text('Days')
    .attr('id', 'ylabel')
    .attr('x', span.label3)
    .attr('y', 325)
  
  
  // create chart scale
  const xScale = d3.scaleLinear().domain([1, dayMax]).range([80, span.svg]);
  const yScale = d3.scaleLinear().domain([0, soldMax]).range([290, 20]);
  
  
  // draw the x-axis
  const xAxis = d3.axisBottom()
                  .scale(xScale)
                  .tickSize(270)
                  .tickValues(dayArray);
  d3.select(svg)
    .append('g')
    .attr('id', 'xAxisG')
    .style('color', '#dbd1d1')
    .attr('transform', 'translate(0, 20)')
    .call(xAxis);
    
   
  // draw the y-axis 
  const yAxis = d3.axisLeft()
                  .scale(yScale)
                  .tickSize(span.svg - 55)
                  .ticks(5);
  d3.select(svg)
    .append('g')
    .attr('id', 'yAxisG')
    .style('color', '#dbd1d1')
    .attr('transform', `translate(${span.svg}, 0)`)
    .call(yAxis);
  
  
  // draw chart  
  d3.select(svg)
    .append('g')
    .attr('id', 'saleChart')
    .attr('transform', "translate(0, 0)")
    .selectAll('g')
    .data(sales)
    .enter()
    .append('g')
    .attr('class', 'salePoints')
    .attr('transform', (d, i) => `translate(${xScale(i+1)}, ${yScale(d.sold)})`);
  
  // call visualize with time-out.
  setTimeout(() => {
     visualize();
  }, 1000);
   
  function visualize() {
      // get the chart points and append circle
      const points = d3.selectAll('.salePoints');
      points.append('circle')
            .attr('r', 0)
            .style('fill', 'red')
            .on('mouseover', showText)
            .on('mouseout', hideText)
            .transition()
            .delay(50)
            .duration(500)
            .attr('r', 10)
            .transition()
            .duration(500)
            .attr('r', 6);
  
      drawLine();  
     
     let chart = d3.select('#saleChart').node();
     svg.appendChild(chart);
     
      points.append('text')
            .text(d => d.date)
            .attr('x', 7)
            .attr('y', -17);
  
      points.append('text')
            .text(d => d.sold + ' sales')
            .attr('x', 7)
            .attr('y', -3);
  }
  
  
  function drawLine() {
     let line = d3.line()
                  .x((d,i) => xScale(i + 1))
                  .y(d => yScale(d.sold))
                  .curve(d3.curveStep);
     d3.select(svg)
       .append('path')
       .attr('d', line(sales))
       .style('opacity', 0)
       .attr("fill", "none")
       .attr("stroke", "#ec807a")
       .attr("stroke-width", 1.5)
       .transition()
       .delay(1200)
       .style('opacity', 0.8);
  }
};


function ProfitChart() {

  // set useful variables.
  const profitMax = d3.max(profits, data => data.profit + 50);
  const dayMax = profits.length + 1;
  const dayArray = [];
  
  let count = 1;
  for (let day of profits) {
     dayArray.push(count);
     count ++;
  }
  //console.log(profits);
  
  let span;
  let length = dayArray.length;
  // set dimension to use for chart.
  if (length <= 7 || length <= 14) {
    span = base; 
  } else if (length <= 28) {
    span = month1;
  } else if (length <= 56) {
    span = month2;
  } else if (length <= 112) {
    span = month4; 
  } else {
    span = base; 
  }
  
  
  // set the width dimension of the svg element.
  const svg = document.querySelector('#svg2 > svg');
  svg.style.width = span.svg + 20 + 'px';
  
  
  // create a label for the y-axis
  d3.select(svg)
    .append('text')
    .text('Profit($)')
    .attr('id', 'ylabel')
    .attr('x', 20)
    .attr('y', 15)
    
  // create series of label for the x-axis
  d3.select(svg)
    .append('text')
    .text('Days')
    .attr('id', 'ylabel')
    .attr('x', span.label1)
    .attr('y', 325)
  d3.select(svg)
    .append('text')
    .text('Days')
    .attr('id', 'ylabel')
    .attr('x', span.label2)
    .attr('y', 325)
  d3.select(svg)
    .append('text')
    .text('Days')
    .attr('id', 'ylabel')
    .attr('x', span.label3)
    .attr('y', 325)
  
  
  // create chart scale
  const xScale = d3.scaleLinear().domain([1, dayMax]).range([80, span.svg]);
  const yScale = d3.scaleLinear().domain([0, profitMax]).range([290, 20]);
  
  
  // draw the x-axis
  const xAxis = d3.axisBottom()
                  .scale(xScale)
                  .tickSize(270)
                  .tickValues(dayArray);
  d3.select(svg)
    .append('g')
    .attr('id', 'xAxisG')
    .style('color', '#dbd1d1')
    .attr('transform', 'translate(0, 20)')
    .call(xAxis);
    
   
  // draw the y-axis 
  const yAxis = d3.axisLeft()
                  .scale(yScale)
                  .tickSize(span.svg - 55)
                  .ticks(5);
  d3.select(svg)
    .append('g')
    .attr('id', 'yAxisG')
    .style('color', '#dbd1d1')
    .attr('transform', `translate(${span.svg}, 0)`)
    .call(yAxis);
  
  
  // draw chart  
  d3.select(svg)
    .append('g')
    .attr('id', 'profitChart')
    .attr('transform', "translate(0, 0)")
    .selectAll('g')
    .data(profits)
    .enter()
    .append('g')
    .attr('class', 'profitPoints')
    .attr('transform', (d, i) => `translate(${xScale(i+1)}, ${yScale(d.profit)})`);
  
  // call visualize with time-out.
  setTimeout(() => {
     visualize();
  }, 1000);
   
  function visualize() {
      // get the chart points and append circle
      const points = d3.selectAll('.profitPoints');
      points.append('circle')
            .attr('r', 0)
            .style('fill', 'green')
            .on('mouseover', showText)
            .on('mouseout', hideText)
            .transition()
            .delay(50)
            .duration(500)
            .attr('r', 10)
            .transition()
            .duration(500)
            .attr('r', 6);
  
      drawLine();  
     
     let chart = d3.select('#profitChart').node();
     svg.appendChild(chart);
     
      points.append('text')
            .text(d => d.date)
            .attr('x', 7)
            .attr('y', -17);
  
      points.append('text')
            .text(d => '$' + d.profit + ' profit')
            .attr('x', 7)
            .attr('y', -3);
  }
  
  
  function drawLine() {
     let line = d3.line()
                  .x((d,i) => xScale(i + 1))
                  .y(d => yScale(d.profit))
                  .curve(d3.curveStep);
     d3.select(svg)
       .append('path')
       .attr('d', line(profits))
       .style('opacity', 0)
       .attr("fill", "none")
       .attr("stroke", "#68a577")
       .attr("stroke-width", 1.5)
       .transition()
       .delay(1200)
       .style('opacity', 0.8);
  }
}


// show circle data.
function showText(e) {
    let g = e.target.parentElement;
    d3.select(g)
      .selectAll('text')
      .transition()
      .delay(30)
      .style('opacity', 1);
  }


// hide circle data .
function hideText(e) {
    let g = e.target.parentElement;
    d3.select(g)
      .selectAll('text')
      .transition()
      .delay(30)
      .style('opacity', 0);
}

