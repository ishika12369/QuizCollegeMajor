let Score=0;
let url=null;
let button = document.querySelector('button');
let form=document.querySelector('form');
let category=document.querySelector('#category');
let level=document.querySelector('#level');
form.addEventListener('submit',(Event)=>{
  Event.preventDefault();
  let selectCat=category.value;
  let slectLev=level.value;
  url=`https://opentdb.com/api.php?amount=10&category=${selectCat}&difficulty=${slectLev.toLowerCase()}&type=multiple`;
  fetch(url).then((response)=>{
    response.json().then((value)=>{
    fillingdata(value,0);
    
        
    });
    let quizpage=document.querySelector('.quiz')
    quizpage.classList.remove('hideMe');
  })
  let home=document.querySelector(".homePage");
  home.classList.add('hideMe');
})
function fillingdata(response,indexNo)
{
    if(indexNo>9)
    {
        showresult();
        return;
    }
    let question=document.getElementById('questionState');
    let questionNo=document.getElementById('qNo');
    let options=document.querySelectorAll('.quiz label')
    let entry=response.results[indexNo];
    question.innerHTML=entry.question;
    questionNo.innerHTML=indexNo+1;
    options[0].innerHTML=entry.correct_answer;
    options[1].innerHTML=entry.incorrect_answers[0];
    options[2].innerHTML=entry.incorrect_answers[1];
    options[3].innerHTML=entry.incorrect_answers[2];
    for(let i=0;i<options.length;i++)
    {
        let random=Math.floor(Math.random()*options.length);
        let temp=options[i].innerHTML;
        options[i].innerHTML=options[random].innerHTML;
        options[random].innerHTML=temp;
        
    }
    
  let nextbutton=document.querySelector('#nextBtn');
 
 
  nextbutton.onclick=()=>{
      console.log(entry.correct_answer);
   if( checkAnswer(entry.correct_answer))
   {
     Score+=1;
   }
   
    fillingdata(response,indexNo+1);

  };
  
}
function checkAnswer(correct_answer)
{
    let a=document.querySelectorAll('.optionCon input')
    let selected=null;
    for(let i of a )
    {
        if(i.checked)
        {
            selected=i;
            break;
        }
    }
    let selectedAns=selected.nextElementSibling.innerText;
    console.log(selectedAns,correct_answer);
    return selectedAns===correct_answer;
    
}

function showresult()
{
    let home=document.querySelector('.homePage');
    let QUiz=document.querySelector('.quiz');
    home.classList.add('hideMe');
    QUiz.classList.add('hideMe');
    document.querySelector('.score').classList.remove('hideMe');
    let ourspans=document.querySelectorAll('.score span');
    ourspans[0].innerText=Score;
    ourspans[1].innerText=10-Score;
    ourspans[2].innerText=`${Score*10}/100`;
}
document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('Retake').addEventListener('click',()=>{
        window.location.reload();
    })
})
//https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple
