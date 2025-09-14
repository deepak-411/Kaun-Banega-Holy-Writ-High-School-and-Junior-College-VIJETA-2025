export type Question = {
  question: string;
  options: string[];
  answer: string;
  subject: string;
};

export const quizData: { [key: string]: Question[] } = {
  "1-2": [
    {
      question: "Which animal is known as the 'King of the Jungle'?",
      options: ["Tiger", "Elephant", "Lion", "Giraffe"],
      answer: "Lion",
      subject: "General Knowledge",
    },
    {
      question: "What is 5 + 3?",
      options: ["7", "8", "9", "6"],
      answer: "8",
      subject: "Math",
    },
    {
      question: "Which of these is a fruit?",
      options: ["Carrot", "Broccoli", "Apple", "Potato"],
      answer: "Apple",
      subject: "Science",
    },
  ],
  "3-5": [
    {
      question: "What is the capital of India?",
      options: ["Mumbai", "Kolkata", "New Delhi", "Chennai"],
      answer: "New Delhi",
      subject: "Social Studies",
    },
    {
      question: "What is 12 multiplied by 5?",
      options: ["50", "55", "65", "60"],
      answer: "60",
      subject: "Math",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
      subject: "Science",
    },
  ],
  "6-8": [
    {
      question: "Who wrote the Indian National Anthem?",
      options: ["Bankim Chandra Chatterjee", "Rabindranath Tagore", "Sarojini Naidu", "Mahatma Gandhi"],
      answer: "Rabindranath Tagore",
      subject: "History",
    },
    {
      question: "What is the chemical formula for water?",
      options: ["O2", "CO2", "H2O", "NaCl"],
      answer: "H2O",
      subject: "Science",
    },
    {
      question: "Find the value of x if x + 15 = 25.",
      options: ["5", "15", "10", "20"],
      answer: "10",
      subject: "Math",
    },
  ],
  "9-12": [
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Ribosome", "Mitochondrion", "Cell Wall"],
      answer: "Mitochondrion",
      subject: "Biology",
    },
    {
      question: "In which year did India get its independence?",
      options: ["1950", "1947", "1942", "1951"],
      answer: "1947",
      subject: "History",
    },
    {
      question: "What is the value of Pi (π) up to two decimal places?",
      options: ["3.12", "3.14", "3.16", "3.18"],
      answer: "3.14",
      subject: "Math",
    },
  ],
};
