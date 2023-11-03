import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Products = () => {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const currentUser = localStorage.getItem('access_token')
        if(currentUser){
            navigate('/Product')
        }
        else{
            alert('Please login first')
            navigate('/Login')
        }
        // Fetch data from the API when the component mounts
        fetch('http://localhost:8000/distinct-products')
            .then((response) => response.json())
            .then((data) => {
                setProduct(data); // Update the state with the fetched data
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [product]);
  return (
    
    <div style={{height:"90vh"}}>
        <h2 style={{textAlign:"center"}}>Distinct Products</h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <table className="table" style={{width:"40%"}}>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((prod,index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{prod}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
        </div>
    
  )
}

export default Products
