DO $$ 
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'campaign') THEN
      CREATE DATABASE campaign;
   END IF;
END $$;
