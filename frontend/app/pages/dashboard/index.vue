<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-indigo-600">🚗 DrvPlan</h1>
          </div>
          <div class="flex items-center space-x-4">
            <div v-if="loading" class="flex items-center space-x-2">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
              <span class="text-sm text-gray-500">Loading...</span>
            </div>
            <div v-else-if="user" class="flex items-center space-x-3">
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ user.firstName }} {{ user.lastName }}</p>
                <p class="text-xs text-gray-500">{{ user.role }}</p>
              </div>
              <button
                @click="handleLogout"
                class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-64">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p class="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>

        <!-- Dashboard Content -->
        <div v-else-if="user" class="space-y-6">
          <!-- Welcome Section -->
          <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
              <h2 class="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {{ user.firstName }}! 👋
              </h2>
              <p class="text-gray-600">
                {{ getGreetingMessage() }}
              </p>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- User Info Card -->
            <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-indigo-500">
              <div class="flex items-center mb-4">
                <div class="flex-shrink-0 bg-indigo-100 rounded-lg p-3">
                  <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 class="ml-3 text-lg font-semibold text-gray-900">Profile</h3>
              </div>
              <div class="space-y-3">
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                  <p class="text-sm font-medium text-gray-900">{{ user.email }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                  <p class="text-sm font-medium text-gray-900">{{ user.phone || 'Not provided' }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">Role</p>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {{ user.role }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Upcoming Lessons Card -->
            <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
              <div class="flex items-center mb-4">
                <div class="flex-shrink-0 bg-green-100 rounded-lg p-3">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 class="ml-3 text-lg font-semibold text-gray-900">Upcoming</h3>
              </div>
              <div>
                <p class="text-4xl font-bold text-green-600 mb-2">{{ stats.upcomingLessons }}</p>
                <p class="text-sm text-gray-600">lessons scheduled</p>
              </div>
            </div>

            <!-- Completed Lessons Card -->
            <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
              <div class="flex items-center mb-4">
                <div class="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                  <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="ml-3 text-lg font-semibold text-gray-900">Completed</h3>
              </div>
              <div>
                <p class="text-4xl font-bold text-yellow-600 mb-2">{{ stats.completedLessons }}</p>
                <p class="text-sm text-gray-600">lessons finished</p>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button class="flex items-center justify-center px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition font-medium">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Book Lesson
              </button>
              <button class="flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition font-medium">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                View Calendar
              </button>
              <button class="flex items-center justify-center px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition font-medium">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                My Progress
              </button>
              <button class="flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition font-medium">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </button>
            </div>
          </div>

          <!-- Member Since -->
          <div class="text-center text-sm text-gray-500">
            Member since {{ formatDate(user.createdAt) }}
          </div>
        </div>

        <!-- Error State -->
        <div v-else class="flex justify-center items-center h-64">
          <div class="text-center">
            <p class="text-red-600 mb-4">Failed to load user data</p>
            <button
              @click="handleLogout"
              class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Return to Login
            </button>
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

const { user, logout, fetchUser } = useAuth();
const loading = ref(true);

const stats = ref({
  upcomingLessons: 0,
  completedLessons: 0,
});

const handleLogout = () => {
  logout();
};

const getGreetingMessage = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning! Ready to start your day?";
  if (hour < 18) return "Good afternoon! How's your day going?";
  return "Good evening! Time to review your progress!";
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

onMounted(async () => {
  if (!user.value) {
    await fetchUser();
  }
  loading.value = false;
});
</script>