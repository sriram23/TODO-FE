// Todo.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Checkbox,
  IconButton,
  Text,
  Spinner,
  useToast
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import axiosInstance from '../helpers/axios';
import constants from '../helpers/constants';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    // Fetch tasks from the API
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/get');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast({
          title: 'Error fetching tasks',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (task.trim()) {
      try {
        const response = await axiosInstance[constants.ADD.method](constants.ADD.path, { task });
        setTasks([...tasks, response.data]);
        setTask('');
      } catch (error) {
        console.error('Error adding task:', error);
        toast({
          title: 'Error adding task',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const toggleTaskCompletion = async (id, completed) => {
    try {
      await axiosInstance[constants.COMPLETE.method](constants.COMPLETE.path+'/'+id, { completed });
      const newTasks = tasks.map((task) =>
        task._id === id ? { ...task, completed } : task
      );
      setTasks(newTasks);
    } catch (error) {
      console.error('Error toggling task completion:', error);
      toast({
        title: 'Error toggling task completion',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteTask = async (id, deleted=true) => {
    try {
      const path = constants.DELETE.path+'/'+id
      await axiosInstance[constants.DELETE.method](path, { deleted });
      const newTasks = tasks.filter((task) => task._id !== id);
      setTasks(newTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: 'Error deleting task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <VStack spacing={4}>
        <HStack>
          <Input
            placeholder="Add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button colorScheme="teal" onClick={addTask}>
            Add
          </Button>
        </HStack>
        <VStack spacing={2} w="full">
          {tasks.map((task) => (
            !task.deleted && <HStack key={task.id} w="full" justifyContent="space-between">
              <HStack>
                <Checkbox
                  isChecked={task.completed}
                  onChange={() => toggleTaskCompletion(task._id, !task.completed)}
                />
                <Text as={task.completed ? 'del' : ''}>{task.task}</Text>
              </HStack>
              <IconButton
                aria-label="Delete task"
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => deleteTask(task._id)}
              />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Todo;
