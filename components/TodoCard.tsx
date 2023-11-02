import { Todo } from "@/types/todo";
import {
  Badge,
  Box,
  Button,
  Heading,
  Input,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, Fragment, KeyboardEvent, useMemo, useState } from "react";
import { FaToggleOff, FaToggleOn, FaTrash, FaEdit } from "react-icons/fa";
import { deleteTodo, editTodo, toggleTodoStatus } from "@/api/task";

const TodoCard = ({ todo }: { todo: Todo }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string>(todo.description);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const getDateString = useMemo(() => {
    const date = new Date(todo.createdAt as string);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }, [todo]);

  const handleTodoEdit = async (
    e: FormEvent<HTMLButtonElement> | KeyboardEvent<HTMLDivElement>,
    id: string
  ) => {
    e.preventDefault();
    if (title === todo.title && todo.description === description) {
      setEdit(false);
      return;
    }
    setIsLoading(true);

    await editTodo(id, title, description);

    setIsLoading(false);
    setEdit(false);

    toast({ title: "Todo updated successfully", status: "success" });
  };

  const handleTodoDelete = async (id: string) => {
    await deleteTodo(id);
    toast({ title: "Todo deleted successfully", status: "success" });
  };

  const handleToggle = async (id: string, status: string) => {
    const newStatus = status == "completed" ? "pending" : "completed";

    await toggleTodoStatus(id, newStatus);
    toast({
      title: `Todo marked ${newStatus}`,
      status: newStatus == "completed" ? "success" : "warning",
    });
  };

  const cancelEdit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setTitle(todo.title);
    setDescription(todo.description);
    setEdit(false);
  };

  return (
    <Skeleton isLoaded={!isLoading}>
      <Box
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleTodoEdit(e, todo.id);
          }
        }}
        py="2"
        pl="8"
        pr="4"
        borderRadius="15px"
        boxShadow="md"
        bgColor="#c5d3d9"
        transition="0.2s"
        _hover={{ boxShadow: "none", cursor: "pointer" }}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column">
          {edit ? (
            <>
              <Input
                bg="white"
                autoFocus
                value={title}
                mb="2"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                bg="white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </>
          ) : (
            <>
              <Heading as="h3" fontSize="medium">
                {todo.title.toUpperCase()}
              </Heading>
              {todo.description && <Text>{todo.description}</Text>}
            </>
          )}
        </Box>
        <Box display="flex" alignItems="center" gap="1">
          {edit ? (
            <div className="flex flex-col gap-2">
              <Button colorScheme="red" onClick={(e) => cancelEdit(e)}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={(e) => handleTodoEdit(e, todo.id)}
              >
                Edit
              </Button>
            </div>
          ) : (
            <>
              <Badge bg="inherit">
                <Text>{getDateString}</Text>
              </Badge>
              <Badge
                opacity="0.8"
                bg={todo.status == "pending" ? "yellow.500" : "green.500"}
              >
                {todo.status}
              </Badge>
              <Badge
                color={todo.status == "pending" ? "gray.500" : "green.500"}
                bg="inherit"
                transition={"0.2s"}
                _hover={{
                  bg: "inherit",
                  transform: "scale(1.2)",
                }}
                size="xs"
                onClick={() => handleToggle(todo.id, todo.status)}
              >
                {todo.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
              </Badge>
              <Badge
                color="blue.600"
                bg="inherit"
                transition={"0.2s"}
                _hover={{
                  bg: "inherit",
                  transform: "scale(1.2)",
                }}
                size="xs"
                onClick={() => {
                  setEdit(true);
                }}
              >
                <FaEdit />
              </Badge>
              <Badge
                color="red.500"
                bg="inherit"
                transition={"0.2s"}
                _hover={{
                  bg: "inherit",
                  transform: "scale(1.2)",
                }}
                size="xs"
                onClick={() => handleTodoDelete(todo.id)}
              >
                <FaTrash />
              </Badge>
            </>
          )}
        </Box>
      </Box>
    </Skeleton>
  );
};

export default TodoCard;
