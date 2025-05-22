import { fal } from "@fal-ai/client";
import * as fs from 'fs';
import * as path from 'path';

// Make sure your FAL_KEY environment variable is set before running this script

async function generateImage(prompt: string) {
  console.log("Generating image with prompt:", prompt);
  
  const result = await fal.subscribe("fal-ai/flux/dev", {
    input: {
      prompt: prompt
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        update.logs.map((log) => log.message).forEach(console.log);
      }
    },
  });

  // The API response structure might be different, let's log the entire result first
  console.log("Full result:", JSON.stringify(result, null, 2));
  
  // Save the image URL to a file
  const outputDir = path.join(__dirname, 'generated_images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputFile = path.join(outputDir, `ikigai_${timestamp}.json`);
  
  fs.writeFileSync(outputFile, JSON.stringify({
    prompt,
    imageUrl: result.image?.url,
    requestId: result.requestId
  }, null, 2));
  
  console.log(`Results saved to: ${outputFile}`);
  return result.image?.url;
}

// Get the prompt from command line arguments
const prompt = process.argv[2];
if (!prompt) {
  console.error("Please provide a prompt as a command line argument");
  process.exit(1);
}

generateImage(prompt).catch(console.error);
