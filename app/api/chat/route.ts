import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
// but configure it to point to fireworks.ai
const fireworks = new OpenAI({
  apiKey: 'ku9UYtzjSAATlcAstO8yrB89MzvDqJL3lGIkNgnVZ7URxPxK',
  baseURL: 'https://api.fireworks.ai/inference/v1',
});
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Ask Fireworks for a streaming chat completion using Mistral 7b Instruct 4k
  // @see https://app.fireworks.ai/models/fireworks/mistral-7b-instruct-4k
  const response = await fireworks.chat.completions.create({
    model: 'accounts/fireworks/models/mistral-7b-instruct-4k',
    stream: true,
    max_tokens: 1000,
    messages,
  });
  // Convert the response into a friendly text-stream.
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
