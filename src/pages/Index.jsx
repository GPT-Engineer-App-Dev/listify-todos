import React, { useState } from "react";
import { Box, Heading, Input, Button, VStack, HStack, Text, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => setInputValue(e.target.value);

  const addTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No content",
        description: "Todo can't be empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, { id: Date.now(), content: inputValue }]);
    setInputValue("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <Box p={8}>
      <VStack spacing={8}>
        <Heading>Todo App</Heading>
        <HStack>
          <Input placeholder="Add a new task" value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} />
          <IconButton icon={<FaPlus />} onClick={addTodo} colorScheme="blue" aria-label="Add todo" />
        </HStack>
        <VStack spacing={4} align="stretch">
          {todos.map((todo) => (
            <HStack key={todo.id} justifyContent="space-between">
              <Text>{todo.content}</Text>
              <IconButton icon={<FaTrash />} onClick={() => deleteTodo(todo.id)} colorScheme="red" aria-label="Delete todo" />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Index;
