<script>

import TitleEditor from "@/components/admin/qilleditor/TitleEditor.vue";

export default {
  name: 'DashboardView',
    components: {TitleEditor},
    methods:{
     handleChangeName(name){
            console.log(name)
        }
    }
}
</script>
<template>
 <div class="p-3 bg-white">
  <form>
  <TitleEditor :title="'Product Name'" @changeValue="handleChangeName" :placeholder="'Typing'" required></TitleEditor>
   <button type="submit">
dsadsa
   </button>
  </form>
 </div>
</template>
