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

    feactInfoIP = (ip)=> `https://ipapi.co/${ip}/json/`

    componentDidMount() {
        fetch(this.feactInfoIP(this.state.clientIp))
        .then(res => res.json())
        .then(res => {
            this.setState({ipInfo:res})
            this.setState({center:{lat:res?.latitude, lng:res?.longitude}})
        })

        fetch('https://jsonip.com/?callback=?')
        .then(res => res.text())
        .then(res => {
            res = res.replace('?', '');
            res = res.replace(')', '');
            res = res.replace('(', '');
            res = res.replace(';', '');
            res = res.replace('{', '');
            res = res.replace('}', '');
            res.split(',').forEach(k => {
                k = k.split(':')
                if (k[0]=== '"ip"'){
                    k[1] = k[1].replace('"', '')
                    k[1] = k[1].replace('"', '')
                    this.setState({clientIp: k[1]})
                }
            })
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
        fetch(this.feactInfoIP(ip))
        .then(res => res.json())
        .then(res => {
            if (res.ip !== '' && !res.error){
                this.setState({ipInfo:res})
            }
            if(!/\s/g.test(res.latitude || res.longitude) && !res.error){
                this.setState({ipInfo:res})
                this.setState({center:{lat:res?.latitude, lng:res?.longitude}})
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
