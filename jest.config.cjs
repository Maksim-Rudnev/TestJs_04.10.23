module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'], // Паттерн для поиска файлов с тестами
  transform: {
    '^.+\\.ts$': 'ts-jest', // Преобразование TypeScript файлов
  },
};
