import React from 'react';
import { Redirect } from 'react-router-dom';

const Landing = () => {
  return (
    <Redirect to="/login">Landing</Redirect>
  )
}

export default Landing