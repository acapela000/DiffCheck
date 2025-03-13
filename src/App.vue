<template>
  <div>
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-blue-600">TinyURL</h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <button 
                @click="currentView = 'urlShortener'"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="{ 'border-blue-500 text-gray-900': currentView === 'urlShortener' }"
              >
                URL Shortener
              </button>
              <button 
                @click="currentView = 'auth'"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="{ 'border-blue-500 text-gray-900': currentView === 'auth' }"
              >
                Login / Register
              </button>
              <button 
                @click="currentView = 'profile'"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="{ 'border-blue-500 text-gray-900': currentView === 'profile' }"
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <component :is="currentComponent" />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, markRaw } from 'vue'
import UrlShortener from './UrlShortener.vue'
import AuthScreen from './AuthScreen.vue'
import UserProfile from './UserProfile.vue'

// State
const currentView = ref('urlShortener')

// Computed
const currentComponent = computed(() => {
  switch (currentView.value) {
    case 'urlShortener':
      return markRaw(UrlShortener)
    case 'auth':
      return markRaw(AuthScreen)
    case 'profile':
      return markRaw(UserProfile)
    default:
      return markRaw(UrlShortener)
  }
})
</script>