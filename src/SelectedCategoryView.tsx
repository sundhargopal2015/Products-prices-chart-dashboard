import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Product } from "./Types";

const SelectedCategoryView: React.FC<{
  categoryName: string;
  products: Product[];
}> = ({ categoryName, products }) => {
  const chartOptions = {
    chart: {
      type: "column",
      width: 900,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y:.1f}$",
        },
      },
    },
    title: {
      text: "Products in selected category",
      style: {
        textAlign: "left",
      },
    },
    xAxis: {
      type: "",
    },
    yAxis: {
      title: {
        text: categoryName,
      },
    },
    labels: {
      overflow: "justify",
    },

    series: [
      {
        name: categoryName,
        data: products?.map((product) => ({
          name: product.title,
          y: product.price,
        })),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default SelectedCategoryView;
