import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import d3Cloud from 'd3-cloud';

function WordCloudVisualization({ words }) {
  const svgRef = useRef();
  const [cloud, setCloud] = useState(null);
  const [cloudData, setCloudData] = useState([]);

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
      .rotate(() => ~~(Math.random() * 2) * 90)
      .font("Arial")
      .fontSize(d => d.size)
      .on("end", cloudData => {
        const existingWords = {};
        const updatedData = cloudData.map(word => {
          const existingWord = existingWords[word.text];
          if (existingWord) {
            existingWord.size += word.size;
            return existingWord;
          }
          existingWords[word.text] = word;
          return word;
        });
        setCloudData(updatedData);
      });

    setCloud(layout);
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const centerX = +svg.attr("width") / 2;
    const centerY = +svg.attr("height") / 2;

    svg.selectAll("text").remove(); // Clear existing text elements

    svg.selectAll("text")
      .data(cloudData)
      .enter()
      .append("text")
      .style("font-size", d => `${d.size}px`)
      .style("fill", "steelblue")
      .attr("transform", d => `translate(${centerX + d.x},${centerY + d.y})rotate(${d.rotate})`)
      .text(d => d.text);
  }, [cloudData]);

  return <svg ref={svgRef} width={800} height={500}></svg>;
}

export default WordCloudVisualization;
