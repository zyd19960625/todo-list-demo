<template>
  <div>
    <input
      type="checkbox"
      :checked="item.status === FINISHED"
      @change="setStatus(item.id)"
    />
    <span :class="item.status === FINISHED ? 'line-through' : ''">{{
      item.value
    }}</span>
    <button @click="removeTodo(item.id)">删除</button>
    <button
      @click="setDoing(item.id)"
      v-if="item.status !== FINISHED"
      :class="item.status === DOING ? 'doing' : 'willdo'"
    >
      {{ item.status === DOING ? "正在做..." : "马上做..." }}
    </button>
  </div>
</template>

<script lang="ts">
import { ITodoItem, TODO_STATUS } from "@/typings";
import { defineComponent, PropType, watch } from "vue";

export default defineComponent({
  name: "TodoItem",
  props: {
    item: {
      required: true,
      type: Object as PropType<ITodoItem>,
    },
  },

  setup(props, { emit }) {
    function removeTodo(id: number): void {
      emit("removeTodo", id);
    }
    function setDoing(id: number): void {
      emit("setDoing", id);
    }
    function setStatus(id: number): void {
      emit("setStatus", id);
    }

    return {
      FINISHED: TODO_STATUS.FINISHED,
      DOING: TODO_STATUS.DOING,
      WILLDO: TODO_STATUS.WILLDO,

      removeTodo,
      setDoing,
      setStatus,
    };
  },
});
</script>

<style lang="less" scoped>
.line-through {
  text-decoration: line-through;
}

.doing {
  background-color: #7dd10f;
  color: #fff;
}
.willdo {
  background-color: orange;
  color: #fff;
}
</style>
