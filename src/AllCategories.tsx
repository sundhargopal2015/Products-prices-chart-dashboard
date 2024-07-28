import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Category } from "./Types";

const AllCategories: React.FC<{categories: Category[]}> = ({categories}) => {
  const chartOptions = {
    chart: {
      type: "pie",
      width: 900
    },
    title: {
      text: "Product Categories",
    },
    series: [
      {
        name: "Categories",
        colorByPoint: true,
        data: categories?.map((category) => ({
          name: category.name,
          y: 1,
        })),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default AllCategories;
