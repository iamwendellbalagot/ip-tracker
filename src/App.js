import React, { useEffect } from 'react';
import './App.css';

function App() {

  useEffect(() =>{
    fetch('http://ip-api.com/json/24.48.0.1')
    .then(res => res.json())
    .then(res => console.log(res))

    fetch('http://api.hostip.info/get_html.php')
    .then(res => res.text())
    .then(res => console.log(res.split('\n')))
  }, [])

  return (
    <div className="app">
      <h1>IP TRACKER</h1>
    </div>
  );
}

export default App;
