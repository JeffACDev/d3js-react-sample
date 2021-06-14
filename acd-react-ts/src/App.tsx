import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import BarChart from './charts/BasicD3';


const datas = [
  [10, 30, 40, 20],
  [10, 40, 30, 20, 50, 10],
  [60, 30, 40, 20, 30]
]

let i = 0; 

const App = () => {
  const [data, setData] = useState<any>([]);
  const [foodData, setFoodData]= useState<any>([]);

  const getFoodData = ({food}:{food?:string})=>{
  
    const foodDataUrl = 'https://api.nal.usda.gov/fdc/v1/foods/search';
  
  axios.get(foodDataUrl, {
    params:{
        query: food,
        pageSize: 10,
        api_key: 'pjBWV5HaqD2JwZOmfB2K02aovFNhrBp15FxVlOpu'
    }
  })
  .then((response) => {
  // handle success
  //console.log('foodAPI=',response);
  setFoodData(response);
  })
  .catch((error) =>{
  // handle error
  console.log(error);
  setFoodData([]);
  });
  };

  const changeData = () => {
    setData(datas[i++]);
    if(i === datas.length) i = 0;
  }

  useEffect(() => {
    changeData();
    getFoodData({food:'cat ears'});
  }, []);

console.log('food response=', foodData?.data?.foods);
const foodScore = foodData?.data?.foods.map((food:any)=>food.score);
console.log('foodData===', foodScore);
  return (
      <div className="App">
          <h2>Graphs with React</h2>
          <button onClick={changeData}>Change Data</button>
          <BarChart width={600} height={400} data={data} />   
          <input type="search" placeholder="food search" onChange={(event)=>{
 getFoodData({food:event.target.value});
          }}></input>
          {foodScore && <BarChart width={600} height={400} data={foodScore} />    }       
      </div>
  );
}

export default App;
