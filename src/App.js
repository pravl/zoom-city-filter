import React, { useState, useEffect} from 'react'
import "./App.css"

import { Data } from "./Component/Data"
import { TopHeader } from "./Component/TopHeader"

const URL = `https://api.zoomcar.com/v4/cities?platform=web`
let cities = []

function App() {

  const [data, setData] = useState({ popular: [], others: [] })
  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(response => {
        const popular = []
        const others = []
        response.cities.forEach(city => {
          (city.popular) ? popular.push(city) : others.push(city)
        })
        setData({ popular, others })
        cities = response.cities
      })
      .catch(err => cities = [])
  }, [])

  const handleFilter = (filter) => {
    const { search , oneWayEnabled,  hdEnabled } = filter
    const popular = []
    const others = []
    
    cities.forEach(city => {
      if (hdEnabled && oneWayEnabled && search) {
        city = (city.hd_enabled === hdEnabled && city.one_way_enabled === oneWayEnabled 
                && city.name.toLowerCase().includes(search.toLowerCase())) ? city : null
      } 
      else if (hdEnabled && search) {
        city = (city.hd_enabled === hdEnabled 
                && city.name.toLowerCase().includes(search.toLowerCase())) ? city : null
      } 
      else if (oneWayEnabled && search) {
        city = (city.one_way_enabled === oneWayEnabled 
                && city.name.toLowerCase().includes(search.toLowerCase())) ? city : null
      } 
      else if (hdEnabled && oneWayEnabled) {
        city = (city.hd_enabled === hdEnabled 
                && city.one_way_enabled === oneWayEnabled) ? city : null
      } 
      else if (hdEnabled) {
        city = (city.hd_enabled === hdEnabled) ? city : null
      } 
      else if (oneWayEnabled) {
        city = (city.one_way_enabled === oneWayEnabled) ? city : null
      } 
      else if (search) {
        city = (city.name.toLowerCase().includes(search.toLowerCase())) ? city : null
      }
      (city) && ((city.popular) ? popular.push(city) : others.push(city))
    })
    setData({ popular, others })
  }

  return (
    <div className="App">
      <div>
        <h1>CITIES</h1>
        <TopHeader handleFilter={handleFilter} />
        <Data data={data} />
      </div>
    </div>
  );
}

export default App;
