<template>
  <todo-input></todo-input>
  <todo-list :todoList="todoList"></todo-list>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import TodoList from "@/components/TodoList/index.vue";
import TodoInput from "@/components/TodoInput/index.vue";
import { IUseTodo, useTodo } from "./hooks";
import { useStore } from "vuex";
import { ITodoItem } from "./typings";

export default defineComponent({
  name: "APP",
  components: { TodoList, TodoInput },
  setup() {
    const store = useStore();
    const { setTodoList }: IUseTodo = useTodo();
    onMounted(() => {
      setTodoList();
    });
    const todoList = computed<ITodoItem[]>(() => store.state.list);
    return {
      todoList,
    };
  },
});
</script>
