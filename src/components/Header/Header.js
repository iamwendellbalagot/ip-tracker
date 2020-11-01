import React, {useState} from 'react';
import './Header.css';

function Header({getIp}) {
    const [queryIP, setQueryIP] = useState('');

    const handleinputChange = (event) => {
        event.preventDefault();
        setQueryIP(event.target.value);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        getIp(queryIP)
    }
    return (
        <div className='header'>
            <a target='_blank' href='https://github.com/iamwendellbalagot' rel='noreferrer' >Developer</a>
            <div className='header__title'>
                <h1>IP TRACKER</h1>
                <h3>Search any IP address</h3>
            </div>
            
            <form className='header__form' onSubmit={handleSubmit}>
                <input type='text' placeholder='Query IP/Domain' value={queryIP} onChange={handleinputChange}/>
                <button type='submit'>Search</button>
            </form>

        </div>
    )
}

export default Header;
