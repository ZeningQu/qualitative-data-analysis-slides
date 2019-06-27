import React from 'react'
require('./slide-number.scss')

export const SlideNumber = (props: {index: number}) => (
  <div className='slide-number tiny-font'>
    {props.index}
  </div>
)
