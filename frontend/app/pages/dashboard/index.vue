<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">DrvPlan</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-700">{{ user?.firstName }} {{ user?.lastName }}</span>
            <button
              @click="handleLogout"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 bg-white border-b border-gray-200">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              Welcome, {{ user?.firstName }} {{ user?.lastName }}!
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <!-- User Info Card -->
              <div class="bg-indigo-50 p-6 rounded-lg">
                <h3 class="text-lg font-semibold text-indigo-900 mb-2">Profile Information</h3>
                <div class="space-y-2 text-sm">
                  <p class="text-indigo-700"><span class="font-medium">Email:</span> {{ user?.email }}</p>
                  <p class="text-indigo-700"><span class="font-medium">Phone:</span> {{ user?.phone || 'Not provided' }}</p>
                  <p class="text-indigo-700"><span class="font-medium">Role:</span> {{ user?.role }}</p>
                </div>
              </div>

              <!-- Stats Card 1 -->
              <div class="bg-green-50 p-6 rounded-lg">
                <h3 class="text-lg font-semibold text-green-900 mb-2">Upcoming Lessons</h3>
                <p class="text-3xl font-bold text-green-600">0</p>
                <p class="text-sm text-green-700 mt-2">No lessons scheduled</p>
              </div>

              <!-- Stats Card 2 -->
              <div class="bg-yellow-50 p-6 rounded-lg">
                <h3 class="text-lg font-semibold text-yellow-900 mb-2">Completed Lessons</h3>
                <p class="text-3xl font-bold text-yellow-600">0</p>
                <p class="text-sm text-yellow-700 mt-2">Start booking lessons!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

const { user, logout } = useAuth();

const handleLogout = () => {
  logout();
};
</script>