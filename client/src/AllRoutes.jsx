import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Customer from './Pages/Customer/Customer'
import Login from './Pages/Login/Login';
import Transaction from './Pages/Transaction/Transaction';
import Products from './Pages/Products/Products';
import Accounts from './Pages/Accounts/Accounts';

const AllRoutes = () => {
  return (
    <Routes>
        <Route exact path='/' element={<Customer/>}></Route>
        <Route exact path='/Login' element={<Login/>}></Route>
        <Route exact path='/Transaction/:account_id' element={<Transaction/>}></Route>
        <Route exact path='/Product' element={<Products/>}></Route>
        <Route exact path = '/Account' element={<Accounts/>}></Route>


    </Routes>
  )
}

export default AllRoutes
