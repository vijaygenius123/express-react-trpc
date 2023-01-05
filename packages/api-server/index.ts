import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors"
import {router, publicProcedure} from './trpc'

const appRouter = router({
    greeting: publicProcedure.query(() => 'hello tRPC v10!'),
})

export type AppRouter = typeof appRouter

const app = express();
app.use(cors())
const port = 8080;

// @ts-ignore
app.use('/trpc', trpcExpress.createExpressMiddleware({
    router:appRouter,

}))

app.get("/", (req, res) => {
  res.send("Hello from api-server");
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
