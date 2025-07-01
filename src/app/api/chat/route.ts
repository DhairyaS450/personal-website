import { google } from '@ai-sdk/google';
import { streamText, convertToCoreMessages } from 'ai';
import { chatbotTools, getSystemPrompt } from '@/lib/chatbotTools';

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

    // Use the unified system prompt following 2025 best practices
    const systemPrompt = getSystemPrompt(); 

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
