import fastify from "fastify";
import fastifyCors from "fastify-cors";
import fileUpload from "fastify-file-upload";
import routes from "./routes/v1";

async function build() {
  const http = fastify({ logger: true });
  await http.register(require("middie"), {
    hook: "onRequest",
  });
  http.register(fastifyCors, {
    origin: "http://localhost:3000",
  });
  http.register(fileUpload);
  http.register(routes, { prefix: "api/v1" });

  http.listen(process.env.PORT, (err, address) => {
    if (err) {
      http.log.error(err);
      process.exit(1);
    }

    http.log.info(`Server listening at ${address}`);
  });
}

build();
