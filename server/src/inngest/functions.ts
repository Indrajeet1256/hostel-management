import { client } from "./client.ts";

const syncUserFromClerk = client.createFunction(
	{
		id: "sync-user-from-clerk",
	},
	{
		event: "clerk/user.created",
	},
	async ({ event, step }) => {
		await step.sleep("wait a moment", "1s");
		const data = event.data;
		console.log(data);
		return { message: "User Data" };
	}
);

export const functions = [syncUserFromClerk];
