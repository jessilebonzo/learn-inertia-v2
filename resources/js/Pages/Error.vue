<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { Head } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
  status: {
    type: Number,
    required: true,
  },
});

const title = computed(() => {
  return (
    {
      404: "Page Not Found",
      403: "403 | Forbidden",
    }[props.status] || "An Error Occurred."
  ); 
});

const description = computed(() => {
  return ({
      404: "The page you are looking for does not exist.",
      403: "You are not authorized to access this page.",
    }[props.status] || "An error occurred."
  ); 
});
</script>

<template>
  <Head :title="title" />
    <GuestLayout>
    <div class="mb-4 font-medium text-sm text-green-600">
        {{ description }}
    </div>
    </GuestLayout>
</template>