import React, { Component } from 'react';
import './Home.css';

import Header from '../../components/Header/Header';
import Body from '../../components/Body/Body';
import "leaflet/dist/leaflet.css";

export default class Home extends Component {

    state = {
        ipInfo: null,
        center: {lat:1.27623,lng:103.8},
        clientIp: ''
    }

    feactInfoIP = (ip)=> `http://ip-api.com/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`

    componentDidMount() {

        fetch('http://api.hostip.info/get_html.php')
        .then(res => res.text())
        .then(res => {
            let clientIpInfo = res.split('\n');
            clientIpInfo.forEach(arr =>{
                arr = arr.split(':')
                if(arr[0] === 'IP') {
                    this.setState({clientIp:arr[1]})
                }
            })
        })
        fetch(this.feactInfoIP(this.state.clientIp))
        .then(res => res.json())
        .then(res => {
            this.setState({ipInfo:res})
            this.setState({center:{lat:res?.lat, lng:res?.lon}})
        })
    }
    
    // componentDidUpdate(prevState){
    //     if(prevState.clientIp !== this.state.clientIp){
    //         console.log('UPDATING')
    //         this.handleIpChanged(this.state.clientIp)
    //     }
    // }

    handleIpChanged = (ip) =>{
        this.setState({ipAddress:ip})
        console.log(ip)
        fetch(this.feactInfoIP(ip))
        .then(res => res.json())
        .then(res => {
            if(res.status==='success'){
                this.setState({ipInfo:res})
                this.setState({center:{lat:res?.lat, lng:res?.lon}})
            }
            
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className='home'>
                <Header getIp = {this.handleIpChanged}/>
                <Body ipInfo = {this.state.ipInfo} center={this.state.center}/>
            </div>
        )
    }
}
