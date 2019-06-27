import React from 'react';
require('./video.css');

export interface VideoProps {
  url: string;
}

export class Video extends React.PureComponent<VideoProps> {
  render() {
    return(
      <div className="videoContainer">
        <iframe 
          src={this.props.url} 
          frameBorder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          onKeyDown={(e) => e.preventDefault()}
          ></iframe>
      </div>
    );
  }
}