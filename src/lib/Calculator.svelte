<script>
  export let userProfile
  
  let purchaseAmount = ''
  let isRecurring = false
  let recurringPeriod = 'monthly' // 'daily', 'monthly', 'yearly'
  
  let result = null
  let showResult = false
  
  // Reactive calculations
  $: dailyWakingHours = 24 - userProfile.sleepHours
  $: monthlyWakingHours = dailyWakingHours * 30.44
  $: hourlyLifeValue = userProfile.monthlySalary / monthlyWakingHours
  
  function calculateLifeCost() {
    if (!purchaseAmount || parseFloat(purchaseAmount) <= 0) return
    
    let amount = parseFloat(purchaseAmount)
    
    // Convert to annual cost if recurring
    if (isRecurring) {
      switch (recurringPeriod) {
        case 'daily':
          amount = amount * 365.25
          break
        case 'monthly':
          amount = amount * 12
          break
        case 'yearly':
          // already yearly
          break
      }
    }
    
    const lifeCostHours = amount / hourlyLifeValue
    const lifeCostDays = lifeCostHours / dailyWakingHours
    const lifeCostWeeks = lifeCostDays / 7
    const lifeCostMonths = lifeCostDays / 30.44
    
    result = {
      amount,
      hours: lifeCostHours,
      days: lifeCostDays,
      weeks: lifeCostWeeks,
      months: lifeCostMonths,
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
    
    const days = formatNumber(result.days, 1)
    const hours = formatNumber(result.hours, 0)
    
    const messages = [
      `This will devour ${hours} hours of your mortal existence`,
      `You're sacrificing ${days} days of life for this purchase`,
      `This brings your death ${days} days closer`,
      `This costs you ${days} days of precious life`,
      `Your remaining time shrinks by ${days} days`
    ]
    
    if (result.isRecurring) {
      const recurringMessages = [
        `This habit steals ${days} days of life annually`,
        `Your addiction devours ${days} days of existence yearly`,
        `This recurring expense costs ${days} days of your remaining time each year`,
        `Annually, this drains ${days} days from your mortal coil`
      ]
      return recurringMessages[Math.floor(Math.random() * recurringMessages.length)]
    }
    
    return messages[Math.floor(Math.random() * messages.length)]
  }
  
  function copyToClipboard() {
    const message = getResultMessage()
    navigator.clipboard.writeText(message).then(() => {
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
</script>

<div class="calculator">
  <!-- User Profile Form -->
  <div class="profile-section">
    <h2>Your Life Profile</h2>
    <div class="form-grid">
      <div class="form-group">
        <label for="birthYear">Birth Year</label>
        <select id="birthYear" bind:value={userProfile.birthYear}>
          {#each Array.from({length: 61}, (_, i) => 2010 - i) as year}
            <option value={year}>{year}</option>
          {/each}
        </select>
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
        <p class="result-message">{getResultMessage()}</p>
        
        <div class="result-details">
          <div class="stat">
            <span class="stat-value">{formatNumber(result.days, 1)}</span>
            <span class="stat-label">Days</span>
          </div>
          <div class="stat">
            <span class="stat-value">{formatNumber(result.hours, 0)}</span>
            <span class="stat-label">Hours</span>
          </div>
          {#if result.weeks > 1}
            <div class="stat">
              <span class="stat-value">{formatNumber(result.weeks, 1)}</span>
              <span class="stat-label">Weeks</span>
            </div>
          {/if}
        </div>
        
        <button class="copy-btn" on:click={copyToClipboard}>
          Copy to Share
        </button>
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
