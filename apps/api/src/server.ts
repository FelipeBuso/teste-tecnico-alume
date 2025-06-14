import Fastify from "fastify";
import cors from "@fastify/cors";
import authPlugin from "./plugins/auth";
import studentsRoutes from "./modules/student/student.routes";
import simulationRoutes from "./modules/simulation/simulation.routes";
import "dotenv/config";

async function buildApp() {
  const app = Fastify({ logger: true });

  await app.register(cors);
  await app.register(authPlugin);
  await app.register(
    async (apiApp) => {
      await apiApp.register(studentsRoutes);
      await apiApp.register(simulationRoutes, { prefix: "/simulations" });
    },
    { prefix: "/api" }
  );

  return app;
}

async function start() {
  const app = await buildApp();

  try {
    await app.listen({ port: 3333 });
    console.log(`🚀 Server is running at http://localhost:3333`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
