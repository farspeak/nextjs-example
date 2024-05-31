import { Farspeak } from "farspeak";

const { FARSPEAK_APP, FARSPEAK_ENV, FARSPEAK_BACKEND_TOKEN } = process.env;

const farspeak = new Farspeak({
  app: process.env.FARSPEAK_APP,
  env: process.env.FARSPEAK_ENV,
  backendToken: process.env.FARSPEAK_BACKEND_TOKEN,
});

export default farspeak;
