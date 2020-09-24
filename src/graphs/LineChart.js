import React, { Component } from "react";
import * as d3 from "d3";

class LineChart extends Component {
  constructor(props) {
    super(props);
    console.log(props, "props");

    let { elementWidth, elementHeight } = props;
    this.margin = { top: 30, right: 20, bottom: 30, left: 50 };

    this.x = d3
      .scaleTime()
      .range([0, elementWidth - this.margin.left - this.margin.right]);
    this.y = d3
      .scaleLinear()
      .range([elementHeight - this.margin.top - this.margin.bottom, 0]);
    this.elementWidth = elementWidth;
    this.elementHeight = elementHeight;
  }

  componentWillMount() {
    this.dataFromTSV();
  }

  get xAxis() {
    return d3.axisBottom(this.x).ticks(5);
  }

  get yAxis() {
    return d3.axisLeft(this.y).ticks(5);
  }

  drawXAxis() {
    d3.select(this.refs.x).call(this.xAxis);
  }

  drawYAxis() {
    d3.select(this.refs.y).call(this.yAxis);
  }

  get line() {
    return d3
      .line()
      .x((d) => this.x(d.date))
      .y((d) => this.y(d.value));
  }

  path() {
    return <path className="line" d={this.line(this.props.data)} />;
  }

  dataFromTSV(path) {
    console.log(d3.extent(this.props.data, (d) => d.date));
    this.x.domain(d3.extent(this.props.data, (d) => d.date));
    this.y.domain([0, d3.max(this.props.data, (d) => d.value)]);
  }

  render() {
    return (
      <svg fill="none" width={this.elementWidth} height={this.elementHeight}>
        <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
          {this.props.data ? this.path() : null}

          <g
            ref="x"
            className="x axis"
            transform={`translate(0, ${
              this.elementHeight - this.margin.top - this.margin.bottom
            })`}
          >
            {this.props.data ? this.drawXAxis() : null}
          </g>

          <g ref="y" className="y axis">
            {this.props.data ? this.drawYAxis() : null}
          </g>
        </g>
      </svg>
    );
  }
}

export default LineChart;

// import React, { useRef, useState, useEffect } from "react";
// import { select, line } from "d3";

// const temp = [34, 12, 89, 56];

// const LineChart = ({ data }) => {
//   const ref = useRef();

//   useEffect(() => {
//     const svg = select(ref.current);
//     // const timeLine = line()
//     //   .x((data) => {
//     //     return data.date;
//     //   })
//     //   .y((data) => data.value);

//     console.log(svg);

//     svg
//       .selectAll("circle")
//       .data(data)
//       .join("circle")
//       .attr("r", (value) => value * 2);
//   }, [data]);
//   return <svg style={{ background: "#eee" }} ref={ref}></svg>;
// };

// export default LineChart;
