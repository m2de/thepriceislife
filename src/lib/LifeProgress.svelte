<script>
  export let currentAge
  export let remainingYears
  export let remainingDays
  export let lifeCompletionPercentage
  
  function formatNumber(num, decimals = 0) {
    return num.toFixed(decimals)
  }
  
  function getLifeStageColor() {
    if (lifeCompletionPercentage < 30) return '#4ade80' // green - early life
    if (lifeCompletionPercentage < 60) return '#fbbf24' // amber - middle life
    return '#ef4444' // red - later life
  }
  
  function getLifeStageText() {
    if (lifeCompletionPercentage < 30) return 'Early Life'
    if (lifeCompletionPercentage < 60) return 'Mid Life'
    return 'Later Life'
  }
</script>

<div class="life-progress-section">
  <h3>Your Life Status</h3>
  
  <div class="life-stats">
    <div class="age-info">
      <span class="current-age">{currentAge} years old</span>
      <span class="life-stage" style="color: {getLifeStageColor()}">{getLifeStageText()}</span>
    </div>
    
    <div class="progress-container">
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          style="width: {lifeCompletionPercentage}%; background: linear-gradient(90deg, #4ade80 0%, #fbbf24 50%, #ef4444 100%)"
        ></div>
      </div>
      <div class="progress-label">
        <span>{formatNumber(lifeCompletionPercentage, 1)}% complete</span>
      </div>
    </div>
    
    <div class="remaining-info">
      <div class="remaining-stat">
        <span class="stat-value">{remainingYears}</span>
        <span class="stat-label">years remaining</span>
      </div>
      <div class="remaining-stat">
        <span class="stat-value">{formatNumber(remainingDays, 0)}</span>
        <span class="stat-label">days left</span>
      </div>
    </div>
  </div>
  
  {#if remainingYears <= 0}
    <div class="life-warning">
      <p>⚠️ You've exceeded average life expectancy. Every day is a gift!</p>
    </div>
  {:else if remainingYears < 10}
    <div class="life-warning">
      <p>⏰ Time is precious - less than a decade remains based on averages.</p>
    </div>
  {/if}
</div>

<style>
  .life-progress-section {
    background: linear-gradient(135deg, #1a1a2a, #2a1a2a);
    border: 1px solid #444;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 2rem;
  }
  
  h3 {
    margin: 0 0 1.5rem 0;
    color: #fff;
    font-size: 1.3rem;
    font-weight: 600;
    text-align: center;
  }
  
  .life-stats {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .age-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .current-age {
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
  }
  
  .life-stage {
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .progress-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .progress-bar {
    width: 100%;
    height: 12px;
    background: #333;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
  }
  
  .progress-fill {
    height: 100%;
    border-radius: 6px;
    transition: width 0.3s ease;
    position: relative;
  }
  
  .progress-fill::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
  }
  
  .progress-label {
    display: flex;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 600;
    color: #ccc;
  }
  
  .remaining-info {
    display: flex;
    justify-content: space-around;
    gap: 1rem;
  }
  
  .remaining-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 800;
    color: #ff6b6b;
    line-height: 1;
  }
  
  .stat-label {
    font-size: 0.8rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-align: center;
  }
  
  .life-warning {
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 8px;
    text-align: center;
  }
  
  .life-warning p {
    margin: 0;
    color: #fca5a5;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  @media (max-width: 768px) {
    .life-progress-section {
      padding: 1.5rem;
    }
    
    .age-info {
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
    }
    
    .remaining-info {
      flex-direction: row;
      justify-content: space-around;
    }
    
    .stat-value {
      font-size: 1.5rem;
    }
  }
</style>
