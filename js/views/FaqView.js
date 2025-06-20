import * as User from '../models/UserModel.js';

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const accordion = document.getElementById("faq-accordion");
  const sendBtn = document.getElementById("send-question-btn");

  const faqData = {
    points: [
      {
        question: "What are points?",
        answer: "Points are rewards you earn using Lumya."
      },
      {
        question: "How to win points?",
        answer:
          'You win points every time you complete an <a href="#">Achievement</a> or by <a href="#">playing your Daily Mission</a>.'
      }
    ],
    achievements: [
      {
        question: "How to complete achievements?",
        answer: "You must perform specific actions in the app to unlock achievements."
      }
    ],
    daily: [
      {
        question: "What is the daily mission?",
        answer: "A short task to complete every day to earn points."
      }
    ],
    planner: [],
    trips: [],
    travelers: []
  };

  function loadFAQs(category) {
    accordion.innerHTML = "";

    if (!faqData[category] || faqData[category].length === 0) {
      accordion.innerHTML = "<p>No questions available in this category.</p>";
      return;
    }

    faqData[category].forEach((faq) => {
      const item = document.createElement("div");
      item.className = "accordion-item";
      item.innerHTML = `
        <button class="accordion-question">${faq.question}</button>
        <div class="accordion-answer">${faq.answer}</div>
      `;
      accordion.appendChild(item);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      loadFAQs(tab.dataset.category);
    });
  });

  accordion.addEventListener("click", (e) => {
    if (e.target.classList.contains("accordion-question")) {
      const answer = e.target.nextElementSibling;
      answer.classList.toggle("open");
    }
  });

  sendBtn.addEventListener("click", () => {
    const input = document.getElementById("faq-question");
    if (input.value.trim()) {
      alert("Question sent! Our team will review it.");
      input.value = "";
    }
  });

  loadFAQs("points"); // Load default
});