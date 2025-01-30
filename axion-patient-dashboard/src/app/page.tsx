"use client"

import React from 'react'
import { Appointments } from './components/Appointments';



const page: React.FC = () => {
  return (
    <div className='p-4 sm:ml-64 mt-14'>
      <Appointments />
    </div>

  )
}

export default page;