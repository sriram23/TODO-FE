// Signup.js
import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Heading, VStack } from '@chakra-ui/react';
import axiosInstance from '../helpers/axios';
import constants from '../helpers/constants';
import { useNavigate } from 'react-router-dom';
import AlertComponent from './AlertComponent';

const Signup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleSignup = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      password
    }
    try{
      const response = await axiosInstance[constants.SIGNUP.method](constants.SIGNUP.path, payload)
      setAlert({ message: response.data.message, type: "success"})
        setTimeout(() => {
          setAlert({message: "", type: ""})
          navigate('/login')
        }, 3000)
    } catch(err) {
      setAlert({ message: err.message, type: "error"})
        setTimeout(() => {
          setAlert({message: "", type: ""})
        }, 3000)
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={6} textAlign="center">Sign Up</Heading>
      <form onSubmit={handleSignup}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">
            Sign Up
          </Button>
        </VStack>
      </form>
      {alert.message && <Box m={2}><AlertComponent message={alert.message} type={alert.type} /></Box>}
    </Box>
  );
};

export default Signup;
