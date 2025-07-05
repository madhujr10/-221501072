const fetch = require('node-fetch'); // If using Node.js < 18, else use global fetch

const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';

/**

 * @param {string} stack - "backend" or "frontend"
 * @param {string} level - "debug", "info", "warn", "error", "fatal"
 * @param {string} pkg - package name (see allowed list)
 * @param {string} message - descriptive log message
 */
async function Log(stack, level, pkg, message) {
  const body = {
    stack,
    level,
    package: pkg,
    message,
  };

  try {
    const response = await fetch(LOG_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error('Failed to send log:', response.status, await response.text());
    } else {
      const data = await response.json();
      console.log('Log sent:', data);
    }
  } catch (err) {
    console.error('Error sending log:', err);
  }
}

module.exports = { Log };
