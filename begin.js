const question = document.getElementById('question');
const mcqss = Array.from(document.getElementsByClassName("mcqs-answer"));
const standingss = document.getElementById('standings');
const quizCounterr = document.getElementById('quizCounter');
const highestquiz = 15;

let currentquiz = {};
let newanswers = false;
let standings = 0;
let counter = 0;
let entirequiz = [];
let quizes = [];

fetch('https://opentdb.com/api.php?amount=15&category=9&difficulty=medium&type=multiple')


.then((res) => {
        return res.json();
    })
    .then((addedQuestions) => {
        quizes = addedQuestions.results.map((addedQuestion) => {
            const editedQuestion = {
                question: addedQuestion.question

            };

            const answerMcqs = [...addedQuestion.incorrect_answers];
            editedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerMcqs.splice(editedQuestion.answer - 1, 0,
                addedQuestion.correct_answer);
            answerMcqs.forEach((mcqs, index) => {
                editedQuestion['mcqs' + (index + 1)] = mcqs;
            });
            return editedQuestion;


        })


        begin();
    });


begin = () => {
    counter = 0;
    standings = 0;
    entirequiz = [...quizes];
    getNewQuiz();

};
getNewQuiz = () => {

    counter++;
    quizCounterr.innerText = counter + "/" + highestquiz;
    const index = Math.floor(Math.random() * entirequiz.length);
    currentquiz = entirequiz[index];
    question.innerHTML = currentquiz.question;

    mcqss.forEach(mcqs => {
        const number = mcqs.dataset["number"];
        mcqs.innerHTML = currentquiz["mcqs" + number];
    });
    entirequiz.splice(index, 1);
    newanswers = true;
    if (entirequiz.length === 0 || counter > highestquiz) {
        localStorage.setItem("currentscoree", standings);
        return location.assign('finishattempt.html');
    };

};
mcqss.forEach(mcqs =>

    {
        mcqs.addEventListener("click", e => {
            if (!newanswers) return;
            newanswers = false;
            const clickedMcq = e.target;
            const clickedAnswer = clickedMcq.dataset["number"];


            let classInput;
            if (clickedAnswer == currentquiz.answer) {
                classInput = 'correct';
                increasestandings(highestquiz);

            } else {
                classInput = 'incorrect';

            }

            clickedMcq.parentElement.classList.add(classInput);
            setTimeout(() => {
                clickedMcq.parentElement.classList.remove(classInput);
                getNewQuiz();

            }, 1400);

        });
    });

increasestandings = number => {
    standings += number;
    standingss.innerText = standings;
};