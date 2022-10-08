let resultElement = document.querySelector('.result');
let mainContainer = document.querySelector('.main-container')
let rowId = 1;

//petiion al api de palabras
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '644bcd4cabmsh4e5ac00e0197938p1af547jsn18e8e9f0fe88',
		'X-RapidAPI-Host': '1000-most-common-words.p.rapidapi.com'
	}
};
fetch('https://1000-most-common-words.p.rapidapi.com/words/spanish?words_limit=1', options)
.then(result => result.json())
.finally(() =>{
    let loadingElement = document.querySelector('.loading')
    loadingElement.style.display = 'none';
})
.then(data => {
    console.log(data)
    let word = data[0];
let wordArray = word.toUpperCase().split('');


let actualRow = document.querySelector('.row');

drawSquare(actualRow);
listenInput(actualRow);
addFocus(actualRow);


function listenInput(actualRow){
    let squares = actualRow.querySelectorAll('.square')
squares = [...squares];

let userInput = [];

//aqui se escucha

squares.forEach(Element => {
    Element.addEventListener('input', event=>{

        // si no se ha borrado haga todo esto
        if(event.inputType !== 'deleteContentBackward'){

            //recoger el ingreso del usuario
        userInput.push(event.target.value.toUpperCase())
        
        if(event.target.nextElementSibling){
            event.target.nextElementSibling.focus();

        }else{
            // creR ARREGLO OCN LETRAS LLENAS
            let squaresFilled = document.querySelectorAll('.square');
            squaresFilled = [...squaresFilled]
            let lastFiveSquaresFilled = squaresFilled.slice(-word.length)
            let finalUserInput = []
            lastFiveSquaresFilled.forEach(element => {
                finalUserInput.push(element.value.toUpperCase())

            });
          

                      
            //comparar arreglos para cambiar stilos
           let rightIndex = compareArrays(wordArray, finalUserInput)
           
           rightIndex.forEach(element => {
            squares[element].classList.add('green');
           })

           // si los arreglos son iguales
           if(rightIndex.length == wordArray.length){
           showResult('¡¡¡GANASTE!!!')
            
            return;
           }
           //cambiar estilos si exiten pero no son correctos
           let existIndexArray = existLetter(wordArray, finalUserInput)
           console.log(existIndexArray)
           existIndexArray.forEach(element => {
            squares[element].classList.add('gold');
           });


           let actualRow = createRow()
           if(!actualRow){
            return
           }
           drawSquare(actualRow)
           listenInput(actualRow)
           addFocus(actualRow)

           
        }
        }else{
            userInput.pop()
            
        }
      
    });
})

}






// funciones

function compareArrays(array1, array2){
    let iqualsIndex = []
    array1.forEach((element, index) => {
        if(element == array2[index]){
            console.log(`En la posiscion ${index} si son iguales`);
            iqualsIndex.push(index);
        }else{
            console.log(`En la posiscion ${index} no son iguales`);
        }
    });
    return iqualsIndex;
}

function existLetter(array1, array2){
    let existIndexArray = [];
    array2.forEach((element, index) => {
        if(array1.includes(element)){
            existIndexArray.push(index)
        }
    });
    return existIndexArray
}

function createRow(){
    rowId++
    if(rowId <= 5){
        let newRow = document.createElement('div');
    newRow.classList.add('row');
    newRow.setAttribute('id', rowId)
    mainContainer.appendChild(newRow)
    return newRow;
    }else {
        showResult(`JAH JAH.. PERDISTE!!, la respuesta era "${word.toUpperCase()}"`)
    }
    
}

function drawSquare(actualRow){
    wordArray.forEach((item, index) =>{
        if(index === 0) {
            actualRow.innerHTML += `<input type="text" max="1" class="square focus">`;
        }else{
            actualRow.innerHTML += `<input type="text" max="1" class="square">`;
        }
    });
}

function addFocus(actualRow){
    let focusElement = actualRow.querySelector('.focus')
console.log(focusElement)
focusElement.focus();
}

function showResult(textMsg){
    resultElement.innerHTML = `<p>${textMsg}</p>
    <button class="button">Reiniciar</button>`

    let resetbtn = document.querySelector('.button')
            resetbtn.addEventListener('click',() => {
            location.reload();
});
}
});


