import { Knock } from "@knocklabs/node";
import { NextResponse } from "next/server";

const knock = new Knock(process.env.KNOCK_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Trigger the Knock workflow
    await knock.workflows.trigger(process.env.KNOCK_WORKFLOW_KEY!, {
      // The 'actor' is the person sending the message
      actor: {
        id: email, // Use email as a unique ID
        name: name,
        email: email,
      },
      // The 'recipients' are who should get the email (usually YOU/Admin)
      recipients: ["ground-control@aetheria.com"], 
      data: {
        message: message,
        name: name,
      },
    });

    return NextResponse.json({ sent: true }, { status: 200 });
  } catch (error) {
    console.error("Knock Error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
