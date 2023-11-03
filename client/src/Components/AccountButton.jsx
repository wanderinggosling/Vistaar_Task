import React from 'react'
import { Link } from 'react-router-dom'

const AccountButton = ({id}) => {
  return (
    <div>
      <Link to={`/transaction/${id}`}><button style={{borderRadius:"2px", background:"aqua"}}>{id}</button></Link>
    </div>
  )
}

export default AccountButton
