//все наши текста
const quotes = [
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

//сохраняет лист слов и индекс текущей буквы, который жмякает юзер
let words = [];
let wordIndex = 0;

let startTime = Date.now();
//элементы страницы
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', () => {
    // получить текст
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    // добавление текста в массив слов
    words = quote.split(' ');
    // сброс слова для индекса
    wordIndex = 0;
  
    // обновление УИ
    // создаем массив из элементов для установки класса
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    // конвертация в стринг
    quoteElement.innerHTML = spanWords.join('');
    // выделять слово
    quoteElement.childNodes[0].className = 'highlight';
    // очистить
    messageElement.innerText = '';
  
    // установка текстбокса
    // очистка текстбокса
    typedValueElement.value = '';
    // фокус
    typedValueElement.focus();
   //таймер
    startTime = new Date().getTime();
  });


typedValueElement.addEventListener('input', () => {
    // текущее слово
    const currentWord = words[wordIndex];
    // текущее значение
    const typedValue = typedValueElement.value;
  
    if (typedValue === currentWord && wordIndex === words.length - 1) {
      // конец предложения
      // конгратс
      const elapsedTime = new Date().getTime() - startTime;
      const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
      messageElement.innerText = message;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      // конец слова
      // очистка для нового слова
      typedValueElement.value = '';
      // движение в следующее слово
      wordIndex++;
      // ресет имя класса для всех элементов в преложении
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }
      // выделять новое слово
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      typedValueElement.className = '';
    } else {
      typedValueElement.className = 'error';
    }
  });
