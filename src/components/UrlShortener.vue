<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">TinyURL</h1>
        <p class="text-gray-600 mt-2">Make your long URLs short and easy to share</p>
      </div>
      
      <!-- URL Input Form -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-6">
          <form @submit.prevent="shortenUrl" class="space-y-4">
            <div>
              <label for="longUrl" class="block text-sm font-medium text-gray-700 mb-1">Enter your long URL</label>
              <input
                id="longUrl"
                v-model="longUrl"
                type="url"
                placeholder="https://example.com/very/long/url/that/needs/shortening"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
            >
              <span v-if="isLoading" class="mr-2">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ isLoading ? 'Shortening...' : 'Shorten URL' }}
            </button>
          </form>
          
          <!-- Result Section -->
          <div v-if="shortUrl" class="mt-6 pt-6 border-t border-gray-200">
            <h2 class="text-sm font-medium text-gray-700 mb-2">Your shortened URL:</h2>
            <div class="flex items-center">
              <input
                type="text"
                readonly
                :value="shortUrl"
                class="flex-grow px-4 py-3 bg-gray-50 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                @click="copyToClipboard"
                class="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-r-lg transition duration-200 flex items-center"
              >
                <span v-if="copied">Copied!</span>
                <span v-else>Copy</span>
              </button>
            </div>
            
            <!-- QR Code Placeholder -->
            <div v-if="showQrCode" class="mt-4 flex justify-center">
              <div class="bg-white p-4 rounded-lg border border-gray-300">
                <div class="w-32 h-32 bg-gray-200 flex items-center justify-center">
                  <span class="text-gray-500 text-xs text-center">QR Code would appear here</span>
                </div>
              </div>
            </div>
            
            <!-- Additional Options -->
            <div class="mt-4 flex justify-between">
              <button
                @click="showQrCode = !showQrCode"
                class="text-sm text-blue-600 hover:text-blue-800"
              >
                {{ showQrCode ? 'Hide QR Code' : 'Show QR Code' }}
              </button>
              <button
                @click="resetForm"
                class="text-sm text-gray-600 hover:text-gray-800"
              >
                Create another
              </button>
            </div>
          </div>
        </div>
        
        <!-- Stats Section -->
        <div class="bg-gray-50 px-6 py-4 flex justify-between">
          <div class="text-center">
            <p class="text-2xl font-bold text-gray-900">{{ stats.urlsShortened }}</p>
            <p class="text-sm text-gray-600">URLs shortened</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-gray-900">{{ stats.clicks }}</p>
            <p class="text-sm text-gray-600">Total clicks</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-gray-900">{{ stats.activeUsers }}</p>
            <p class="text-sm text-gray-600">Active users</p>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="mt-6 text-center text-sm text-gray-600">
        <p>© 2024 TinyURL Clone. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// State
const longUrl = ref('')
const shortUrl = ref('')
const isLoading = ref(false)
const copied = ref(false)
const showQrCode = ref(false)
const stats = reactive({
  urlsShortened: 12583,
  clicks: 45729,
  activeUsers: 3241
})

// Methods
const shortenUrl = async () => {
  if (!longUrl.value) return
  
  isLoading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate a random short code
    const randomCode = Math.random().toString(36).substring(2, 8)
    shortUrl.value = `https://tiny.url/${randomCode}`
    
    // Update stats
    stats.urlsShortened++
  } catch (error) {
    console.error('Error shortening URL:', error)
  } finally {
    isLoading.value = false
  }
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(shortUrl.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

const resetForm = () => {
  longUrl.value = ''
  shortUrl.value = ''
  showQrCode.value = false
}
</script>

