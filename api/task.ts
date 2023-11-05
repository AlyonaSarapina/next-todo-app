import { Todo } from "@/types/todo";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const addTodo = async ({ id, title, description, status }: Todo) => {
  try {
    await addDoc(collection(db, "todo"), {
      user: id,
      title: title,
      description: description,
      status: status,
      createdAt: new Date().getTime(),
    });
  } catch (err) {
    throw new Error(err as string);
  }
};

const toggleTodoStatus = async (docId: string, status: string) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await updateDoc(todoRef, {
      status,
    });
  } catch (err) {
    throw new Error(err as string);
  }
};

const editTodo = async (docId: string, title: string, description?: string) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await updateDoc(todoRef, {
      title,
      description,
    });
  } catch (err) {
    throw new Error(err as string);
  }
};

const deleteTodo = async (docId: string) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await deleteDoc(todoRef);
  } catch (err) {
    throw new Error(err as string);
  }
};

export { addTodo, toggleTodoStatus, deleteTodo, editTodo };
