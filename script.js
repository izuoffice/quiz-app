const questions = [
  {
    question: "1年は何ヶ月ありますか？",
    choices: ["10ヶ月", "11ヶ月", "12ヶ月", "13ヶ月"],
    answerIndex: 2,
  },
  {
    question: "日本の首都はどこですか？",
    choices: ["大阪", "京都", "名古屋", "東京"],
    answerIndex: 3,
  },
  {
    question: "水が凍る温度は摂氏何度ですか？",
    choices: ["0度", "10度", "-10度", "100度"],
    answerIndex: 0,
  },
  {
    question: "1週間は何日ですか？",
    choices: ["5日", "6日", "7日", "8日"],
    answerIndex: 2,
  },
  {
    question: "信号機で「止まれ」を表す色は何色ですか？",
    choices: ["青", "黄", "赤", "緑"],
    answerIndex: 2,
  },
  {
    question: "1時間は何分ですか？",
    choices: ["30分", "45分", "60分", "90分"],
    answerIndex: 2,
  },
  {
    question: "日本でお正月によく食べられる、餅などが入った料理は何ですか？",
    choices: ["お雑煮", "おでん", "すき焼き", "天ぷら"],
    answerIndex: 0,
  },
  {
    question: "三角形の内角の和は何度ですか？",
    choices: ["90度", "180度", "270度", "360度"],
    answerIndex: 1,
  },
  {
    question: "1メートルは何センチメートルですか？",
    choices: ["10センチメートル", "100センチメートル", "1000センチメートル", "10000センチメートル"],
    answerIndex: 1,
  },
  {
    question: "世界で最も面積が大きい大陸はどこですか？",
    choices: ["アジア", "アフリカ", "北アメリカ", "ヨーロッパ"],
    answerIndex: 0,
  },
];

const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

let currentIndex = 0;
let score = 0;

function startQuiz() {
  currentIndex = 0;
  score = 0;
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  showQuestion();
}

function showQuestion() {
  feedback.textContent = "";
  feedback.className = "feedback";
  nextBtn.hidden = true;

  const current = questions[currentIndex];
  progress.textContent = `第${currentIndex + 1}問 / 全${questions.length}問`;
  questionText.textContent = current.question;

  choicesContainer.innerHTML = "";
  current.choices.forEach((choiceLabel, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.textContent = choiceLabel;
    button.addEventListener("click", () => selectAnswer(index));
    choicesContainer.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  const current = questions[currentIndex];
  const buttons = choicesContainer.querySelectorAll(".choice-btn");

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === current.answerIndex) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("incorrect");
    }
  });

  const isCorrect = selectedIndex === current.answerIndex;
  if (isCorrect) {
    score++;
    feedback.textContent = "正解です！";
    feedback.classList.add("correct");
  } else {
    feedback.textContent = "不正解です。";
    feedback.classList.add("incorrect");
  }

  nextBtn.hidden = false;
}

function goToNext() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;
  progress.textContent = "";
  scoreText.textContent = `${questions.length}問中${score}問正解でした！`;
}

nextBtn.addEventListener("click", goToNext);
restartBtn.addEventListener("click", startQuiz);

startQuiz();
