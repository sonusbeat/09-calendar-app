import { useState } from 'react';

const Spinner = ({ msg }) => {
  const [ message, setMessage ] = useState("Loading");

  msg && setMessage(msg);

  return (
    <div
      className="bg-dark d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="spinner-border text-success" role="status">
        <span id="loading" className="sr-only">{ message } ...</span>
      </div>
    </div>
  );
}

export default Spinner;