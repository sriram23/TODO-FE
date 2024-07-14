import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
    const [loginText, setLoginText] = useState(sessionStorage.getItem('todo_token')?'Logout':'Login')
    const setButtonText = () => {
        const token = sessionStorage.getItem('todo_token');
        setLoginText(token?'Logout':'Login');
    }
    const handleLogin = () => {
        if(loginText === 'Login') {
            navigate('/login')
        } else if(loginText === 'Logout') {
            sessionStorage.removeItem('todo_token')
            window.dispatchEvent(new Event('storage'))
            navigate('/login')
        }
    }
    useEffect(() => {
        window.addEventListener('storage', setButtonText)
        return () => {
            window.removeEventListener('storage', setButtonText)
        }
    }, [])
  return (
    <Box bg="teal.500" p={4}>
      <Flex align="center" maxW="1200px" mx="auto">
        <Heading as={Link} to="/" color="white" size="lg">Todo</Heading>
        <Spacer />
        <Button onClick={handleLogin} colorScheme="gray" color="white" _hover={{bg: 'white', color: "teal"}} variant="outline" mr={2}>{loginText}</Button>
        {loginText === 'Login' && <Button as={Link} to='/signup' colorScheme="teal" variant="solid">Sign Up</Button>}
      </Flex>
    </Box>
  );
};

export default Header;
