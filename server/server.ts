import { config } from "dotenv";
import express from "express";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import { serve } from "inngest/express";
import { client } from "./src/inngest/index.ts";
import { functions } from "./src/inngest/functions.ts";

config();

const PORT = parseInt(process.env.PORT!);
const app = express();

app.use(clerkMiddleware());
app.use(requireAuth());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/inngest", serve({ client, functions }));

app.get("/", (req, res) => {
	res.send("We Are Live");
});

app.listen(PORT, () => {
	console.log("Server running on port:", PORT);
});
