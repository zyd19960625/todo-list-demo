import { IState, ITodoItem, TODO_STATUS } from "@/typings";
import {
  REMOVE_TODO,
  SET_DOING,
  SET_STATUS,
  SET_TODO,
  SET_TODO_LIST,
} from "../actionTypes";

export default {
  [SET_TODO](state: IState, todo: ITodoItem): void {
    state.list = [todo, ...state.list];
  },
  [SET_TODO_LIST](state: IState, todoList: ITodoItem[]): void {
    state.list = todoList;
  },
  [REMOVE_TODO](state: IState, id: number): void {
    /*  const index = state.list.findIndex((item: ITodoItem) => item.id === id);
    if (index !== -1) {
      state.list.splice(index, 1);
    }
    state.list = [...state.list]; */

    state.list = state.list.filter((item: ITodoItem) => {
      return item.id !== id;
    });
  },
  [SET_DOING](state: IState, id: number): void {
    state.list = state.list.map((item: ITodoItem) => {
      if (item.id === id) {
        item.status =
          item.status === TODO_STATUS.WILLDO
            ? TODO_STATUS.DOING
            : TODO_STATUS.WILLDO;
      } else if (item.status === TODO_STATUS.DOING) {
        item.status = TODO_STATUS.WILLDO;
      }
      return item;
    });
  },
  [SET_STATUS](state: IState, id: number): void {
    const item = state.list.find((item: ITodoItem) => item.id === id);
    switch (item?.status) {
      case TODO_STATUS.FINISHED:
        item.status = TODO_STATUS.WILLDO;
        break;
      case TODO_STATUS.WILLDO:
      case TODO_STATUS.DOING:
        item.status = TODO_STATUS.FINISHED;
        break;
      default:
        break;
    }
    state.list = [...state.list];
  },
};
