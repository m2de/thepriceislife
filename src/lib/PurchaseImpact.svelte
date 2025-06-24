<script>
  export let result
  export let remainingDays
  export let remainingYears
  
  function formatNumber(num, decimals = 1) {
    return num.toFixed(decimals)
  }
  
  function getImpactColor(percentage) {
    if (percentage < 1) return '#4ade80' // green - small impact
    if (percentage < 5) return '#fbbf24' // amber - moderate impact
    if (percentage < 10) return '#f97316' // orange - significant impact
    return '#ef4444' // red - major impact
  }
  
  function getImpactIntensity(percentage) {
    // Ensure minimum visibility for very small percentages, but keep it proportional
    if (percentage < 2) {
      return Math.max(2, percentage) // Minimum 2% width for visibility
    }
    return Math.min(100, percentage)
  }
</script>

{#if result}
  <div class="purchase-impact">
    <h4>Remaining Life Impact</h4>
    
    <div class="impact-visualization">
      <div class="impact-bar-container">
        <div class="impact-bar">
          <div 
            class="impact-fill"
            style="width: {getImpactIntensity(result.remainingLifePercentage)}%; background-color: {getImpactColor(result.remainingLifePercentage)}"
          ></div>
        </div>
        <div class="impact-percentage">
          {formatNumber(result.remainingLifePercentage, 2)}% of remaining life
        </div>
      </div>
      
      <div class="impact-details">
        <div class="impact-stat">
          <span class="impact-label">Cost:</span>
          <span class="impact-value">
            {#if result.isRecurring}
              £{formatNumber(result.lifetimeCost, 0)} lifetime
            {:else}
              £{formatNumber(result.amount, 0)} one-time
            {/if}
          </span>
        </div>
        
        <div class="impact-stat">
          <span class="impact-label">Time:</span>
          <span class="impact-value">{formatNumber(result.days, 1)} days</span>
        </div>
        
        {#if result.remainingLifePercentage > 0.1}
          <div class="impact-stat">
            <span class="impact-label">Equivalent:</span>
            <span class="impact-value">
              {formatNumber((result.days / remainingDays) * remainingYears, 1)} years
            </span>
          </div>
        {/if}
      </div>
    </div>
    
    <div class="impact-context">
      {#if result.remainingLifePercentage < 0.1}
        <p class="impact-message minor">A tiny fraction of your remaining time.</p>
      {:else if result.remainingLifePercentage < 1}
        <p class="impact-message low">A small but noticeable portion of your life.</p>
      {:else if result.remainingLifePercentage < 5}
        <p class="impact-message moderate">A meaningful chunk of your remaining existence.</p>
      {:else if result.remainingLifePercentage < 10}
        <p class="impact-message high">A significant portion of what's left.</p>
      {:else}
        <p class="impact-message severe">A substantial part of your remaining life!</p>
      {/if}
      
      {#if result.isRecurring}
        <p class="recurring-note">
          💀 This calculation assumes you'll maintain this expense for your entire remaining {remainingYears} years
        </p>
      {/if}
    </div>
  </div>
{/if}

<style>
  .purchase-impact {
    background: #1a1a1a;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 1.5rem;
    margin-top: 1rem;
  }
  
  h4 {
    margin: 0 0 1rem 0;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  .impact-visualization {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .impact-bar-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .impact-bar {
    width: 100%;
    height: 8px;
    background: #333;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }
  
  .impact-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.5s ease-out;
    position: relative;
  }
  
  .impact-fill::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.6);
  }
  
  .impact-percentage {
    font-size: 0.9rem;
    font-weight: 600;
    color: #ccc;
    text-align: center;
  }
  
  .impact-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.75rem;
  }
  
  .impact-stat {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  
  .impact-label {
    font-size: 0.8rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .impact-value {
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
  }
  
  .impact-context {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #333;
  }
  
  .impact-message {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    font-weight: 500;
    text-align: center;
  }
  
  .impact-message.minor {
    color: #4ade80;
  }
  
  .impact-message.low {
    color: #84cc16;
  }
  
  .impact-message.moderate {
    color: #fbbf24;
  }
  
  .impact-message.high {
    color: #f97316;
  }
  
  .impact-message.severe {
    color: #ef4444;
  }
  
  .recurring-note {
    margin: 0.5rem 0 0 0;
    font-size: 0.8rem;
    color: #999;
    text-align: center;
    font-style: italic;
  }
  
  @media (max-width: 768px) {
    .purchase-impact {
      padding: 1.25rem;
    }
    
    .impact-details {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
    
    .impact-stat {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
