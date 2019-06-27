import React from 'react';
import Highlight, { defaultProps } from "prism-react-renderer";
import nightOwl from 'prism-react-renderer/themes/nightOwl';
require('../../../node_modules/prismjs/themes/prism-okaidia.css');
require('./code.scss');

export interface CodeProps {
  code: string;
}

export class Code extends React.PureComponent<CodeProps> {
  render() {
    return (
      <Highlight {...defaultProps} code={this.props.code} language="python" theme={nightOwl}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  }
}
