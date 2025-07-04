<script>
  import { createEventDispatcher } from 'svelte'
  
  export let userProfile
  
  const dispatch = createEventDispatcher()
  
  let calculatedScenarios = []
  
  const scenarios = [
    {
      id: 'coffee',
      title: 'Daily £3 Coffee Habit',
      description: 'Your morning fuel addiction',
      amount: 3,
      isRecurring: true,
      period: 'daily',
      icon: '☕'
    },
    {
      id: 'netflix',
      title: 'Netflix Subscription', 
      description: 'Endless scrolling, endless cost',
      amount: 15.99,
      isRecurring: true,
      period: 'monthly',
      icon: '📺'
    },
    {
      id: 'gym',
      title: 'Unused Gym Membership',
      description: 'The guilt you pay for monthly',
      amount: 40,
      isRecurring: true,
      period: 'monthly',
      icon: '💪'
    },
    {
      id: 'iphone',
      title: 'iPhone vs Cheaper Phone',
      description: 'The premium you pay for status',
      amount: 500,
      isRecurring: false,
      period: null,
      icon: '📱'
    },
    {
      id: 'meal',
      title: 'Daily Meal Deal vs Packed Lunch',
      description: 'Convenience costs more than you think',
      amount: 2,
      isRecurring: true,
      period: 'daily',
      icon: '🥪'
    }
  ]
  
  // Calculate life cost for each scenario
  function calculateScenarioLifeCost(scenario) {
    const dailyWakingHours = 24 - userProfile.sleepHours
    const monthlyWakingHours = dailyWakingHours * 30.44
    
    // Calculate hourly earning rate based on actual working hours
    const weeklyWorkingHours = userProfile.workingHours || 40
    const monthlyWorkingHours = weeklyWorkingHours * 4.33 // Average weeks per month
    const hourlyEarningRate = userProfile.monthlySalary / monthlyWorkingHours
    const hourlyLifeValue = hourlyEarningRate
    
    // Enhanced age calculations using birth date
    const currentAge = calculateAge(userProfile.birthDate)
    const lifeExpectancy = userProfile.lifeExpectancy || 81
    const remainingYears = Math.max(0, lifeExpectancy - currentAge)
    const remainingDays = remainingYears * 365.25
    
    // Enhanced: Calculate remaining waking days consistently
    const remainingWakingDays = remainingYears * 365.25 * (dailyWakingHours / 24)
    
    let amount = scenario.amount
    let lifetimeCost = amount
    
    // For recurring expenses, calculate lifetime cost based on remaining years
    if (scenario.isRecurring && remainingYears > 0) {
      switch (scenario.period) {
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
    const lifeCostWakingDays = lifeCostHours / dailyWakingHours
    
    return {
      hours: lifeCostHours,
      days: lifeCostWakingDays, // Now using waking days consistently
      amount: lifetimeCost,
      isLifetime: scenario.isRecurring
    }
  }
  
  // Age calculation function (same as in Calculator)
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
  
  function handleScenarioClick(scenario) {
    dispatch('scenarioSelect', scenario)
  }
  
  function formatNumber(num, decimals = 1) {
    return num.toFixed(decimals)
  }
  
  function getScenarioSubtext(scenario) {
    if (scenario.isRecurring) {
      return `£${scenario.amount}/${scenario.period}`
    }
    return `£${scenario.amount} one-time`
  }
  
  // Reactive calculation of all scenarios - watch for specific property changes
  $: birthDate = userProfile?.birthDate
  $: sleepHours = userProfile?.sleepHours  
  $: monthlySalary = userProfile?.monthlySalary
  $: lifeExpectancy = userProfile?.lifeExpectancy
  
  // Recalculate scenarios when any profile property changes
  $: calculatedScenarios = scenarios.map(scenario => {
    if (!userProfile || !birthDate || !monthlySalary) {
      return {
        ...scenario,
        lifeCost: { days: 0, hours: 0, amount: 0, isLifetime: scenario.isRecurring }
      }
    }
    
    return {
      ...scenario,
      lifeCost: calculateScenarioLifeCost(scenario)
    }
  })
</script>

<div class="scenarios-section">
  <h2>Explore Life Costs</h2>
  <p class="section-description">Click on any scenario to see how much life it really costs you</p>
  
  <div class="scenarios-grid">
    {#each calculatedScenarios as scenario}
      <div 
        class="scenario-card"
        role="button"
        tabindex="0"
        on:click={() => handleScenarioClick(scenario)}
        on:keydown={(e) => e.key === 'Enter' && handleScenarioClick(scenario)}
      >
        <div class="scenario-header">
          <span class="scenario-icon">{scenario.icon}</span>
          <div class="scenario-info">
            <h3>{scenario.title}</h3>
            <p class="scenario-description">{scenario.description}</p>
            <span class="scenario-cost">{getScenarioSubtext(scenario)}</span>
          </div>
        </div>
        
        <div class="scenario-impact">
          <div class="impact-stat">
            <span class="impact-value">{formatNumber(scenario.lifeCost.days, 1)}</span>
            <span class="impact-label">days{scenario.isRecurring ? ' lifetime' : ''}</span>
          </div>
          {#if scenario.lifeCost.days > 30}
            <div class="impact-stat secondary">
              <span class="impact-value">{formatNumber(scenario.lifeCost.days / 30.44, 1)}</span>
              <span class="impact-label">months{scenario.isRecurring ? ' lifetime' : ''}</span>
            </div>
          {/if}
        </div>
        
        <div class="scenario-arrow">→</div>
      </div>
    {/each}
  </div>
  
  <div class="scenarios-footer">
    <p>Based on your current life profile: £{monthlySalary || 0}/month, {sleepHours || 8}h sleep, age {birthDate ? calculateAge(birthDate) : 0}</p>
  </div>
</div>

<style>
  .scenarios-section {
    background: #1a1a1a;
    border-radius: 12px;
    padding: 2rem;
    border: 1px solid #333;
  }
  
  h2 {
    margin: 0 0 0.5rem 0;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .section-description {
    color: #888;
    margin: 0 0 2rem 0;
    font-size: 0.95rem;
  }
  
  .scenarios-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .scenario-card {
    background: #2a2a2a;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .scenario-card:hover {
    background: #333;
    border-color: #ff6b6b;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.15);
  }
  
  .scenario-header {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .scenario-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }
  
  .scenario-info {
    flex: 1;
  }
  
  .scenario-info h3 {
    margin: 0 0 0.5rem 0;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.3;
  }
  
  .scenario-description {
    margin: 0 0 0.5rem 0;
    color: #aaa;
    font-size: 0.9rem;
    line-height: 1.4;
  }
  
  .scenario-cost {
    background: #444;
    color: #ccc;
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
    font-weight: 500;
  }
  
  .scenario-impact {
    display: flex;
    gap: 1rem;
    align-items: flex-end;
  }
  
  .impact-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }
  
  .impact-stat.secondary {
    opacity: 0.7;
  }
  
  .impact-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ff6b6b;
    line-height: 1;
  }
  
  .impact-stat.secondary .impact-value {
    font-size: 1.2rem;
  }
  
  .impact-label {
    font-size: 0.8rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-align: center;
  }
  
  .scenario-arrow {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: #666;
    transition: all 0.3s ease;
  }
  
  .scenario-card:hover .scenario-arrow {
    color: #ff6b6b;
    transform: translateY(-50%) translateX(4px);
  }
  
  .scenarios-footer {
    text-align: center;
    color: #666;
    font-size: 0.85rem;
    padding-top: 1rem;
    border-top: 1px solid #333;
  }
  
  .scenarios-footer p {
    margin: 0;
  }
  
  @media (max-width: 768px) {
    .scenarios-grid {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
    
    .scenario-card {
      padding: 1.25rem;
    }
    
    .scenario-header {
      gap: 0.75rem;
    }
    
    .scenario-icon {
      font-size: 1.5rem;
    }
    
    .impact-value {
      font-size: 1.3rem;
    }
    
    .impact-stat.secondary .impact-value {
      font-size: 1.1rem;
    }
  }
</style>
