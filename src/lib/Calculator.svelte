<script>
  import LifeProgress from './LifeProgress.svelte'
  import PurchaseImpact from './PurchaseImpact.svelte'
  import DateInput from './DateInput.svelte'
  import LifeExpectancySlider from './LifeExpectancySlider.svelte'
  import { clearProfile, getDefaultProfile } from './ProfileStorage.js'
  
  export let userProfile
  
  let purchaseAmount = ''
  let isRecurring = false
  let recurringPeriod = 'monthly' // 'daily', 'monthly', 'yearly'
  
  let result = null
  let showResult = false
  
  // Create DateInput reference to access calculation functions
  let dateInputRef
  
  // Age calculation functions
  function calculateAge(birthDate) {
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
  
  function calculateAgeInDays(birthDate) {
    if (!birthDate) return 0
    
    const today = new Date()
    const birth = new Date(birthDate)
    
    if (isNaN(birth.getTime())) return 0
    
    const diffTime = today.getTime() - birth.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    return Math.max(0, diffDays)
  }
  
  // Reactive calculations
  $: dailyWakingHours = 24 - userProfile.sleepHours
  $: monthlyWakingHours = dailyWakingHours * 30.44
  
  // Calculate hourly earning rate based on actual working hours
  $: weeklyWorkingHours = userProfile.workingHours || 40
  $: monthlyWorkingHours = weeklyWorkingHours * 4.33 // Average weeks per month
  $: hourlyEarningRate = userProfile.monthlySalary / monthlyWorkingHours
  
  // This represents your life value: how much life you spend to earn £1
  $: hourlyLifeValue = hourlyEarningRate
  
  // Enhanced age calculations using birth date
  $: currentAge = calculateAge(userProfile.birthDate)
  $: ageInDays = calculateAgeInDays(userProfile.birthDate)
  
  // Life expectancy calculations (now customizable)
  $: lifeExpectancy = userProfile.lifeExpectancy || 81
  $: remainingYears = Math.max(0, lifeExpectancy - currentAge)
  $: remainingDays = remainingYears * 365.25
  
  // Enhanced: Calculate remaining waking days consistently
  $: remainingWakingDays = remainingYears * 365.25 * (dailyWakingHours / 24)
  
  $: lifeCompletionPercentage = Math.min(100, (currentAge / lifeExpectancy) * 100)
  
  // Reactive recalculation when profile changes
  $: if (showResult && purchaseAmount && parseFloat(purchaseAmount) > 0) {
    calculateLifeCost()
  }
  
  // Reactive message update
  $: resultMessage = result ? getResultMessage() : ''
  
  function calculateLifeCost() {
    if (!purchaseAmount || parseFloat(purchaseAmount) <= 0) return
    
    let amount = parseFloat(purchaseAmount)
    let lifetimeCost = amount
    
    // For recurring expenses, calculate lifetime cost based on remaining years
    if (isRecurring && remainingYears > 0) {
      switch (recurringPeriod) {
        case 'daily':
          lifetimeCost = amount * remainingDays
          break
        case 'monthly':
          lifetimeCost = amount * remainingYears * 12
          break
        case 'yearly':
          lifetimeCost = amount * remainingYears
          break
      }
    }
    
    const lifeCostHours = lifetimeCost / hourlyLifeValue
    const lifeCostDays = lifeCostHours / dailyWakingHours
    
    // Enhanced: Calculate in terms of waking days for consistency
    const lifeCostWakingDays = lifeCostHours / dailyWakingHours
    const lifeCostWeeks = lifeCostWakingDays / 7
    const lifeCostMonths = lifeCostWakingDays / 30.44
    
    // Calculate percentage of remaining waking life (more accurate)
    const remainingWakingLifePercentage = remainingWakingDays > 0 ? (lifeCostWakingDays / remainingWakingDays) * 100 : 0
    
    result = {
      amount,
      lifetimeCost,
      hours: lifeCostHours,
      days: lifeCostDays,
      wakingDays: lifeCostWakingDays, // New: waking days calculation
      weeks: lifeCostWeeks,
      months: lifeCostMonths,
      remainingLifePercentage: remainingWakingLifePercentage, // Now based on waking hours
      isRecurring,
      recurringPeriod
    }
    
    showResult = true
  }
  
  function formatNumber(num, decimals = 1) {
    return num.toFixed(decimals)
  }
  
  function getResultMessage() {
    if (!result) return ''
    
    const wakingDays = formatNumber(result.wakingDays, 1)
    const hours = formatNumber(result.hours, 0)
    const workHours = formatNumber(result.hours, 0) // Hours of work needed
    const percentage = formatNumber(result.remainingLifePercentage, 1)
    const remainingYearsText = remainingYears > 0 ? remainingYears : "remaining"
    
    if (result.isRecurring) {
      const lifetimeMessages = [
        `This habit will devour ${wakingDays} days of your remaining life`,
        `You'll sacrifice ${workHours} hours of your precious existence for this subscription`,
        `This addiction steals ${percentage}% of what's left of your life`,
        `${wakingDays} fewer days to live, all for this recurring expense`,
        `Your remaining ${remainingYears} years just got ${percentage}% shorter for this habit`
      ]
      return lifetimeMessages[Math.floor(Math.random() * lifetimeMessages.length)]
    }
    
    const oneTimeMessages = [
      `This purchase will consume ${wakingDays} days of your remaining life`,
      `You're trading ${percentage}% of your time left on Earth for this`,
      `${wakingDays} fewer days to exist, just for this item`,
      `This costs ${workHours} hours of your finite existence`,
      `You'll spend ${wakingDays} days of what's left of your life earning this`
    ]
    
    return oneTimeMessages[Math.floor(Math.random() * oneTimeMessages.length)]
  }
  
  function copyToClipboard() {
    navigator.clipboard.writeText(resultMessage).then(() => {
      // Could add a toast notification here
    })
  }
  
  export function setScenario(scenario) {
    purchaseAmount = scenario.amount.toString()
    isRecurring = scenario.isRecurring
    recurringPeriod = scenario.period || 'monthly'
    calculateLifeCost()
  }
  
  // Preset salary buttons
  const salaryPresets = [2000, 3000, 4000, 5000]
  
  // Clear profile function
  function handleClearProfile() {
    if (confirm('Are you sure you want to clear your saved profile? This will reset all your information.')) {
      clearProfile()
      // Trigger reactivity by creating a new object
      userProfile = { ...getDefaultProfile() }
      showResult = false
      result = null
      purchaseAmount = ''
    }
  }
</script>

<div class="calculator">
  <!-- User Profile Form -->
  <div class="profile-section">
    <div class="profile-header">
      <h2>Your Life Profile</h2>
      <button class="clear-profile-btn" on:click={handleClearProfile} title="Clear saved profile">
        🗑️ Reset
      </button>
    </div>
    <div class="form-grid">
      <div class="form-group">
        <DateInput 
          bind:this={dateInputRef}
          bind:value={userProfile.birthDate}
          label="Birth Date"
          required
        />
      </div>
      
      <div class="form-group">
        <LifeExpectancySlider 
          bind:value={userProfile.lifeExpectancy}
          label="Life Expectancy"
        />
      </div>
      
      <div class="form-group">
        <label for="salary">Monthly Take-home (£)</label>
        <input 
          id="salary" 
          type="number" 
          bind:value={userProfile.monthlySalary}
          min="500"
          max="20000"
          step="100"
        />
        <div class="presets">
          {#each salaryPresets as preset}
            <button 
              type="button" 
              class="preset-btn"
              class:active={userProfile.monthlySalary === preset}
              on:click={() => userProfile.monthlySalary = preset}
            >
              £{preset}
            </button>
          {/each}
        </div>
      </div>
      
      <div class="form-group">
        <label for="sleep">Sleep Hours/Day</label>
        <input 
          id="sleep" 
          type="range" 
          bind:value={userProfile.sleepHours}
          min="6"
          max="10"
          step="0.5"
        />
        <span class="range-value">{userProfile.sleepHours}h</span>
      </div>
      
      <div class="form-group">
        <label for="work">Working Hours/Week</label>
        <input 
          id="work" 
          type="number" 
          bind:value={userProfile.workingHours}
          min="0"
          max="80"
          step="1"
        />
      </div>
    </div>
  </div>
  
  <!-- Life Progress Overview -->
  <LifeProgress 
    {currentAge}
    {remainingYears}
    {remainingDays}
    {remainingWakingDays}
    {lifeCompletionPercentage}
    {ageInDays}
  />
  
  <!-- Calculator Interface -->
  <div class="calculator-section">
    <h2>Calculate Life Cost</h2>
    <div class="purchase-input">
      <div class="amount-group">
        <label for="amount">Purchase Amount (£)</label>
        <input 
          id="amount"
          type="number" 
          bind:value={purchaseAmount}
          placeholder="e.g. 2500"
          min="0"
          step="0.01"
          class="amount-input"
        />
      </div>
      
      <div class="recurring-options">
        <label class="checkbox-label">
          <input type="checkbox" bind:checked={isRecurring} />
          Recurring expense
        </label>
        
        {#if isRecurring}
          <select bind:value={recurringPeriod} class="period-select">
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        {/if}
      </div>
      
      <button class="calculate-btn" on:click={calculateLifeCost}>
        Calculate Life Cost
      </button>
    </div>
  </div>
  
  <!-- Results Display -->
  {#if showResult && result}
    <div class="result-section">
      <div class="result-card">
        <h3>The Verdict</h3>
        <p class="result-message">{resultMessage}</p>
        
        <div class="result-details">
          <div class="stat">
            <span class="stat-value">{formatNumber(result.wakingDays, 1)}</span>
            <span class="stat-label">Waking Days</span>
          </div>
          <div class="stat">
            <span class="stat-value">{formatNumber(result.hours, 0)}</span>
            <span class="stat-label">Hours</span>
          </div>
          {#if result.weeks > 1}
            <div class="stat">
              <span class="stat-value">{formatNumber(result.weeks, 1)}</span>
              <span class="stat-label">Waking Weeks</span>
            </div>
          {/if}
          {#if result.wakingDays !== result.days}
            <div class="stat secondary">
              <span class="stat-value">{formatNumber(result.days, 1)}</span>
              <span class="stat-label">Total Days</span>
            </div>
          {/if}
        </div>
        
        <button class="copy-btn" on:click={copyToClipboard}>
          Copy to Share
        </button>
        
        <PurchaseImpact 
          {result}
          {remainingDays}
          {remainingYears}
        />
      </div>
    </div>
  {/if}
</div>

<style>
  .calculator {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .profile-section, .calculator-section {
    background: #1a1a1a;
    border-radius: 12px;
    padding: 2rem;
    border: 1px solid #333;
  }
  
  h2 {
    margin: 0 0 1.5rem 0;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .profile-header h2 {
    margin: 0;
  }
  
  .clear-profile-btn {
    padding: 0.5rem 1rem;
    background: #333;
    color: #888;
    border: 1px solid #444;
    border-radius: 6px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .clear-profile-btn:hover {
    background: #444;
    color: #ff6b6b;
    border-color: #ff6b6b;
  }
  
  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  label {
    font-weight: 500;
    color: #ccc;
    font-size: 0.9rem;
  }
  
  input, select {
    padding: 0.75rem;
    border: 1px solid #444;
    border-radius: 6px;
    background: #2a2a2a;
    color: #fff;
    font-size: 1rem;
  }
  
  input:focus, select:focus {
    outline: none;
    border-color: #ff6b6b;
    box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.1);
  }
  
  .presets {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .preset-btn {
    padding: 0.4rem 0.8rem;
    background: #333;
    color: #ccc;
    border: 1px solid #555;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.2s;
  }
  
  .preset-btn:hover, .preset-btn.active {
    background: #ff6b6b;
    color: #fff;
    border-color: #ff6b6b;
  }
  
  .range-value {
    color: #ff6b6b;
    font-weight: 600;
    align-self: flex-end;
  }
  
  .purchase-input {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .amount-input {
    font-size: 1.5rem;
    padding: 1rem;
    text-align: center;
    font-weight: 600;
    border: 2px solid #444;
  }
  
  .amount-input:focus {
    border-color: #ff6b6b;
  }
  
  .recurring-options {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  
  .period-select {
    flex: 0 0 auto;
  }
  
  .calculate-btn {
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .calculate-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
  }
  
  .result-section {
    margin-top: 1rem;
  }
  
  .result-card {
    background: linear-gradient(135deg, #2a1a1a, #1a1a2a);
    border: 2px solid #ff6b6b;
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
  }
  
  .result-card h3 {
    margin: 0 0 1rem 0;
    color: #ff6b6b;
    font-size: 1.3rem;
  }
  
  .result-message {
    font-size: 1.4rem;
    font-weight: 600;
    color: #fff;
    margin: 0 0 2rem 0;
    line-height: 1.4;
  }
  
  .result-details {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
    flex-wrap: wrap;
  }
  
  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }
  
  .stat.secondary {
    opacity: 0.7;
  }
  
  .stat.secondary .stat-value {
    color: #888;
    font-size: 1.5rem;
  }
  
  .stat.secondary .stat-label {
    color: #666;
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 800;
    color: #ff6b6b;
  }
  
  .stat-label {
    font-size: 0.9rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .copy-btn {
    padding: 0.75rem 1.5rem;
    background: #333;
    color: #fff;
    border: 1px solid #555;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .copy-btn:hover {
    background: #444;
    border-color: #666;
  }
  
  @media (max-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
    
    .result-details {
      gap: 1rem;
    }
    
    .stat-value {
      font-size: 1.5rem;
    }
    
    .result-message {
      font-size: 1.2rem;
    }
  }
</style>
