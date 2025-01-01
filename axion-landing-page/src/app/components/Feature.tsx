import React from 'react'
import DescriptionCard from '../elements/DescriptionCard'


export default function Feature() {
  return (
    <div className='flex justify-between gap-4 p-4'>
      <DescriptionCard />
      <DescriptionCard  />
      <DescriptionCard />
    </div>
  )
}
