import axios from 'axios';

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
  console.log('foodAPI=',response);
 return  response;
})
.catch((error) =>{
  // handle error
  console.log(error);
  return error;
});

};
export default getFoodData;