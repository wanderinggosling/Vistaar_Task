import React, { useState, useEffect } from 'react'
import AccountButton from '../../Components/AccountButton';
import { useNavigate } from 'react-router-dom';

import './Customer.css'
const Customer = () => {
    const [cust, setCust] = useState([]);
    const [user,setUser] = useState(null);
    const [filterCustomer,setFilterCustomer] = useState([]);
    const navigate = useNavigate();

    const handleActiveClick=()=>{
         setFilterCustomer(cust.filter((c)=>c.active===true))
    }

    const handleAllClick=()=>{
        setFilterCustomer(cust);
    }


    useEffect(() => {
        const currentUser = localStorage.getItem('access_token')
        if(currentUser){
            setUser(currentUser);
            navigate('/')
        }
        else{
            alert('Please login first')
            navigate('/Login')
        }
        // Fetch data from the API when the component mounts
        fetch('http://localhost:8000/customers')
            .then((response) => response.json())
            .then((data) => {
                setCust(data); // Update the state with the fetched data
                setFilterCustomer(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <div style={{height:"90vh"}}>
        <h2 style={{textAlign:"center"}}>Customers</h2>
        <div className="categories">
            <button onClick={handleAllClick}>All</button>
            <button onClick={handleActiveClick}>Active</button>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}> 
        
            <table className="table" style={{width:"50%"}}>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Account</th>
                    </tr>
                </thead>
                <tbody>
                    {filterCustomer.map((customer) => (
                        <tr key={customer._id}>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td>{customer.accounts.map((item,index)=><AccountButton id={item} key={index}/>)}</td>  
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default Customer
