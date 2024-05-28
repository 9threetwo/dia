// import { useState, useMemo } from "react";
// import { Bar } from "react-chartjs-2";
// import styled from "styled-components";
// import {
//   Chart as ChartJS,
//   BarElement,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   PointElement,
//   Filler,
// } from "chart.js";
// import Input from "../components/special/Input";
// import { useSelector } from "react-redux";
// import _ from "lodash";
// import ChartDataLabels from "chartjs-plugin-datalabels";

// ChartJS.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   Tooltip,
//   Legend,
//   PointElement,
//   Filler,
//   ChartDataLabels
// );
// const today = new Date().toISOString().split("T")[0];

// const initialState = {
//   date1: today,
//   date2: today,
// };

// function Chart3() {
//   const { chartData, user } = useSelector((store) => store.user);

//   const [values, setValues] = useState(initialState);

//   const changeHandler = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };

//   /// filterByDateRange

//   const data1 = values.date1 ? new Date(values.date1) : new Date(today);
//   const data2 = values.date2 ? new Date(values.date2) : new Date(today);

//   const filterByDateRange = (data, startDate, endDate) => {
//     return _.filter(data, (entry) => {
//       const entryDate = new Date(entry.date.$date || entry.date);

//       return entryDate >= startDate && entryDate <= endDate;
//     });
//   };

//   const filteredData = filterByDateRange(chartData, data1, data2); //получили 4
  

//   /// groupedData
//   const groupedData = useMemo(() => {
//     return _.groupBy(filteredData, (entry) => {
//       const ckValue = parseFloat(entry.ck);
//       if (ckValue < 4) { 
//         return "below_4";
//       } else if (ckValue >= 4) {
//         return "between_4_and_9_9";
//       } else {
//         return "above_9_9";
//       }
//     });
//   }, [filteredData]);

//   const below4Count = groupedData.below_4 ? groupedData.below_4.length : 0; //получили 3 - возвращает дину
//   const between4And9_9Count = groupedData.between_4_and_9_9
//     ? groupedData.between_4_and_9_9.length
//     : 0;
//   const above9_9Count = groupedData.above_9_9
//     ? groupedData.above_9_9.length
//     : 0;

//   below4Sum = 0;
//   for (let i = 0; i < below4Count; i++) {
//     below4Sum = 
//   } 

// // подпись в столбце 3/4*100 от 01.04 (3.1+3.2+3.3+5)/4=3.65
//   const below4Percent = ((below4Count / filteredData.length) * 100).toFixed(0);
//   const between4And9_9Percent = (
//     (between4And9_9Count / filteredData.length) *
//     100
//   ).toFixed(0);
//   const above9_9Percent = ((above9_9Count / filteredData.length) * 100).toFixed(
//     0
//   );

//   const data = {
//     labels: [`< ${user.min}`, `${user.min}-${user.max}`, `> ${user.max}`],

//     datasets: [
//       {
//         data: [below4Count, between4And9_9Count, above9_9Count],
//         backgroundColor: ["#FFD700", "#149409", "#f00"],
//         borderColor: ["#000", "#228B22", "#000"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         displayColors: false,
//       },
//       datalabels: {
//         formatter: (value, context) => {
//           const index = context.dataIndex;
//           const percent = [
//             below4Percent,
//             between4And9_9Percent,
//             above9_9Percent,
//           ][index];
//           return percent + "%";
//         },

//         font: {
//           size: 14,
//           weight: "bold",
//         },
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           // text: "Диапазоны CK",
//           font: {
//             size: 14,
//           },
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           // text: "Количество элементов",
//           font: {
//             size: 14,
//           },
//         },
//         beginAtZero: true,
//         ticks: {
//           precision: 0,
//           callback: function (value) {
//             return Number.isInteger(value) ? value : null;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <Wrapper>
//       <div className="chart-header">
//         <p>Время в целевом диапазоне</p>
//       </div>
//       <div className="input-block">
//         <div className="in">
//           <Input
//             width="115px"
//             height="30px"
//             type="date"
//             name="date1"
//             value={values.date1}
//             onChange={changeHandler}
//             autoComplete="off"
//           />
//         </div>
//         <div className="in">
//           <Input
//             width="115px"
//             height="30px"
//             type="date"
//             name="date2"
//             value={values.date2}
//             onChange={changeHandler}
//             autoComplete="off"
//           />
//         </div>
//       </div>
//       <Bar data={data} options={options} />
//     </Wrapper>
//   );
// }

// const Wrapper = styled.div`
//   width: 370px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   height: 300px;
//   .chart-header {
//     display: flex;
//     justify-content: center;
//     margin: 10px;
//     font-size: 20px;
//     p {
//       text-align: center;
//       font-weight: 700;
//     }
//   }
//   .input-block {
//     display: flex;
//     justify-content: space-around;
//   }
//   @media (min-width: 576px) {
//   }
//   @media (min-width: 768px) {
//   }
//   @media (min-width: 992px) {
//   }
//   @media (min-width: 1200px) {
//   }
//   @media (min-width: 1400px) {
//   }
// `;
// export default Chart3;
