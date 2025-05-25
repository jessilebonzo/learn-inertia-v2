<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, router, useForm, usePoll } from '@inertiajs/vue3';

defineProps({
    posts: {
        type: Object,
        required: true,
    },
    can: {
        type: Object,
    },
});

// usePoll(3000);

const form = useForm('StorePost', {
    body: "",
});

const createPost = () => {
    form.post(route("posts.store"), {
        onSuccess: () => {
            form.reset();
            // toast.success('Post created successfully');
        },
    });
};

const refreshPosts = () => {
    router.get(route("posts.index"),
    {},
    {
        only: ["posts"],
        preserveScroll: true,
        preserveState: true,
    });
};
</script>

<template>
    <Head title="Posts">
        <meta name="description" content="Posts Index" />
    </Head>

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Comments
            </h2>
        </template>

        <div class="py-12">
            <!-- {{ page.props.greeting }} -->
            <div class="mx-auto max-w-3xl sm:px-6 lg:px-8 space-y-3">
                <form 
                v-if="can.post_create"
                @submit.prevent="createPost" 
                class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <label for="body" class="sr-only">Body</label>
                    <textarea
                        v-model="form.body"
                        v-on:focus="form.clearErrors('body')"
                        name="body"
                        id="body"
                        cols="30"
                        rows="5"
                        class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                        placeholder="What's on your mind?">
                    </textarea>
                     <p v-if="form.errors.body" class="text-sm text-red-500">{{ form.errors.body }}</p>   
                    <button
                    :disabled="form.processing"
                        type="submit"
                        class="mt-2 bg-gray-700 px-4 py-2 rounded-md font-medium text-white"
                        :class="{ 'opacity-50': form.processing }"
                    >
                        Post
                    </button> 
                </form>
                <!-- {{ now }} -->
                <div class="py-3 flex justify-center">
                <Link
                    replace
                    :only="['posts']" 
                    :href="route('posts.index')"
                    class="text-sm text-indigo-700"
                >
                    Refresh posts
                </Link>
                </div>
                <div v-for="post in posts.data" :key="post.id">
                    <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div class="p-4 text-gray-600">
                            <div class="font-semibold">
                                {{ post.user.name }}
                            </div>
                            <p class="mt-1">{{ post.body }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </AuthenticatedLayout>
</template>
