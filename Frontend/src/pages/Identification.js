import React, { useState } from 'react';
import '../styles/Identification.scss';
import SignIn from '../components/Identification/SignIn';
import SignUp from '../components/Identification/SignUp';

const Identification = () => {

  const [isRegister, setIsRegister] = useState(true);
  
  const Switch_Identification = () => {
    if (isRegister) setIsRegister(false);
    else setIsRegister(true);
  }

  return (isRegister ? <SignIn switch_identification={Switch_Identification} /> : <SignUp switch_identification={Switch_Identification} />)
};

export default Identification;
