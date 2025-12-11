<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome to DrvPlan</h1>
      <p class="text-lg text-gray-600 mb-8">Your driving school management platform</p>
      <div class="space-x-4">
        <NuxtLink to="/login" class="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
          Login
        </NuxtLink>
        <NuxtLink to="/register" class="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
          Register
        </NuxtLink>
      </div>
    </div>
  </div>
</template>