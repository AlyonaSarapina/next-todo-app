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

const breakpoints = {
  base: "0em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

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

    try {
      setIsLoading(true);
      await editTodo(id, title, description);
      toast({ title: "Todo updated successfully", status: "success" });
      setEdit(false);
    } catch (err) {
      toast({
        title: "The problem been detected while updating",
        status: "error",
      });
      throw new Error("Problem occured");
    }

    setIsLoading(false);
  };

  const handleTodoDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      toast({ title: "Todo deleted successfully", status: "success" });
    } catch (err) {
      toast({
        title: "The problem been detected while deleting",
        status: "error",
      });
      throw new Error("Problem occured");
    }
  };

  const handleToggle = async (id: string, status: string) => {
    const newStatus = status == "completed" ? "pending" : "completed";

    try {
      await toggleTodoStatus(id, newStatus);
      toast({
        title: `Todo marked ${newStatus}`,
        status: newStatus == "completed" ? "success" : "warning",
      });
    } catch (err) {
      toast({
        title: "The problem been detected while updating",
        status: "error",
      });
      throw new Error("Problem occured");
    }
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
        wordBreak="break-word"
        py="2"
        pl={{ base: "4", md: "4" }}
        pr={{ base: "2", md: "4" }}
        borderRadius="15px"
        border="2px solid #c5d3d9"
        boxShadow="lg"
        transition="0.3s"
        _hover={{ boxShadow: "none", cursor: "pointer" }}
        display="flex"
        justifyContent="space-between"
        gap={{ base: "5" }}
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
              <Heading
                as="h3"
                fontSize={{ base: "xs", md: "medium" }}
                display="inline-block"
              >
                {todo.title.toUpperCase()}
              </Heading>
              {todo.description && (
                <Text fontSize={{ base: "xs", md: "medium" }}>
                  {todo.description}
                </Text>
              )}
            </>
          )}
        </Box>
        <Box
          display="flex"
          flexDirection={{ base: "column" }}
          gap="1"
          alignItems="end"
        >
          {edit ? (
            <>
              <Button colorScheme="red" onClick={(e) => cancelEdit(e)}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={(e) => handleTodoEdit(e, todo.id)}
              >
                Edit
              </Button>
            </>
          ) : (
            <>
              <Box display="flex" flexDirection="column" alignItems="end">
                <Badge bg="inherit">
                  <Text>{getDateString}</Text>
                </Badge>
                <Badge
                  textAlign="center"
                  opacity="0.8"
                  transition="0.5s ease-in-out"
                  bg={todo.status == "pending" ? "yellow.500" : "green.500"}
                >
                  {todo.status}
                </Badge>
              </Box>
              <Box>
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
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Skeleton>
  );
};

export default TodoCard;
