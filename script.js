const QUIZ_QUESTIONS = [
    { question: "Какой город Якутии признан Полюсом холода северного полушария?", category: "География", options: ["Оймякон", "Мирный", "Нерюнгри"], correct: 0 },
    { question: "Какое место в мире по площади занимала бы Якутия, будучи государством?", category: "Территория", options: ["3-е", "8-е", "15-е"], correct: 1 },
    { question: "В каком улусе находятся Ленские столбы?", category: "Достопримечательности", options: ["Хангаласский", "Алданский", "Верхоянский"], correct: 0 },
    { question: "Какой город называют «алмазной столицей России»?", category: "Промышленность", options: ["Удачный", "Мирный", "Ленск"], correct: 1 },
    { question: "Как называется опасное атмосферное явление в морозные дни?", category: "Климат", options: ["Полярное сияние", "Снежная пыль", "Морозный туман"], correct: 2 },
    { question: "Из какой горной породы преимущественно состоят Ленские столбы?", category: "Геология", options: ["Известняк", "Гранит", "Базальт"], correct: 0 },
    { question: "Какая ягода считается символом якутской тайги?", category: "Природа", options: ["Брусника", "Малина", "Клубника"], correct: 0 },
    { question: "Сколько часовых поясов охватывает Якутия?", category: "География", options: ["1", "2", "3"], correct: 2 },
    { question: "Какое явление промерзания почвы характерно для всей территории?", category: "Геология", options: ["Вечная мерзлота", "Тектонический сдвиг", "Полярный день"], correct: 0 },
    { question: "Какой улус по площади сопоставим с размерами Германии?", category: "Территория", options: ["Оленёкский", "Мирнинский", "Нерюнгринский"], correct: 0 },
    { question: "Как называется традиционное якутское летнее жилище?", category: "Культура", options: ["Ураса", "Юрта", "Чум"], correct: 0 },
    { question: "Какая река является крупнейшей водной артерией Якутии?", category: "География", options: ["Лена", "Вилюй", "Яна"], correct: 0 },
    { question: "Какой национальный праздник отмечается в день летнего солнцестояния?", category: "Культура", options: ["Ысыах", "Шагаа", "Наадым"], correct: 0 },
    { question: "Как называют традиционный якутский музыкальный инструмент?", category: "Культура", options: ["Хомус", "Варган", "Дудук"], correct: 0 },
    { question: "Какой вид транспорта является основным для отдаленных арктических районов?", category: "Инфраструктура", options: ["Авиация", "Железная дорога", "Метро"], correct: 0 },
    { question: "Что является основным экспортным ресурсом республики?", category: "Экономика", options: ["Алмазы", "Нефть", "Золото"], correct: 0 },
    { question: "Как называется крупнейшее месторождение золота в Якутии?", category: "Промышленность", options: ["Алданское", "Нежданинское", "Мир"], correct: 1 },
    { question: "Какое животное является символом сурового якутского климата?", category: "Природа", options: ["Северный олень", "Белый медведь", "Лось"], correct: 0 },
    { question: "Как называют коренных жителей Якутии?", category: "История", options: ["Саха", "Эвенки", "Чукчи"], correct: 0 },
    { question: "Какой университет является главным вузом республики?", category: "Образование", options: ["СВФУ", "АГУИККИ", "ЯГУ"], correct: 0 },
    { question: "Что представляет собой 'балаган' в якутской архитектуре?", category: "Культура", options: ["Зимний дом", "Летний амбар", "Склад"], correct: 0 },
    { question: "Какая птица считается священной в якутской мифологии?", category: "Культура", options: ["Стерх", "Орел", "Ворон"], correct: 0 },
    { question: "Какой вид единоборств особенно популярен в Якутии?", category: "Спорт", options: ["Хапсагай", "Дзюдо", "Бокс"], correct: 0 },
    { question: "Как называется горный хребет, проходящий через восточную часть Якутии?", category: "География", options: ["Черского", "Уральские", "Саяны"], correct: 0 },
    { question: "Что означает название республики «Саха»?", category: "История", options: ["Народ", "Земля", "Река"], correct: 0 }
];

// СОСТОЯНИЕ КВИЗА
let currentQuestionIndex = 0;
let score = 0;
let lives = 3;
let selectedOptionIndex = null;

// DOM ЭЛЕМЕНТЫ
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const startGameBtn = document.getElementById('startGameBtn');
const restartGameBtn = document.getElementById('restartGameBtn');
const submitAnswerBtn = document.getElementById('submitAnswerBtn');
const highScoreVal = document.getElementById('highScoreVal');
const currentScore = document.getElementById('currentScore');
const finalScoreVal = document.getElementById('finalScoreVal');
const newRecordBadge = document.getElementById('newRecordBadge');
const livesContainer = document.getElementById('livesContainer');
const progressBar = document.getElementById('progressBar');
const questionText = document.getElementById('questionText');
const questionCategory = document.getElementById('questionCategory');
const optionsContainer = document.getElementById('optionsContainer');
const screenFlash = document.getElementById('screenFlash');

// Функция визуальной вспышки при ответе
function triggerScreenFlash(isCorrect) {
    if (!screenFlash) return;
    screenFlash.className = "screen-flash";
    void screenFlash.offsetWidth; // Триггер перерисовки
    screenFlash.classList.add(isCorrect ? 'flash-correct' : 'flash-wrong');
    setTimeout(() => { screenFlash.className = "screen-flash"; }, 800);
}

// Инициализация рекорда
highScoreVal.textContent = localStorage.getItem('yakutia_quiz_record') || 0;

function renderLives() {
    if (!livesContainer) return;
    livesContainer.innerHTML = ''; 
    for (let i = 0; i < 3; i++) {
        const heartImg = document.createElement('img');
        heartImg.src = '8a68581557c471248f3adbc789d80ee3.png';
        heartImg.style.width = '36px'; 
        heartImg.style.height = '36px';
        heartImg.style.margin = '0 5px';
        heartImg.style.opacity = (i >= lives) ? '0.2' : '1';
        livesContainer.appendChild(heartImg);
    }
}

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    lives = 3;
    QUIZ_QUESTIONS.sort(() => Math.random() - 0.5);
    renderLives();
    currentScore.textContent = score;
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    selectedOptionIndex = null;
    submitAnswerBtn.disabled = true;
    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    questionText.textContent = q.question;
    questionCategory.textContent = q.category;
    progressBar.style.width = (currentQuestionIndex / QUIZ_QUESTIONS.length) * 100 + '%';
    optionsContainer.innerHTML = ''; 
    q.options.forEach((optText, i) => {
        const button = document.createElement('button');
        button.className = "btn-option";
        button.innerHTML = '<span>' + optText + '</span><span class="check-circle">✓</span>';
        button.addEventListener('click', () => {
            selectedOptionIndex = i;
            const buttons = optionsContainer.getElementsByClassName('btn-option');
            for (let b of buttons) b.classList.remove('btn-option-selected');
            button.classList.add('btn-option-selected');
            submitAnswerBtn.disabled = false;
        });
        optionsContainer.appendChild(button);
    });
}

submitAnswerBtn.addEventListener('click', () => {
    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    const buttons = optionsContainer.getElementsByClassName('btn-option');
    for (let b of buttons) b.disabled = true;
    
    if (selectedOptionIndex === q.correct) {
        score++;
        currentScore.textContent = score;
        buttons[selectedOptionIndex].classList.add('btn-option-correct');
        triggerScreenFlash(true);
    } else {
        lives--;
        renderLives();
        buttons[selectedOptionIndex].classList.add('btn-option-wrong');
        buttons[q.correct].classList.add('btn-option-correct');
        triggerScreenFlash(false);
    }
    
    setTimeout(() => {
        if (lives <= 0 || currentQuestionIndex >= QUIZ_QUESTIONS.length - 1) {
            endGame();
        } else {
            currentQuestionIndex++;
            loadQuestion();
        }
    }, 1200);
});

function endGame() {
    gameScreen.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
    finalScoreVal.textContent = score;
    
    const record = parseInt(localStorage.getItem('yakutia_quiz_record') || "0");
    if (score > record) {
        localStorage.setItem('yakutia_quiz_record', score.toString());
        newRecordBadge.classList.remove('hidden');
        highScoreVal.textContent = score;
    } else {
        newRecordBadge.classList.add('hidden');
    }
}

startGameBtn.addEventListener('click', startGame);
restartGameBtn.addEventListener('click', startGame);