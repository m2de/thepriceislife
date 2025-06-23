# The Price is Life Calculator

A morbidly fascinating web application that converts monetary costs into "life time" costs. Discover how much of your precious existence you're trading for purchases.

## 🎯 What It Does

Transform spending decisions by showing their true cost: **your life time**.

- **£2500 camera** → "This will devour 16.9 days of your mortal existence"
- **Daily £3 coffee** → "Your addiction steals 7.4 days of life annually"
- **Netflix subscription** → "This streaming habit costs 2.1 days of life per year"

## ✨ Features

- **Personal Life Profile**: Set your birth year, salary, sleep hours, and working hours
- **Instant Calculations**: See life costs in hours, days, weeks, or months
- **Scenario Presets**: Explore common expenses (coffee, Netflix, gym, iPhone, meal deals)
- **Morbid Messaging**: Impactful, memorable results that make you pause and reconsider
- **Mobile Responsive**: Dark theme with striking typography
- **Share Results**: Copy life cost revelations to clipboard

## 🧮 How It Works

The calculator uses a simple but powerful formula:

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

✅ Calculator works with accurate mathematics  
✅ Results feel impactful and memorable  
✅ Interface is clean and intuitive  
✅ Scenario presets provide engaging exploration  
✅ Mobile-friendly design  
✅ Shareable results functionality  

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
