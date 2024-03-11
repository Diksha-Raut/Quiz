const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: "What is the purpose of the <div> element in HTML?",
    answers: [
      { text: "To group and style content", correct: true },
      { text: "To create a hyperlink", correct: false },
      { text: "To insert an image", correct: false },
      { text: "To define a paragraph", correct: false },
    ],
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "HighText Machine Language", correct: false },
      { text: "HyperText Machine Language", correct: false },
      { text: "HighText Markup Language", correct: false },
    ],
  },
  {
    question: "Which property is used to change the background color?",
    answers: [
      { text: "color", correct: false },
      { text: "bgColor", correct: false },
      { text: "background-color", correct: true },
      { text: "background", correct: false },
    ],
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<script>", correct: true },
      { text: "<scripting>", correct: false },
    ],
  },
  {
    question: "What is the purpose of the document.getElementById() method in JavaScript?",
    answers: [
      { text: "To get an element by its ID", correct: true },
      { text: "To get an element by its class", correct: false },
      { text: "To get an element by its tag name", correct: false },
      { text: "To get all elements on the page", correct: false },
    ],
  },
  {
    question: "What does the typeof operator in JavaScript do?",
    answers: [
      { text: "Returns the type of a variable or expression", correct: true },
      { text: "Checks if a variable is defined", correct: false },
      { text: "Converts a value to a string", correct: false },
      { text: "Returns the length of a string", correct: false },
    ],
  },
  {
    question: "What is the purpose of the margin property in CSS?",
    answers: [
      { text: "To create space around an element", correct: true },
      { text: "To change the background color of an element", correct: false },
      { text: "To change the font size of an element", correct: false },
      { text: "To align text within an element", correct: false },
    ],
  },
  {
    question: "What does the isNaN() function in JavaScript do?",
    answers: [
      { text: "Checks if a value is not a number", correct: true },
      { text: "Converts a value to a number", correct: false },
      { text: "Checks if a value is a number", correct: false },
      { text: "Converts a value to a string", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Cascading Script Styles", correct: false },
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style Sheets", correct: false },
    ],
  },
  {
    question: "What is the purpose of the <img> tag in HTML?",
    answers: [
      { text: "To insert an image", correct: true },
      { text: "To create a hyperlink", correct: false },
      { text: "To define a paragraph", correct: false },
      { text: "To group and style content", correct: false },
    ],
  },
];

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}
