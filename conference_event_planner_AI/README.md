**This is a failed attempt to refactior the lab with Windsurf's AI. It made too much of a mess, but at least there is a reference for better organisation and component-based architecture, unlikethe poriginal lab wihih was an unholy mess... (even if it works)**

*This will **not** build (currently CSS dependency issues I am not willing to figure out), aor when it does, there is no styling and the functionality is also broken. Keeping it for reference for better structuring only.*

The below is probably outdated, AI has restructred things since writing this:


# Conference Event Planner

A React-based application for planning and managing conference events, including venue selection, AV equipment rental, and meal planning.

## Project Structure

```
src/
├── components/               # Reusable UI components
│   ├── common/              # Shared components (Button, Card, etc.)
│   └── conference/          # Conference-specific components
│       ├── VenueSection/    # Venue selection components
│       ├── AddonsSection/   # AV equipment selection components
│       ├── MealsSection/    # Meal selection components
│       └── CartSummary/     # Cart and checkout components
│
├── features/
│   └── conference/         # Conference feature module
│       ├── slices/         # Redux slice files
│       │   ├── venueSlice.js
│       │   ├── avSlice.js
│       │   └── mealsSlice.js
│       ├── store.js        # Redux store configuration
│       └── index.js        # Public API for the feature
│
├── App.jsx                 # Main application component
└── index.jsx               # Application entry point
```

## Redux Organization

The application uses Redux Toolkit for state management, organized using the "feature folder" pattern:

### Slices
- **venueSlice.js**: Manages venue selection and quantity
- **avSlice.js**: Handles AV equipment selection and quantities
- **mealsSlice.js**: Manages meal selections and options

### Selectors
Each slice exports selectors for accessing the state:
- `selectAllX`: Get all items of a type
- `selectXById`: Get a specific item by ID
- `selectSelectedX`: Get only selected/added items
- `selectXTotalCost`: Calculate total cost for a section

### Actions
Common action patterns:
- `incrementQuantity`: Increase item quantity
- `decrementQuantity`: Decrease item quantity
- `toggleSelection`: Toggle item selection
- `resetSelection`: Reset section to initial state

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Development Notes

- **State Management**: Uses Redux Toolkit with slices for each feature
- **Styling**: Uses Tailwind CSS for utility-first styling
- **Build Tool**: Vite for fast development and production builds

## Best Practices

1. **Component Organization**:
   - Keep components small and focused on a single responsibility
   - Group related components in feature folders
   - Use index.js files for clean imports

2. **State Management**:
   - Keep state as local as possible
   - Use Redux for global state that's needed across multiple components
   - Use selectors to compute derived data

3. **Styling**:
   - Use Tailwind utility classes for styling
   - Extract repeated styles into components when needed
   - Keep responsive design in mind
