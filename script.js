// Плавная прокрутка
document.querySelector('.cta-button')?.addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('#skills').scrollIntoView({
    behavior: 'smooth',
  });
});

// DOM-элементы
const skillsGrid = document.querySelector('.skills-grid');
const addSkillBtn = document.getElementById('add-skill-btn');

// Ключ для localStorage
const STORAGE_KEY = 'userSkills';

// Навыки по умолчанию
const defaultSkills = [
  { title: 'HTML & CSS', description: 'Создаю адаптивную и семантически правильную вёрстку с чистым кодом.' },
  { title: 'JavaScript', description: 'Пишу интерактивные элементы и работаю с DOM без фреймворков.' },
  { title: 'Git & GitHub', description: 'Версионный контроль и совместная разработка проектов.' },
  { title: 'AI & Prompt Engineering', description: 'Использую ИИ для генерации идей, отладки и ускорения разработки.' }
];

// Загрузка навыков
function loadSkills() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : defaultSkills;
}

// Сохранение навыков
function saveSkills(skills) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
}

// Отрисовка всех навыков
function renderSkills(skills) {
  skillsGrid.innerHTML = '';
  const cards = [];

  skills.forEach((skill, index) => {
    const card = document.createElement('div');
    card.className = `skill-card ${skill.completed ? 'completed' : ''}`;
    card.dataset.index = index;

    card.innerHTML = `
      <div class="card-options">
        <button class="options-btn" aria-label="Параметры навыка">⋯</button>
      </div>
      <div class="skill-header">
        <label class="checkbox-label">
          <input type="checkbox" class="complete-checkbox" ${skill.completed ? 'checked' : ''}>
        </label>
      </div>
      <h3>${skill.title}</h3>
      <p>${skill.description}</p>
    `;

    const optionsBtn = card.querySelector('.options-btn');
    optionsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const yes = confirm('Удалить этот навык?');
      if (yes) {
        card.classList.add('fade-out');
        setTimeout(() => {
          const updatedSkills = loadSkills();
          updatedSkills.splice(index, 1);
          saveSkills(updatedSkills);
          renderSkills(updatedSkills);
        }, 400);
      }
    });

    card.addEventListener('click', function () {
      alert(`Вы выбрали навык: ${skill.title} 🚀\nХороший выбор — этим стоит гордиться!`);
    });

    const checkbox = card.querySelector('.complete-checkbox');
    checkbox.addEventListener('change', (e) => {
      e.stopPropagation();
      const updatedSkills = loadSkills();
      updatedSkills[index].completed = e.target.checked;
      saveSkills(updatedSkills);
      renderSkills(updatedSkills);
    });

    skillsGrid.appendChild(card);
    cards.push(card);
  });

  setTimeout(() => {
    cards.forEach((card, i) => {
      if (!card.classList.contains('completed')) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.animation = `fadeInUp 0.6s ease forwards ${0.4 + i * 0.1}s`;
      }
    });
  }, 50);
}

// Добавление нового навыка
function addNewSkill() {
  const title = prompt('Введите название навыка:');
  if (!title) return;

  const description = prompt('Введите описание навыка:');
  if (!description) return;

  const skills = loadSkills();
  skills.push({ title, description, completed: false });
  saveSkills(skills);
  renderSkills(skills);
}

// Обработчик для кнопки "Добавить навык"
addSkillBtn?.addEventListener('click', addNewSkill);

// Генерация плавающих пузырей
function createBubbles() {
  const bubblesContainer = document.querySelector('.bubbles');
  const bubbleCount = 12;

  for (let i = 0; i < bubbleCount; i++) {
    const size = Math.random() * 60 + 20;
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.opacity = 0.1 + Math.random() * 0.2;
    bubble.style.animationDuration = `${8 + Math.random() * 10}s`;
    bubble.style.animationDelay = `${Math.random() * 5}s`;

    bubblesContainer.appendChild(bubble);
  }
}

// === Параллакс + Cursor Glow ===
document.addEventListener('DOMContentLoaded', () => {
  createBubbles();
  const skills = loadSkills();
  renderSkills(skills);

  const cursorGlow = document.querySelector('.cursor-glow');
  const hero = document.querySelector('.hero');
  const bubbles = document.querySelectorAll('.bubble');

  // Свечение курсора
  document.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    cursorGlow.style.left = `${x}px`;
    cursorGlow.style.top = `${y}px`;
  });

  // Параллакс для пузырей
  hero.addEventListener('mousemove', (e) => {
    const { offsetX, offsetY, target } = e;
    const rect = target.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (offsetX - centerX) / centerX;
    const moveY = (offsetY - centerY) / centerY;

    bubbles.forEach((bubble) => {
      const size = parseFloat(bubble.style.width);
      const depth = size / 80;
      const tx = -moveX * 20 * depth;
      const ty = -moveY * 20 * depth;

      bubble.style.transform = `translate(${tx}px, ${ty}px)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    bubbles.forEach((bubble) => {
      bubble.style.transform = 'translate(0, 0)';
    });
  });
});

// === МОЙ ИНДЕКС НАВЫКОВ ===
const sliders = [
  { input: '#html-slider', value: '#html-value' },
  { input: '#css-slider', value: '#css-value' },
  { input: '#js-slider', value: '#js-value' },
  { input: '#react-slider', value: '#react-value' },
  { input: '#ai-slider', value: '#ai-value' }
];

const STORAGE_INDEX_KEY = 'skillIndex';

function calculateAverage() {
  let sum = 0;
  sliders.forEach(slider => {
    const input = document.querySelector(slider.input);
    sum += Number(input.value);
  });
  return Math.round(sum / sliders.length);
}

function updateGauge() {
  const avg = calculateAverage();
  const fill = document.getElementById('gauge-fill');
  const valueEl = document.getElementById('gauge-value');
  const textEl = document.getElementById('gauge-text');

  fill.style.width = `${avg}%`;
  valueEl.textContent = `${avg}%`;

  let desc = '';
  if (avg <= 25) desc = 'Начинающий, верный старт';
  else if (avg <= 50) desc = 'Прогрессируешь, держи темп';
  else if (avg <= 75) desc = 'Уверенно растёшь, почти junior';
  else desc = 'Сильная база — готов к портфолио';

  textEl.textContent = desc;
  saveIndexValues();
}

function saveIndexValues() {
  const data = {};
  sliders.forEach(slider => {
    data[slider.input] = document.querySelector(slider.input).value;
  });
  localStorage.setItem(STORAGE_INDEX_KEY, JSON.stringify(data));
}

function loadIndexValues() {
  const saved = localStorage.getItem(STORAGE_INDEX_KEY);
  if (saved) {
    const data = JSON.parse(saved);
    sliders.forEach(slider => {
      const input = document.querySelector(slider.input);
      const valueSpan = document.querySelector(slider.value);
      if (data[slider.input]) {
        input.value = data[slider.input];
        valueSpan.textContent = data[slider.input] + '%';
      }
    });
  }
}

// Инициализация индекса навыков
document.addEventListener('DOMContentLoaded', () => {
  loadIndexValues();
  updateGauge();

  sliders.forEach(slider => {
    const input = document.querySelector(slider.input);
    const valueSpan = document.querySelector(slider.value);

    input.addEventListener('input', () => {
      valueSpan.textContent = input.value + '%';
    });

    input.addEventListener('change', () => {
      updateGauge();
    });
  });
});
