import { config } from "dotenv";
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { client } from "./inngest/client.ts";
import { functions } from "./inngest/functions.ts";

config();

const PORT = parseInt(process.env.PORT!);
const app = express();

app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/inngest", serve({ client, functions }));

const whitelist = ["*"];

app.use((req, res, next) => {
	const origin = req.get("referer");
	const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
	if (isWhitelisted) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader(
			"Access-Control-Allow-Methods",
			"GET, POST, OPTIONS, PUT, PATCH, DELETE"
		);
		res.setHeader(
			"Access-Control-Allow-Headers",
			"X-Requested-With,Content-Type,Authorization"
		);
		res.setHeader("Access-Control-Allow-Credentials", "true");
	}
	// Pass to next layer of middleware
	if (req.method === "OPTIONS") res.sendStatus(200);
	else next();
});

app.get("/", (req, res) => {
	res.send("We Are Live");
});

app.listen(PORT, () => {
	console.log("Server running on port:", PORT);
});
