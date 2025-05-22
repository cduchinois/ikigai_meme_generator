# Ikigai Meme Generator

![Ikigai Meme Generator](https://v3.fal.media/files/elephant/AuJOskIPXXBH4Ae-JtgqA.png)

A creative tool that generates personalized memes based on your Ikigai analysis results. This project combines the Japanese concept of Ikigai (your reason for being) with AI-powered image generation to create unique visual representations of your life's purpose.

## Features

- Generate personalized memes based on your Ikigai analysis
- Uses AI image generation to create unique visual representations
- Combines your passions, skills, mission, and vocation into a single image
- Supports both text-based prompts and structured Ikigai analysis results

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Fal.ai API key (for image generation)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ikigai-meme-generator.git
cd ikigai-meme-generator
```

2. Install dependencies:
```bash
npm install
```

3. Get your Fal.ai API credentials:
   - Visit [fal.ai](https://fal.ai/)
   - Sign up for an account
   - Navigate to your dashboard to get your API credentials

4. Create a `.env` file in the root directory and add your Fal.ai API credentials:
```
FAL_KEY_ID=your_key_id
FAL_KEY_SECRET=your_key_secret
```

## Usage

### Using with Ikigai Analysis Results

1. After completing your Ikigai analysis, you'll receive a structured result containing:
   - What you love
   - What you're good at
   - What the world needs
   - What you can be paid for

2. Run the generator with your analysis results:
```bash
npm start "Your Ikigai analysis results here"
```

### Using with Custom Prompts

You can also provide your own custom prompt:
```bash
npm start "A serene person meditating under a sakura tree, surrounded by elements representing [your passions], [your skills], [world needs], and [your vocation]"
```

## Example

Input:
```
What I Love: Creating art, teaching others
What I'm Good At: Problem-solving, communication
What the World Needs: Environmental awareness, education
What I Can Be Paid For: Consulting, project management
```

The generator will create a unique image that combines these elements into a cohesive visual representation of your Ikigai.

## Development

To run the project in development mode:
```bash
npm run dev
```

To run tests:
```bash
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the Japanese concept of Ikigai
- Powered by [Fal.ai](https://fal.ai/) for image generation
- Built with TypeScript and Node.js 