<script>
  export let value = 81
  export let label = 'Life Expectancy'
  
  const MIN_AGE = 60
  const MAX_AGE = 100
  const DEFAULT_AGE = 81 // UK average
  
  // Ensure value is within bounds
  $: value = Math.max(MIN_AGE, Math.min(MAX_AGE, value))
  
  // Get context label based on value
  function getContextLabel(age) {
    if (age < 70) return 'Pessimistic'
    if (age < 75) return 'Conservative'
    if (age < 80) return 'Below Average'
    if (age < 85) return 'Average'
    if (age < 90) return 'Above Average'
    if (age < 95) return 'Optimistic'
    return 'Very Optimistic'
  }
  
  function getContextColor(age) {
    if (age < 70) return '#ef4444' // red
    if (age < 75) return '#f97316' // orange
    if (age < 80) return '#eab308' // yellow
    if (age < 85) return '#22c55e' // green
    if (age < 90) return '#06b6d4' // cyan
    if (age < 95) return '#8b5cf6' // purple
    return '#ec4899' // pink
  }
  
  $: contextLabel = getContextLabel(value)
  $: contextColor = getContextColor(value)
</script>

<div class="life-expectancy-group">
  <div class="slider-header">
    <label for="lifeExpectancy">{label}</label>
    <div class="value-display">
      <span class="age-value">{value} years</span>
      <span class="context-label" style="color: {contextColor}">{contextLabel}</span>
    </div>
  </div>
  
  <div class="slider-container">
    <input 
      id="lifeExpectancy"
      type="range" 
      bind:value={value}
      min={MIN_AGE}
      max={MAX_AGE}
      step="1"
      class="life-slider"
      style="--thumb-color: {contextColor}"
    />
    <div class="slider-labels">
      <span class="min-label">{MIN_AGE}</span>
      <span class="default-marker" style="left: {((DEFAULT_AGE - MIN_AGE) / (MAX_AGE - MIN_AGE)) * 100}%">
        UK Avg ({DEFAULT_AGE})
      </span>
      <span class="max-label">{MAX_AGE}</span>
    </div>
  </div>
  
  <div class="expectancy-info">
    <p class="info-text">
      Adjust based on your health, lifestyle, and family history. 
      This affects all life calculations.
    </p>
  </div>
</div>

<style>
  .life-expectancy-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .slider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  label {
    font-weight: 500;
    color: #e0e0e0;
    font-size: 0.9rem;
  }
  
  .value-display {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
  }
  
  .age-value {
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
  }
  
  .context-label {
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .slider-container {
    position: relative;
    padding: 0 0.5rem;
  }
  
  .life-slider {
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: linear-gradient(
      to right,
      #ef4444 0%,    /* red - pessimistic */
      #f97316 20%,   /* orange */
      #eab308 40%,   /* yellow */
      #22c55e 60%,   /* green - average */
      #06b6d4 80%,   /* cyan */
      #8b5cf6 90%,   /* purple */
      #ec4899 100%   /* pink - very optimistic */
    );
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
  }
  
  .life-slider::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--thumb-color, #22c55e);
    border: 3px solid #1a1a1a;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;
  }
  
  .life-slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }
  
  .life-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--thumb-color, #22c55e);
    border: 3px solid #1a1a1a;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;
  }
  
  .slider-labels {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    position: relative;
    font-size: 0.8rem;
    color: #888;
  }
  
  .min-label, .max-label {
    color: #666;
  }
  
  .default-marker {
    position: absolute;
    transform: translateX(-50%);
    color: #22c55e;
    font-weight: 500;
    font-size: 0.75rem;
    white-space: nowrap;
  }
  
  .expectancy-info {
    margin-top: 0.5rem;
  }
  
  .info-text {
    margin: 0;
    font-size: 0.8rem;
    color: #888;
    font-style: italic;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    .slider-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
    
    .value-display {
      align-items: flex-start;
    }
    
    .default-marker {
      font-size: 0.7rem;
    }
  }
</style>
