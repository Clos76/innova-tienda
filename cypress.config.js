// cypress.config.js
import { defineConfig } from "cypress";


export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    pageLoadTimeout:60000,
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
  },
});
