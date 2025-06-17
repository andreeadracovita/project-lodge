# Lodge - Accommodation Listing & Booking Web Application

## Features

- Signed up and unauthenticated users can browse and book listed accommodations.
- By signing up, the user can easily view their booked destinations and save places for future trips.
- Users can sign up to list a property they represent for short term accommodation. In doing so, they become **hosts**.
- Hosts can manage their properties using tools for availability, pricing. ...Draft...
- Users can communicate with their hosts/guests through internal messaging system.
- Properties are reviewed by guests upon completion of their stay.

## Commitments

### Privacy

**Privacy** is very important for us so we prepared the web application to accommodate users who do not want to sign up. They can browse the destinations, make bookings, view their bookings and communicate with the host using email. ...Email communication is an additional feature to be implemented...

### Security

**Security** of stored data and of the entire web application is prioritary. Measures to protect users' data and site integrity:
- Back-end server communicates with established domains
- Users' passwords are encrypted
- Photo names are encrypted for non-sequential storage
- Authenticated routes
- JWT for protected routes
- Authorizing edits: for property editing, user settings' update, the user's credentials need to match the resource's owner
- ...

## Web Application Structure

Our web application is built according to the following structure:
- Vite + React Front-end (current repo)
- [Node.js Back-end](https://github.com/andreeadracovita/project-lodge-db-rest-api)
- PostgreSQL database: DB diagram [here](#) ...to add...

## Running the Web Application

Pre-requisite: Node.js

`npm init`

`npm run dev`

## Additional APIs

On the Front-end, we use [Open Layer](https://openlayers.org/) to enhance the user's experience with map graphics.

On the Back-end, we use the following APIs:
- [Geocode](https://geocode.maps.co/) - to extract GPS coordinates from location address
- [FreeCurrencyAPI](https://freecurrencyapi.com/) - to fetch the latest currency exchange rate, in order to show users prices in their preferred currency

## Development Planning

... Link to planning.md ...

## Design

... Link to design document ...

## Improvements and Further Development

- Email messaging for unauthenticated users with bookings
- Idea: AI trip planner
- ...

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
