<template>
<Suspense>
        <template #default>
            <section
                class="bg-slate-50 dark:bg-backgrond dark:text-white font-semibold h-screen w-screen overflow-x-hidden pb-28">
                <div class="flex flex-col h-auto w-60 m-4 shadow-md rounded-xl p-2">
                    <label for="username">Ingrese el nombre de usuario</label>
                    <input type="text">
                    <label for="password">Ingrese la contraseña</label>
                    <input type="password">
                    <button type="submit">Iniciar sesión</button>
                </div>
            </section>
        </template>
        <template #fallback>
            <div>Loading...</div>
        </template>
    </Suspense>
</template>

<script setup>

</script>

<style scoped>

</style>
