/**
 * Utility functions for managing user profile data in browser cookies
 */

const PROFILE_COOKIE_NAME = 'priceIsLifeProfile'
const COOKIE_EXPIRY_DAYS = 90

/**
 * Save user profile to cookies
 */
export function saveProfile(profile) {
  try {
    const profileData = JSON.stringify(profile)
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS)
    
    document.cookie = `${PROFILE_COOKIE_NAME}=${encodeURIComponent(profileData)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`
    return true
  } catch (error) {
    console.warn('Failed to save profile to cookies:', error)
    return false
  }
}

/**
 * Load user profile from cookies
 */
export function loadProfile() {
  try {
    const cookies = document.cookie.split(';')
    const profileCookie = cookies.find(cookie => 
      cookie.trim().startsWith(`${PROFILE_COOKIE_NAME}=`)
    )
    
    if (!profileCookie) {
      return null
    }
    
    const profileData = decodeURIComponent(
      profileCookie.split('=')[1]
    )
    
    const profile = JSON.parse(profileData)
    
    // Validate profile structure
    if (!isValidProfile(profile)) {
      console.warn('Invalid profile data in cookies, clearing...')
      clearProfile()
      return null
    }
    
    return profile
  } catch (error) {
    console.warn('Failed to load profile from cookies:', error)
    clearProfile() // Clear corrupted data
    return null
  }
}

/**
 * Clear profile from cookies
 */
export function clearProfile() {
  try {
    document.cookie = `${PROFILE_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    return true
  } catch (error) {
    console.warn('Failed to clear profile cookies:', error)
    return false
  }
}

/**
 * Validate profile object structure
 */
function isValidProfile(profile) {
  if (!profile || typeof profile !== 'object') {
    return false
  }
  
  const requiredFields = ['birthDate', 'monthlySalary', 'sleepHours', 'workingHours', 'lifeExpectancy']
  
  return requiredFields.every(field => {
    const value = profile[field]
    
    switch (field) {
      case 'birthDate':
        return value && (value instanceof Date || typeof value === 'string')
      case 'monthlySalary':
        return typeof value === 'number' && value >= 500 && value <= 50000
      case 'sleepHours':
        return typeof value === 'number' && value >= 4 && value <= 12
      case 'workingHours':
        return typeof value === 'number' && value >= 0 && value <= 80
      case 'lifeExpectancy':
        return typeof value === 'number' && value >= 60 && value <= 100
      default:
        return true
    }
  })
}

/**
 * Get default profile values
 */
export function getDefaultProfile() {
  return {
    birthDate: '1990-01-01',
    monthlySalary: 3000,
    sleepHours: 8,
    workingHours: 40,
    lifeExpectancy: 81
  }
}

/**
 * Merge loaded profile with defaults for missing fields
 */
export function mergeWithDefaults(profile) {
  const defaults = getDefaultProfile()
  return {
    ...defaults,
    ...profile
  }
}
