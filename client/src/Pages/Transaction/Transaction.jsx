import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Transaction = () => {

    const [transaction, setTransaction] = useState([]);
    const {account_id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const currentUser = localStorage.getItem('access_token')
        if(currentUser){
            navigate(`/Transaction/${account_id}`)
        }
        else{
            alert('Please login first')
            navigate('/Login')
        }
        // Fetch data from the API when the component mounts
        fetch(`http://localhost:8000/transactions/${account_id}`)
            .then((response) => response.json())
            .then((data) => {
                setTransaction(data); // Update the state with the fetched data
                console.log(data.transactions);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [account_id]);
    return (
        <>
        <h2 style={{textAlign:"center"}}>Transactions for {account_id}</h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <table className="table" style={{width:"40%"}}>
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Code</th>
                        <th scope="col">Price</th>
                        <th scope="col">Symbol</th>
                    </tr>
                </thead>
                <tbody>
                    {transaction[0]?.transactions.map((tran, index) => (
                        <tr key={index}>
                            <td>{tran.date.slice(0,10)}</td>
                            <td>{tran.amount}</td>
                            <td>{tran.transaction_code}</td>

                            <td>{tran.price}</td>
                            <td>{tran.symbol}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Transaction
