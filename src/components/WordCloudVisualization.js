import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import d3Cloud from 'd3-cloud';

function WordCloudVisualization({ words }) {
  const svgRef = useRef();
  const [cloud, setCloud] = useState(null);

  useEffect(() => {
    if (!cloud) return;

    const updateCloud = () => {
      cloud
        .words(words.map(word => ({ text: word, size: 10 })))
        .start();
    };

    updateCloud();
  }, [words, cloud]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const layout = d3Cloud()
      .size([width, height])
      .padding(5)
      .words(words.map(word => ({ text: word, size: 10 })))
      .rotate(() => ~~(Math.random() * 2) * 90)
      .font("Arial")
      .fontSize(d => d.size)
      .on("end", words => {
        const centerX = width / 2;
        const centerY = height / 2;

        svg.selectAll("text")
          .data(words)
          .enter()
          .append("text")
          .style("font-size", d => `${d.size}px`)
          .style("fill", "steelblue")
          .attr("transform", d => `translate(${centerX + d.x},${centerY + d.y})rotate(${d.rotate})`)
          .text(d => d.text);
      });

    setCloud(layout);
  }, [words]);

  return <svg ref={svgRef} width={800} height={500}></svg>;
}

export default WordCloudVisualization;
