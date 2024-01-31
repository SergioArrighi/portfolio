/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchOpenAI(question, thread, env) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${env.ASSISTANT_KEY}`,
    'OpenAI-Beta': 'assistants=v1'
  }

  let run;
  let threadJson;
  // If threadId retrieve the thread and add message, else create a new thread with the question
  if (thread !== null) {
    const result = await fetch(`${env.OPEN_AI_URL}/threads/${thread}/messages`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ role: 'user', content: question }),
    });
    run = await fetch(`${env.OPEN_AI_URL}/threads/${thread}/runs`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ assistant_id: env.ASSISTANT_ID }),
    });
  } else {
    // Create thread and run
    run = await fetch(`${env.OPEN_AI_URL}/threads/runs`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        assistant_id: env.ASSISTANT_ID,
        thread: {
          messages: [{ role: 'user', content: question }]
        }
      }),
    });
  }

  let runJson = await run.json();
  // Wait for the run status to be final
  while(!['expired', 'completed', 'failed', 'cancelled'].includes(runJson.status)) {
    await sleep(Number(env.RUN_PULL_DELAY));
    run = await fetch(`${env.OPEN_AI_URL}/threads/${runJson.thread_id}/runs/${runJson.id}`, {
      method: 'GET',
      headers: headers,
    })
    runJson = await run.json();
  }

  // If run completed successfully, retrieve the thread messages and return the first one
  if (runJson.status === 'completed') {
    const messages = await fetch(`${env.OPEN_AI_URL}/threads/${runJson.thread_id}/messages`, {
      method: 'GET',
      headers: headers,
    });
    const messagesJson = await messages.json();
    const messageJson = messagesJson.data[0];
    return JSON.stringify({ id: messageJson.id, thread: runJson.thread_id, text: messageJson.content[0].text.value });
  } else
    throw Error(`Error during GPT run (${runJson.status})`);
}

export default {
  async fetch(request, env, ctx) {
    const responseHeaders = {
      'Access-Control-Allow-Origin': 'https://www.sarrighi.info',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    const { searchParams } = new URL(request.url);
    const question = searchParams.get('question');
    if (!question) {
      return new Response('Question parameter is missing', { status: 400 });
    }
    const thread = searchParams.get('thread');
    try {
      const response = await fetchOpenAI(question, thread, env);
      return new Response(response, { 
        status: 200,
        headers: responseHeaders,
      });
    } catch (e) {
      return new Response(`ChatGPT bridge error: ${e.message}`, { 
        status: 500,
        headers: responseHeaders,
      });
    }
  },
};