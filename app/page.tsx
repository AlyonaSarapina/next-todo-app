"use client";

import AddTodo from "@/components/AddTodo";
import Auth from "@/components/Auth";
import TodoList from "@/components/TodoList";
import useAuth from "@/hooks/useAuth";
import { Collapse, Container } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <ChakraProvider>
      <Container maxW="7xl">
        <Auth />
        <Collapse in={isLoggedIn} animateOpacity>
          <AddTodo />
          <TodoList />
        </Collapse>
      </Container>
    </ChakraProvider>
  );
}
