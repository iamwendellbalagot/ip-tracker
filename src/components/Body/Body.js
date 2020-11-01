import React from 'react';
import './Body.css';
import "leaflet/dist/leaflet.css";

import { Map, TileLayer, Marker } from 'react-leaflet';

function Body({ipInfo, center}) {

    return (
        <div className='body'>
            <div className='body__infobox'>
                <div className='infobox__values'>
                    {ipInfo? Object.entries(ipInfo).map(el =>{

                        if (el[0]!=='languages' && el[0] !== 'message'){
                            return <div key={el[0]}>
                                        <span><strong>{'"'+el[0] + '"'}:</strong></span>
                                        <p 
                                        className={`${typeof(el[1])==='number' && 'isNumber'}
                                            ${typeof(el[1])==='string' && 'isString'}
                                            ${typeof(el[1])==='boolean' && 'isBoolean'}`}>{String('"'+el[1]+'"')}</p>
                                    </div>
                        }else{
                            return null
                        }
                        
                    }):null}
                </div>
            </div>
            <div className='body__map'>
                    <Map center={[center?.lat, center?.lng]} zoom={9}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[center?.lat, center?.lng]}/>
                    </Map>
            </div>
            
        </div>
    )
}

export default Body
