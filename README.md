# The Price is Life Calculator

A morbidly fascinating web application that converts monetary costs into "life time" costs. Discover how much of your precious existence you're trading for purchases.

## 🎯 What It Does

Transform spending decisions by showing their true cost: **how much you need to work**.

- **£500 camera** → "You need to work 29 hours to afford this - 1.2 waking days of your life"
- **Daily £3 coffee** → "This habit will cost you 547 hours of work - 22.8 waking days of your life"
- **Netflix subscription** → "You'll work 11 hours to pay for this subscription each year"

## ✨ Features

- **Personal Life Profile**: Set birth date, salary, sleep hours, and working hours
- **Work-Based Calculations**: See how many hours of work needed for purchases
- **Life Impact Perspective**: Convert work hours to days of life for context
- **Scenario Presets**: Explore common expenses (coffee, Netflix, gym, iPhone, meal deals)
- **Persistent Profiles**: Your profile saves automatically via cookies
- **Morbid Messaging**: Impactful, memorable results that make you pause and reconsider
- **Mobile Responsive**: Dark theme with striking typography
- **Share Results**: Copy life cost revelations to clipboard

## 🧮 How It Works

The calculator determines your true hourly earning rate and converts purchases into work time:

```javascript
// Calculate hourly earning rate based on actual working hours
const weeklyWorkingHours = userProfile.workingHours || 40;
const monthlyWorkingHours = weeklyWorkingHours * 4.33; // Average weeks per month
const hourlyEarningRate = monthlySalary / monthlyWorkingHours;

// Calculate how many hours of work needed for purchase
const workHoursNeeded = purchaseAmount / hourlyEarningRate;

// Convert to life perspective using waking hours
const dailyWakingHours = 24 - sleepHours;
const lifeDaysNeeded = workHoursNeeded / dailyWakingHours;
```

**Key Insight**: Shows exactly how many hours you must work to earn enough for a purchase, then puts that in perspective by converting to days of your waking life.

## 🚀 Development

Built with Svelte + Vite for optimal performance and development experience.

### Prerequisites

- Node.js (v18 or higher)
- npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### VS Code Integration

This project includes VS Code tasks and Copilot instructions. Use:
- **Ctrl+Shift+P** → "Tasks: Run Task" → "dev" (start development server)
- **Ctrl+Shift+P** → "Tasks: Run Task" → "build" (build for production)

## 🎨 Design Philosophy

- **Dark theme** with morbid aesthetic
- **Mobile-first** responsive design
- **No backend required** - all calculations client-side
- **Instant feedback** with reactive calculations
- **Playful yet profound** messaging that sparks reflection

## 📱 Technology Stack

- **Svelte** - Reactive UI framework
- **Vite** - Fast build tool and dev server
- **CSS Grid/Flexbox** - Responsive layout
- **Google Fonts (Inter)** - Modern typography
- **Vanilla JavaScript** - No additional dependencies

## 🎯 MVP Goals

✅ Calculator works with accurate work-hour based mathematics  
✅ Results feel impactful and memorable  
✅ Interface is clean and intuitive  
✅ Scenario presets provide engaging exploration  
✅ Mobile-friendly design  
✅ Shareable results functionality  
✅ Persistent user profiles via cookies  
✅ Birth date precision and customizable life expectancy  

## 🔮 Future Enhancements

- Currency conversion for international users
- More scenario categories and presets
- Comparison tool between purchases
- Social sharing with graphics
- Historical tracking of "life costs"

---

*Life is finite. Spend it wisely.*

**Why enable `checkJs` in the JS template?**

It is likely that most cases of changing variable types in runtime are likely to be accidental, rather than deliberate. This provides advanced typechecking out of the box. Should you like to take advantage of the dynamically-typed nature of JavaScript, it is trivial to change the configuration.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/sveltejs/svelte-hmr/tree/master/packages/svelte-hmr#preservation-of-local-state).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```js
// store.js
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```
