import React, {useEffect,useState} from 'react';
import {
    MapContainer,
    TileLayer,
    LayersControl,
    GeoJSON,
    ScaleControl,
    CircleMarker,
    Popup,
} from 'react-leaflet';
import { tectonicPlatesStyle, tileLayers } from './constants';
import tectonicPlates from './tectonicPlates.json';
import earthquakeData from './Earthquake.json';
import 'leaflet/dist/leaflet.css';
import {Select} from 'antd';
import MyMarker from './Markers';
const { Option } = Select;

export default function Earthquake(){
    //const tectonicPlatesData = 
    const [filterData, setFilterData] = useState(5)
    const [data,setData] = useState([])

    let circlesCmp;
    const getAllMarkers = (filterData)=>{
        let greaterFive = earthquakeData.filter(o=> o.mag>filterData)
        if(greaterFive.length>5000){

        }
        setData(greaterFive)

    }
    //console.log(greaterFive)
    const circleMarkerColor = (magnitude)=> {
        return magnitude <= 1
            ? '#5b0a91'
            : magnitude > 1 && magnitude <= 2
            ? '#a8005b'
            : magnitude > 2 && magnitude <= 3
            ? '#ff6600'
            : magnitude > 3 && magnitude <= 5
            ? '#dc1c13'
            : magnitude > 5 && magnitude <= 7
            ? '#8b0000'
            : '#000000';
    };
    useEffect(()=>{
        getAllMarkers(filterData)
        console.log(filterData)
    },[filterData])
    const children = [];
  for (let i = 0; i < 8; i++) {
    children.push(<Option value={i} key={i}>{i} Richter</Option>);
  }

  
  const changeHandler = event =>{
      console.log('Changing event: ',event);
      setFilterData(event);
  }
    return(
    <>
    <Select  size='large' defaultValue='5' onChange={changeHandler} style={{marginTop:"6.5vh",zIndex:100,width: 200 }}>
              {children}
    </Select>
     <MapContainer center={[0, 0]} zoom={3} style={{ height:"100vh", width:"100vw"}}>
     <LayersControl position="topright">
                {tileLayers.map(({ id, name, attribution, url, checked }) => (
                    <LayersControl.BaseLayer
                        key={id}
                        name={name}
                        checked={checked}>
                        <TileLayer attribution={attribution} url={url} />
                    </LayersControl.BaseLayer>
                ))}
                <LayersControl.Overlay name="Tectonic Plates">
                    <GeoJSON
                        data={tectonicPlates}
                        style={tectonicPlatesStyle}
                    />
                </LayersControl.Overlay>
            </LayersControl>
            <MyMarker data={data} fData={filterData}/>
           
    </MapContainer>

    
    </>
    )
} 