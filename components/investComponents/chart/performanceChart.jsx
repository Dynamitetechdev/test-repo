import { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"

import styles from "./style.module.scss"
const PerformanceChart = ({ data }) => {
    const [chartData, setChartData] = useState({});
    const [filter, setFilter] = useState("all");

    const chartOptions = {
        scales: {
            x: {
                grid: {
                    color: 'rgba(196, 196, 196, 0.06)',
                },
                ticks: {
                    color: 'white',
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 10,
                
                }
            },
            y: {
                position: "left",
                grid: {
                    color: 'rgba(196, 196, 196, 0.06)',
                },
                ticks: {
                    color: 'white',
                    callback: (value) => {
                        return value.toFixed(4);
                    }
                }
            },
        },
        plugins: {
            legend: {
                display: false,
            }
        },
        layout: {
            padding: {
                right: 0,
                bottom: 60,
                left: 20
            },
        }
    };

    const filterData = (timeline) => {
        switch (timeline) {
            case "30d":
                var oneMonthAgo = new Date();
                oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
                return data.filter(data => data[0] >= oneMonthAgo.getTime());
            case "7d":
                const currentDate = new Date();
                const filteredData = [];
                for (let i = 0; i < 7; i++) {
                    const pastDate = new Date(currentDate.getTime() - (i * 24 * 60 * 60 * 1000));
                    const matchingData = data.find(item => {
                        const itemDate = new Date(item[0]);
                        return itemDate.getDate() === pastDate.getDate() &&
                            itemDate.getMonth() === pastDate.getMonth() &&
                            itemDate.getFullYear() === pastDate.getFullYear();
                    });
                    if (matchingData) {
                        filteredData.push(matchingData);
                    } else {
                        filteredData.push([pastDate.getTime(), 0]); // Add placeholder with 0 value for missing data points
                    }
                }
                return filteredData.reverse();
            case "1d":
                var yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                return data.filter(data => data[0] >= yesterday.getTime());
            case "all":
                return filterDataAll();
            default:
                return [];
        }
    };

    const filterDataAll = () => {
        const startDate = new Date('2023-03-11'); // Start date of the period
        const endDate = new Date(); // Current date
        const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
        const monthsToShow = 6; // Number of months to display
        const gap = Math.ceil(totalMonths / monthsToShow);
    
        const filteredData = [];
        let currentMonthIndex = 0;
    
        for (let i = 0; i <= totalMonths; i += gap) {
            const targetDate = new Date(startDate);
            targetDate.setMonth(startDate.getMonth() + currentMonthIndex);
    
            const matchingData = data.find(dataItem => {
                const dataDate = new Date(dataItem[0]);
                return dataDate.getMonth() === targetDate.getMonth() && dataDate.getFullYear() === targetDate.getFullYear();
            });
    
            if (matchingData) {
                filteredData.push(matchingData);
            } else {
                filteredData.push([targetDate.getTime(), 0]); // Add placeholder with 0 value for missing data points
            }
    
            currentMonthIndex += gap;
        }
    
        return filteredData;
    };
    const updateChart = () => {
        const filteredData = filterData(filter);
        const labels = filteredData.map((item) => formatTimestamp(item[0], filter));
        const values = filteredData.map((item) => item[1]);

        setChartData({
            labels,
            datasets: [
                {
                    label: "Performance",
                    data: values,
                    fill: false,
                    borderColor: "#1FD7D8",
                    tension: 0.1,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderWidth: 2,
                },
            ],
        });
    };


    const formatTimestamp = (timestamp, filter) => {
        const date = new Date(timestamp);
        const formattedDate = `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`;

        if (filter === "1d") {
            const formattedTime = `${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`;
            return `${formattedDate} ${formattedTime}`;
        } else {
            return formattedDate;
        }

    };

    useEffect(() => {
        updateChart();
    }, [data, filter]);

    const filterButtons = [
        {
            value: 'all',
            label: "All"
        },
        {
            value: '30d',
            label: "1M"
        },
        {
            value: '7d',
            label: "7D"
        },
        {
            value: '1d',
            label: "24h"
        },
    ]
    return (
        <div className={styles.chart}>
            <div className="text-right -mt-10 mb-5 mr-4 max-sm:hidden">
                {
                    filterButtons.map((button, i) => (
                        <button key={`Filter---button--${i}`} className={`${styles.btn} ${filter === button.value && styles.active}`} onClick={() => setFilter(button.value)}>{button.label}</button>
                    ))
                }
            </div>
            <div className={`flex flex-col items-center relative max-h-[340px]`}>
                {chartData.labels && chartData.labels.length > 0 && (
                    <Line data={chartData} options={chartOptions} />
                )}
            </div>
        </div>
    );
};

export default PerformanceChart;