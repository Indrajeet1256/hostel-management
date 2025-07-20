import { config } from "dotenv";
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { client } from "./src/inngest/index.ts";
import { functions } from "./src/inngest/functions.ts";

config();

const PORT = parseInt(process.env.PORT!);
const app = express();

app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/inngest", serve({ client, functions }));

app.listen(PORT, () => {
	console.log("Server running on port:", PORT);
});
