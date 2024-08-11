import readlineSync from 'readline-sync';
import fs from 'fs';
import fetch from 'node-fetch';
import { NlpManager } from 'node-nlp';

// Create an instance of NlpManager
const manager = new NlpManager({ languages: ['en'] });

// Function to ensure the URL has the protocol
const ensureUrlHasProtocol = (url) => {
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }
  return url;
};

// Function to load and add documents and responses to the NlpManager
async function loadTrainingData(filePath) {
  const url = ensureUrlHasProtocol('164.152.36.231/JSON/math_questions.json'); // Add the protocol if missing

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch data from HTTP');
    const jsonData = await response.json();

    for (const intent of jsonData.intents) {
      for (const example of intent.examples) {
        manager.addDocument('en', example, intent.intent);
      }
      for (const response of intent.responses) {
        manager.addAnswer('en', intent.intent, response);
      }
    }
  } catch (error) {
    console.error('Error loading remote data, attempting to use local file...', error);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Add documents and responses to the NlpManager
      for (const intent of data.intents) {
        for (const example of intent.examples) {
          manager.addDocument('en', example, intent.intent);
        }
        for (const response of intent.responses) {
          manager.addAnswer('en', intent.intent, response);
        }
      }
    } catch (err) {
      console.error('Error reading local file:', err);
    }
  }
}

// Function for typing effect
const typeEffect = (str) => {
  return new Promise((resolve) => {
    console.clear();
    let i = 0;
    const interval = setInterval(() => {
      process.stdout.write(str[i]);
      i++;
      if (i >= str.length) {
        clearInterval(interval);
        console.log(); // Add a new line after typing effect
        resolve();
      }
    }, Math.floor(1000 / 30)); // Approximately 30 characters per second
  });
};

(async () => {
  // Load and add training data
  await loadTrainingData('math_questions_en.json');

  // Train the model
  await manager.train();
  manager.save(); // Save the trained model

  async function main() {
    let running = true;
    while (running) {
      const ask = readlineSync.question('> ');
      const response = await manager.process('en', ask);
      await typeEffect(response.answer + '\n'); // Wait for typing effect to finish
      if (response.intent === 'greeting.bye') {
        running = false;
      }
    }
    console.log('Shutting down the chatbot...');
  }

  await typeEffect("Hello, how can I assist you?" + '\n'); // Wait for typing effect to finish
  await main(); // Wait for the main function to finish
})();
