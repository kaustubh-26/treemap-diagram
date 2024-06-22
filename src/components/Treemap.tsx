import * as d3 from 'd3';
import { useEffect } from 'react';
import './Treemap.css';
import { colors, convertToInternationalCurrencySystem, splitString } from '../utils/helper';

const Treemap = () => {
  const width = 1000;
  const height = 600;

  const xTranslate = ['0', '0', '0', '300', '150', '150', '150'];
  const yTranslate = ['20', '40', '60', '-100', '-140', '-120', '-100'];

  useEffect(() => {
    (async () => {
      const data = await d3.json(
        'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'
      );

      const tooltip = d3.select('#tooltip').style('visibility', 'hidden');
      d3.select('#title').text('Highest Grossing Movies');
      d3.select('#description').text(
        'Top 95 Highest Grossing Movies Sorted by Revenue'
      );

      const svg = d3.select('#map').attr('width', width).attr('height', height);

      const hierarchy = d3
        .hierarchy(data, (node) => node['children'])
        .sum((node) => node['value'])
        .sort((element1, element2) => element2['value'] - element1['value']);

      const createTreemap = d3.treemap().size([width, height]).paddingInner(1);

      createTreemap(hierarchy);
      const movieData = hierarchy.leaves();

      const dataBlock = svg
        .selectAll('g')
        .data(movieData)
        .enter()
        .append('g')
        .attr('transform', (d) => {
          return `translate(${d['x0']},${d['y0']})`;
        });

      const legendLabels = [
        'Action',
        'Drama',
        'Adventure',
        'Family',
        'Animation',
        'Comedy',
        'Biography',
      ];
      dataBlock
        .append('rect')
        .attr('class', 'tile')
        .attr('fill', (d) => {
          const category = d['data']['category'];
          if (category === 'Action') {
            return colors[0];
          } else if (category === 'Drama') {
            return colors[1];
          } else if (category === 'Adventure') {
            return colors[2];
          } else if (category === 'Family') {
            return colors[3];
          } else if (category === 'Animation') {
            return colors[4];
          } else if (category === 'Comedy') {
            return colors[5];
          } else if (category === 'Biography') {
            return colors[6];
          }
        })
        .attr('data-name', (d) => d['data']['name'])
        .attr('data-category', (d) => d['data']['category'])
        .attr('data-value', (d) => d['data']['value'])
        .attr('width', (d) => d['x1'] - d['x0'])
        .attr('height', (d) => d['y1'] - d['y0'])
        .on('mouseover', (e, d) => {
          tooltip.style('visibility', 'visible').text('hi');
            tooltip.html(
                `Revenue: $ ${convertToInternationalCurrencySystem(d['data']['value'])} <br/> Name: ${d['data']['name']}`
            )
            .attr("data-value", d['data']['value'])
            .style("left", e.pageX + "px")
            .style("top", e.pageY - 80  + "px")
        })
        .on('mouseout', (e, d) => {
          tooltip.style('visibility', 'hidden');
        });

      dataBlock
        .append('text')
        .selectAll("tspan")
        .data((d) => {
            const maxLength = Math.round(d['x1'] - d['x0'] - 20) / 4 < 10 ? 20 : Math.round(d['x1'] - d['x0'] - 20)/4;
            return splitString(d['data']['name'], maxLength)
        })
        .enter()
        .append("tspan")
        .text((d) => d)
        .attr('x', 2)
        .attr('y', (_,i) => 10 + i * 12)
        .style("font-size", "10px")

      const legend = d3
        .select('#legend')
        .selectAll('g')
        .data(colors)
        .enter()
        .append('g')
        .attr('transform', (_, i) => {
          return `translate(${xTranslate[i]},${yTranslate[i]})`;
        });

      legend
        .append('rect')
        .attr('class', 'legend-item')
        .attr('fill', (_, i) => colors[i])
        .attr('width', 25)
        .attr('height', 25)
        .attr('x', 10)
        .attr('y', (_, i) => i * 40 + 20);

      legend
        .append('text')
        .attr('x', 50)
        .attr('y', (_, i) => i * 40 + 40)
        .text((_, i) => legendLabels[i]);
    })();
  }, []);
  return (
    <>
      <div id="map-container">
        <h2 id="title"></h2>
        <h3 id="description"></h3>
        <div id="tooltip"></div>
        <svg id="map"></svg>
        <svg id="legend"></svg>
      </div>
    </>
  );
};

export default Treemap;
