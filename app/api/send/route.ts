import { Knock } from "@knocklabs/node";
import { NextResponse } from "next/server";

// Initialize Knock with the correct options object
const knock = new Knock({
  apiKey: process.env.KNOCK_API_KEY,  // ← pass it inside { apiKey: ... }
  // Optional: add other ClientOptions if needed, e.g.
  // timeout: 30000,
  // logLevel: 'debug',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Optional runtime check (strongly recommended!)
    if (!process.env.KNOCK_API_KEY) {
      throw new Error("KNOCK_API_KEY is missing in environment variables");
    }
    if (!process.env.KNOCK_WORKFLOW_KEY) {
      throw new Error("KNOCK_WORKFLOW_KEY is missing in environment variables");
    }

    // Trigger the Knock workflow
    await knock.workflows.trigger(process.env.KNOCK_WORKFLOW_KEY, {
      // The 'actor' is the person sending the message
      actor: {
        id: email, // Use email as a unique ID (or generate a UUID if preferred)
        name,
        email,
      },
      // The 'recipients' are who should get the email (usually YOU/Admin)
      recipients: ["ground-control@aetheria.com"],
      data: {
        message,
        name,
      },
    });

    return NextResponse.json({ sent: true }, { status: 200 });
  } catch (error) {
    console.error("Knock Error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
