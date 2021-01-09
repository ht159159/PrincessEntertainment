import Vue from "vue";
import alert from "@/components/modalbox/Alert.vue";
import HeaderCmp from "@/components/HeaderCmp.vue";
import Picker from "@/components/picker/PickerCmp.vue";
import pagination from "@/components/Pagination.vue";
Vue.component("modal-alert", resolve => {
  resolve(alert);
});
Vue.component("picker", resolve => {
  resolve(Picker);
});

Vue.component("header-cmp", HeaderCmp);

Vue.component("Pagination", resolve => {
  resolve(pagination);
});
