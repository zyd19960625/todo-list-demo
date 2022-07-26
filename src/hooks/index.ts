import {
  REMOVE_TODO,
  SET_DOING,
  SET_STATUS,
  SET_TODO,
  SET_TODO_LIST,
} from "@/store/actionTypes";
import { ITodoItem, TODO_STATUS } from "@/typings";
import { watch } from "vue";
import { Store, useStore } from "vuex";

export interface IUseTodo {
  setTodo(value: string): void;
  setTodoList(): void;
  removeTodo(id: number): void;
  setStatus(id: number): void;
  setDoing(id: number): void;
}

export function useTodo(): IUseTodo {
  const store: Store<any> = useStore();

  const { getLocalList, setLocalList } = useLocalStorage();

  watch(
    () => {
      return store.state.list;
    },
    (todoList) => {
      setLocalList(todoList);
    }
  );

  function setTodo(value: string): void {
    const todo: ITodoItem = {
      id: new Date().getTime(),
      value,
      status: TODO_STATUS.WILLDO,
    };
    store.dispatch(SET_TODO, todo);
  }
  function setTodoList(): void {
    const todoList: ITodoItem[] = getLocalList();
    store.dispatch(SET_TODO_LIST, todoList);
  }
  function removeTodo(id: number): void {
    store.dispatch(REMOVE_TODO, id);
  }
  function setStatus(id: number) {
    store.dispatch(SET_STATUS, id);
  }
  function setDoing(id: number) {
    store.dispatch(SET_DOING, id);
  }
  return {
    setTodo,
    setTodoList,
    removeTodo,
    setStatus,
    setDoing,
  };
}

interface ILocalStorage {
  getLocalList(): ITodoItem[];
  setLocalList(todoList: ITodoItem[]): void;
}
function useLocalStorage(): ILocalStorage {
  function getLocalList(): ITodoItem[] {
    return JSON.parse(localStorage.getItem("todoList") || "[]");
  }

  function setLocalList(todoList: ITodoItem[]): void {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  return {
    getLocalList,
    setLocalList,
  };
}
