<script>
  export let currentAge
  export let remainingYears
  export let remainingDays
  export let remainingWakingDays = null // New: waking days remaining
  export let lifeCompletionPercentage
  export let ageInDays = null // New: precise age in days
  
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
  
  // Get emoji based on life stage
  function getLifeStageEmoji() {
    if (lifeCompletionPercentage < 20) return '👶'  // baby
    if (lifeCompletionPercentage < 40) return '🧒'  // child
    if (lifeCompletionPercentage < 65) return '👨'  // adult
    if (lifeCompletionPercentage < 85) return '👴'  // older adult
    return '💀' // end of life
  }
</script>

<div class="life-progress-section">
  <h3>Your Life Status</h3>
  
  <div class="life-stats">
    <div class="age-info">
      <div class="age-display">
        <span class="life-emoji">{getLifeStageEmoji()}</span>
        <div class="age-text">
          <span class="current-age">{currentAge} years old</span>
          {#if ageInDays}
            <span class="precise-age">({Number(ageInDays).toLocaleString()} days lived)</span>
          {/if}
        </div>
      </div>
      <span class="life-stage" style="color: {getLifeStageColor()}">{getLifeStageText()}</span>
    </div>
    
    <div class="progress-container">
      <div class="emoji-progress-bar">
        <span class="birth-emoji">👶</span>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            style="width: {lifeCompletionPercentage}%; background: linear-gradient(90deg, #4ade80 0%, #fbbf24 50%, #ef4444 100%)"
          ></div>
        </div>
        <span class="death-emoji">💀</span>
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
      {#if remainingWakingDays && remainingWakingDays !== remainingDays}
        <div class="remaining-stat waking-days">
          <span class="stat-value">{formatNumber(remainingWakingDays, 0)}</span>
          <span class="stat-label">conscious days left</span>
        </div>
      {/if}
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
    margin-bottom: 0.5rem;
  }
  
  .age-display {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .life-emoji {
    font-size: 2rem;
    line-height: 1;
  }
  
  .age-text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .current-age {
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
  }
  
  .precise-age {
    font-size: 0.85rem;
    color: #888;
    font-weight: 400;
  }
  
  .emoji-progress-bar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }
  
  .birth-emoji, .death-emoji {
    font-size: 1.5rem;
    flex-shrink: 0;
  }
  
  .birth-emoji {
    opacity: 0.8;
  }
  
  .death-emoji {
    opacity: 0.6;
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
  
  .waking-days .stat-value {
    color: #06b6d4;
  }
  
  .waking-days .stat-label {
    color: #67e8f9;
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
    
    .age-display {
      justify-content: center;
    }
    
    .life-emoji {
      font-size: 1.75rem;
    }
    
    .emoji-progress-bar {
      gap: 0.5rem;
    }
    
    .birth-emoji, .death-emoji {
      font-size: 1.25rem;
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
