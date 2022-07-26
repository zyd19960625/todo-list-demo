<template>
  <todo-item
    v-for="item in todoList"
    :key="item.id"
    :item="item"
    @removeTodo="removeTodo"
    @setStatus="setStatus"
    @setDoing="setDoing"
  ></todo-item>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from "vue";
import TodoItem from "@/components/TodoItem/index.vue";
import { useStore } from "vuex";
import { ITodoItem } from "@/typings";
import { IUseTodo, useTodo } from "@/hooks";

export default defineComponent({
  name: "TodoList",
  components: { TodoItem },
  props: {
    todoList: {
      required: true,
      type: Array as PropType<ITodoItem[]>,
    },
  },
  setup() {
    const { removeTodo, setStatus, setDoing }: IUseTodo = useTodo();

    return { removeTodo, setStatus, setDoing };
  },
});
</script>

<style lang="less" scoped></style>
