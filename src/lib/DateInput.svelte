<script>
  export let value = ''
  export let label = 'Birth Date'
  export let required = false
  
  // Calculate age from birth date
  export function calculateAge(birthDate) {
    if (!birthDate) return 0
    
    const today = new Date()
    const birth = new Date(birthDate)
    
    if (isNaN(birth.getTime())) return 0
    
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return Math.max(0, age)
  }
  
  // Calculate precise age in days
  export function calculateAgeInDays(birthDate) {
    if (!birthDate) return 0
    
    const today = new Date()
    const birth = new Date(birthDate)
    
    if (isNaN(birth.getTime())) return 0
    
    const diffTime = today.getTime() - birth.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    return Math.max(0, diffDays)
  }
  
  // Get formatted display of current age
  $: currentAge = calculateAge(value)
  $: ageInDays = calculateAgeInDays(value)
  $: ageDisplay = value ? `${currentAge} years, ${ageInDays % 365} days` : ''
</script>

<div class="date-input-group">
  <label for="birthDate">{label}</label>
  <input 
    id="birthDate"
    type="date" 
    bind:value={value}
    {required}
    max={new Date().toISOString().split('T')[0]}
    min="1920-01-01"
    class="date-input"
  />
  {#if ageDisplay}
    <div class="age-display">
      <span class="age-text">Current age: {ageDisplay}</span>
      <span class="days-lived">({ageInDays.toLocaleString()} days lived)</span>
    </div>
  {/if}
</div>

<style>
  .date-input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  label {
    font-weight: 500;
    color: #e0e0e0;
    font-size: 0.9rem;
  }
  
  .date-input {
    padding: 0.75rem;
    border: 1px solid #444;
    border-radius: 6px;
    background: #2a2a2a;
    color: #e0e0e0;
    font-size: 1rem;
    transition: border-color 0.2s ease;
  }
  
  .date-input:focus {
    outline: none;
    border-color: #ff6b6b;
    box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.1);
  }
  
  .date-input::-webkit-calendar-picker-indicator {
    filter: invert(0.8);
    cursor: pointer;
  }
  
  .age-display {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.85rem;
    padding-left: 0.5rem;
  }
  
  .age-text {
    color: #fff;
    font-weight: 500;
  }
  
  .days-lived {
    color: #888;
    font-style: italic;
  }
  
  @media (max-width: 768px) {
    .date-input {
      padding: 0.875rem;
      font-size: 1.1rem;
    }
  }
</style>
