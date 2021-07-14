<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="handleClick(index)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <DialogEditTask
      v-if="dialogs.edit"
      @close="dialogs.edit = false"
      :task="task"
    />
    <DialogDeleteTask
      v-if="dialogs.delete"
      @close="dialogs.delete = false"
      :task="task"
      :i="i"
    />
  </div>
</template>

<script>
import DialogEditTask from "@/components/TaskDialogs/DialogEditTask.vue";
import DialogDeleteTask from "@/components/TaskDialogs/DialogDeleteTask.vue";
export default {
  props: ["task", "i"],
  data: () => ({
    dialogs: {
      edit: false,
      delete: false,
    },
    items: [
      {
        title: "編集する",
        icon: "mdi-pencil",
        click() {
          this.dialogs.edit = true;
        },
      },
      {
        title: "削除する",
        icon: "mdi-delete",
        click() {
          this.dialogs.delete = true;
        },
      },
    ],
  }),
  components: {
    DialogEditTask,
    DialogDeleteTask,
  },
  methods: {
    handleClick(index) {
      this.items[index].click.call(this);
    },
  },
};
</script>