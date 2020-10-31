import React from 'react';
import './App.css';

import Home from './containers/Home/Home';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function App() {

  return (
    <div className="app">
      <Home />
    </div>
  );
}

export default App;
