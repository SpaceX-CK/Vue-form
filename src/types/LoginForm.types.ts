export interface LoginFormData {
  idNumber: string
  phone: number | null
  securityQuestion: string
  securityAnswer: string
  loginOption: 'email' | 'sms' | 'disable'
  acceptTerms: boolean
}
