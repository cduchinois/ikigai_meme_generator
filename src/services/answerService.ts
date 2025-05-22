interface UserAnswer {
  questionId: string;
  answer: string;
  category: string;
}

interface StoredAnswers {
  sessionId: string;
  answers: UserAnswer[];
  timestamp: string;
}

// In-memory storage for answers (in a real app, this would be a database)
const storedAnswers: { [key: string]: StoredAnswers } = {};

export const storeAnswers = (sessionId: string, answers: UserAnswer[]): void => {
  storedAnswers[sessionId] = {
    sessionId,
    answers,
    timestamp: new Date().toISOString()
  };
};

export const getAnswers = (sessionId: string): StoredAnswers | undefined => {
  return storedAnswers[sessionId];
};

export const generatePromptFromAnswers = (answers: UserAnswer[]): string => {
  // Group answers by category
  const categoryAnswers = answers.reduce((acc, answer) => {
    if (!acc[answer.category]) {
      acc[answer.category] = [];
    }
    acc[answer.category].push(answer.answer);
    return acc;
  }, {} as { [key: string]: string[] });

  // Create prompt sections for each category
  const whatILove = categoryAnswers["What I Love"]?.join(", ") || "";
  const whatImGoodAt = categoryAnswers["What I'm Good At"]?.join(", ") || "";
  const whatWorldNeeds = categoryAnswers["What the World Needs"]?.join(", ") || "";
  const whatICanBePaidFor = categoryAnswers["What I Can Be Paid For"]?.join(", ") || "";

  // Generate the final prompt
  return `A serene, gender-neutral person meditating under a sakura tree, surrounded by symbolic Ikigai elements: 
    ${whatILove} (represented by hearts and artistic elements), 
    ${whatImGoodAt} (represented by gears and tools), 
    ${whatWorldNeeds} (represented by a globe with connecting nodes), 
    ${whatICanBePaidFor} (represented by coins and professional symbols). 
    The scene uses earthy terracotta, sage green, gold, and indigo colors. 
    The style is a blend of minimalist watercolor and cyberpunk-mandala, ultra-detailed.`;
}; 