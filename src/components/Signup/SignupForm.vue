<template>
  <div class="flex items-center justify-center w-full max-w-2xl bg-gray-900 p-4">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
      <form @submit.prevent="handleSubmit" class="grid gap-4">
        <!-- Name and Surname -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <div class="input-wrapper">
              <div class="icon-container">
                <img :src="identityIcon" alt="identity" class="icon" />
              </div>
              <input v-model="form.name" type="text" placeholder="Your name" class="input" />
            </div>
            <transition name="fade">
              <p v-if="errors.name" class="error-text">{{ errors.name }}</p>
            </transition>
          </div>

          <div class="flex flex-col">
            <div class="input-wrapper">
              <div class="icon-container">
                <img :src="identityIcon" alt="identity" class="icon" />
              </div>
              <input v-model="form.surname" type="text" placeholder="Your surname" class="input" />
            </div>
            <transition name="fade">
              <p v-if="errors.surname" class="error-text">{{ errors.surname }}</p>
            </transition>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Username -->
          <div class="flex flex-col">
            <div class="input-wrapper">
              <div class="icon-container">
                <img :src="peopleIcon" alt="identity" class="icon" />
              </div>
              <input
                v-model="form.username"
                type="text"
                placeholder="Your username"
                class="input"
              />
            </div>
            <transition name="fade">
              <p v-if="errors.username" class="error-text">{{ errors.username }}</p>
            </transition>
          </div>

          <!-- Email -->
          <div class="flex flex-col">
            <div class="input-wrapper">
              <div class="icon-container">
                <img :src="emailIcon" alt="Email Icon" class="icon" />
              </div>
              <input v-model="form.email" type="email" placeholder="E-mail" class="input" />
            </div>
            <transition name="fade">
              <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
            </transition>
          </div>
        </div>

        <!-- Passwords -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <div class="relative input-wrapper">
              <div class="icon-container">
                <img :src="lockIcon" alt="Lock Icon" class="icon" />
              </div>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                placeholder="Your password"
                class="input"
              />
              <img
                :src="showPassword ? eyeOnIcon : eyeOffIcon"
                @click="togglePassword"
                alt="Eye Icon"
                class="icon"
              />
            </div>
            <transition name="fade">
              <p v-if="errors.password" class="error-text">{{ errors.password }}</p>
            </transition>
          </div>

          <div class="relative input-wrapper">
            <div class="icon-container">
              <img :src="lockIcon" alt="Lock Icon" class="icon" />
            </div>
            <input
              :type="showReenteredPassword ? 'text' : 'password'"
              v-model="form.confirmPassword"
              placeholder="Reenter password"
              class="input"
            />
            <img
              :src="showReenteredPassword ? eyeOnIcon : eyeOffIcon"
              @click="toggleReenteredPassword"
              alt="Eye Icon"
              class="eye-icon cursor-pointer"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn">GO TO NEXT STEP</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SignupFormData } from '@/types/SignupForm.types'
import identityIcon from '@/assets/icons/identity.svg'
import peopleIcon from '@/assets/icons/people.svg'
import emailIcon from '@/assets/icons/mail.svg'
import lockIcon from '@/assets/icons/lock.svg'
import eyeOnIcon from '@/assets/icons/eye-on.svg'
import eyeOffIcon from '@/assets/icons/eye-off.svg'

// Form state
const form = ref<SignupFormData>({
  name: '',
  surname: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  // name: 'Test',
  // surname: 'User',
  // username: 'TestUser',
  // email: 'example@mail.com',
  // password: 'Password',
  // confirmPassword: 'Password',
})

// Validation errors
const errors = ref<Partial<Record<keyof SignupFormData, string>>>({})

// Password visibility toggle
const showPassword = ref(false)
const showReenteredPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}
const toggleReenteredPassword = () => {
  showReenteredPassword.value = !showReenteredPassword.value
}

// Form validation function
const validateForm = () => {
  errors.value = {}

  // Name, Surname, Username, Email, Password
  if (!form.value.name) errors.value.name = 'Name is required!'
  if (!form.value.surname) errors.value.surname = 'Surname is required!'
  if (!form.value.username) errors.value.username = 'Username is required!'
  if (!form.value.email) {
    errors.value.email = 'Email is required!'
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Invalid email format!'
  }
  if (!form.value.password) {
    errors.value.password = 'Password is required!'
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters long!'
  }
  if (form.value.confirmPassword !== form.value.password) {
    errors.value.password = 'Passwords do not match!'
  }

  return Object.keys(errors.value).length === 0
}

// Handle form submission
const handleSubmit = () => {
  if (validateForm()) {
    alert('Form submitted successfully!')
  }
}
</script>

<style scoped>
.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 40px;
  padding: 10px;
  background: white;
  height: min-content;
}
.input {
  width: 100%;
  border: none;
  outline: none;
  padding-left: 10px;
  color: black;
}
.icon-container {
  border-right: 2px solid #ccc;
  padding-right: 5px;
  height: 100%;
  margin: auto 10px auto 0;
  display: flex;
  align-items: center;
}
.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.btn {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  transition: background 0.3s;
}
.btn:hover {
  background-color: #45a049;
}
.eye-icon {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.custom-checkbox {
  width: 20px;
  height: 20px;
  accent-color: #4caf50;
}
.error-field {
  min-height: 23px;
}
.error-text {
  color: red;
  font-size: 14px;
}

/* Transition classes for fade */
.fade-enter-active,
.fade-leave-active {
  min-height: 23px;
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
