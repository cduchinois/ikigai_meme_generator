import { storeAnswers, generatePromptFromAnswers } from '../services/answerService';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Sample user answers for testing
const sampleAnswers = [
  {
    questionId: 'love1',
    answer: 'I love creating art and expressing myself through different mediums',
    category: 'What I Love'
  },
  {
    questionId: 'good1',
    answer: 'I am good at problem-solving and analytical thinking',
    category: 'What I'm Good At'
  },
  {
    questionId: 'world1',
    answer: 'The world needs more sustainable solutions and environmental awareness',
    category: 'What the World Needs'
  },
  {
    questionId: 'paid1',
    answer: 'I can be paid for consulting and project management',
    category: 'What I Can Be Paid For'
  }
];

async function testFlow() {
  try {
    // Generate a unique session ID
    const sessionId = `test_${Date.now()}`;
    console.log('Generated session ID:', sessionId);

    // Store the answers
    storeAnswers(sessionId, sampleAnswers);
    console.log('Stored answers for session:', sessionId);

    // Generate the prompt
    const prompt = generatePromptFromAnswers(sampleAnswers);
    console.log('Generated prompt:', prompt);

    // Run the ikigai_meme.ts script with the generated prompt
    const { stdout, stderr } = await execAsync(`node ../ikigai_meme.ts "${prompt}"`);
    console.log('Script output:', stdout);
    if (stderr) {
      console.error('Script errors:', stderr);
    }

    console.log('Test flow completed successfully');
  } catch (error) {
    console.error('Error in test flow:', error);
    process.exit(1);
  }
}

// Run the test flow
testFlow(); 