import React from 'react';
import Backdrop from '@mui/material/Backdrop';

function Backdrop() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Backdrop</button>
      <Backdrop open={open} onClick={() => setOpen(false)}>
        {<h1>this is a backdrop</h1>}
      </Backdrop>
    </div>
  );
}
