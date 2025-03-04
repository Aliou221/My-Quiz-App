let url = "./src/question.json";

let btnJouer = document.querySelector(".btnjouer");
let welcome = document.querySelector(".welcome");

btnJouer.addEventListener('click', ()=>{
    welcome.classList.add('invisible')
})

fetch(url)
.then(res => res.json())
.then(data => {

        let myQuestion = document.querySelector("main h2");
        let myListResponse = document.querySelector("main ul");
        let btn = document.querySelector(".next");
        let myList;
        let count = 0
        let num = document.querySelector('.num')
        let note = 0;

        let truResponse = document.querySelector(".true-response")
        let falseResponse = document.querySelector(".false-response")

        truResponse.style.display = "none"
        falseResponse.style.display = "none"
        btn.disabled = true

        num.textContent = count + 1 + ' / 20';
        
        function addListQuestions(myList , count){
            
            data[count].answers.forEach(answer => {
                
                myList = document.createElement("div");
                
                myList.innerHTML = `
                <div class="
                        flex 
                        my-div-radio 
                        hover:shadow-lg 
                        hover:bg-cyan-700
                        transition-shadow 
                        ease-in justify-between 
                        items-center 
                        p-2 
                        border-1 
                        cursor-pointer 
                        border-blue-500 
                        mb-2 
                        rounded
                        text-white"
                    >
                    <li>
                        ${
                            answer
                        }
                    </li>
                        <div class="
                            relative 
                            w-4 
                            h-4 
                            rounded-full 
                            border-1 
                            border-blue-500"
                        >
                        <div class="
                            absolute 
                            my-radio 
                            w-3 h-3 
                            bg-blue-500 
                            top-[50%] 
                            left-[50%] 
                            translate-x-[-50%] 
                            translate-y-[-50%] 
                            rounded-full
                            ">
                        </div>
                    </div>
                </div>
                `
                myListResponse.appendChild(myList);
            });

            let myDivRadio = document.querySelectorAll(".my-div-radio")
            let myRadio = document.querySelectorAll(".my-radio")
            let i = 0;
            let myRes = document.querySelector(".my-response");
                
             myDivRadio.forEach((res , index) => {
                res.addEventListener('click', ()=>{
                    if(i < 1){
                        i++;
                        myRadio[index].style.opacity = '1';
                        myRadio[index].style.visibility = 'visible'

                        if(res.innerText.trim() === data[count].correct.trim()){
                            note += 1;
                            truResponse.style.display = "block"
                            truResponse.innerHTML = "Bravo ! Tu as eu la bonne réponse";
                        }
                        else{
                            falseResponse.style.display = "block"
                            myRes.innerHTML = `${data[count].correct}`
                        }
                        btn.disabled = false
                    }
                })
            })
        }

        btn.addEventListener("click", ()=>{

            if(count < data.length - 1 ){
                count++
                myQuestion.innerHTML = data[count].question
                myListResponse.innerHTML = ""

                falseResponse.style.display = "none"
                truResponse.style.display = "none"

                btn.disabled = true
                
                addListQuestions(myList , count);
                num.textContent = count + 1 + ' / 20';
                
            }else{
                let popover = document.querySelector('.popover');
                let myNote = document.querySelector('.myNote');
                let closeBtn = document.querySelector('.close-btn');

                popover.classList.add('visible');
                myNote.textContent = note;
                
                if(note > 0 && note < 10){
                    myNote.classList.add('border-red-400');
                    myNote.classList.add('bg-red-500');
                    myNote.textContent = '0' + note;
                }else if(note > 10 && note < 14){
                    myNote.classList.add('border-yellow-400');
                    myNote.classList.add('bg-yellow-500');
                }

                closeBtn.addEventListener('click' ,()=>{
                    popover.classList.remove('visible');
                    location.reload();
                })
                
            }
            
        })        

        myQuestion.innerHTML = data[count].question
        addListQuestions(myList , count);
        
    })
