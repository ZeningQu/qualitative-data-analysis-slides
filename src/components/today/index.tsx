import React from 'react';

export class Today extends React.PureComponent {
  render() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    return <span>{`${mm}/${dd}/${yyyy}`}</span>
  }
}
