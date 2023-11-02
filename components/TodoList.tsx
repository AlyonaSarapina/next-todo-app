import { Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Todo } from "@/types/todo";
import TodoCard from "./TodoCard";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { user } = useAuth();

  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(collection(db, "todo"), where("user", "==", user.uid));
    onSnapshot(q, (querySnapchot) => {
      let todoArr: any[] = [];
      querySnapchot.docs.forEach((doc) => {
        todoArr.push({ id: doc.id, ...doc.data() });
      });
      setTodos(todoArr);
    });
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  return (
    <Box mt={5} px={10} display="flex" flexDirection="column" gap="5">
      {todos && todos.map((todo) => <TodoCard todo={todo} key={todo.id} />)}
    </Box>
  );
};
export default TodoList;
