<template>
    <Suspense>
        <template #default>
            <section
                class="bg-slate-50 dark:bg-backgrond dark:text-white font-semibold h-screen w-screen overflow-x-hidden pb-28">
                <nav class=" h-20 w-full px-8 py-2 flex flex-grow ">
                    <ul>
                        <li>
                            <router-link to="Login" class=""
                                :class="{ active: $route.path === '/login' }">
                                <span :class="{ active: $route.path === '/login' }">login</span>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </section>
        </template>
        <template #fallback>
            <div>Loading...</div>
        </template>
    </Suspense>
</template>

<script setup>
import { initFlowbite } from 'flowbite'

const goToLogin = () => {

}

</script>

<style scoped></style>
