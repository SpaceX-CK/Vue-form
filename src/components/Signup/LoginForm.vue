<template>
  <div class="flex items-center justify-center w-full max-w-2xl bg-gray-900 p-4">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-xxl w-full">
      <form @submit.prevent="handleSubmit" class="grid gap-4">
        <!-- Identification and Telephone -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- ID Number -->
          <div>
            <div class="input-wrapper">
              <div class="icon-container">
                <img :src="identityIcon" alt="ID Icon" class="icon" />
              </div>
              <input
                v-model="form.idNumber"
                type="text"
                placeholder="Identification Number"
                class="input"
              />
            </div>

            <transition name="fade">
              <p v-if="errors.idNumber" class="error-text">{{ errors.idNumber }}</p>
            </transition>
          </div>

          <!-- Phone -->
          <div>
            <div class="input-wrapper">
              <div class="icon-container">
                <img :src="phoneIcon" alt="Phone Icon" class="icon" />
              </div>
              <span class="text-black">05</span>
              <input
                v-model.number="form.phone"
                type="number"
                placeholder="Telephone"
                class="input"
              />
            </div>
            <transition name="fade">
              <p v-if="errors.phone" class="error-text">{{ errors.phone }}</p>
            </transition>
          </div>
        </div>

        <!-- Security Question and Answer -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div class="input-wrapper">
              <div class="icon-container">
                <img :src="securityIcon" alt="Security Icon" class="icon" />
              </div>
              <input
                v-model="form.securityQuestion"
                type="text"
                placeholder="Security Question"
                class="input"
              />
            </div>
            <transition name="fade">
              <p v-if="errors.securityQuestion" class="error-text">{{ errors.securityQuestion }}</p>
            </transition>
          </div>

          <div>
            <div class="input-wrapper">
              <div class="icon-container">
                <img :src="securityTickIcon" alt="Security Tick Icon" class="icon" />
              </div>
              <input
                v-model="form.securityAnswer"
                type="text"
                placeholder="Security Answer"
                class="input"
              />
            </div>
            <transition name="fade">
              <p v-if="errors.securityAnswer" class="error-text">{{ errors.securityAnswer }}</p>
            </transition>
          </div>
        </div>

        <!-- Login Setup Menu -->
        <div class="rounded-2xl border-gray-200 border-2">
          <h3 class="bg-gray-200 text-center font-bold rounded-t-xl text-black py-2">
            LOGIN SETUP MENU
          </h3>
          <div class="flex flex-col flex-md-row items-center justify-around my-3 text-black">
            <label class="flex items-center gap-2">
              <input type="radio" v-model="form.loginOption" value="email" />
              Activate login via email
            </label>
            <label class="flex items-center gap-2 border-none md:border-l-2 border-gray-200 pl-2">
              <input type="radio" v-model="form.loginOption" value="sms" />
              Activate login via SMS
            </label>
            <label class="flex items-center gap-2 border-none md:border-l-2 border-gray-200 pl-2">
              <input type="radio" v-model="form.loginOption" value="disable" />
              Disable all
            </label>
          </div>
        </div>

        <!-- Terms and Conditions with SVG -->
        <div class="flex justify-center items-center gap-2 cursor-pointer" @click="toggleAgreement">
          <img
            :src="form.acceptTerms ? hexCheckIcon : hexIcon"
            alt="Agreement Checkbox"
            class="w-3 h-3"
          />
          <span class="text-xs font-semibold text-black">
            I HAVE READ AND ACCEPT THE GENERAL TERMS AND CONDITIONS
          </span>
        </div>
        <transition name="fade">
          <p v-if="errors.acceptTerms" class="error-text text-center">{{ errors.acceptTerms }}</p>
        </transition>
        <!-- Submit Button -->
        <button type="submit" class="btn flex justify-center items-center gap-2">
          <img :src="celebrationIcon" alt="Celebration Icon" class="w-5 h-5" />
          REGISTER NOW
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { LoginFormData } from '@/types/LoginForm.types'

// Icons
import identityIcon from '@/assets/icons/identity.svg'
import phoneIcon from '@/assets/icons/phone.svg'
import securityIcon from '@/assets/icons/shield.svg'
import securityTickIcon from '@/assets/icons/shield-tick.svg'
import hexIcon from '@/assets/icons/hexagon.svg'
import hexCheckIcon from '@/assets/icons/hexagon-check.svg'
import celebrationIcon from '@/assets/icons/celebration.svg'

// Reactive form data
const form = ref<LoginFormData>({
  idNumber: '',
  phone: null,
  securityQuestion: '',
  securityAnswer: '',
  loginOption: 'email',
  acceptTerms: false,
})

// Errors state
const errors = ref<Partial<Record<keyof LoginFormData, string>>>({})

// Toggle the terms & conditions checkbox
const toggleAgreement = () => {
  form.value.acceptTerms = !form.value.acceptTerms
}

// Validation function
const validateForm = () => {
  errors.value = {}

  // ID Number, phone, security question, security answer, and terms
  if (!form.value.idNumber) {
    errors.value.idNumber = 'Identification Number is required!'
  }

  if (!form.value.phone) {
    errors.value.phone = 'Telephone is required!'
  }

  if (!form.value.securityQuestion) {
    errors.value.securityQuestion = 'Security Question is required!'
  }

  if (!form.value.securityAnswer) {
    errors.value.securityAnswer = 'Security Answer is required!'
  }

  if (!form.value.acceptTerms) {
    errors.value.acceptTerms = 'You must accept the terms and conditions!'
  }

  // Return true if no errors
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
/* Hide default spinner arrows for number inputs */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield; /* Firefox */
}
/* Error Text Style */
.error-text {
  color: red;
  font-size: 0.875rem; /* 14px */
  margin-top: 4px;
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

/* Remove the default radio styling */
input[type='radio'] {
  -webkit-appearance: none; /* For Chrome / Safari */
  appearance: none; /* For modern browsers */
  width: 16px; /* Adjust to your icon size */
  height: 16px;
  background: url('@/assets/icons/circle.svg') no-repeat center/contain;
  cursor: pointer;
  margin-right: 6px; /* Spacing before label text, if desired */
  border: none; /* No border needed */
  outline: none;
  margin: auto;
  align-items: center;
}

/* When the radio is checked, swap to the checked SVG */
input[type='radio']:checked {
  background: url('@/assets/icons/circle-dot.svg') no-repeat center/contain;
}

/* (Optional) Add a focus style if desired */
input[type='radio']:focus {
  outline-offset: 2px;
}
</style>
