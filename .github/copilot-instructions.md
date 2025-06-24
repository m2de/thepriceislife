# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is "The Price is Life" calculator - a Svelte web application that converts monetary costs into work time requirements with morbid but playful messaging. Shows users exactly how many hours they need to work to afford purchases.

## Key Requirements

- **Dark theme** with morbid aesthetic
- **Mobile-first responsive design**
- **No backend required** - all calculations client-side
- **Work-focused messaging** that emphasizes time spent working
- **Life perspective context** to make work hours relatable
- **Clean, minimal design** with striking typography

## Core Features

1. **User Profile Form**: Birth date, monthly salary, sleep hours, working hours
2. **Calculator Interface**: Purchase amount input with recurring options
3. **Work-Time Results**: Shows hours of work needed + life context
4. **Scenario Presets**: 5 clickable preset scenarios (coffee, Netflix, gym, iPhone, meal deals)
5. **Persistent Profiles**: Automatic cookie-based profile saving
6. **Shareable Results**: Copy to clipboard functionality

## Calculation Logic

```javascript
// Calculate hourly earning rate based on actual working hours
const weeklyWorkingHours = userProfile.workingHours || 40;
const monthlyWorkingHours = weeklyWorkingHours * 4.33; // Average weeks per month
const hourlyEarningRate = monthlySalary / monthlyWorkingHours;

// Calculate work hours needed for purchase
const workHoursNeeded = purchaseAmount / hourlyEarningRate;

// Convert to life perspective using waking hours
const dailyWakingHours = 24 - sleepHours;
const lifeDaysNeeded = workHoursNeeded / dailyWakingHours;
```

## Sample Messaging

- "You need to work X hours to afford this - X.X waking days of your life"
- "This costs X hours of work - X.X days of your precious time"
- "You'll work X hours to pay for this subscription"
- "Over your remaining lifetime, you'll work X hours to pay for this"
- "This habit will cost you X hours of work - X.X waking days of your life"

## Technical Preferences

- Use Svelte's reactive statements for calculations
- Implement form validation with sensible ranges
- Use CSS Grid/Flexbox for responsive layout
- Prefer semantic HTML elements
- Keep component structure simple and focused
