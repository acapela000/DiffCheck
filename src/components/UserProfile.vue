<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">TinyURL</h1>
        <p class="text-gray-600 mt-2">Manage your profile</p>
      </div>
      
      <!-- Profile Form -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-6">
          <!-- Profile Picture -->
          <div class="flex flex-col items-center mb-6">
            <div class="relative group">
              <div class="h-24 w-24 rounded-full overflow-hidden bg-gray-200">
                <img
                  v-if="profileImage"
                  :src="profileImage"
                  alt="Profile"
                  class="h-full w-full object-cover"
                />
                <div v-else class="h-full w-full flex items-center justify-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div class="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" @click="triggerFileInput">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              class="hidden"
              @change="handleImageUpload"
            />
            <p class="mt-2 text-sm text-gray-600">Click to upload a profile picture</p>
          </div>
          
          <form @submit.prevent="saveProfile" class="space-y-4">
            <!-- Name Fields -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  id="firstName"
                  v-model="firstName"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  id="lastName"
                  v-model="lastName"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <!-- Email Field -->
            <div>
              <label for="profileEmail" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="profileEmail"
                v-model="email"
                type="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <!-- Username Field -->
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div class="flex rounded-lg shadow-sm">
                <span class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  tiny.url/
                </span>
                <input
                  id="username"
                  v-model="username"
                  type="text"
                  class="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <!-- Bio Field -->
            <div>
              <label for="bio" class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                id="bio"
                v-model="bio"
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <!-- Website Field -->
            <div>
              <label for="website" class="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                id="website"
                v-model="website"
                type="url"
                placeholder="https://example.com"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <!-- Notification Preferences -->
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">Notification Preferences</h3>
              <div class="space-y-2">
                <div class="flex items-center">
                  <input
                    id="emailNotifications"
                    v-model="emailNotifications"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label for="emailNotifications" class="ml-2 block text-sm text-gray-700">
                    Email notifications
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="marketingEmails"
                    v-model="marketingEmails"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label for="marketingEmails" class="ml-2 block text-sm text-gray-700">
                    Marketing emails
                  </label>
                </div>
              </div>
            </div>
            
            <!-- Submit Buttons -->
            <div class="flex space-x-3">
              <button
                type="submit"
                :disabled="isLoading"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
              >
                <span v-if="isLoading" class="mr-2">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                Save Changes
              </button>
              <button
                type="button"
                @click="goBack"
                class="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Success Message -->
      <div v-if="showSuccess" class="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative">
        <span class="block sm:inline">Profile updated successfully!</span>
        <button @click="showSuccess = false" class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Footer -->
      <div class="mt-6 text-center text-sm text-gray-600">
        <p>© 2024 TinyURL Clone. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// State
const firstName = ref('John')
const lastName = ref('Doe')
const email = ref('john.doe@example.com')
const username = ref('johndoe')
const bio = ref('I love shortening URLs and making the web more accessible!')
const website = ref('https://example.com')
const emailNotifications = ref(true)
const marketingEmails = ref(false)
const profileImage = ref(null)
const fileInput = ref(null)
const isLoading = ref(false)
const showSuccess = ref(false)

// Methods
const triggerFileInput = () => {
  fileInput.value.click()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  if (!file.type.match('image.*')) {
    alert('Please select an image file')
    return
  }
  
  const reader = new FileReader()
  reader.onload = (e) => {
    profileImage.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const saveProfile = async () => {
  isLoading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Show success message
    showSuccess.value = true
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
    
  } catch (error) {
    console.error('Error saving profile:', error)
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  // In a real app, you would use Vue Router to navigate back
  alert('Navigate back to previous page')
}
</script>

