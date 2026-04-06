/* =============================================
   TypeMe — script.js
   MBTI 성격 테스트 로직
   ============================================= */

// ─── 질문 데이터 (10문항) ───────────────────────────────
// 각 질문은 E/I, N/S, T/F, J/P 4개 차원 측정
// dimension: EI, NS, TF, JP
// A → 앞 글자(E/N/T/J), B → 뒤 글자(I/S/F/P)
const questions = [
  {
    id: 1,
    dimension: "EI",
    text: "주말에 아무 계획이 없다면 당신은 보통 어떻게 하나요?",
    a: "친구들에게 연락해 같이 놀 계획을 잡는다",
    b: "집에서 혼자만의 시간을 즐긴다"
  },
  {
    id: 2,
    dimension: "EI",
    text: "사람들이 많은 파티에 참석한 후 당신은 어떤 기분인가요?",
    a: "활력이 넘치고 기분이 더 좋아진다",
    b: "에너지가 소진된 느낌이 들어 혼자 쉬고 싶다"
  },
  {
    id: 3,
    dimension: "NS",
    text: "새로운 프로젝트를 시작할 때 당신은?",
    a: "가능성과 창의적인 아이디어에 집중한다",
    b: "구체적인 계획과 현실적인 단계를 먼저 세운다"
  },
  {
    id: 4,
    dimension: "NS",
    text: "정보를 받아들일 때 당신은 어느 쪽에 가깝나요?",
    a: "패턴과 의미, 미래의 가능성을 본다",
    b: "눈에 보이는 사실과 구체적인 세부 사항을 본다"
  },
  {
    id: 5,
    dimension: "TF",
    text: "친구가 힘든 결정을 내려야 할 때 당신은?",
    a: "논리적으로 분석하고 객관적인 조언을 해준다",
    b: "친구의 감정을 먼저 공감하고 위로해준다"
  },
  {
    id: 6,
    dimension: "TF",
    text: "갈등 상황이 생겼을 때 당신이 우선하는 것은?",
    a: "무엇이 공정하고 올바른지 따진다",
    b: "관계가 상하지 않도록 조화를 유지하는 것"
  },
  {
    id: 7,
    dimension: "JP",
    text: "여행을 계획할 때 당신은 어떤 스타일인가요?",
    a: "일정, 숙소, 동선을 꼼꼼하게 미리 짜둔다",
    b: "큰 방향만 정하고 즉흥적으로 즐긴다"
  },
  {
    id: 8,
    dimension: "JP",
    text: "마감이 있는 업무를 처리하는 당신의 방식은?",
    a: "미리미리 진행해서 여유 있게 끝낸다",
    b: "마감이 다가올수록 집중력이 올라가 막판에 해결한다"
  },
  {
    id: 9,
    dimension: "EI",
    text: "낯선 사람과 대화하는 상황이라면?",
    a: "먼저 말을 걸고 자연스럽게 어울린다",
    b: "상대방이 먼저 다가오길 기다리는 편이다"
  },
  {
    id: 10,
    dimension: "TF",
    text: "중요한 결정을 내릴 때 주로 무엇에 의존하나요?",
    a: "논리와 데이터 분석",
    b: "직감과 감정, 가치관"
  }
];

// ─── MBTI 결과 데이터 (16가지 중 주요 4가지) ─────────────────
const results = {
  ENFP: {
    emoji: "✨",
    name: "활동가",
    color: "#6c63ff",
    description: "ENFP는 자유롭고 창의적인 영혼의 소유자입니다. 항상 새로운 아이디어와 가능성을 탐구하며, 사람들과의 연결에서 에너지를 얻습니다. 열정적이고 낙관적이며, 어디서든 재미와 의미를 찾아냅니다. 규칙보다는 영감을 따르며, 세상을 더 나은 곳으로 만들고 싶어합니다.",
    strengths: ["뛰어난 공감 능력", "창의적 문제 해결", "카리스마와 열정", "적응력과 유연성"],
    weaknesses: ["집중력 유지 어려움", "지나친 이상주의", "비판에 민감", "계획성 부족"],
    compatGood: ["INTJ", "INFJ"],
    compatBad: ["ISTJ", "ESTJ"],
    celebs: [
      { name: "로버트 다우니 주니어", field: "배우", emoji: "🦸" },
      { name: "방탄소년단 RM", field: "뮤지션", emoji: "🎤" },
      { name: "로빈 윌리엄스", field: "배우/코미디언", emoji: "😄" },
      { name: "엘렌 드제너러스", field: "방송인", emoji: "🎭" }
    ]
  },
  INTJ: {
    emoji: "🧠",
    name: "전략가",
    color: "#ff4444",
    description: "INTJ는 독립적이고 결단력 있는 전략가입니다. 복잡한 문제를 분석하고 장기적인 계획을 세우는 데 탁월합니다. 높은 기준을 가지고 있으며, 효율성과 논리를 중시합니다. 내면에 풍부한 세계를 가지고 있지만, 목표 달성을 위해 냉철하게 행동합니다.",
    strengths: ["전략적 사고력", "독립심과 자율성", "높은 집중력", "목표 지향적"],
    weaknesses: ["감정 표현 어려움", "완벽주의 성향", "사교성 부족", "타인 의견 무시 경향"],
    compatGood: ["ENFP", "ENTP"],
    compatBad: ["ESFP", "ISFP"],
    celebs: [
      { name: "일론 머스크", field: "기업가", emoji: "🚀" },
      { name: "마크 저커버그", field: "기업가", emoji: "💻" },
      { name: "크리스토퍼 놀란", field: "영화감독", emoji: "🎬" },
      { name: "니체", field: "철학자", emoji: "📚" }
    ]
  },
  INFJ: {
    emoji: "🌿",
    name: "옹호자",
    color: "#00c874",
    description: "INFJ는 깊은 통찰력과 강한 이상을 가진 가장 희귀한 유형입니다. 타인을 돕고 세상을 개선하는 데 깊은 사명감을 느낍니다. 직관적으로 사람의 감정과 동기를 파악하며, 진정성 있는 관계를 중시합니다. 꿈꾸는 이상주의자이자 실행하는 완벽주의자입니다.",
    strengths: ["깊은 공감과 직관", "창의적 통찰력", "강한 신념과 원칙", "헌신적인 태도"],
    weaknesses: ["과도한 완벽주의", "번아웃에 취약", "극단적 내향성", "갈등 회피"],
    compatGood: ["ENFP", "ENTP"],
    compatBad: ["ESTP", "ISTP"],
    celebs: [
      { name: "마틴 루터 킹", field: "사회운동가", emoji: "✊" },
      { name: "태연", field: "가수", emoji: "🎵" },
      { name: "레이디 가가", field: "아티스트", emoji: "🌟" },
      { name: "넬슨 만델라", field: "정치인", emoji: "🕊️" }
    ]
  },
  ESFP: {
    emoji: "🎭",
    name: "연예인",
    color: "#ff8c00",
    description: "ESFP는 자발적이고 활기차며, 삶을 무대로 여기는 유형입니다. 현재 순간을 즐기는 능력이 탁월하고, 주변 사람들에게 즐거움과 에너지를 전파합니다. 실용적이고 현실적이면서도 감각적인 아름다움을 사랑합니다. 어떤 상황에서도 분위기를 살리는 타고난 엔터테이너입니다.",
    strengths: ["뛰어난 사교성", "강한 현재 집중력", "실용적 문제해결", "풍부한 감각"],
    weaknesses: ["장기 계획 어려움", "비판 수용 힘듦", "충동적 결정", "집중력 산만"],
    compatGood: ["ISTJ", "ISFJ"],
    compatBad: ["INTJ", "ENTJ"],
    celebs: [
      { name: "브루노 마스", field: "뮤지션", emoji: "🎸" },
      { name: "제니 (블랙핑크)", field: "아이돌", emoji: "💎" },
      { name: "리오나르도 디카프리오", field: "배우", emoji: "🏆" },
      { name: "케이티 페리", field: "가수", emoji: "🎤" }
    ]
  }
};

// ─── 상태 변수 ──────────────────────────────────────────
let currentQuestion = 0;
let answers = [];
let selectedValue = null;

// ─── DOM 요소 ────────────────────────────────────────────
const pages = {
  landing: document.getElementById('page-landing'),
  test:    document.getElementById('page-test'),
  result:  document.getElementById('page-result')
};

// ─── 유틸 함수 ───────────────────────────────────────────
function showPage(name) {
  Object.values(pages).forEach(p => p.classList.remove('active'));
  pages[name].classList.add('active');
  window.scrollTo(0, 0);
}

// ─── MBTI 계산 ───────────────────────────────────────────
function calculateMBTI() {
  const score = { E:0, I:0, N:0, S:0, T:0, F:0, J:0, P:0 };

  answers.forEach((ans, idx) => {
    const q = questions[idx];
    const dim = q.dimension; // e.g. "EI"
    const first = dim[0];   // E
    const second = dim[1];  // I
    if (ans === 'A') score[first]++;
    else             score[second]++;
  });

  const E_or_I = score.E >= score.I ? 'E' : 'I';
  const N_or_S = score.N >= score.S ? 'N' : 'S';
  const T_or_F = score.T >= score.F ? 'T' : 'F';
  const J_or_P = score.J >= score.P ? 'J' : 'P';

  const mbti = E_or_I + N_or_S + T_or_F + J_or_P;

  // 4가지 대표 유형으로 매핑
  return mapToResult(mbti);
}

function mapToResult(mbti) {
  if (mbti in results) return mbti;

  // 가장 가까운 결과 유형으로 매핑
  const mapping = {
    // ENFP 계열
    'ENFJ': 'INFJ', 'INFP': 'ENFP', 'ENTP': 'ENFP',
    // INTJ 계열
    'INTP': 'INTJ', 'ENTJ': 'INTJ', 'ISFP': 'INFJ',
    // INFJ 계열
    'ISFJ': 'INFJ', 'ISTP': 'INTJ',
    // ESFP 계열
    'ESTP': 'ESFP', 'ESFJ': 'ESFP', 'ISTJ': 'INTJ',
    'ESTJ': 'ESFP', 'ISFJ': 'INFJ'
  };
  return mapping[mbti] || 'ENFP';
}

// ─── 테스트 렌더링 ──────────────────────────────────────────
function renderQuestion(idx) {
  const q = questions[idx];
  const total = questions.length;

  // 카드 애니메이션 리셋
  const card = document.getElementById('questionCard');
  card.style.animation = 'none';
  card.offsetHeight; // reflow
  card.style.animation = '';

  document.getElementById('questionNum').textContent = idx + 1;
  document.getElementById('questionTotal').textContent = total;
  document.getElementById('qNumber').textContent = `Q.${String(idx + 1).padStart(2, '0')}`;
  document.getElementById('qText').textContent = q.text;
  document.getElementById('choiceAText').textContent = q.a;
  document.getElementById('choiceBText').textContent = q.b;

  // 진행률 바
  const pct = ((idx) / total) * 100;
  document.getElementById('progressFill').style.width = pct + '%';

  // 선택 상태 복원
  const saved = answers[idx];
  selectedValue = saved || null;

  const btnA = document.getElementById('choiceA');
  const btnB = document.getElementById('choiceB');
  btnA.classList.toggle('selected', saved === 'A');
  btnB.classList.toggle('selected', saved === 'B');

  // 버튼 상태
  document.getElementById('btnPrev').disabled = idx === 0;
  document.getElementById('btnNext').disabled = !saved;
  document.getElementById('btnNext').textContent = idx === total - 1 ? '결과 보기 →' : '다음 →';
}

function selectAnswer(value) {
  selectedValue = value;
  answers[currentQuestion] = value;

  document.getElementById('choiceA').classList.toggle('selected', value === 'A');
  document.getElementById('choiceB').classList.toggle('selected', value === 'B');
  document.getElementById('btnNext').disabled = false;

  // 자동 진행 (약간의 딜레이)
  setTimeout(() => {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      renderQuestion(currentQuestion);
    }
  }, 400);
}

// ─── 결과 렌더링 ─────────────────────────────────────────
function renderResult(mbtiKey) {
  const data = results[mbtiKey];

  // 히어로
  document.getElementById('resultEmoji').textContent = data.emoji;
  document.getElementById('resultTypeCode').textContent = mbtiKey;
  document.getElementById('resultTypeName').textContent = data.name;

  // 배경 색상
  document.getElementById('resultBg').style.background =
    `radial-gradient(ellipse at top, ${data.color}33, transparent 60%)`;

  // 설명
  document.getElementById('resultDesc').textContent = data.description;

  // 강점 / 약점
  const strengthsEl = document.getElementById('resultStrengths');
  const weaknessesEl = document.getElementById('resultWeaknesses');
  strengthsEl.innerHTML = data.strengths.map(s => `<li>${s}</li>`).join('');
  weaknessesEl.innerHTML = data.weaknesses.map(w => `<li>${w}</li>`).join('');

  // 궁합
  document.getElementById('compatGood').innerHTML =
    data.compatGood.map(t => `<span class="compat-tag">${t}</span>`).join('');
  document.getElementById('compatBad').innerHTML =
    data.compatBad.map(t => `<span class="compat-tag">${t}</span>`).join('');

  // 유명인
  const celebsGrid = document.getElementById('celebsGrid');
  celebsGrid.innerHTML = data.celebs.map(c => `
    <div class="celeb-card">
      <div class="celeb-emoji">${c.emoji}</div>
      <div class="celeb-name">${c.name}</div>
      <div class="celeb-field">${c.field}</div>
    </div>
  `).join('');

  // 공유 모달 데이터 세팅
  document.getElementById('shareEmoji').textContent = data.emoji;
  document.getElementById('shareCode').textContent = mbtiKey;
  document.getElementById('shareName').textContent = data.name;
  document.getElementById('shareTagline').textContent = `나는 ${mbtiKey} ${data.name}입니다`;
}

// ─── 리셋 ───────────────────────────────────────────────
function resetTest() {
  currentQuestion = 0;
  answers = [];
  selectedValue = null;
}

// ─── 이벤트 바인딩 ─────────────────────────────────────────

// 랜딩 → 테스트
document.getElementById('btnStart').addEventListener('click', () => {
  resetTest();
  showPage('test');
  renderQuestion(0);
});

// 홈 버튼
document.getElementById('btnHomeFromTest').addEventListener('click', () => showPage('landing'));
document.getElementById('btnHomeFromResult').addEventListener('click', () => showPage('landing'));

// 선택지 버튼
document.getElementById('choiceA').addEventListener('click', () => selectAnswer('A'));
document.getElementById('choiceB').addEventListener('click', () => selectAnswer('B'));

// 이전 버튼
document.getElementById('btnPrev').addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion(currentQuestion);
  }
});

// 다음 버튼
document.getElementById('btnNext').addEventListener('click', () => {
  if (!answers[currentQuestion]) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion(currentQuestion);
  } else {
    // 마지막 질문 → 결과
    const mbtiKey = calculateMBTI();

    // 진행률 100%
    document.getElementById('progressFill').style.width = '100%';

    setTimeout(() => {
      showPage('result');
      renderResult(mbtiKey);
    }, 300);
  }
});

// 다시 테스트
document.getElementById('btnRestart').addEventListener('click', () => {
  resetTest();
  showPage('test');
  renderQuestion(0);
});

// 공유 버튼
document.getElementById('btnShare').addEventListener('click', () => {
  document.getElementById('shareModal').classList.add('active');
});

// 모달 닫기
document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('shareModal').classList.remove('active');
});
document.getElementById('shareModal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('shareModal')) {
    document.getElementById('shareModal').classList.remove('active');
  }
});

// 공유 버튼들
document.getElementById('btnKakao').addEventListener('click', () => {
  alert('카카오톡 공유 기능은 API 연동 후 이용 가능합니다.');
});
document.getElementById('btnTwitter').addEventListener('click', () => {
  const code = document.getElementById('shareCode').textContent;
  const name = document.getElementById('shareName').textContent;
  const text = encodeURIComponent(`나의 MBTI 유형은 ${code} ${name}입니다! TypeMe에서 테스트해보세요 🎯`);
  window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
});
document.getElementById('btnCopy').addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    const btn = document.getElementById('btnCopy');
    const original = btn.textContent;
    btn.textContent = '✅ 복사됨!';
    setTimeout(() => { btn.textContent = original; }, 2000);
  }).catch(() => {
    alert('링크가 복사되었습니다: ' + window.location.href);
  });
});

// 키보드 단축키 (A/B 선택)
document.addEventListener('keydown', (e) => {
  if (pages.test.classList.contains('active')) {
    if (e.key === 'a' || e.key === 'A') selectAnswer('A');
    if (e.key === 'b' || e.key === 'B') selectAnswer('B');
    if (e.key === 'ArrowRight' && !document.getElementById('btnNext').disabled) {
      document.getElementById('btnNext').click();
    }
    if (e.key === 'ArrowLeft') {
      document.getElementById('btnPrev').click();
    }
  }
  if (e.key === 'Escape') {
    document.getElementById('shareModal').classList.remove('active');
  }
});
