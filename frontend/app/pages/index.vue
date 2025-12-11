<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-4xl font-bold">Welcome to DrvPlan</h1>
      <div class="mt-8 space-x-4">
        <NuxtLink to="/login" class="px-4 py-2 bg-indigo-600 text-white rounded-md">
          Login
        </NuxtLink>
        <NuxtLink to="/register" class="px-4 py-2 bg-green-600 text-white rounded-md">
          Register
        </NuxtLink>
      </div>
    </div>
  </div>
</template>