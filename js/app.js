//getUsername();


var quiz = {
    // (A) PROPERTIES
    // (A1) QUESTIONS & ANSWERS
    // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
    data: [
    {
      q : "What is the standard distance between the target and archer in Olympics?",
      o : [
        "50 meters",
        "70 meters",
        "100 meters",
        "120 meters"
      ],
      a : 1 // arrays start with 0, so answer is 70 meters
    },
    {
      q : "Which is the highest number on a standard roulette wheel?",
      o : [
        "22",
        "24",
        "32",
        "36"
      ],
      a : 3
    },
    {
      q : "How much wood could a woodchuck chuck if a woodchuck would chuck wood?",
      o : [
        "150 KG",
        "200 KG",
        "350 KG",
        "420 KG"
      ],
      a : 2
    },
    {
      q : "Which is the seventh planet from the sun?",
      o : [
        "Uranus",
        "Earth",
        "Pluto",
        "Mars"
      ],
      a : 0
    },
    {
      q : "Which is the largest ocean on Earth?",
      o : [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean"
      ],
      a : 3
    }
    ],
  
    // (A2) HTML ELEMENTS
    hWrap: null, // HTML quiz container
    hQn: null, // HTML question wrapper
    hAns: null, // HTML answers wrapper
  
    // (A3) GAME FLAGS
    now: 0, // current question
    score: 0, // current score
  
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

      


      if (correct) {
        quiz.score++;
        option.classList.add("correct");
      } else {
        option.classList.add("wrong");
      }

      let qAndA = [];

      qAndA.push({
        question:quiz.data[quiz.now].q,
        answer:correct
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
          quiz.hQn.innerHTML = `<button class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal"> <h3>You have answered ${quiz.score} of ${quiz.data.length} correctly.<h3></button>
          
          
          <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      

      
      <table class="table">
      <thead class="thead-dark">
    <tr>
    <th scope="col">#</th>
      <th scope="col">Qustions</th>
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

      
      

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`;
          quiz.hAns.innerHTML = "";
        }
      }, 1000);
    },
  
    // (E) RESTART QUIZ
    // reset : () => {
    //   quiz.now = 0;
    //   quiz.score = 0;
    //   quiz.draw();
    // }
  };
  window.addEventListener("load", quiz.init);

// function getUsername() {
//   let formData = document.getElementById("username-form");
//   formData.addEventListener("submit", (e) => {
//     e.preventDefault()

//     let username = document.getElementById("username").value;
//     console.log("username: ", username);
//   })


// }