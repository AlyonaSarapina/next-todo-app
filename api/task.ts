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
    console.log(err);
  }
};

const toggleTodoStatus = async (docId: string, status: string) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await updateDoc(todoRef, {
      status,
    });
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
};

const deleteTodo = async (docId: string) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};

export { addTodo, toggleTodoStatus, deleteTodo, editTodo };
