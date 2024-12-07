export default  {
    testEnvironment: "jsdom", // Define o ambiente de teste para simular um navegador.
    moduleNameMapper: {
      "\\.(css|scss)$": "identity-obj-proxy", // Mapeia arquivos CSS para evitar erros durante os testes.
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom"], // Configura o Jest DOM para ajudar nos testes.
  };
  