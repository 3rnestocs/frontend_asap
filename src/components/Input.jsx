import React from 'react';
import { TextField } from '@mui/material';

const Input = React.forwardRef(({ label, ...rest }, ref) => {
  return <TextField variant='outlined' label={label} inputRef={ref} {...rest} />;
});

export default Input;
