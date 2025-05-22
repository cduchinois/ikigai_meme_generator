import { Fal } from '@fal-ai/serverless-client';
import { config } from 'dotenv';
import { join } from 'path';
import { promises as fs } from 'fs';

// Load environment variables
config();

// Initialize the fal-ai client
const fal = new Fal({
  credentials: process.env.FAL_KEY_ID + ':' + process.env.FAL_KEY_SECRET,
});

async function generateImage(prompt: string) {
  try {
    const result = await fal.subscribe('fal-ai/fast-sdxl', {
      input: {
        prompt: prompt,
        image_size: '1024x1024',
        num_inference_steps: 50,
        guidance_scale: 7.5,
      },
    });

    // Save the image
    const response = await fetch(result.images[0].url);
    const buffer = await response.arrayBuffer();
    const outputPath = join(__dirname, 'output', 'ikigai_image.png');
    
    // Ensure the output directory exists
    await fs.mkdir(join(__dirname, 'output'), { recursive: true });
    await fs.writeFile(outputPath, Buffer.from(buffer));
    
    console.log(`Image saved to ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

// Get prompt from command line arguments
const prompt = process.argv[2];
if (!prompt) {
  console.error('Please provide a prompt as a command line argument');
  process.exit(1);
}

// Generate the image
generateImage(prompt)
  .then(outputPath => {
    console.log('Image generation completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Failed to generate image:', error);
    process.exit(1);
  }); 