import axios from "axios";

import CurrentDateTime from "./time";
import React, { useCallback, useEffect, useState } from "react";

function Hero() {
  const [input,setinput]=useState('')
  // state to manage weather api and city as location
  const [location, setLocation] = useState("indian");
  const [nextdays,setnextdays]=useState({
    days1:26,
    days2:37,
    days3:38,
    days4:40,
    days5:46,
    days1img:"./image/cloud-computing.png",
    days2img:"./image/cloud-computing.png",
    days3img:"./image/cloud-computing.png",
    days4img:"./image/cloud-computing.png",
    days5img:"./image/cloud-computing.png"

  });
  const [Data, setData] = useState({
    celcius: 10,
    name: "Indian",
    humidity: 67,
    speed: 1,
    feelLike: 9,
    description: "light rain",
    image: "./image/cloud-computing.png",
    country:"IN",
  });

// useEffect(()=>{
    const fetchdata = (value) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&cnt=7&appid=f5302b426456d7e4f93db43015d64c58&units=metric`)
          .then((response) => response.json())
          .then((json) => {
            // Assuming you want to log the entire response object
            console.log(json);
      
            // Example: Access and log specific parts of the response
            const weather = json.weather; // This is an array
            console.log(weather);
      
            // Example: Filter through the weather array if needed
            const filteredWeather = weather.filter((item) => item.main === "Clear");
            console.log(filteredWeather);
          })
          .catch((error) => {
            console.error('Error fetching weather data:', error);
          });
      };
      

const handlechange=(value)=>{
    setinput(value)
    fetchdata(value)
}

function getLocation() {
    let lon=0,lat=0;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function showPosition(position) {
          console.log(position);
         lat=position.coords.latitude, lon=position.coords.longitude;
         console.log(lat,lon);
         handlelocation(lat,lon);
        },
        function showError(error) {
          console.log("error");
        }
      );
    } else {
      console.log("error");
    }
  }


// const getnextdays=(days)=>{
// const dates=[];
// const now=new Date();
// for(let i=1;i<=days;i++){
//   let nextday=new Date();
//  nextday=setData(now.getDate()+1)
//   dates.push(nextday)
// }
// console.log(dates);
// return dates;
// }
// setnextdays(getnextdays(7))

// },[])

  
// const handlelocation=(lat,lon)=>{
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&cnt=7&appid=f5302b426456d7e4f93db43015d64c58&units=metric`;
//   const url1=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=f5302b426456d7e4f93db43015d64c58&units=metric`
//   axios
//     .get(url1)
//     .then((res) => {
//       console.log(res)
//       console.log(res.data.city.name);
//       let imagepath = "";
//           if (res.data.list[0].weather[0].main == "Clouds") {
//             imagepath = "./image/cloud-computing.png";
//           } else if (res.data.weather[0].main == "Clear") {
//             console.log(res.data.list[0].weather[0].main);
//             imagepath = "./image/4102326_cloud_sun_sunny_weather_icon.png";
//           } else if (res.data.list[0].weather[0].main == "Rain") {
//             imagepath = "./image/4102317_cloud_rain_weather_icon.png";
//           } else if (res.data.list[0].weather[0].main == "Drizzle") {
//             imagepath ="./image/2189580_cloud_drizzle_forecast_rain_rainfall_icon.png";
//           } else {
//             imagepath = "./image/cloud-computing.png";
//           }
     
//       setData({
//         name:res.data.city.name,
//         celcius:res.data.list[0].main.temp,
//         humidity: res.data.list[0].main.humidity,
//         speed: res.data.list[0].wind.speed,
//         feelLike: res.data.list[0].main.feels_like,
//         description: res.data.list[0].weather[0].description,
//         country:res.data.city.country,
//         image:imagepath

//       })
//     })
//     .catch((err) => alert("Error! This country is  "));
//   }



const handlelocation = (lat, lon) => {
  const url1 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=f5302b426456d7e4f93db43015d64c58&units=metric`;

  axios
    .get(url1)
    .then((res) => {
      console.log(res);


      // Check if res.data and required properties exist
      
        //const weatherMain = res.data.list[0].weather[0].main;
        //console.log(weatherMain);
        
        function getimg(weatherMain){
          let imagepath = "";
        if (weatherMain === "Clouds") {
          imagepath = "./image/cloud-computing.png";
        } else if (weatherMain === "Clear") {
          imagepath = "./image/4102326_cloud_sun_sunny_weather_icon.png";
        } else if (weatherMain === "Rain") {
          imagepath = "./image/4102317_cloud_rain_weather_icon.png";
        } else if (weatherMain === "Drizzle") {
          imagepath = "./image/2189580_cloud_drizzle_forecast_rain_rainfall_icon.png";
        } else {
          imagepath = "./image/cloud-computing.png";
        }
        return imagepath;
      }
        setData({
          name: res.data.city.name,
          celcius: res.data.list[0].main.temp,
          humidity: res.data.list[0].main.humidity,
          speed: res.data.list[0].wind.speed,
          feelLike: res.data.list[0].main.feels_like,
          description: res.data.list[0].weather[0].description,
          country: res.data.city.country,
          image: getimg(res.data.list[0].weather[0].main)
        });
        setnextdays({
          days1:res.data.list[1].main.temp,
          days2:res.data.list[2].main.temp,
          days3:res.data.list[3].main.temp,
          days4:res.data.list[4].main.temp,
          days5:res.data.list[5].main.temp,  
          days1img:getimg(res.data.list[1].weather[0].main),
          days2img:getimg(res.data.list[2].weather[0].main),
          days3img:getimg(res.data.list[3].weather[0].main),
          days4img:getimg(res.data.list[4].weather[0].main),
          days5img:getimg(res.data.list[5].weather[0].main)


        })
      
    })
    .catch((err) => {
      console.error("Error occurred:", err);
      alert("Error! Unable to retrieve data. Please check the coordinates and try again.");
    });
};

  // search function
  const handlesubmit = () => {
    if (location != " ") {
      const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&cnt=7&appid=f5302b426456d7e4f93db43015d64c58&units=metric`;
      axios
        .get(apiurl)
        .then((res) => {
          console.log(res);
          let lon=res.data.coord.lon;
          let lat=res.data.coord.lat;
          console.log(lon,lat)
          handlelocation(lat,lon);
          // let imagepath = "";
          // if (res.data.weather[0].main == "Clouds") {
          //   imagepath = "./image/cloud-computing.png";
          // } else if (res.data.weather[0].main == "Clear") {
          //   console.log(res.data.weather[0].main);
          //   imagepath = "./image/4102326_cloud_sun_sunny_weather_icon.png";
          // } else if (res.data.weather[0].main == "Rain") {
          //   imagepath = "./image/4102317_cloud_rain_weather_icon.png";
          // } else if (res.data.weather[0].main == "Drizzle") {
          //   imagepath =
          //     "./image/2189580_cloud_drizzle_forecast_rain_rainfall_icon.png";
          // } else {
          //   imagepath = "./image/cloud-computing.png";
          // }
          // setData({
          //   celcius: res.data.main.temp,
          //   name: res.data.name,
          //   humidity: res.data.main.humidity,
          //   speed: res.data.wind.speed,
          //   feelLike: res.data.main.feels_like,
          //   description: res.data.weather[0].description,
          //   country:res.data.sys.country,
          //   image: imagepath,
          // });
        })
        .catch((err) => alert("Error! This country is not found "));
    }
  };

  return (
    <div className="w-full min-h-screen relative flex justify-center bg-gradient-to-br from-purple-50 via-orange-50 to-transparent">
      {/* //section1 search bar component */}
      <div className="search text-center p-4">
        <div className="flex justify-center items-center h-16 w-fit">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter your city.."
            className=" py-4 px-6 w-[700px] text-lg  rounded-l-2xl border-gray-200 text-gray-500
               placeholder:text-gray-400 focus:outline-none shadow-md "
               value={input}
            onChange={(e) => handlechange(e.target.value)}
          />
          {/* button  portion*/}

          <button className="h-20 w-20  " onClick={handlesubmit}>
            <img
              src="./image/loupe.png"
              alt="img"
              className="w-[60px] h-[60px] rounded-r-2xl p-4 text-black bg-white "
            />
          </button>
        </div>
        {/* card for showing weather data */}
        {/* <div className="container w-[750px] h-[400px] bg-slate-500 my-4 rounded-xl shadow-2xl text-lg">
          <div className="flex flex-row my-3 mx-4 ">
            <div className="flex flex-col mt-6 ml-8 w-[400px]">
              <div className=" text-left">
                <div className="flex flex-row flex-wrap text-bold font-serif mt-10 ">
                  <h1 className="text-2xl">{Data.name}</h1>{" "}<h1 className="text-2xl ml-2">,{Data.country}</h1>{" "}
                </div>
                <div>{Data.description}</div>

                <div className=" mt-40 text-6xl font-serif ">
                  <h1> {Math.floor(Data.celcius)} °C</h1>
                </div>
              </div>
            </div>

            <div className="ml-4 my-auto gap-12 flex flex-col">
              <div className="flex flex-row gap-12 items-center justify-between">
                <span className=" font-medium text-xl">
                  <button onClick={getLocation}>Get your cities</button>
                </span>
              </div>
              <div className="mb-5 ml-8 ">
                <img src={Data.image} alt="img" className="w-20 h-20" />
              </div>

              <div className="flex flex-col gap-5 font-serif">
                <div className="flex flex-row gap-12 items-center justify-between">
                  <h1>Feel like</h1>{" "}
                  <span className=" font-medium text-xl">
                    {Math.floor(Data.feelLike)} °C
                  </span>
                </div>

                <div className="flex flex-row gap-12 items-center justify-between">
                  <h1>Humidity</h1>{" "}
                  <span className=" font-medium text-xl">
                    {Math.floor(Data.humidity)} %
                  </span>
                </div>

                <div className="flex flex-row gap-12 items-center justify-between">
                  <h1>wind speed</h1>{" "}
                  <span className=" font-medium text-xl">
                    {Math.floor(Data.speed)} km/h
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="grid-container flex  gap-6  h-auto mt-10">
                <div className=" w-[350px] h-[100px] rounded-2xl bg-slate-200 p-[1px] bg-gradient-to-br hover:from-red-200 hover: via-purple-200 hover: to-yellow-200">
                    <div className=" bg-slate-100 rounded-2xl flex flex-col w-full h-[400px] items-center  hover:bg-gradient-to-br hover:from-red-100 hover: via-purple-100 hover: to-yellow-100">
                        <h3 className="pb-3 text-2xl">{Data.name}, {Data.country}
                        </h3>
                        <img src={Data.image} alt="img" className="w-[150px] h-[150px]" />
                        <h1 className="m-1 text-7xl">{Math.floor(Data.celcius)} °C</h1>


                        <div className=" mt-4 text-left">
                          

                          <div className="flex flex-row gap-12 items-center justify-between">
                  <h1>Feel like</h1>{" "}
                  <span className=" font-medium text-xl">
                    {Math.floor(Data.feelLike)} °C
                  </span>
                </div>

                          <div className="flex flex-row gap-12 items-center justify-between">
                  <h1>Humidity</h1>{" "}
                  <span className=" font-medium text-xl">
                    {Math.floor(Data.humidity)} %
                  </span>
                </div>
                          
                          <div className="flex flex-row gap-12 items-center justify-between">
                  <h1>wind speed</h1>{" "}
                  <span className=" font-medium text-xl">
                    {Math.floor(Data.speed)} km/h
                  </span>
                </div>
                
                        </div>
                    </div>
                </div>

                <div className=" w-[650px] h-[100px] rounded-2xl bg-slate-200 p-[1px] bg-gradient-to-br hover:from-red-200 hover: via-purple-200 hover: to-yellow-200">
                    <div className=" bg-slate-100 rounded-2xl flex flex-col w-full h-[400px] p-6  hover:bg-gradient-to-br hover:from-red-100 hover: via-purple-100 hover: to-yellow-100">
                        <h3 className="p-2 text-xl flex items-start border rounded-xl hover:bg-slate-100 w-fit ">
                          <button className=" left-2 flex"  onClick={getLocation}> <img src="./image/pngtree-vector-location-icon-png-image_956422.jpg" alt="img" className="w-8 h-8 bg-white "/> Get your city</button>
                        </h3>
                      <h3 className="text-xl flex mt-5">< CurrentDateTime/></h3> 
                      <h3 className="flex text-xl font-serif  font-medium mt-10 ml-5">Next five days celcius status</h3>

                        <div className=" flex gap-1 h-auto justify-evenly bottom-3 mt-5">
              <div className="w-24 h-28 border border-slate-200 shadow-sm rounded-lg bg-white ">
                <div className="flex flex-col gap-2 items-center mt-1 ">
                  {" "}
                  <img src={nextdays.days1img} alt="img" className="w-12 h-12" />
                  <span className="font-medium text-center mt-2 w-full text-2xl">
                    {Math.floor(nextdays.days1)} °C
                  </span>
                </div>
              </div>
              <div className="w-24 h-28 border border-slate-200 shadow-sm rounded-lg bg-white ">
                <div className="flex flex-col gap-2 items-center mt-1 ">
                  {" "}
                  <img src={nextdays.days2img} alt="img" className="w-12 h-12" />
                  <span className="font-medium text-center mt-2 w-full text-2xl">
                  {Math.floor(nextdays.days2)} °C
                  </span>
                </div>
              </div>
              <div className="w-24 h-28 border border-slate-200 shadow-sm rounded-lg bg-white ">
                <div className="flex flex-col gap-2 items-center mt-1 ">
                  {" "}
                  <img src={nextdays.days3img} alt="img" className="w-12 h-12 " />
                  <span className="font-medium text-center mt-2 w-full text-2xl">
                  {Math.floor(nextdays.days3)} °C
                  </span>
                </div>
              </div>
              <div className="w-24 h-28 border border-slate-200 shadow-sm rounded-lg bg-white ">
                <div className="flex flex-col gap-2 items-center mt-1 ">
                  {" "}
                  <img src={nextdays.days4img} alt="img" className="w-12 h-12" />
                  <span className="font-medium text-center mt-2 w-full text-2xl">
                  {Math.floor(nextdays.days4)} °C
                  </span>
                </div>
              </div>
              <div className="w-24 h-28 border border-slate-200 shadow-sm rounded-lg bg-white ">
                <div className="flex flex-col gap-2 items-center mt-1 ">
                  {" "}
                  <img src={nextdays.days5img} alt="img" className="w-12 h-12" />
                  <span className="font-medium text-center mt-2 w-full text-2xl">
                  {Math.floor(nextdays.days5)} °C
                  </span>
                </div>
              </div>
              </div>
                    </div>
                </div>

           
            </div>
      </div>

    
    </div>
  );
}
export default Hero;
