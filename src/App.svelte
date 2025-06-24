<script>
  import { onMount } from 'svelte'
  import Calculator from './lib/Calculator.svelte'
  import ScenarioPresets from './lib/ScenarioPresets.svelte'
  import { loadProfile, saveProfile, getDefaultProfile, mergeWithDefaults } from './lib/ProfileStorage.js'
  
  let userProfile = getDefaultProfile()
  let calculatorRef
  let profileLoaded = false
  let profileLoadedFromCookies = false
  
  // Load profile from cookies on mount
  onMount(() => {
    const savedProfile = loadProfile()
    if (savedProfile) {
      userProfile = mergeWithDefaults(savedProfile)
      profileLoadedFromCookies = true
    }
    profileLoaded = true
  })
  
  // Save profile to cookies whenever it changes (but only after initial load)
  $: if (userProfile && profileLoaded) {
    saveProfile(userProfile)
  }
  
  function handleScenarioSelect(event) {
    if (calculatorRef) {
      calculatorRef.setScenario(event.detail)
    }
  }
</script>

<main>
  <div class="container">
    <header>
      <h1>The Price is Life</h1>
      <p class="tagline">Converting costs into something more... permanent</p>
    </header>
    
    <Calculator 
      bind:this={calculatorRef}
      bind:userProfile={userProfile} 
    />
    
    <ScenarioPresets 
      {userProfile}
      on:scenarioSelect={handleScenarioSelect}
    />
    
    <footer>
      <p>Life is finite. Spend it wisely.</p>
    </footer>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: #0a0a0a;
    color: #e0e0e0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
  }
  
  :global(*) {
    box-sizing: border-box;
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  
  header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    margin: 0;
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: none;
  }
  
  .tagline {
    font-size: 1.1rem;
    color: #888;
    margin: 0.5rem 0 0 0;
    font-style: italic;
  }
  
  footer {
    text-align: center;
    color: #666;
    font-size: 0.9rem;
    margin-top: auto;
  }
  
  @media (max-width: 768px) {
    .container {
      padding: 1.5rem 1rem;
      gap: 2rem;
    }
  }
</style>
