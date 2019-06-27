import MathJax from 'react-mathjax';
import React from 'react';

export const inlineEquation = (eq: string) => <MathJax.Provider><MathJax.Node inline formula={eq}/></MathJax.Provider>

export const blockEquation = (eq: string) => <MathJax.Provider><MathJax.Node formula={eq}/></MathJax.Provider>
