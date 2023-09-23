"use client";

import { findInArrayBy, realLenghtArr } from "@/lib/sort";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

export function ProductsByCategory() {
  const posts = useSelector((state) => state.post.postsArray);

  const products = realLenghtArr(findInArrayBy(posts, "Продукты"));
  const alcohol = realLenghtArr(findInArrayBy(posts, "Алкоголь"));
  const chemistry = realLenghtArr(findInArrayBy(posts, "Химия"));
  const cosmetics = realLenghtArr(findInArrayBy(posts, "Косметика"));
  const other = realLenghtArr(findInArrayBy(posts, "Другое"));

  const data = {
    labels: ["Продукты", "Алкоголь", "Химия", "Косметика", "Другое"],
    datasets: [
      {
        label: "кол. товаров",
        data: [products, alcohol, chemistry, cosmetics, other],
        backgroundColor: [
          "#88bf63",
          "#8298cc",
          "#bb5858",
          "#bf638b",
          "#82bfcc",
        ],
        borderColor: ["#88bf63", "#8298cc", "#bb5858", "#bf638b", "#82bfcc"],

        layout: {
          padding: 20,
        },
      },
    ],
  };

  return <Doughnut data={data} />;
}
