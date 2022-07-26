<template>
  <input type="text" @keyup.enter="addTodoItem" v-model="todoValue" />
</template>

<script lang="ts">
import { useTodo, IUseTodo } from "@/hooks";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TodoInput",
  setup() {
    const todoValue = ref("");
    const { setTodo }: IUseTodo = useTodo();

    const addTodoItem = (e: KeyboardEvent): void => {
      setTodo(todoValue.value);
    };

    return { todoValue, addTodoItem };
  },
});
</script>

<style lang="less" scoped></style>
