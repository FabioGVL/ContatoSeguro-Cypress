const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",

  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },

    chromeWebSecurity: false,
    baseUrl: "http://localhost:5400"
  },

  video: true,

  reporterOptions: {
    charts: true,
    reportPageTitle: "Contato Seguro - Relatório de Testes",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  }
});
