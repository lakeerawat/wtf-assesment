import React, { useEffect } from 'react';
import GymClassCard from './GymClassCard';
import { addDays } from 'date-fns';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import '../style/GymClassCard.css'; // Import CSS for styling
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const GymClasses = () => {
    const[data,setData] = useState([])
    const [day, setDay] = React.useState('');

    const handleChange = (event) => {
        setDay(event.target.value);
        const choosenDay = event.target.value;
        const filteredClasses = data.filter(classObj => classObj.days.some(day => day === choosenDay));

        // setData(data.map((el)=>{el.days.includes(choosenDay) ? el : null}))
        setData(filteredClasses)
    };
    const fetchAPI = ()=>{
        return fetch("http://localhost:8000/classes").then(res=>res.json()).then(res=> setData(res))
    }
    useEffect(()=>{
        if(!day){
fetchAPI()
        }
    },[day])
    function getDateOnly(dateString) {
        // Create a Date object from the dateString
        const date = new Date(dateString);
      
        // Get the date part (in the format "Day Month Date Year")
        const datePart = date.toDateString();
      
        return datePart;
      }
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }
      ]);
  return (<>
  <ToastContainer />
  <h1>Welcome to WTF GYM Classes</h1>
  <div className='calenderDiv'>
  <DateRangePicker
  onChange={item => setState([item.selection])}
  showSelectionPreview={true}
  moveRangeOnFirstSelection={true}
  months={2}
  ranges={state}
  direction="horizontal"
  preventSnapRefocus={true}
  calendarFocus="backwards"
/>
</div>
<div style={{display:"flex", width:"100%", fontSize:"1.5rem", justifyContent:"center", alignItems:"center"}}>
    {getDateOnly(state[0].startDate)} - {getDateOnly(state[0].endDate)}</div>
<Box sx={{ width:"10rem", margin:"1rem" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Day</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={day}
          label="Day"
          onChange={handleChange}
        >
          <MenuItem value={""}>Reset</MenuItem>
          <MenuItem value={"Mon"}>Mon</MenuItem>
          <MenuItem value={"Tue"}>Tue</MenuItem>
          <MenuItem value={"Wed"}>Wed</MenuItem>
          <MenuItem value={"Thu"}>Thu</MenuItem>
          <MenuItem value={"Fri"}>Fri</MenuItem>

        </Select>
      </FormControl>
    </Box>
    <div style={{display:"flex",gap:"1rem", width:"100%", flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
        {data.map((el)=>{
            return(
                <GymClassCard
                id={el?.id}
                classname={el?.title}
                instructor={el?.instructor}
                days={el?.days}
                timing={el?.timing}
                duration={el?.duration}
                fee={el?.fee}
                image={el?.coverImage}
              /> 
            )
        })}

      {/* Add more GymClassCard components for other classes */}
    </div>
    </>
  );
};

export default GymClasses;
