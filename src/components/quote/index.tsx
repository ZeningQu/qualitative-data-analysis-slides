import React from 'react';
require('./quote.scss')

export interface QuoteProps {
  text: string;
  footer: string;
}

export class Quote extends React.PureComponent<QuoteProps> {
  render() {
    return (
      <div className="container">
        <blockquote className="groucho">
          {this.props.text}
          <footer>{this.props.footer}</footer>
        </blockquote>
      </div>
    );
  }
}
