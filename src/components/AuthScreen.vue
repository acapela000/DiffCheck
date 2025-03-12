<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">TinyURL</h1>
        <p class="text-gray-600 mt-2">{{ isLogin ? 'Sign in to your account' : 'Create a new account' }}</p>
      </div>
      
      <!-- Auth Form -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-6">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="you@example.com"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <!-- Password Field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                placeholder="••••••••"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <!-- Remember Me & Forgot Password -->
            <div v-if="isLogin" class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="rememberMe"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <div class="text-sm">
                <a href="#" class="font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
              </div>
            </div>
            
            <!-- Confirm Password (Register only) -->
            <div v-if="!isLogin">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                placeholder="••••••••"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <p v-if="passwordError" class="mt-1 text-sm text-red-600">{{ passwordError }}</p>
            </div>
            
            <!-- Submit Button -->
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
              {{ isLogin ? 'Sign in' : 'Create account' }}
            </button>
          </form>
          
          <!-- Social Login Options -->
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div class="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
              </button>
              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Toggle Login/Register -->
          <div class="mt-6 text-center">
            <button
              @click="toggleAuthMode"
              class="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              {{ isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in' }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- User is logged in view -->
      <div v-if="isLoggedIn" class="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-6 text-center">
          <div class="flex items-center justify-center mb-4">
            <div class="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold">
              {{ userInitials }}
            </div>
          </div>
          <p class="text-lg font-medium text-gray-900">{{ user.email }}</p>
          <p class="text-sm text-gray-600 mb-4">Logged in successfully</p>
          <div class="flex space-x-3 justify-center">
            <button
              @click="goToProfile"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
            >
              Edit Profile
            </button>
            <button
              @click="logout"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
            >
              Sign out
            </button>
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
import { ref, computed } from 'vue'

// State
const isLogin = ref(true)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const isLoggedIn = ref(false)
const user = ref(null)
const passwordError = ref('')

// Computed
const userInitials = computed(() => {
  if (!user.value || !user.value.email) return ''
  return user.value.email.charAt(0).toUpperCase()
})

// Methods
const toggleAuthMode = () => {
  isLogin.value = !isLogin.value
  passwordError.value = ''
}

const handleSubmit = async () => {
  if (!isLogin.value && password.value !== confirmPassword.value) {
    passwordError.value = 'Passwords do not match'
    return
  }
  
  isLoading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Set user data
    user.value = {
      email: email.value,
      id: Math.random().toString(36).substring(2, 15)
    }
    
    isLoggedIn.value = true
    
    // Clear form
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    
  } catch (error) {
    console.error('Authentication error:', error)
  } finally {
    isLoading.value = false
  }
}

const logout = () => {
  isLoggedIn.value = false
  user.value = null
}

const goToProfile = () => {
  // In a real app, you would use Vue Router to navigate
  alert('Navigate to profile page')
}
</script>

