import React from 'react'
import { SlideNumber } from '../../components';
require('./distill-lite.scss')
require('./cv-colors.scss')

const Provider = (props:any) => (
  <div className="distill-lite">
    {props.children}
    <SlideNumber index={props.index} />
  </div>
)

export const distillLite = {
  Provider,
}
