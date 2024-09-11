<template>
    <Suspense>
        <template #default>
            <section class="bg-slate-50 dark:bg-backgrond dark:text-white font-semibold h-screen w-screen overflow-x-hidden pb-28">
                <div class="flex flex-col h-auto w-60 m-4 shadow-md rounded-xl p-2">
                    <label for="username">Ingrese el nombre de usuario</label>
                    <input v-model="nick" type="text" id="username" required>
                    <label for="password">Ingrese la contraseña</label>
                    <input v-model="password" type="password" id="password" required>
                    <button @click="handleSubmit" type="button">Iniciar sesión</button>
                </div>
            </section>
        </template>
        <template #fallback>
            <div>Loading...</div>
        </template>
    </Suspense>
</template>

<script setup>
import { ref } from 'vue';

const nick = ref('');
const password = ref('');

const handleSubmit = async () => {
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nick: nick.value,
                password: password.value
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Login successful:', data);
        // Maneja la respuesta del servidor aquí
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // Maneja errores aquí
    }
};
</script>

<style scoped>
/* Añade tus estilos aquí si es necesario */
</style>
