import React from 'react';
import Markdown from 'markdown-to-jsx';
require('./credit.scss')

export const Credit = ({ children }: any) => (
  <div className='credit tiny-font'>
    <Markdown>{children}</Markdown>
  </div>
);
