import React from "react";
/*
I have to give credit to https://loading.io/css/ for this loading animation.
they saved me a ton of time by having amazing premade loaders.
*/

const Loading = () => (
  <>
    <div className="lds-grid">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
    <h5>Waking up the Database, this may take a second...</h5>
  </>
);

export default Loading;
