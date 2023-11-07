export default {
  api: {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  rateLimit: {
    ttl: parseInt(process.env.RATE_LIMIT_TTL, 10) || 60000,
    limit: parseInt(process.env.RATE_LIMIT_LIMIT, 10) || 10,
  },
  externalApi: {
    ibge: {
      url: "https://servicodados.ibge.gov.br/api/v3",
    },
  },
  database: {
    password: process.env.DATABASE_PASSWORD,
    username: process.env.DATABASE_USERNAME,
    synchronize: false,
    logging: Boolean(process.env.DATABASE_LOG) || false,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    database: process.env.DB_DATABASE,
  },
  crons: {
    active: process.env.CRON_ACTIVE,
    citiesSyncCron: process.env.CRON_SYNC_CITIES,
  },
};
