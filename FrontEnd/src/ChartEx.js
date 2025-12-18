import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import {Link} from 'react-router-dom';
import {useState,useEffect} from 'react';
import Alert from './Components/Alert.jsx';
import { ResponsiveContainer,LineChart,Line,XAxis, YAxis,Bar,BarChart,Tooltip, CartesianGrid } from 'recharts';
export default function ChartEx() {
    let [data,setData]=useState(0)
    let [Days,setDays]=useState([
        {
            day:"1-01-2025",
            avg:'10'
        },
         {
            day:"3-01-2025",
            avg:'20'
        },
         {
            day:"5-01-2025",
            avg:'30'
        },
         {
            day:"7-01-2025",
            avg:'30'
        },
         {
            day:"9-01-2025",
            avg:'40'
        },
         {
            day:"11-01-2025",
            avg:'40'
        },
         {
            day:"13-01-2025",
            avg:'50'
        },
         {
            day:"15-01-2025",
            avg:'50'
        },
         {
            day:"17-01-2025",
            avg:'50'
        },
         {
            day:"19-01-2025",
            avg:'60'
        },
         {
            day:"21-01-2025",
            avg:'60'
        },
         {
            day:"23-01-2025",
            avg:'60'
        },
         {
            day:"25-01-2025",
            avg:'70'
        },
         {
            day:"27-01-2025",
            avg:'70'
        },
         {
            day:"29-01-2025",
            avg:'75'
        },
         {
            day:"30-01-2025",
            avg:'80'
        }
    ]);
    useEffect(()=>{
        const interval=setInterval(()=>{
            setData((prev)=>{
                if(prev<80){
                    return prev+1;
                }
                else{
                    clearInterval(interval);
                    return 80;
                }
            });
        },20);
        return ()=>clearInterval(interval);
    },[]);
    return (
        <div>
            <Alert/>
            <div className="Header">
                <ul className="nav nav-underline">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/Home">Daily</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Month">Month</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Year">Year</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="#">Charts</Link>
                    </li>
                </ul>
            </div>
            <div className="mc-ChartEx h3">
                Circular progress bar
            </div>
            <div className='mc-chart-container'>
                <div className='mc-chart'>
                    <CircularProgressbar
                    value={data}
                    text={`${data}%`}
                    minValue={0}
                    maxValue={100}
                    styles={buildStyles({
                        strokeLinecap:"round",
                        trailColor:"silver",
                        pathColor:"blue"
                    })}></CircularProgressbar>
                </div>
            </div>
            <hr></hr>
            <div className="mc-ChartEx h3">
                Line Chart
            </div>
            <div className='mc-chart-container'>
                <ResponsiveContainer className="mc-lineChart">
                    <LineChart data={Days}>
                        <XAxis dataKey="day"/>
                        <YAxis dataKey="avg"/>
                        <Tooltip></Tooltip>
                        <Line dataKey="avg">
                        </Line>
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <hr></hr>
             <div className="mc-ChartEx h3">
                Bar Chart
            </div>
            <div>
                <ResponsiveContainer className="mc-lineChart">
                    <BarChart data={Days}>
                        <XAxis dataKey="day"></XAxis>
                        <YAxis dataKey="avg"></YAxis>
                        <Tooltip></Tooltip>
                        <CartesianGrid></CartesianGrid>
                        <Bar dataKey="avg" fill='blue'/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
