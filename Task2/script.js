const questions=[
    {
        question: "HTML is considered as_________",
        answers: [
            {text:"Programming language", correct: false},
            {text:"OOP language ", correct: false},
            {text:" High level language ", correct: false},
            {text:" Markup language ", correct: true},
        ]
    },
    {
        question: "The HTML attribute used to define the inline styles is_________",
        answers: [
            {text:"style", correct: true},
            {text:"styles", correct: false},
            {text:"class", correct: false},
            {text:"None of the above", correct: false},
        ]
    },
    {
        question: "CSS stands for _________",
        answers: [
            {text:"Cascade style sheets", correct: false},
            {text:"Color and style sheets ", correct: false},
            {text:" Cascading style sheets ", correct: true},
            {text:" None of the above ", correct: false},
        ]
    },
    {
        question: "The function and var are known as_________",
        answers: [
            {text:"Keywords", correct: false},
            {text:"Data types ", correct: false},
            {text:" Declaration statements ", correct: true},
            {text:" Prototypes ", correct: false},
        ]
    },
    {
        question: " Which of the following number object function returns the value of the number?",
        answers: [
            {text:"toString()", correct: false},
            {text:"valueOf() ", correct: true},
            {text:" toLocaleString() ", correct: false},
            {text:" toPrecision() ", correct: false},
        ]
    }
];

const questionElement =document.getElementById("question");
const answerButton = document.getElementById("ans-button");
const nextButton = document.getElementById("next-btn");
// const img =document.getElementById("img");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML="Next";
    showQuestions();
}
function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML =questionNo + ". "+currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display="none" ;
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");;
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showImg(){
    if(score>=2){
        const img= document.createElement("img");
        img.src="/win.gif";
        const image=document.getElementsByClassName("img");
        image[0].appendChild(img);
        image.disabled=true;
        }else{
            const img= document.createElement("img");
        img.src="/lose.gif";
        const image=document.getElementsByClassName("img");
        image[0].appendChild(img);
        }
}
function showScore(){
    resetState();
    questionElement.innerHTML= `You scored ${score} out of ${questions.length}!`;
    nextButton.style.display="block";
    nextButton.innerHTML="Play Again";
}
function handleNextButton(){
    currentQuestionIndex++ ;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }else{
        showScore();
        showImg();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

