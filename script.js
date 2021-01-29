const quiz = document.getElementById("quiz");
        const scoreBoard = document.getElementById("scores");
        const submitBtn = document.getElementById("submit");
        const previousBtn = document.getElementById("previous");
        const nextBtn = document.getElementById("next");
        const quizContent = document.getElementById("quiz-content");
        let displayQ = 0;


      //define questions in array w/ answers
        const question = [
            {
                question: "Javascript is utilized in ______ development",
                answers: {
                    A: "emotional",
                    B: "web",
                    C: "jet engine"
                },
                correctAnswer: "B"
            },
            {
                question: "Which of these executes code in javascript?",
                answers: {
                    A: "functions",
                    B: "igniters",
                    C: "jumpers"
                },
                correctAnswer: "A"
            },
            {
                question: "Which of the following is a Javascript library?",
                answers: {
                    A: "Jquesey",
                    B: "Qjourney",
                    C: "Jquery",
                },
                correctAnswer: "C"
            }
        ];
            //function to actually display the quiz via activeQ (active question visible) and radio buttons
        function showQuiz() {
            const quizRslt = [];
            //function to display each question array propery
            question.forEach(function (currentQuestion, questionNumber) {
                const multipleChoice = [];
                //display answers for current question
                for (letter in currentQuestion.answers) {
                    multipleChoice.push(
                        `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}"/>
                ${letter} : 
                ${currentQuestion.answers[letter]}
            </label>`
                    );
                }
                //display current question
                quizRslt.push(
                    `<div class="qContainer">
        <div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${multipleChoice.join('')} </div>
        </div>`
                );
            }
            );

            quiz.innerHTML = quizRslt.join('');
        };

        //function to display results
        function quizScore() {
            const answerDivs = quiz.querySelectorAll('.answers');

            let correctAnswers = 0;

            question.forEach(function (currentQuestion, questionNumber) {
                const answerDiv = answerDivs[questionNumber];
                const selector = `input[name=question${questionNumber}]:checked`;
                const userSelection = (answerDiv.querySelector(selector) || {}).value;

                //if correct answer
                if (userSelection === currentQuestion.correctAnswer) {
                    correctAnswers++;

                    //answer color at end of quiz
                    answerDivs[questionNumber].style.color = 'green';
                }
                else {
                    answerDivs[questionNumber].style.color = "red";
                }
            });

            scoreBoard.innerHTML = `${correctAnswers} out of ${question.length}`;
        };

        //function to display active slide
        function quizQ(n) {
            activeQ[displayQ].classList.remove('active-container');
            activeQ[n].classList.add('active-container');
            displayQ = n;
            if (displayQ === 0) {
                previousBtn.style.display = "none";
            }
            else {
                previousBtn.style.display = 'inline-block';
            }
            if (displayQ === activeQ.length - 1) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'inline-block';
            }
            else {
                nextBtn.style.display = 'inline-block';
                submitBtn.style.display = 'none';
            }
        };

       

        //call quiz function 
        showQuiz();

        const activeQ = document.querySelectorAll(".qContainer");
        //defined after showQuiz because slide class defined in that function

        quizQ(displayQ);

        function showNextQ() {
            quizQ(displayQ + 1);
        };
        function showPreviousQ() {
            quizQ(displayQ - 1)
        };

        //countdown timer
        //set it to 60 seconds
        let timeleft = 60;
        let countdownTimer = setInterval(function () {
            if (timeleft <= 0) {
                clearInterval(countdownTimer);
                //make quiz content div disappear at 0
                quizContent.style.display = "none";
                document.getElementById("countdown").innerHTML = "You ran out of time!";
            } else {
                document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
            }
            timeleft -= 1;
        }, 1000);

        //eventlisteners for button clicks
        previousBtn.addEventListener("click", showPreviousQ);
        nextBtn.addEventListener("click", showNextQ);
        $(submitBtn).on("click", quizScore);
