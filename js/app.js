//getUsername();
let players = JSON.parse(localStorage.getItem("players") || "[]");


var quiz = {
    data: [
    {
      q: "How many provinces does South Africa have?",
      o: [
        "Seven",
        "Nine",
        "Five",
        "Eleven"
      ],
      a : 1 
    },
    {
      q: "Which of the following countries have borders with South Africa?",
      o: [
        "Angola",
        "Mozambique",
        "Zimbabwe",
        "Lesotho"
      ],
      a : 3
    },
    {
      q: "Which tree is the national tree of South Africa?",
      o: [
        "Mahogany tree",
        "Fir tree",
        "Boabab tree",
        "Yellowwood tree"
      ],
      a : 2
    },
    {
      q: "Which is the longest river in South Africa?",
      o: [
        "Orange river",
        "White river",
        "Yellow river",
        "Pink river"
      ],
      a : 0
    },
    {
      q: "Who was elected president in 1994?",
      o: [
        "Jacom Zuma",
        "Barack Obama",
        "F.W. de Klerk",
        "Nelson Mandela"
      ],
      a : 3
    }
    ],
  
    
    hWrap: null, 
    hQn: null, 
    hAns: null, 
  
    
    now: 0, 
    score: 0, 
  
    // (B) INIT QUIZ HTML
    init: () => {
      // (B1) WRAPPER
      quiz.hWrap = document.getElementById("quizWrap");
  
      // (B2) QUESTIONS SECTION
      quiz.hQn = document.createElement("div");
      quiz.hQn.id = "quizQn";
      quiz.hWrap.appendChild(quiz.hQn);
  
      // (B3) ANSWERS SECTION
      quiz.hAns = document.createElement("div");
      quiz.hAns.id = "quizAns";
      quiz.hWrap.appendChild(quiz.hAns);
  
      // (B4) GO!
      quiz.draw();
    },
  
    // (C) DRAW QUESTION
    draw: () => {
      // (C1) QUESTION
      quiz.hQn.innerHTML = quiz.data[quiz.now].q;
  
      // (C2) OPTIONS
      quiz.hAns.innerHTML = "";
      for (let i in quiz.data[quiz.now].o) {
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quiz";
        radio.id = "quizo" + i;
        quiz.hAns.appendChild(radio);
        let label = document.createElement("label");
        label.innerHTML = quiz.data[quiz.now].o[i];
        label.setAttribute("for", "quizo" + i);
        label.dataset.idx = i;
        label.addEventListener("click", () => { quiz.select(label); });
        quiz.hAns.appendChild(label);
      }
    },
  
    // (D) OPTION SELECTED
    select: (option) => {
      // (D1) DETACH ALL ONCLICK
      let all = quiz.hAns.getElementsByTagName("label");
      for (let label of all) {
        label.removeEventListener("click", quiz.select);
      }
  
      // (D2) CHECK IF CORRECT
      let correct = option.dataset.idx == quiz.data[quiz.now].a;

      

      let answer;
      


      if (correct) {
        quiz.score++;
        option.classList.add("correct");
        answer="Correct";
      } else {
        option.classList.add("wrong");
        answer="Incorrect"
      }

      let qAndA = [];

      qAndA.push({
        question:quiz.data[quiz.now].q,
        answer:answer
      });

      let existingdata = JSON.parse(localStorage.getItem('qAndA')) || [];
      let combinedata= existingdata.concat(qAndA);
      localStorage.setItem('qAndA', JSON.stringify(combinedata));
  
      let allData;

      let storeddata=localStorage.getItem('qAndA');

      allData= JSON.parse(storeddata);
      console.log(allData)
      // (D3) NEXT QUESTION OR END GAME
      quiz.now++;
      setTimeout(() => {
        if (quiz.now < quiz.data.length) { quiz.draw(); }
        else {
          console.log("setting score")
          setPlayer(quiz.score)
          quiz.hQn.innerHTML = `<button class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal"> <h3>Review Your Answers<h3></button>
          
          
          <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
  <div class="modal-dialog modal-dialog-centered" >
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      

      
      <h5>
      <table class="table">
      <thead class="thead-dark">
    <tr>
    <th scope="col">#</th>
      <th scope="col">Questions</th>
      <th scope="col">Your Answer</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>${allData[0].question}</td>
      <td>${allData[0].answer}</td>
      
    </tr>
    
    <tr>
      <th scope="row">2</th>
      <td>${allData[1].question}</td>
      <td>${allData[1].answer}</td>
      
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>${allData[2].question}</td>
      <td>${allData[2].answer}</td>
      
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>${allData[3].question}</td>
      <td>${allData[3].answer}</td>
      
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>${allData[4].question}</td>
      <td>${allData[4].answer}</td>
      
    </tr>
    </tbody>
</table>
</h5>

                  
                  

      </div>
      <div class="modal-footer justify-content-center">
      <h4 class="text-secondary ">${localStorage.getItem('username')}! You have answered ${quiz.score} of ${quiz.data.length} correctly.<h4>
        <button type="button" class="btn btn-primary" onclick="removeQandA()"><a class="text-white" href="./userInput.html">Restart Quiz</a></button>
      </div>
    </div>
  </div>
</div>`;
localStorage.setItem('score',quiz.score);
          quiz.hAns.innerHTML = "";
        }
      }, 1000);
    },
  };
  console.log(quiz.score);
  window.addEventListener("load", quiz.init);


displayLadderBoard()
getUsername();

function getUsername() {
  let formData = document.getElementById("userName-input");
  formData.addEventListener("submit", (e) => {
    e.preventDefault()

    let username = document.getElementById("userName").value;
    console.log("username: ", username);
    localStorage.setItem("username", username);
    window.location.replace("http://127.0.0.1:5501/index.html")
    
  })
}
function removeQandA(){
  localStorage.removeItem('qAndA');
}

function setPlayer(score) {
  let player = {
    username: localStorage.getItem("username"),
    score: parseInt(score)
  }
  players.push(player)
  localStorage.setItem("players", JSON.stringify(players))
  console.log(localStorage)
}

function displayLadderBoard() {
  let scoreDisplay = document.getElementById("scoreDisplay");
  scoreDisplay.innerHTML = "";

  for (let i = 0; i < players.length; i++) {
    scoreDisplay.innerHTML += `
    <div class="col-lg-6 col-6 text-start">
        <p>${players[i].username}</p>
    </div>
    <div class="col-lg-6 col-6 text-end">
        <p>${players[i].score} / 5</p>
    </div>
    <hr>
    `
  }
}

function reloadQuiz() {
  location.reload()
}