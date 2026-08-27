const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `  function applyFeatureVisibility() {
    var _a3;
    const f = ((_a3 = window.SERVER_CONFIG) == null ? void 0 : _a3.features) || {};
    const isRevealEnabled = f.reveal !== false && f.reveal_enabled !== false;
    const isMatchEnabled = f.match !== false && f.match_enabled !== false;
    const isQuestionEnabled = f.question !== false && f.chat !== false && f.question_enabled !== false;

    const revealBtn = $("genBtn"), matchBtn = $("matchBtn"), chat = $("chatCard"), matchTab = $("tabKundli");
    const ribbon = $("chatQuestionsRibbon"), navTabQ = $("navTabQuestions"), navPanelQ = $("navPanelQuestions");

    if (revealBtn)
      revealBtn.disabled = !isRevealEnabled;
    if (matchBtn)
      matchBtn.disabled = !isMatchEnabled;
    if (matchTab)
      matchTab.style.display = isMatchEnabled ? "" : "none";

    if (chat) {
      if (!isQuestionEnabled) {
        chat.style.setProperty("display", "none", "important");
        chat.setAttribute("data-feature-hidden", "true");
      } else {
        chat.removeAttribute("data-feature-hidden");
      }
    }
    if (ribbon && !isQuestionEnabled) {
      ribbon.style.setProperty("display", "none", "important");
    }
    if (navTabQ) {
      navTabQ.style.setProperty("display", isQuestionEnabled ? "" : "none", isQuestionEnabled ? "" : "important");
    }
    if (navPanelQ && !isQuestionEnabled) {
      navPanelQ.style.setProperty("display", "none", "important");
    }

    document.querySelectorAll('.plan-card[data-plan="question"], .plan-card[data-plan="questions_pack"]').forEach((card) => {
      if (!isQuestionEnabled) {
        card.style.setProperty("display", "none", "important");
        if (card.classList.contains("active")) {
          card.classList.remove("active");
          const revealCard = document.querySelector('.plan-card[data-plan="reveal"]');
          if (revealCard) revealCard.classList.add("active");
        }
      } else {
        card.style.removeProperty("display");
      }
    });

    document.querySelectorAll(".jump-to-ask-btn, .ask-chart-link, .nav-q-btn, .chat-q-chip").forEach((el) => {
      if (!isQuestionEnabled) {
        el.style.setProperty("display", "none", "important");
      } else {
        el.style.removeProperty("display");
      }
    });
  }`;

const replacement = `  function applyFeatureVisibility() {
    var _a3;
    const f = ((_a3 = window.SERVER_CONFIG) == null ? void 0 : _a3.features) || {};
    const isRevealEnabled = f.reveal !== false && f.reveal_enabled !== false;
    const isMatchEnabled = f.match !== false && f.match_enabled !== false;
    const isQuestionEnabled = f.question !== false && f.chat !== false && f.question_enabled !== false;

    const revealBtn = $("genBtn"), matchBtn = $("matchBtn"), chat = $("chatCard"), matchTab = $("tabKundli");
    const ribbon = $("chatQuestionsRibbon"), navTabQ = $("navTabQuestions"), navPanelQ = $("navPanelQuestions");
    const tabConsultation = $("tabConsultation"), quickAskBtn = $("quickAskBtn");

    if (revealBtn)
      revealBtn.disabled = !isRevealEnabled;
    if (matchBtn)
      matchBtn.disabled = !isMatchEnabled;
    if (matchTab)
      matchTab.style.display = isMatchEnabled ? "" : "none";

    if (tabConsultation) tabConsultation.style.setProperty("display", isQuestionEnabled ? "" : "none", isQuestionEnabled ? "" : "important");
    if (quickAskBtn) quickAskBtn.style.setProperty("display", isQuestionEnabled ? "" : "none", isQuestionEnabled ? "" : "important");

    if (chat) {
      if (!isQuestionEnabled) {
        chat.style.setProperty("display", "none", "important");
        chat.setAttribute("data-feature-hidden", "true");
      } else {
        chat.removeAttribute("data-feature-hidden");
      }
    }
    if (ribbon) {
      if (!isQuestionEnabled) {
        ribbon.style.setProperty("display", "none", "important");
      } else {
        ribbon.style.removeProperty("display");
      }
    }
    if (navTabQ) {
      navTabQ.style.setProperty("display", isQuestionEnabled ? "" : "none", isQuestionEnabled ? "" : "important");
    }
    if (navPanelQ) {
      if (!isQuestionEnabled) {
        navPanelQ.style.setProperty("display", "none", "important");
      } else {
        navPanelQ.style.removeProperty("display");
      }
    }

    document.querySelectorAll('.plan-card[data-plan="question"], .plan-card[data-plan="questions_pack"]').forEach((card) => {
      if (!isQuestionEnabled) {
        card.style.setProperty("display", "none", "important");
        if (card.classList.contains("active")) {
          card.classList.remove("active");
          const revealCard = document.querySelector('.plan-card[data-plan="reveal"]');
          if (revealCard) revealCard.classList.add("active");
        }
      } else {
        card.style.removeProperty("display");
      }
    });

    document.querySelectorAll(".jump-to-ask-btn, .ask-chart-link, .nav-q-btn, .chat-q-chip").forEach((el) => {
      if (!isQuestionEnabled) {
        el.style.setProperty("display", "none", "important");
      } else {
        el.style.removeProperty("display");
      }
    });
  }`;

if (html.includes(targetStr)) {
  fs.writeFileSync('index.html', html.replace(targetStr, replacement));
  console.log('Successfully replaced via exact match.');
} else {
  console.log('Target string not found in index.html, searching using loose check');
}
