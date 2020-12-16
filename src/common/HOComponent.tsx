import React from 'react';

const wrapperComp = (Component:any) => {
  return class extends React.Component {
    render() {
      return (
        <Component/>
      );
    }
  };
};
export default wrapperComp;