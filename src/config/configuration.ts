export default () => ({
    port: parseInt(process.env.PORT) || 5000,
    database: {
      host: process.env.DATABASE_HOST,
      name: process.env.DATABASE_NAME   
    }
  });