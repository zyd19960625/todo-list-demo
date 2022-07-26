interface ITodoList {}

export interface ITodoItem {
  id: number;
  value: string;
  status: TODO_STATUS;
}

export enum TODO_STATUS {
  WILLDO = "willdo",
  DOING = "doing",
  FINISHED = "finished",
}

export interface IState {
  list: ITodoItem[];
}
