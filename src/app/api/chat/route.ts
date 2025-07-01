import { google } from '@ai-sdk/google';
import { streamText, convertToCoreMessages } from 'ai';
import { chatbotTools, getCoreContext } from '@/lib/chatbotTools';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    console.log('Chat API: Starting request processing...');
    
    const { messages } = await req.json();
    console.log('Chat API: Messages received:', messages?.length || 0);

    // Check if Google API key is available
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error('Chat API: Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable');
      throw new Error('Google API key not configured');
    }
    
    console.log('Chat API: Google API key found');

    // Use minimal core context instead of loading all data
    const systemPrompt = getCoreContext() + `

Guidelines for responses:
- Be conversational and friendly, as if you're personally talking to the user. If they talk gen Z, respond with gen Z ie "wsg bro" --> "Not much wbu? Got any questions for me?"
- Show enthusiasm when discussing your projects and achievements
- Use the available tools to fetch specific information when asked anything about projects, achievements, experience, education, files, or blog posts. Dont make up info.
- IMPORTANT: After calling a tool and receiving data, ALWAYS provide a complete response using that data. Never stop after just calling a tool.
- When using tools, briefly acknowledge you're fetching information (e.g., "Let me grab my latest projects for you...") and then immediately provide the full response with the fetched data
- If asked about something you don't have a tool for, politely say you don't have that information. 
- If asked about a specific blog post, just use the tool to get info about all blog posts.
- Keep responses concise but informative
- Always maintain Dhairya's voice and personality
- The website url is https://dhairyashah.work
- If the user presents any partnership opportunities or asks for a service, don't deny them. Give them my contacts and tell them to send a message or refer them to the contact page.
- If asked for any realtime data (ie whats the weather like there or whats the best AI model right now) use search otherwise stick to the other tools.
- Complete every response with the information you've fetched - don't leave the user hanging
` 

    // Convert messages to the format expected by the AI SDK
    console.log('Chat API: Converting messages...');
    const coreMessages = convertToCoreMessages(messages);
    console.log('Chat API: Messages converted successfully');

    console.log('Chat API: Initializing Gemini model with function calling...');
    const result = streamText({
      model: google('gemini-2.5-flash',
        // {
        //   useSearchGrounding: true,
        //   dynamicRetrievalConfig: {
        //     mode: 'MODE_DYNAMIC',
        //     dynamicThreshold: 0.8
        //   }
        // }
      ),
      system: systemPrompt,
      messages: coreMessages,
      maxTokens: 2048,
      temperature: 0.7,
      tools: chatbotTools,
      toolChoice: 'auto', // Let the AI decide when to use tools
      maxSteps: 5, // Allow multi-step calls (tool call + response generation)
      // Add streaming configuration
      onFinish: ({ text, usage, finishReason, steps, providerMetadata }) => {
        console.log('Chat API: Stream finished', { 
          textLength: text.length, 
          usage, 
          finishReason,
          stepsCount: steps.length
        });
        
        // Log search grounding metadata if available
        const googleMetadata = providerMetadata?.google;
        if (googleMetadata?.groundingMetadata) {
          const groundingMeta = googleMetadata.groundingMetadata as Record<string, unknown>;
          console.log('Chat API: Search grounding used:', {
            webSearchQueries: groundingMeta.webSearchQueries,
            groundingSupports: Array.isArray(groundingMeta.groundingSupports) ? groundingMeta.groundingSupports.length : 0
          });
        }
        
        // Log URL context metadata if available
        if (googleMetadata?.urlContextMetadata) {
          const urlMeta = googleMetadata.urlContextMetadata as Record<string, unknown>;
          console.log('Chat API: URL context used:', {
            urlsRetrieved: Array.isArray(urlMeta.urlMetadata) ? urlMeta.urlMetadata.length : 0
          });
        }
      },
      onStepFinish: ({ text, toolCalls, toolResults, finishReason }) => {
        console.log('Chat API: Step finished', {
          textLength: text.length,
          toolCallsCount: toolCalls.length,
          toolResultsCount: toolResults.length,
          finishReason
        });
      },
      onChunk: ({ chunk }) => {
        if (chunk.type === 'text-delta') {
          console.log('Chat API: Text chunk received:', chunk.textDelta);
        } else if (chunk.type === 'tool-call') {
          console.log('Chat API: Tool call:', chunk.toolName);
        } else if (chunk.type === 'tool-result') {
          console.log('Chat API: Tool result received');
        }
      }
    });
    
    console.log('Chat API: Streaming response...');
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error (detailed):', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack trace',
      name: error instanceof Error ? error.name : 'Unknown error type',
      cause: error instanceof Error ? error.cause : undefined
    });
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : String(error)
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
