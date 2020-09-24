import React from "react";
import { HeatmapVis, mockData, findDomain } from "@h5web/lib";
import ndarray from 'ndarray'

const dataset = mockData.datasets['c8f60c29-aae2-11ea-84a9-b94ddd2ec9e8'];
const values = dataset.value.flat(Infinity) as number[];

const dataArray = ndarray<number>(values, dataset.shape.dims).transpose(1, 0); // makes for a nicer-looking heatmap
const domain = findDomain(values);

function Heatmap() {
  return (
    <HeatmapVis dataArray={dataArray} domain={domain} />
  );
}

export default Heatmap;
