<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePanelService } from "~/composables/services/panel.service";
import modalAddData from "./components/modalAddData.vue";

const { getPanels, getPanelChildren } = usePanelService();
const panels = ref<any[]>([]);
const selectedPanelId = ref<string | null>(null);
const panelChildren = ref<any[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
const isCollapsed = ref(false);

const isModalVisible = ref(false);
const openModal = () => {
  isModalVisible.value = true;
};
const closeModal = () => {
  isModalVisible.value = false;
};

onMounted(async () => {
  const filter = true;
  try {
    const { data } = await getPanels(String(filter));
    panels.value = data;
  } catch (err) {
    console.error("Error fetching panel data:", err);
    error.value = "Error fetching panel data";
  }
});

const handlePanelClick = async (panelId: string) => {
  selectedPanelId.value = panelId;
  isLoading.value = true;

  try {
    const { data } = await getPanelChildren(panelId);
    const mappedChildren = data.children.map((child: any) => {
      return {
        id: child.id,
        name: child.name,
        parentId: child.parentId,
        description: child.description,
      };
    });
    panelChildren.value = mappedChildren;
  } catch (err) {
    console.error("Error fetching panel children:", err);
    error.value = "Error fetching panel children";
  } finally {
    isLoading.value = false;
  }
};

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const handleGetData = async () => {
  const filter = true;
  try {
    const { data } = await getPanels(String(filter));
    panels.value = data;
  } catch (err) {
    console.error("Error fetching panel data:", err);
    error.value = "Error fetching panel data";
  }
};
</script>

<template>
  <div class="flex w-full p-10 gap-3 h-screen bg-gray-100">
    <div
      class="w-1/3 bg-white border border-gray-300 rounded-lg p-5"
      :class="{ 'w-5': isCollapsed }"
    >
      <div class="w-full flex justify-between items-center">
        <span class="text-xl font-bold" :class="{ hidden: isCollapsed }"
          >Please Pick Menu</span
        >
        <button
          @click="toggleCollapse"
          class="font-bold bg-slate-300 p-2 rounded-2xl"
        >
          {{ isCollapsed ? ">" : "<" }}
        </button>
        <button
          class="font-bold bg-slate-300 p-2 rounded-2xl cursor-pointer"
          :class="{ hidden: isCollapsed }"
          @click="openModal"
        >
          +
        </button>
      </div>

      <div v-show="!isCollapsed" class="flex flex-col gap-3 mt-5">
        <div
          class="border border-gray-400 w-full flex flex-col rounded-md p-3 cursor-pointer"
          v-for="panel in panels"
          :key="panel.id"
          @click="handlePanelClick(panel.id)"
        >
          <span>{{ panel.name }}</span>
          <span class="text-xs text-gray-400">{{ panel.description }}</span>
        </div>
      </div>
    </div>

    <div class="w-full bg-white border border-gray-300 rounded-lg p-5">
      <div v-if="isLoading" class="text-center text-gray-400">
        Loading children...
      </div>

      <div v-if="error" class="text-center text-red-500">
        {{ error }}
      </div>

      <div
        v-if="!isLoading && !panelChildren.length"
        class="text-center text-2xl text-gray-500 h-full flex items-center justify-center"
      >
        No children found for this panel.
      </div>

      <div v-if="panelChildren.length" class="flex flex-col gap-3">
        <div
          class="border border-gray-400 w-full flex flex-col rounded-md p-3"
          v-for="child in panelChildren"
          :key="child.id"
          @click="handlePanelClick(child.id)"
        >
          <span>{{ child.name }}</span>
          <span class="text-xs text-gray-400">{{ child.description }}</span>
        </div>
      </div>
    </div>
    <modalAddData
      :isVisible="isModalVisible"
      @closeModal="closeModal"
      @dataAdded="handleGetData"
    />
  </div>
</template>
