(function () {
  const planets = window.SOLARA_PLANETS;
  const planetOrder = window.SOLARA_DATA.planetOrder;
  const root = document.getElementById('challengeRoot');
  const progressPanel = document.getElementById('challengeProgress');
  const announcement = document.getElementById('challengeAnnouncement');
  const storageKey = 'solara.spaceChallenges.progress.v1';
  const difficulties = {
    explorer: {
      label: 'Explorer',
      description: 'Core facts and familiar worlds.'
    },
    navigator: {
      label: 'Navigator',
      description: 'Planetary order, atmospheres and satellites.'
    },
    astronomer: {
      label: 'Astronomer',
      description: 'Compare planetary measurements and patterns.'
    }
  };
  function getPlanetOptions(correctPlanet, candidatePlanets) {
    const choices = [...new Set([correctPlanet, ...candidatePlanets])].slice(0, 4)
      .sort((first, second) => planetOrder.indexOf(first) - planetOrder.indexOf(second));
    return { options: choices, answer: choices.indexOf(correctPlanet) };
  }

  function makePlanetQuestion(id, question, candidates, correctPlanet, explanation) {
    const choiceSet = getPlanetOptions(correctPlanet, candidates);
    return { id, question, ...choiceSet, explanation };
  }

  function validateQuizQuestions(questionSets) {
    const errors = [];
    const ids = new Set();
    Object.entries(questionSets).forEach(([difficulty, set]) => {
      if (!difficulties[difficulty]) errors.push(`unknown difficulty "${difficulty}"`);
      if (!Array.isArray(set) || !set.length) {
        errors.push(`${difficulty}: question set must be a non-empty array`);
        return;
      }
      set.forEach((question, index) => {
        const label = question?.id || `${difficulty} question ${index + 1}`;
        if (!question || typeof question !== 'object') {
          errors.push(`${label}: question must be an object`);
          return;
        }
        if (typeof question.id !== 'string' || !question.id.trim()) {
          errors.push(`${label}: id is required`);
        } else if (ids.has(question.id)) {
          errors.push(`${label}: duplicate question id "${question.id}"`);
        } else {
          ids.add(question.id);
        }
        if (typeof question.question !== 'string' || !question.question.trim()) {
          errors.push(`${label}: question text is required`);
        }
        if (!Array.isArray(question.options) || question.options.length < 2
          || question.options.some((option) => typeof option !== 'string' || !option.trim())
          || new Set(question.options).size !== question.options.length) {
          errors.push(`${label}: options must be at least two unique, non-empty strings`);
        }
        if (!Number.isInteger(question.answer)
          || question.answer < 0
          || !Array.isArray(question.options)
          || question.answer >= question.options.length) {
          errors.push(`${label}: answer must be a valid zero-based option index`);
        }
        if (typeof question.explanation !== 'string' || !question.explanation.trim()) {
          errors.push(`${label}: an educational explanation is required`);
        }
      });
    });
    if (errors.length && window.SOLARA_DATA.isDevelopment) {
      console.error('[SOLARA data] Quiz validation failed:', errors);
    }
    return errors.length === 0;
  }

  const questions = {
    explorer: [
      (() => {
        const closest = planetOrder.reduce((nearest, name) => (
          planets[name].comparison.distanceMillionKm < planets[nearest].comparison.distanceMillionKm ? name : nearest
        ));
        return makePlanetQuestion(
          'closest-to-sun',
          'Which planet is closest to the Sun?',
          planetOrder,
          closest,
          `${closest} is the innermost planet. Its average distance from the Sun is ${window.SOLARA_DATA.formatMetric('distanceMillionKm', planets[closest])}.`
        );
      })(),
      {
        id: 'red-planet',
        question: 'Which planet is known as the Red Planet?',
        options: ['Jupiter', 'Mars', 'Mercury', 'Uranus'],
        answer: 1,
        explanation: planets.Mars.description
      },
      (() => {
        const largest = planetOrder.reduce((biggest, name) => (
          planets[name].comparison.diameterKm > planets[biggest].comparison.diameterKm ? name : biggest
        ));
        return makePlanetQuestion(
          'largest-planet',
          'What is the largest planet in our Solar System?',
          planetOrder,
          largest,
          `${largest} has an equatorial diameter of ${window.SOLARA_DATA.formatMetric('diameterKm', planets[largest])}.`
        );
      })(),
      {
        id: 'saturn-rings',
        question: 'Which planet is famous for its prominent ring system?',
        options: ['Venus', 'Earth', 'Saturn', 'Mars'],
        answer: 2,
        explanation: planets.Saturn.description
      },
      {
        id: 'earth-moon',
        question: 'What is the name of Earth’s natural satellite?',
        options: ['Europa', 'Titan', 'Phobos', 'The Moon'],
        answer: 3,
        explanation: planets.Earth.moons.summary
      }
    ],
    navigator: [
      {
        id: 'mars-moons',
        question: 'Which pair names the two natural moons of Mars?',
        options: ['Phobos and Deimos', 'Titan and Rhea', 'Io and Europa', 'Triton and Nereid'],
        answer: 0,
        explanation: `Mars has two small natural moons: ${planets.Mars.moons.notable.join(' and ')}.`
      },
      (() => {
        const candidates = ['Mercury', 'Venus', 'Earth', 'Mars'];
        const choices = getPlanetOptions('Venus', candidates);
        return {
          id: 'venus-year',
          question: 'About how long is one year on Venus?',
          options: choices.options.map((name) => `${Math.round(planets[name].comparison.orbitalPeriodDays)} Earth days`),
          answer: choices.answer,
          explanation: `SOLARA lists Venus’s orbital period as ${window.SOLARA_DATA.formatMetric('orbitalPeriodDays', planets.Venus)}.`
        };
      })(),
      (() => {
        const primaryGas = planets.Venus.atmosphere.composition[0].split(' (')[0];
        const options = ['Oxygen', 'Nitrogen', primaryGas, 'Hydrogen'];
        return {
        id: 'venus-atmosphere',
        question: 'Which gas makes up most of Venus’s atmosphere?',
        options,
        answer: options.indexOf(primaryGas),
        explanation: `The shared planet data lists ${planets.Venus.atmosphere.composition[0]} as the main component of Venus’s atmosphere.`
        };
      })(),
      {
        id: 'uranus-class',
        question: 'How is Uranus classified in the Planet Explorer?',
        options: ['Rocky planet', 'Gas giant', 'Ice giant', 'Dwarf planet'],
        answer: 2,
        explanation: `Uranus is an ${planets.Uranus.type.replace('-', ' ')}. Its deep interior contains hot, dense materials often described as ices.`
      },
      (() => {
        const candidates = ['Mars', 'Neptune', 'Uranus', 'Jupiter'];
        const choices = getPlanetOptions('Neptune', candidates);
        return {
          id: 'neptune-moons',
          question: 'According to the current SOLARA planet data, how many known moons are listed for Neptune?',
          options: choices.options.map((name) => window.SOLARA_DATA.formatMetric('moonCount', planets[name])),
          answer: choices.answer,
          explanation: planets.Neptune.moons.summary
        };
      })(),
      {
        id: 'mars-atmosphere',
        question: 'What is the primary gas in Mars’s thin atmosphere?',
        options: (() => {
          const primaryGas = planets.Mars.atmosphere.composition[0].split(' (')[0];
          return [primaryGas, 'Oxygen', 'Methane', 'Hydrogen'];
        })(),
        answer: 0,
        explanation: `The shared planet data lists ${planets.Mars.atmosphere.composition[0]} as the main component of Mars’s atmosphere.`
      }
    ],
    astronomer: [
      (() => {
        const longerSiderealDay = planetOrder.find((name) => (
          Math.abs(planets[name].comparison.rotationPeriodHours) / 24
          > planets[name].comparison.orbitalPeriodDays
        ));
        const choices = getPlanetOptions(longerSiderealDay, planetOrder);
        return {
          id: 'venus-long-day',
          question: 'In SOLARA’s comparison data, which planet’s sidereal rotation takes longer than its orbital year?',
          options: choices.options,
          answer: choices.answer,
          explanation: `${longerSiderealDay}’s sidereal rotation is about ${window.SOLARA_DATA.formatMetric('rotationPeriodHours', planets[longerSiderealDay])}, longer than its ${window.SOLARA_DATA.formatMetric('orbitalPeriodDays', planets[longerSiderealDay])} orbital period.`
        };
      })(),
      (() => {
        const iceGiants = planetOrder.filter((name) => planets[name].type === 'ice-giant');
        const correctPair = iceGiants.join(' and ');
        const options = ['Jupiter and Saturn', 'Earth and Mars', correctPair, 'Venus and Mercury'];
        return {
          id: 'ice-giants',
          question: 'Which pair consists of the Solar System’s two ice giants?',
          options,
          answer: options.indexOf(correctPair),
          explanation: `SOLARA classifies ${iceGiants[0]} and ${iceGiants[1]} as ice giants.`
        };
      })(),
      (() => {
        const candidates = ['Mercury', 'Jupiter', 'Uranus', 'Neptune'];
        const choices = getPlanetOptions('Neptune', candidates);
        return {
          id: 'neptune-year',
          question: 'About how many Earth years is Neptune’s orbital period?',
          options: choices.options.map((name) => `${(planets[name].comparison.orbitalPeriodDays / 365.25).toFixed(1)} Earth years`),
          answer: choices.answer,
          explanation: `Neptune’s canonical orbital period is ${window.SOLARA_DATA.formatMetric('orbitalPeriodDays', planets.Neptune)}.`
        };
      })(),
      (() => {
        const candidates = ['Earth', 'Mars', 'Mercury', 'Venus'];
        const choices = getPlanetOptions('Mercury', candidates);
        return {
          id: 'mercury-rotation',
          question: 'What sidereal rotation period is listed for Mercury in Planet Lab?',
          options: choices.options.map((name) => window.SOLARA_DATA.formatMetric('rotationPeriodHours', planets[name])),
          answer: choices.answer,
          explanation: `The shared comparison data lists Mercury’s sidereal rotation period as ${window.SOLARA_DATA.formatMetric('rotationPeriodHours', planets.Mercury)}.`
        };
      })(),
      (() => {
        const retrogradePair = planetOrder
          .filter((name) => planets[name].comparison.rotationPeriodHours < 0)
          .join(' and ');
        const options = ['Earth and Mars', retrogradePair, 'Jupiter and Saturn', 'Mercury and Neptune'];
        return {
          id: 'retrograde-rotation',
          question: 'Which pair has negative sidereal rotation values in SOLARA’s comparison data?',
          options,
          answer: options.indexOf(retrogradePair),
          explanation: `A negative sidereal rotation value marks retrograde rotation in this comparison data. ${retrogradePair} have negative values.`
        };
      })(),
      {
        id: 'moon-count-lower-bounds',
        question: 'Why are Jupiter’s and Saturn’s moon counts marked as lower bounds in the comparison data?',
        options: [
          'The listed counts are minimum known totals, not exact final totals.',
          'Their moons cannot be observed from Earth.',
          'The planets have no confirmed moons.',
          'Their moons are included in the planet diameters.'
        ],
        answer: 0,
        explanation: `The shared records mark both counts as minimums: Jupiter has ${window.SOLARA_DATA.formatMetric('moonCount', planets.Jupiter)} and Saturn has ${window.SOLARA_DATA.formatMetric('moonCount', planets.Saturn)}.`
      },
      (() => {
        const choices = getPlanetOptions('Earth', ['Mercury', 'Mars', 'Earth', 'Neptune']);
        return {
          id: 'earth-equatorial-diameter',
          question: 'What equatorial diameter does the Planet Lab comparison dataset use for Earth?',
          options: choices.options.map((name) => window.SOLARA_DATA.formatMetric('diameterKm', planets[name])),
          answer: choices.answer,
          explanation: `The comparison dataset records Earth’s equatorial diameter as ${window.SOLARA_DATA.formatMetric('diameterKm', planets.Earth)}.`
        };
      })()
    ]
  };
  window.SOLARA_DATA.validateQuizQuestions = validateQuizQuestions;
  validateQuizQuestions(questions);

  function makeDefaultProgress() {
    return {
      bestScores: {},
      questionsAnswered: 0,
      answersCorrect: 0,
      completedQuizzes: 0,
      puzzleCompletions: 0
    };
  }

  function nonNegativeInteger(value) {
    return Number.isSafeInteger(value) && value >= 0 ? value : 0;
  }

  let storageAvailable = true;

  function loadProgress() {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) return makeDefaultProgress();

      const stored = JSON.parse(saved);
      if (!stored || typeof stored !== 'object') return makeDefaultProgress();
      const bestScores = {};
      const questionsAnswered = nonNegativeInteger(stored.questionsAnswered);
      if (stored.bestScores && typeof stored.bestScores === 'object') {
        Object.keys(difficulties).forEach((level) => {
          const record = stored.bestScores[level];
          if (!record || !Number.isSafeInteger(record.score) || !Number.isSafeInteger(record.total)) return;
          if (record.score < 0 || record.total < 1 || record.score > record.total) return;
          bestScores[level] = {
            score: record.score,
            total: record.total,
            accuracy: Math.round(record.score / record.total * 100)
          };
        });
      }
      return {
        bestScores,
        questionsAnswered,
        answersCorrect: Math.min(nonNegativeInteger(stored.answersCorrect), questionsAnswered),
        completedQuizzes: nonNegativeInteger(stored.completedQuizzes),
        puzzleCompletions: nonNegativeInteger(stored.puzzleCompletions)
      };
    } catch (error) {
      storageAvailable = false;
      return makeDefaultProgress();
    }
  }

  let progress = loadProgress();
  let selectedDifficulty = 'explorer';
  let currentDifficulty = 'explorer';
  let currentQuestionIndex = 0;
  let currentScore = 0;
  let hasAnswered = false;
  let puzzleOrder = [];
  let puzzleStartingOrder = [];
  let puzzleFeedback = null;

  function announce(message) {
    announcement.textContent = message;
  }

  function saveProgress() {
    if (!storageAvailable) return false;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(progress));
      return true;
    } catch (error) {
      storageAvailable = false;
      announce('Progress is available for this visit, but browser storage is unavailable.');
      return false;
    }
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function createButton(label, className, action) {
    const button = createElement('button', className, label);
    button.type = 'button';
    button.addEventListener('click', action);
    return button;
  }

  function playSound(eventName) {
    if (window.SOLARA_SOUND) window.SOLARA_SOUND.play(eventName);
  }

  function renderProgress() {
    progressPanel.replaceChildren();
    const metrics = createElement('div', 'challenge-progress-grid');
    const best = Object.entries(progress.bestScores)
      .sort((first, second) => second[1].accuracy - first[1].accuracy || second[1].score - first[1].score)[0];
    const bestValue = best ? `${best[1].score} / ${best[1].total}` : 'Not started';
    const bestDetail = best ? `${difficulties[best[0]].label} · ${best[1].accuracy}% accuracy` : 'Complete a quiz to set a best';
    const accuracy = progress.questionsAnswered
      ? `${Math.round(progress.answersCorrect / progress.questionsAnswered * 100)}%`
      : '—';
    const completed = progress.completedQuizzes + progress.puzzleCompletions;
    const items = [
      ['Quiz best', bestValue, bestDetail],
      ['Overall accuracy', accuracy, `${progress.answersCorrect} correct of ${progress.questionsAnswered} answered`],
      ['Challenges completed', String(completed), `${progress.completedQuizzes} quizzes · ${progress.puzzleCompletions} orbit puzzles`],
      ['Orbit puzzle', progress.puzzleCompletions ? 'Completed' : 'Not completed', 'Arrange all eight planets from the Sun']
    ];
    items.forEach(([label, value, detail]) => {
      const item = createElement('div', 'challenge-progress-item');
      item.append(
        createElement('span', 'challenge-progress-label', label),
        createElement('strong', 'challenge-progress-value', value),
        createElement('span', 'challenge-progress-detail', detail)
      );
      metrics.appendChild(item);
    });
    progressPanel.appendChild(metrics);
    if (!storageAvailable) {
      progressPanel.appendChild(createElement('p', 'challenge-storage-note', 'Progress will last for this visit only because browser storage is unavailable.'));
    }
  }

  function addReturnButton(parent, label, action) {
    const button = createButton(label, 'challenge-back-btn', action);
    parent.appendChild(button);
    return button;
  }

  function focusChallengeHeading(id) {
    const heading = document.getElementById(id);
    if (heading) heading.focus();
  }

  function renderHub() {
    root.replaceChildren();
    const choices = createElement('div', 'challenge-hub');
    const heading = createElement('h3', 'sr-only', 'Choose a space challenge');
    heading.id = 'challengeHubTitle';
    heading.tabIndex = -1;

    const quizChoice = createElement('article', 'challenge-choice');
    quizChoice.append(
      createElement('p', 'eyebrow', '01 · KNOWLEDGE'),
      createElement('h3', '', 'Knowledge Quiz'),
      createElement('p', 'challenge-choice-description', 'Explore planet facts, compare scientific clues and build your confidence one question at a time.')
    );
    const quizGoal = createElement('p', 'challenge-choice-goal');
    quizGoal.append(createElement('span', '', 'OBJECTIVE'), document.createTextNode('Choose a level and answer every question.'));
    quizChoice.append(quizGoal, createButton('Choose difficulty', 'challenge-primary-btn', renderQuizSetup));

    const puzzleChoice = createElement('article', 'challenge-choice');
    puzzleChoice.append(
      createElement('p', 'eyebrow', '02 · ORBITAL ORDER'),
      createElement('h3', '', 'Orbit Puzzle'),
      createElement('p', 'challenge-choice-description', 'Build a planetary itinerary by arranging each world from the Sun outward.')
    );
    const puzzleGoal = createElement('p', 'challenge-choice-goal');
    puzzleGoal.append(createElement('span', '', 'OBJECTIVE'), document.createTextNode('Place all eight planets in orbital order.'));
    puzzleChoice.append(puzzleGoal, createButton('Start the puzzle', 'challenge-primary-btn', () => startPuzzle(true)));

    choices.append(quizChoice, puzzleChoice);
    root.append(heading, choices);
  }

  function renderQuizSetup() {
    root.replaceChildren();
    const panel = createElement('section', 'challenge-panel challenge-setup');
    const toolbar = createElement('div', 'challenge-toolbar');
    addReturnButton(toolbar, '← All challenges', () => returnToHub(true));
    panel.append(
      toolbar,
      createElement('p', 'eyebrow', 'KNOWLEDGE QUIZ'),
      createElement('h3', 'challenge-heading', 'Choose your level')
    );
    const description = createElement('p', 'challenge-panel-description', 'Each level uses a focused set of questions from SOLARA’s shared planetary data.');
    panel.appendChild(description);

    const fieldset = createElement('fieldset', 'challenge-difficulty');
    fieldset.appendChild(createElement('legend', '', 'Select a difficulty'));
    const levels = createElement('div', 'challenge-levels');
    Object.entries(difficulties).forEach(([key, level]) => {
      const label = createElement('label', 'challenge-level');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'challengeDifficulty';
      input.value = key;
      input.checked = key === selectedDifficulty;
      const copy = createElement('span', 'challenge-level-copy');
      copy.append(
        createElement('strong', 'challenge-level-name', level.label),
        createElement('span', 'challenge-level-description', level.description),
        createElement('span', 'challenge-level-count', `${questions[key].length} questions`)
      );
      label.append(input, copy);
      input.addEventListener('change', () => {
        if (input.checked) selectedDifficulty = key;
      });
      levels.appendChild(label);
    });
    fieldset.appendChild(levels);
    panel.append(fieldset, createButton('Start the quiz', 'challenge-primary-btn', startQuiz));
    root.appendChild(panel);
  }

  function startQuiz() {
    currentDifficulty = selectedDifficulty;
    currentQuestionIndex = 0;
    currentScore = 0;
    hasAnswered = false;
    renderQuestion();
    focusChallengeHeading('challengeQuestionTitle');
  }

  function renderQuestion() {
    const questionSet = questions[currentDifficulty];
    const question = questionSet[currentQuestionIndex];
    root.replaceChildren();

    const panel = createElement('section', 'challenge-panel challenge-quiz');
    panel.setAttribute('aria-labelledby', 'challengeQuestionTitle');
    const toolbar = createElement('div', 'challenge-toolbar');
    addReturnButton(toolbar, '← All challenges', () => returnToHub(true));
    const levelName = createElement('span', 'challenge-session-level', difficulties[currentDifficulty].label);
    toolbar.appendChild(levelName);

    const meta = createElement('div', 'challenge-question-meta');
    meta.append(
      createElement('p', 'eyebrow', `${currentDifficulty.toUpperCase()} · QUESTION ${currentQuestionIndex + 1} / ${questionSet.length}`),
      createElement('p', 'challenge-score', `Score: ${currentScore} / ${questionSet.length}`)
    );
    const progressBar = document.createElement('progress');
    progressBar.className = 'challenge-progress-bar';
    progressBar.max = questionSet.length;
    progressBar.value = currentQuestionIndex + 1;
    progressBar.setAttribute('aria-label', `Quiz progress: question ${currentQuestionIndex + 1} of ${questionSet.length}`);
    const heading = createElement('h3', 'challenge-question-title', question.question);
    heading.id = 'challengeQuestionTitle';
    heading.tabIndex = -1;

    const answers = createElement('div', 'challenge-answers');
    answers.setAttribute('role', 'group');
    answers.setAttribute('aria-label', 'Answer choices');
    question.options.forEach((option, index) => {
      const letter = String.fromCharCode(65 + index);
      const button = createButton('', 'challenge-answer', () => selectAnswer(index));
      button.dataset.answerIndex = String(index);
      button.setAttribute('aria-label', `Option ${letter}: ${option}`);
      button.setAttribute('aria-pressed', 'false');
      button.append(
        createElement('span', 'challenge-answer-letter', letter),
        createElement('span', 'challenge-answer-text', option)
      );
      answers.appendChild(button);
    });

    const feedback = createElement('div', 'challenge-feedback');
    feedback.id = 'challengeFeedback';
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    feedback.setAttribute('aria-atomic', 'true');
    panel.append(toolbar, meta, progressBar, heading, answers, feedback);
    root.appendChild(panel);
  }

  function selectAnswer(selectedIndex) {
    if (hasAnswered) return;
    hasAnswered = true;
    const question = questions[currentDifficulty][currentQuestionIndex];
    const correct = selectedIndex === question.answer;
    if (correct) currentScore += 1;
    progress.questionsAnswered += 1;
    if (correct) progress.answersCorrect += 1;

    root.querySelectorAll('.challenge-answer').forEach((button) => {
      const answerIndex = Number(button.dataset.answerIndex);
      button.disabled = true;
      button.setAttribute('aria-pressed', String(answerIndex === selectedIndex));
      if (answerIndex === selectedIndex) button.classList.add(correct ? 'is-correct' : 'is-incorrect');
      if (answerIndex === question.answer) {
        const label = createElement('span', 'challenge-answer-result', 'Correct answer');
        button.appendChild(label);
      } else if (answerIndex === selectedIndex) {
        button.appendChild(createElement('span', 'challenge-answer-result', 'Your answer'));
      }
    });

    const feedback = document.getElementById('challengeFeedback');
    feedback.classList.add(correct ? 'is-correct' : 'is-incorrect');
    feedback.append(
      createElement('strong', 'challenge-feedback-title', correct ? 'Correct' : 'Not quite'),
      createElement('p', 'challenge-explanation', question.explanation)
    );
    if (!correct) {
      feedback.appendChild(createElement('p', 'challenge-correct-answer', `Correct answer: ${question.options[question.answer]}.`));
    }
    const nextLabel = currentQuestionIndex === questions[currentDifficulty].length - 1 ? 'View results' : 'Next question';
    const nextButton = createButton(`${nextLabel} →`, 'challenge-primary-btn', advanceQuiz);
    feedback.appendChild(nextButton);

    saveProgress();
    renderProgress();
    playSound(correct ? 'correct' : 'incorrect');
    nextButton.focus();
  }

  function advanceQuiz() {
    if (currentQuestionIndex === questions[currentDifficulty].length - 1) {
      finishQuiz();
      return;
    }
    currentQuestionIndex += 1;
    hasAnswered = false;
    renderQuestion();
    focusChallengeHeading('challengeQuestionTitle');
  }

  function finishQuiz() {
    const total = questions[currentDifficulty].length;
    const accuracy = Math.round(currentScore / total * 100);
    const previousBest = progress.bestScores[currentDifficulty];
    if (!previousBest || accuracy > previousBest.accuracy || (accuracy === previousBest.accuracy && currentScore > previousBest.score)) {
      progress.bestScores[currentDifficulty] = { score: currentScore, total, accuracy };
    }
    progress.completedQuizzes += 1;
    saveProgress();
    renderProgress();
    announce('Knowledge Quiz complete. Your result has been added to Space Challenges progress.');
    playSound('complete');
    renderQuizResults(currentScore, total, accuracy);
  }

  function renderQuizResults(score, total, accuracy) {
    root.replaceChildren();
    const panel = createElement('section', 'challenge-panel challenge-results');
    panel.setAttribute('aria-labelledby', 'challengeResultsTitle');
    panel.append(
      createElement('p', 'eyebrow', 'MISSION COMPLETE'),
      createElement('h3', 'challenge-heading', 'Knowledge, well explored.')
    );
    panel.querySelector('h3').id = 'challengeResultsTitle';
    panel.querySelector('h3').tabIndex = -1;
    const summary = createElement('div', 'challenge-result-summary');
    summary.append(
      createElement('div', 'challenge-result-stat', `${score} / ${total}`),
      createElement('p', 'challenge-result-label', 'Correct answers'),
      createElement('div', 'challenge-result-stat', `${accuracy}%`),
      createElement('p', 'challenge-result-label', 'Accuracy')
    );
    const message = accuracy === 100
      ? 'Excellent work, Explorer. You found every answer.'
      : accuracy >= 60
        ? 'Strong work. Keep connecting the facts across our planetary neighbourhood.'
        : 'Every answer is another step in your mission. Explore the planet data and try again.';
    panel.append(
      summary,
      createElement('p', 'challenge-result-message', message)
    );
    const actions = createElement('div', 'challenge-actions');
    actions.append(
      createButton('Play again', 'challenge-primary-btn', startQuiz),
      createButton('Try another challenge', 'challenge-secondary-btn', () => startPuzzle(true)),
      createButton('Return to Challenges', 'challenge-text-btn', () => returnToHub(true))
    );
    panel.appendChild(actions);
    root.appendChild(panel);
    focusChallengeHeading('challengeResultsTitle');
  }

  function shuffledPlanets() {
    const shuffled = [...planetOrder];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    if (shuffled.every((planet, index) => planet === planetOrder[index])) {
      shuffled.push(shuffled.shift());
    }
    return shuffled;
  }

  function startPuzzle(newShuffle) {
    if (newShuffle || !puzzleStartingOrder.length) puzzleStartingOrder = shuffledPlanets();
    puzzleOrder = [...puzzleStartingOrder];
    puzzleFeedback = null;
    renderPuzzle();
    focusChallengeHeading('puzzleTitle');
  }

  function ordinal(position) {
    const suffix = position % 10 === 1 && position % 100 !== 11
      ? 'st'
      : position % 10 === 2 && position % 100 !== 12
        ? 'nd'
        : position % 10 === 3 && position % 100 !== 13
          ? 'rd'
          : 'th';
    return `${position}${suffix}`;
  }

  function correctPositionCount() {
    return puzzleOrder.reduce((count, planet, index) => count + (planet === planetOrder[index] ? 1 : 0), 0);
  }

  function movePlanet(planet, direction) {
    const index = puzzleOrder.indexOf(planet);
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= puzzleOrder.length) return;
    [puzzleOrder[index], puzzleOrder[nextIndex]] = [puzzleOrder[nextIndex], puzzleOrder[index]];
    puzzleFeedback = null;
    renderPuzzle({ planet, direction: direction < 0 ? 'up' : 'down' });
  }

  function renderPuzzle(focusTarget) {
    root.replaceChildren();
    const panel = createElement('section', 'challenge-panel challenge-puzzle');
    panel.setAttribute('aria-labelledby', 'puzzleTitle');
    const toolbar = createElement('div', 'challenge-toolbar');
    addReturnButton(toolbar, '← All challenges', () => returnToHub(true));
    toolbar.appendChild(createElement('span', 'challenge-session-level', 'ORBIT PUZZLE'));
    const heading = createElement('h3', 'challenge-heading', 'Arrange the planets from the Sun.');
    heading.id = 'puzzleTitle';
    heading.tabIndex = -1;
    const instructions = createElement('p', 'challenge-panel-description', 'Move each planet up or down until the list follows the order of the orbits, from nearest to farthest. Keyboard users can activate the same controls with Enter or Space.');
    const sun = createElement('div', 'puzzle-sun-marker');
    sun.append(createElement('span', '', 'SUN'), createElement('span', '', 'Start of the journey'));

    const correctCount = correctPositionCount();
    const arrangementMeta = createElement('div', 'puzzle-progress-meta');
    arrangementMeta.setAttribute('role', 'status');
    arrangementMeta.setAttribute('aria-live', 'polite');
    arrangementMeta.setAttribute('aria-atomic', 'true');
    arrangementMeta.append(
      createElement('span', 'challenge-progress-label', 'PLANETARY ORDER'),
      createElement('strong', '', `${correctCount} of ${planetOrder.length} in the correct position`)
    );
    const progressBar = document.createElement('progress');
    progressBar.className = 'challenge-progress-bar';
    progressBar.max = planetOrder.length;
    progressBar.value = correctCount;
    progressBar.setAttribute('aria-label', `${correctCount} of ${planetOrder.length} planets are in the correct orbital position`);

    const list = createElement('ol', 'puzzle-order-list');
    list.setAttribute('aria-label', 'Planets arranged from the Sun outward');
    puzzleOrder.forEach((planet, index) => {
      const item = createElement('li', `puzzle-order-item${planet === planetOrder[index] ? ' is-correct-position' : ''}`);
      const position = createElement('span', 'puzzle-position', ordinal(index + 1));
      const name = createElement('span', 'puzzle-planet-name', planet);
      const controls = createElement('div', 'puzzle-move-controls');
      const up = createButton('Move up', 'puzzle-move-btn', () => movePlanet(planet, -1));
      up.dataset.planet = planet;
      up.dataset.direction = 'up';
      up.setAttribute('aria-label', `Move ${planet} up`);
      up.disabled = index === 0;
      const down = createButton('Move down', 'puzzle-move-btn', () => movePlanet(planet, 1));
      down.dataset.planet = planet;
      down.dataset.direction = 'down';
      down.setAttribute('aria-label', `Move ${planet} down`);
      down.disabled = index === puzzleOrder.length - 1;
      controls.append(up, down);
      item.append(position, name, controls);
      list.appendChild(item);
    });

    const feedback = createElement('div', 'puzzle-feedback');
    feedback.id = 'puzzleFeedback';
    if (puzzleFeedback) {
      feedback.classList.add('is-incorrect');
      feedback.setAttribute('role', 'status');
      feedback.setAttribute('aria-live', 'polite');
      feedback.append(
        createElement('strong', 'challenge-feedback-title', `${puzzleFeedback.mistakes.length} planets are out of position.`),
        createElement('p', 'challenge-explanation', 'The correct sequence follows each orbit outward from the Sun. Adjust the planets and check again.')
      );
      const mistakes = createElement('ul', 'puzzle-mistake-list');
      puzzleFeedback.mistakes.forEach(({ planet, current, correct }) => {
        mistakes.appendChild(createElement('li', '', `${planet} is currently ${ordinal(current)}; it belongs in ${ordinal(correct)}.`));
      });
      feedback.appendChild(mistakes);
    }

    const actions = createElement('div', 'challenge-actions');
    actions.append(
      createButton('Check the order', 'challenge-primary-btn', validatePuzzle),
      createButton('Restart puzzle', 'challenge-secondary-btn', () => startPuzzle(true))
    );
    if (puzzleFeedback) {
      actions.appendChild(createButton('Retry puzzle', 'challenge-text-btn', () => startPuzzle(false)));
    }
    panel.append(toolbar, heading, instructions, sun, arrangementMeta, progressBar, list, feedback, actions);
    root.appendChild(panel);

    if (focusTarget) {
      const target = [...root.querySelectorAll('.puzzle-move-btn')].find((button) => (
        button.dataset.planet === focusTarget.planet && button.dataset.direction === focusTarget.direction
      ));
      if (!target) return;
      if (!target.disabled) {
        target.focus();
        return;
      }
      const alternateDirection = focusTarget.direction === 'up' ? 'down' : 'up';
      const alternate = [...root.querySelectorAll('.puzzle-move-btn')].find((button) => (
        button.dataset.planet === focusTarget.planet && button.dataset.direction === alternateDirection
      ));
      if (alternate && !alternate.disabled) alternate.focus();
    }
  }

  function validatePuzzle() {
    const mistakes = puzzleOrder
      .map((planet, index) => ({
        planet,
        current: index + 1,
        correct: planetOrder.indexOf(planet) + 1
      }))
      .filter((entry) => entry.current !== entry.correct);
    if (mistakes.length) {
      puzzleFeedback = { mistakes };
      playSound('incorrect');
      renderPuzzle();
      focusChallengeHeading('puzzleTitle');
      return;
    }

    progress.puzzleCompletions += 1;
    saveProgress();
    renderProgress();
    announce('Orbit Puzzle complete. All eight planets are in their correct order.');
    playSound('puzzle');
    renderPuzzleSuccess();
  }

  function renderPuzzleSuccess() {
    root.replaceChildren();
    const panel = createElement('section', 'challenge-panel challenge-results');
    panel.setAttribute('aria-labelledby', 'puzzleResultsTitle');
    panel.append(
      createElement('p', 'eyebrow', 'ORBIT COMPLETE'),
      createElement('h3', 'challenge-heading', 'Mission complete.')
    );
    panel.querySelector('h3').id = 'puzzleResultsTitle';
    panel.querySelector('h3').tabIndex = -1;
    panel.append(
      createElement('div', 'challenge-result-stat', '8 / 8'),
      createElement('p', 'challenge-result-label', 'Every planet is in the correct order from the Sun.'),
      createElement('p', 'challenge-result-message', 'You charted a path from the closest orbit to the farthest.')
    );
    const sequence = createElement('ol', 'puzzle-success-sequence');
    planetOrder.forEach((planet) => sequence.appendChild(createElement('li', '', planet)));
    const actions = createElement('div', 'challenge-actions');
    actions.append(
      createButton('Play again', 'challenge-primary-btn', () => startPuzzle(true)),
      createButton('Try another challenge', 'challenge-secondary-btn', renderQuizSetup),
      createButton('Return to Challenges', 'challenge-text-btn', () => returnToHub(true)),
      createButton('Restart this puzzle', 'challenge-text-btn', () => startPuzzle(false))
    );
    panel.append(sequence, actions);
    root.appendChild(panel);
    focusChallengeHeading('puzzleResultsTitle');
  }

  function returnToHub(focusHeading) {
    renderHub();
    if (focusHeading) focusChallengeHeading('challengeHubTitle');
  }

  renderProgress();
  renderHub();
})();
