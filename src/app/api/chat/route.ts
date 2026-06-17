import { NextResponse } from 'next/server';
import { SYSTEM_PROMPT } from '@/ai/prompts';
import { portfolioContext } from '@/ai/context';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // In a real production app, you would call OpenAI/Gemini/Claude here.
    // For this build, we simulate a streaming response to demonstrate the UI.

    const lastMessage = messages[messages.length - 1].content.toLowerCase();
    let responseText = "I have processed your query through my neural circuits. ";

    if (lastMessage.includes("who are you")) {
      responseText = portfolioContext.about.philosophy;
    } else if (lastMessage.includes("resume") || lastMessage.includes("cv") || lastMessage.includes("profile")) {
      responseText = "Understood. Accessing the Personnel Archive... Initializing holographic viewer now.";
    } else if (lastMessage.includes("project")) {
      responseText = "I have indexed several high-impact projects. You can find them in the /projects section or by filtering for specific domains like Data Science or Android.";
    } else if (lastMessage.includes("skill") || lastMessage.includes("technologies")) {
      responseText = "The tech stack is extensive, spanning from " + portfolioContext.skills.fullstack.join(", ") + " to deep learning frameworks.";
    }

    // Simulate streaming
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const words = responseText.split(' ');
        for (const word of words) {
          controller.enqueue(encoder.encode(word + ' '));
          await new Promise(r => setTimeout(r, 50));
        }
        controller.close();
      },
    });

    return new Response(stream);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
