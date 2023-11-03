import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AiOutlineLogout } from 'react-icons/ai'

import './Navbar.css'

const Navbar = () => {
    const [User, setUser] = useState(null);
    useEffect(()=>{
        const currUser = localStorage.getItem('access_token');
        if(currUser){
            setUser(currUser);
        }

        
    },[])
   
    const handlelogout=()=>{
        localStorage.removeItem('access_token');
        setUser(null);
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ fontFamily: 'auto' }}>Test</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/Product">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/Account">Account</Link>
                            </li>
                        </ul>
                    </div>
                    {
                        User === null ?
                            <Link to='/login'>Log in</Link> :
                            <div className="logout-container item-hide-second" style={{ display: "contents" }} >
                                {/* <button style={{ color: "white", textDecoration: "none", background:"none", border:"none" }} >{}</button> */}
                              <Link to='/login'>  <button className='nav-item nav-links item-hide-second' style={{ marginLeft: "2vh", background: 'none', border: 'none', color: 'whitesmoke', transform: 'rotate(269deg)' }} onClick={handlelogout} ><AiOutlineLogout /></button></Link>
                            </div>
                    }
                    
                </div>
            </nav>
        </div>
    )
}

export default Navbar
