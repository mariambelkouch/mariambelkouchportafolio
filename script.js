// Case content — same copy as the original build, now rendered into a
// collapsed row list that opens the full case in a modal on click (the toggle).
const cases = [
  {
    number: "01",
    kicker: "HAVONA · Decision architecture",
    title: "From founder gravity<br>to distributed decisions.",
    grid: [
      { h: "The situation", p: "Compensation decisions were being made case by case. Difficult conversations kept returning to leadership, and exceptions had nowhere else to land." },
      { h: "What I saw", p: "The problem wasn't primarily that the founders couldn't delegate. Nobody else had sufficient standing to make the call." },
      { h: "The design", p: "Built compensation bands, decision rights and documentation alongside equity and benefits architecture across 12 jurisdictions in EMEA, APAC and the US." },
      { h: "What changed", p: "<strong>50% reduction</strong> in ad-hoc executive compensation decisions. Leadership could make decisions within a system rather than carrying every exception personally." }
    ],
    quote: "Delegation isn't giving someone a decision. It's giving them a system they can use to make that decision without you."
  },
  {
    number: "02",
    kicker: "FIT 100 · Incentive architecture",
    title: "When a “people problem”<br>was actually an incentive problem.",
    grid: [
      { h: "The situation", p: "While partnering with Finance and looking at the numbers, I found that team members were receiving bonuses even when founder-set targets were not being met." },
      { h: "What I saw", p: "The founders saw missed targets as a performance problem. But the system was teaching people that the reward remained available regardless of the outcome." },
      { h: "The design", p: "Introduced regular 1:1s, reframed commercial accountability with the team, and introduced profit sharing so stronger performance created visible upside." },
      { h: "What changed", p: "The bonus leakage was <strong>more than €60K</strong>. Targets were subsequently hit, and team members began bringing forward their own ideas for increasing revenue." }
    ],
    quote: "If you don't understand the economics, you can't fully understand the people problem."
  },
  {
    number: "03",
    kicker: "HOTEL DU VIN · Work &amp; team design",
    title: "Designing the team<br>I wished I'd inherited.",
    grid: [
      { h: "The situation", p: "The bar had not had a stable team for more than seven years. Turnover was high and agency staff filled the gaps." },
      { h: "What I saw", p: "Hospitality had normalized giving managers the best shifts while junior team members absorbed the Friday nights, Saturday nights, Sundays and repeated closes." },
      { h: "The design", p: "Put myself and my Assistant Manager into the rota. Everyone received one weekend off and one Friday off each month, with a balanced mix of daytime, closing and undesirable shifts — while still allowing individual preference." },
      { h: "What changed", p: "<strong>7/7 retained for two years.</strong> <strong>4/7 progressed</strong> into more senior roles. The team/rota model was subsequently adopted by other departments." }
    ],
    quote: "Fairness isn't a value statement. It's a scheduling decision."
  },
  {
    number: "04",
    kicker: "BLUELINK · Knowledge systems",
    title: "A system that<br>survives its builder.",
    grid: [
      { h: "The situation", p: "Stepped into acting leadership of a 6-person recruiting team after the previous manager left — no formal title, but ownership of delivery and every escalation from there." },
      { h: "What I saw", p: "Everything the team knew about how to actually do the job lived in people's heads, not anywhere written down." },
      { h: "The design", p: "Wrote the team's first recruiting handbook, unasked. Separately — and before anyone else saw it — identified a colleague's potential and trained him as an eventual successor, running the full handover before moving on to Havona." },
      { h: "What changed", p: "The handbook <strong>outlived her</strong> — still in use by her successors after she left. That colleague built an entire HR career from a starting point he had no prior experience for." }
    ],
    quote: "A system isn't scalable because more people can use it. It's scalable when it no longer needs its creator."
  }
];

const listEl = document.getElementById('caseList');
cases.forEach((c, i) => {
  const row = document.createElement('button');
  row.type = 'button';
  row.className = 'case-row';
  row.innerHTML = `
    <span class="case-number">${c.number}</span>
    <span class="case-row-main">
      <span class="case-kicker">${c.kicker}</span>
      <span class="case-row-title">${c.title.replace('<br>', ' ')}</span>
    </span>
    <span class="case-row-arrow">→</span>`;
  row.addEventListener('click', () => openCase(i, row));
  listEl.appendChild(row);
});

const backdrop = document.getElementById('modalBackdrop');
const panel = document.getElementById('modalPanel');
const modalKicker = document.getElementById('modalKicker');
const modalTitle = document.getElementById('modalTitle');
const modalGrid = document.getElementById('modalGrid');
const modalQuote = document.getElementById('modalQuote');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
let current = -1;
let lastTrigger = null;

function renderCase(i) {
  const c = cases[i];
  current = i;
  modalKicker.textContent = c.kicker.replace(/&amp;/g, '&');
  modalTitle.innerHTML = c.title;
  modalGrid.innerHTML = c.grid.map(b => `<div><h4>${b.h}</h4><p>${b.p}</p></div>`).join('');
  modalQuote.textContent = c.quote;
  modalPrev.disabled = i === 0;
  modalNext.disabled = i === cases.length - 1;
}

function openCase(i, trigger) {
  lastTrigger = trigger || null;
  renderCase(i);
  backdrop.classList.add('open');
  document.body.classList.add('locked');
  panel.scrollTop = 0;
  document.getElementById('modalClose').focus();
  document.addEventListener('keydown', onKeydown);
}
function closeCase() {
  backdrop.classList.remove('open');
  document.body.classList.remove('locked');
  document.removeEventListener('keydown', onKeydown);
  if (lastTrigger) lastTrigger.focus();
}
function onKeydown(e) { if (e.key === 'Escape') closeCase(); }

document.getElementById('modalClose').addEventListener('click', closeCase);
backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeCase(); });
modalPrev.addEventListener('click', () => { if (current > 0) { renderCase(current - 1); panel.scrollTop = 0; } });
modalNext.addEventListener('click', () => { if (current < cases.length - 1) { renderCase(current + 1); panel.scrollTop = 0; } });

// Small progressive enhancement: reveal sections as they enter the viewport.
// Unchanged from the original — only the selector below adds .case-row,
// since .case no longer exists now that cases render as rows.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: 0.08});
document.querySelectorAll('section, .case-row').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});


// Full origin-story essay modal (independent of the case modal above)
const essayBackdrop = document.getElementById('essayBackdrop');
const readStoryLink = document.getElementById('readStoryLink');
const essayClose = document.getElementById('essayClose');

function openEssay(e) {
  if (e) e.preventDefault();
  essayBackdrop.classList.add('open');
  document.body.classList.add('locked');
  essayBackdrop.querySelector('.essay-panel').scrollTop = 0;
  essayClose.focus();
  document.addEventListener('keydown', onEssayKeydown);
}
function closeEssay() {
  essayBackdrop.classList.remove('open');
  document.body.classList.remove('locked');
  document.removeEventListener('keydown', onEssayKeydown);
  readStoryLink.focus();
}
function onEssayKeydown(e) { if (e.key === 'Escape') closeEssay(); }

readStoryLink.addEventListener('click', openEssay);
essayClose.addEventListener('click', closeEssay);
essayBackdrop.addEventListener('click', (e) => { if (e.target === essayBackdrop) closeEssay(); });
