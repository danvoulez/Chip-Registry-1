import { buildMockRunEvents } from '@/lib/mocks/mockServer';

export async function GET(request: Request, { params }: { params: { runId: string } }) {
  const encoder = new TextEncoder();
  const events = buildMockRunEvents(params.runId);

  const stream = new ReadableStream({
    start(controller) {
      events.forEach((event, index) => {
        setTimeout(() => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
          if (index === events.length - 1) {
            controller.close();
          }
        }, index * 450);
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache'
    }
  });
}
