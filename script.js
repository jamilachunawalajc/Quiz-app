const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
        { text: "Shark" , correct: false},
        { text: "Blue Whale" , correct: true},
        { text: "Elephant" , correct: false},
        { text: "Giraffe" , correct: false},
        
        
    ]
  },

  {
    question: "Which is smallest country in the world?",
    answers: [
        { text: "Vatican city" , correct: true},
        { text: "Bhutan" , correct: false},
        { text: "Nepal" , correct: false},
        { text: "Shri Lanka" , correct: false},
        
        
    ]
  },

  {
    question: "Which is largest desert in the world?",
    answers: [
        { text: "Kalahari" , correct: false},
        { text: "Gobi" , correct: false},
        { text: "Sahara" , correct: false},
        { text: "Antartica" , correct: true},
        
        
    ]
  },

  {
    question: "Which is smallest continent in the world?",
    answers: [
        { text: "Asia" , correct: false},
        { text: "Australia" , correct: true},
        { text: "Arctic" , correct: false},
        { text: "Africa" , correct: false},
      ]
  },
];

const questionElement = document.querySelector('#question');

const answerButtons = document.querySelector('#answer-buttons');

const nextButton = document.querySelector('#next-btn');

let currentQuestionIndex = 0;
let score = 0;

 function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
 }

 function showQuestion() {

  // to reset previous question and answer
  resetState();

  //to display question with question no
  let currentQuestion = questions[currentQuestionIndex];
  // + 1 as array index starts from 0
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;


  // to display answer 
  currentQuestion.answers.forEach( answer => {
    //generate a button for each answer
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    //add css styling of html btn to the js generated button by using classList.add
    button.classList.add("btn");

    // as we have to add answers in answer-buttons div we will use append child to add js generated button to the html div answer-buttons
    //appendChild(button) means put button inside the answerButtons
    answerButtons.appendChild(button);
      
     if(answer.correct) {

      //it will add value of answer.correct in the dataset-correct
      //dataset is used to store extra information on an html element
      button.dataset.correct = answer.correct;
     }

    button.addEventListener("click" , selectAnswer)
  }); 
 }


 function resetState() {
 //it will remove all the previous answers
  nextButton.style.display = 'none';
  while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild)
  }
 }

 function selectAnswer(e) {

  //e.target tells the button you clicked
  const selectedBtn = e.target;
  
 //selectedBtn is now the same button that we originally called button
  const isCorrect = selectedBtn.dataset.correct === 'true';
  
  //this part of code only goes through or works on the button user clicked and displays the correct or incorrect for the user clicked button and not the actual correct answer
   if(isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
   } else {
    selectedBtn.classList.add("incorrect");
   }


   //this part of code goes through all the buttons
   //it finds the correct btn and adds the class correct to the actual correct answer
   //create an array from all the buttons inside answerButtons
   Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === 'true') {
      button.classList.add('correct');
    }

    //diabled=true means all the buttons will be disabled
    button.disabled = true;
   });
   nextButton.style.display = "block";
 }

 function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = 'Play Again';
  nextButton.style.display = "block";

 }

 function handleNextButton() {
  //increase the question number and if there is another question show it
  //remember : array index starts from 0 and ques.len counts from 1
   currentQuestionIndex++;
   if(currentQuestionIndex < questions.length) {
    showQuestion();
   } else {
    showScore();
   }
 }

 nextButton.addEventListener("click" , () => {
  if(currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
 })
 
 startQuiz();