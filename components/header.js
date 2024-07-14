import React from 'react';
import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Box bg="teal.500" p={4}>
      <Flex align="center" maxW="1200px" mx="auto">
        <Heading as={Link} to="/" color="white" size="lg">Todo</Heading>
        <Spacer />
        <Button as={Link} to='/login' colorScheme="gray" color="white" _hover={{bg: 'white', color: "teal"}} variant="outline" mr={2}>Login</Button>
        <Button as={Link} to='/signup' colorScheme="teal" variant="solid">Sign Up</Button>
      </Flex>
    </Box>
  );
};

export default Header;
