const btnrules = document.querySelector('.rules-btn')
const btnclose = document.querySelector('.close-btn')
const popuprules = document.querySelector('.popup')

const CHOICES = [
    {
        name: "rock",
        beats: "scissor"
    }, 
    {
        name: "scissor",
        beats: "paper"
    },
    {
        name: "paper",
        beats: "rock"
    },
]

const choiceButtons = document.querySelectorAll('.choice-btn')
const gameDiv = document.querySelector('.game')
const resultDiv = document.querySelector('.secpage')
const resultDivs = document.querySelectorAll('.results')
const resultwinner = document.querySelector('.results_winner')
const resulttext = document.querySelector('.results_text')

const playAgainBtn = document.querySelector('.play_again')
let yscore=JSON.parse(localStorage.getItem("ysc"))
let yscoreElem=document.getElementById("your_score_number")
if(yscore){
    yscoreElem.innerText=yscore;
}
let ycount=0;

let cscore=JSON.parse(localStorage.getItem("csc"))
let cscoreElem=document.getElementById("comp_score_number")
if(cscore){
    cscoreElem.innerText=cscore;
}
let ccount=0;

choiceButtons.forEach( button => {
    button.addEventListener('click', () => {
         const choiceName = button.dataset.choice;
         const choice = CHOICES.find(choice => choice.name === choiceName)
         choose(choice)
    })
})

function choose(choice){
    const aichoice =  aiChoose() 
    displayResults([choice, aichoice])
    displaywinner([choice,aichoice])
}

function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length)
    return CHOICES[rand]
}

function displayResults(result) {
    resultDivs.forEach((resultDiv, idx) => {
       setTimeout(() => {
        resultDiv.innerHTML =`
        <div class="choice ${result[idx].name}">
            <img src="${result[idx].name}.png" alt="${result[idx].name}" 
        />
        </div>
        `;
       }, ); 
    }); 

    gameDiv.classList.toggle('hidden')
    resultDiv.classList.toggle('hidden')

}  

function displaywinner(result) {
    setTimeout(() => {
        const userWins = isWinner(result)
        const aiWins = isWinner(result.reverse())

        if(userWins) {
            resulttext.innerText = "you win"
            ycount=yscore;
            ycount++;
            yscoreElem.innerText=ycount;
            localStorage.setItem("ysc", JSON.stringify(ycount));
        }
        else if(aiWins) {
            resulttext.innerText = "you lose"
            ccount=cscore;
            ccount++;
            cscoreElem.innerText=ccount;
            localStorage.setItem("csc", JSON.stringify(ccount));
            
        }
        else { 
            resulttext.innerText = "draw"
            }
        resultwinner.classList.toggle("hidden");
        resultDiv.classList.toggle("show_winner");
        }, );
    }

function isWinner(result) {
    return result[0].beats == result[1].name;
}



playAgainBtn.addEventListener('click', () => {
    window.location.reload();
})

btnrules.addEventListener('click', () => {
    popuprules.classList.toggle('show_popup')
});
btnclose.addEventListener('click', () => {
    popuprules.classList.toggle('show_popup')
});