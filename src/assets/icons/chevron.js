import React from 'react';

export default ({
  color, height, width, transform,
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" transform={transform}>
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" fill={color} /><path d="M0 0h24v24H0z" fill="none" />
  </svg>
);
