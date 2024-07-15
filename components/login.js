// Login.js
import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../helpers/axios';
import constants from '../helpers/constants';
import axiosInstance from '../helpers/axios';
import AlertComponent from './AlertComponent';

const Login = () => {
    const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
        email,
        password
    }
    try{
        const response = await axiosInstance[constants.LOGIN.method](constants.LOGIN.path, payload)
        if(response?.data?.token) {
            sessionStorage.setItem('todo_token', response?.data?.token);
            sessionStorage.setItem('email', response?.data?.email);
            window.dispatchEvent(new Event("storage"));
            navigate('/')
        }
    } catch(err) {
        // alert("Something went wrong while logging in: "+err)
        setAlert({ message: err.message, type: "error"})
        setTimeout(() => {
          setAlert({message: "", type: ""})
        }, 3000)
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={6} textAlign="center">Login</Heading>
      <form onSubmit={handleLogin}>
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
            Login
          </Button>
        </VStack>
      </form>
      {alert.message && <Box m={2}><AlertComponent message={alert.message} type={alert.type} /></Box>}
    </Box>
  );
};

export default Login;
