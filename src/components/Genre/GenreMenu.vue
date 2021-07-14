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
    <DialogEdit
      v-if="dialogs.edit"
      @close="dialogs.edit = false"
      :genre="genre"
    />
    <DialogDelete
      v-if="dialogs.delete"
      @close="dialogs.delete = false"
      :genre="genre"
    />
  </div>
</template>

<script>
import DialogEdit from "@/components/ListDialogs/DialogEdit.vue";
import DialogDelete from "@/components/ListDialogs/DialogDelete.vue";
export default {
  props: ["genre"],
  data: () => ({
    dialogs: {
      edit: false,
      delete: false,
    },
    items: [
      {
        title: "タスク一覧へ",
        icon: "mdi-location-enter",
        click() {
          this.$router.push({ name: "Task", params: { id: this.genre.id } });
        },
      },
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
    DialogEdit,
    DialogDelete,
  },
  methods: {
    handleClick(index) {
      this.items[index].click.call(this);
    },
  },
};
</script>

<style>
</style>