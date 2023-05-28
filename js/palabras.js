const words = [
    {
      description: "Animal que maulla",
      word: "gato"
    },
    {
      description: "Fruta de color amarillo",
      word: "plátano"
    },
    {
      description: "País famoso por la torre Eiffel",
      word: "francia"
    }
  ];
  
  let currentWordIndex = 0;
  let scrambledWord = "";
  
  const wordContainer = document.getElementById("word-container");
  const resultContainer = document.getElementById("result-container");
  const descriptionText = document.getElementById("description-text");
  const letterContainer = document.getElementById("letter-container");
  const checkButton = document.getElementById("check-btn");
  const resultText = document.getElementById("result-text");
  const nextButton = document.getElementById("next-btn");
  
  function displayWord() {
    const currentWord = words[currentWordIndex];
    const description = currentWord.description;
    const word = currentWord.word;
  
    // Barajar las letras de la palabra
    scrambledWord = scrambleWord(word);
  
    descriptionText.textContent = description;
    resultText.textContent = "";
    wordContainer.style.display = "block";
    resultContainer.style.display = "none";
  
    // Limpiar el contenedor de letras
    letterContainer.innerHTML = "";
  
    // Mostrar las letras barajadas
    for (let i = 0; i < scrambledWord.length; i++) {
      const letterSpan = document.createElement("span");
      letterSpan.textContent = scrambledWord[i];
      letterSpan.addEventListener("click", selectLetter);
      letterContainer.appendChild(letterSpan);
    }
  }
  
  function scrambleWord(word) {
    // Barajar las letras de la palabra utilizando el algoritmo de Fisher-Yates
    const letters = word.split("");
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join("");
  }
  
  function selectLetter(event) {
    const selectedLetter = event.target;
    const selectedLetterText = selectedLetter.textContent;
  
    // Agregar la letra seleccionada al cuadro de respuesta
    const answerBox = document.createElement("span");
    answerBox.textContent = selectedLetterText;
    answerBox.addEventListener("click", removeLetter);
    letterContainer.removeChild(selectedLetter);
    wordContainer.appendChild(answerBox);
  }
  
  function removeLetter(event) {
    const removedLetter = event.target;
    const removedLetterText = removedLetter.textContent;
  
    // Remover la letra del cuadro de respuesta y devolverla al contenedor de letras
    const letterSpan = document.createElement("span");
    letterSpan.textContent = removedLetterText;
    letterSpan.addEventListener("click", selectLetter);
    wordContainer.removeChild(removedLetter);
    letterContainer.appendChild(letterSpan);
  }
  
  function checkWord() {
    const answerBoxes = wordContainer.getElementsByTagName("span");
    const answer = Array.from(answerBoxes).map(box => box.textContent).join("");
  
    const currentWord = words[currentWordIndex];
    const correctWord = currentWord.word;
  
    if (answer.toLowerCase() === correctWord.toLowerCase()) {
      resultText.textContent = "¡Respuesta correcta!";
      resultText.classList.add("correct-answer");
    } else {
      resultText.textContent = "Respuesta incorrecta";
      resultText.classList.add("incorrect-answer");
    }
  
    wordContainer.style.display = "none";
    resultContainer.style.display = "block";
  }
  
  function nextWord() {
    currentWordIndex++;
  
    if (currentWordIndex < words.length) {
      displayWord();
    } else {
      // Se han completado todas las palabras
      wordContainer.style.display = "none";
      resultContainer.style.display = "none";
      resultText.textContent = `Has completado todas las palabras. ¡Juego terminado!`;
    }
  }
  
  checkButton.addEventListener("click", checkWord);
  nextButton.addEventListener("click", nextWord);
  
  // Mostrar la primera palabra al cargar la página
  displayWord();
  