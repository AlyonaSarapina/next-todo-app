import {
  Input,
  Button,
  Textarea,
  Stack,
  Select,
  useToast,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addTodo } from "@/api/task";
import { FormEvent, KeyboardEvent, useState } from "react";

const AddTodo = () => {
  const [title, setTitle] = useState<string>("");
  const [statusInput, setStatusInput] = useState(true);
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("pending");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const { user } = useAuth();

  const handleSubmit = async (
    e: FormEvent<HTMLButtonElement> | KeyboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    if (!title) {
      setStatusInput(false);
      toast({
        title: "Please, enter the title",
        position: "top",
        status: "warning",
      });

      return;
    }

    if (user) {
      setIsLoading(true);
      const date = new Date();
      const todo = {
        title,
        description,
        status,
        id: user.uid,
      };

      await addTodo(todo);
      setIsLoading(false);
      setTitle("");
      setDescription("");
      setStatus("pending");
      toast({ title: "Task created successfully", status: "success" });
    }
  };

  return (
    <Skeleton isLoaded={!isLoading}>
      <Box
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
      >
        <Stack direction="column" mt="4" mb="4">
          <Input
            placeholder="Title"
            borderColor={!statusInput ? "red.400" : "gray.200"}
            value={title}
            onChange={(e) => {
              setStatusInput(true);
              setTitle(e.target.value);
            }}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option
              value={"pending"}
              style={{ color: "yellow", fontWeight: "bold" }}
            >
              Pending ⌛
            </option>
            <option
              value={"completed"}
              style={{ color: "green", fontWeight: "bold" }}
            >
              Completed ✅
            </option>
          </Select>
          <Button
            variant="solid"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Skeleton>
  );
};
export default AddTodo;
