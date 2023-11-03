import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const currentUser = localStorage.getItem('access_token')
        if(currentUser){
            navigate('/Account')
        }
        else{
            alert('Please login first')
            navigate('/Login')
        }
        // Fetch data from the API when the component mounts
        fetch('http://localhost:8000/accounts-with-low-transactions')
            .then((response) => response.json())
            .then((data) => {
                setAccounts(data); // Update the state with the fetched data
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [accounts]);
  return (
    <>
    <h2 style={{textAlign:"center"}}>Accounts with less than amount 5000 transactions
    </h2>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <table className="table" style={{width:"40%"}}>
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope="col">Account Id</th>
                </tr>
            </thead>
            <tbody>
                {accounts.map((acc,index) => (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{acc}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </>
  )
}

export default Accounts
