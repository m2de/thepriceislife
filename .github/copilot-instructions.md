# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is "The Price is Life" calculator - a Svelte web application that converts monetary costs into "life time" costs with morbid but playful messaging.

## Key Requirements

- **Dark theme** with morbid aesthetic
- **Mobile-first responsive design**
- **No backend required** - all calculations client-side
- **Morbid but playful messaging** for results
- **Clean, minimal design** with striking typography

## Core Features

1. **User Input Form**: Birth year, monthly salary, sleep hours, working hours
2. **Calculator Interface**: Purchase amount input with prominent display
3. **Results Display**: Multiple morbid message formats
4. **Scenario Presets**: 5 clickable preset scenarios (coffee, Netflix, gym, iPhone, meal deals)
5. **Shareable Results**: Copy to clipboard functionality

## Calculation Logic

```javascript
// Monthly waking hours
const dailyWakingHours = 24 - sleepHours;
const monthlyWakingHours = dailyWakingHours * 30.44;

// Life value per hour
const hourlyLifeValue = monthlySalary / monthlyWakingHours;

// Life cost of purchase
const lifeCostHours = purchaseAmount / hourlyLifeValue;
const lifeCostDays = lifeCostHours / dailyWakingHours;
```

## Sample Messaging

- "This will devour X hours of your mortal existence"
- "You're sacrificing X.X days of life for this purchase"
- "This brings your death X.X days closer"
- "Your coffee addiction steals X.X days of life annually"

## Technical Preferences

- Use Svelte's reactive statements for calculations
- Implement form validation with sensible ranges
- Use CSS Grid/Flexbox for responsive layout
- Prefer semantic HTML elements
- Keep component structure simple and focused
