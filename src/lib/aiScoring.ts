export interface CandidateForm {
  id: string;
  name: string;
  age: number;
  position: string;
  location: string;
  experience: number;
  education: string;
  educationLevel: "school" | "bachelor" | "master" | "phd";
  skills: string;
  previousCompanies: string;
  employerReview: string;
  employerRating: number;
  accidents: number;
  motivation: string;
  achievements: string;
  languages: string;
  submittedAt: string;
  avatar: string;
}

export interface ScoreBreakdown {
  label: string;
  value: number;
  max: number;
  sign: "+" | "-";
  reason: string;
}

export interface ScoredCandidate extends CandidateForm {
  score: number;
  status: "top" | "high" | "mid" | "low";
  scoreBreakdown: ScoreBreakdown[];
  aiSummary: string;
  shortlisted: boolean;
  tags: string[];
}

function scoreExperience(exp: number): ScoreBreakdown {
  let value = 0;
  let reason = "";
  if (exp >= 7) { value = 30; reason = "Обширный опыт 7+ лет → максимальный балл"; }
  else if (exp >= 5) { value = 25; reason = "Хороший опыт 5–7 лет"; }
  else if (exp >= 3) { value = 18; reason = "Средний опыт 3–5 лет"; }
  else if (exp >= 1) { value = 10; reason = "Минимальный опыт менее 3 лет"; }
  else { value = 3; reason = "Опыт отсутствует"; }
  return { label: "Опыт работы", value, max: 30, sign: "+", reason };
}

function scoreEducation(level: CandidateForm["educationLevel"]): ScoreBreakdown {
  const map = {
    phd: { value: 20, reason: "Докторская степень — высший уровень образования" },
    master: { value: 18, reason: "Магистратура — отличная академическая подготовка" },
    bachelor: { value: 14, reason: "Бакалавриат — базовое высшее образование" },
    school: { value: 6, reason: "Среднее образование — без высшего диплома" },
  };
  return { label: "Образование", ...map[level], max: 20, sign: "+" };
}

function scoreMotivation(motivation: string, achievements: string): ScoreBreakdown {
  const text = (motivation + " " + achievements).toLowerCase();
  let value = 0;
  const positiveKeywords = ["лидер", "иннов", "рост", "команд", "цель", "достиж", "улучш", "разви", "страте", "реализ", "вклад", "эффект", "результ", "амбиц", "passion", "drive", "impact", "lead", "innovat", "grow", "achiev"];
  const negativeKeywords = ["просто", "хочу деньги", "не знаю", "может быть", "попробую"];
  const posCount = positiveKeywords.filter(k => text.includes(k)).length;
  const negCount = negativeKeywords.filter(k => text.includes(k)).length;
  const wordCount = motivation.split(" ").filter(Boolean).length;

  if (wordCount < 20) value = 5;
  else if (wordCount < 50) value = 10;
  else value = 14;

  value += Math.min(posCount * 2, 6);
  value -= negCount * 3;
  value = Math.max(2, Math.min(20, value));

  const reason = value >= 16
    ? "Сильная, конкретная мотивация с чёткими целями"
    : value >= 10
    ? "Мотивация есть, но недостаточно конкретики"
    : "Слабая мотивация — мало деталей";

  return { label: "Мотивация", value, max: 20, sign: value >= 10 ? "+" : "-", reason };
}

function scoreReviews(rating: number, reviewText: string, accidents: number): ScoreBreakdown {
  let value = 0;
  const text = reviewText.toLowerCase();
  const positiveWords = ["отличн", "рекоменд", "профессион", "надёжн", "excellent", "great", "recommend", "reliable", "strong"];
  const negativeWords = ["опоздан", "конфликт", "пробл", "жалоб", "уволен", "late", "issue", "problem", "fired"];

  if (rating === 5) value = 22;
  else if (rating === 4) value = 17;
  else if (rating === 3) value = 10;
  else if (rating === 2) value = 5;
  else value = 2;

  const posCount = positiveWords.filter(k => text.includes(k)).length;
  const negCount = negativeWords.filter(k => text.includes(k)).length;
  value += Math.min(posCount, 3);
  value -= negCount * 2;
  value -= accidents * 4;
  value = Math.max(0, Math.min(25, value));

  const sign: "+" | "-" = value >= 12 ? "+" : "-";
  const reason = accidents > 0
    ? `Рейтинг ${rating}/5, но есть инциденты (${accidents}) → штраф`
    : value >= 18
    ? `Высокий рейтинг ${rating}/5, положительные отзывы`
    : value >= 10
    ? `Рейтинг ${rating}/5, нейтральные отзывы`
    : `Низкий рейтинг или негативные отзывы`;

  return { label: "Отзывы и рейтинг", value, max: 25, sign, reason };
}

function scoreSkills(skills: string, languages: string): ScoreBreakdown {
  const allSkills = (skills + " " + languages).toLowerCase();
  const skillList = allSkills.split(/[,;\s]+/).filter(s => s.length > 2);
  let value = Math.min(skillList.length * 1.5, 5);

  const highValueSkills = ["python", "sql", "react", "java", "leadership", "management", "data", "ai", "ml", "finance", "legal", "english", "chinese", "arabic"];
  const matchCount = highValueSkills.filter(s => allSkills.includes(s)).length;
  value += matchCount * 2;
  value = Math.max(1, Math.min(5, value));

  const reason = value >= 4
    ? "Сильный набор востребованных навыков"
    : value >= 3
    ? "Базовые навыки присутствуют"
    : "Навыки требуют развития";

  return { label: "Навыки", value: Math.round(value), max: 5, sign: "+", reason };
}

function getStatus(score: number): ScoredCandidate["status"] {
  if (score >= 85) return "top";
  if (score >= 70) return "high";
  if (score >= 55) return "mid";
  return "low";
}

function generateSummary(candidate: CandidateForm, score: number, breakdown: ScoreBreakdown[]): string {
  const topFactor = [...breakdown].sort((a, b) => b.value - a.score)[0];
  const status = getStatus(score);
  if (status === "top") {
    return `Выдающийся кандидат с высоким потенциалом. ${topFactor?.reason ?? ""} Настоятельно рекомендуется к интервью.`;
  } else if (status === "high") {
    return `Сильный кандидат, соответствует большинству критериев. Рекомендуется к рассмотрению.`;
  } else if (status === "mid") {
    return `Кандидат с умеренным потенциалом. Есть области для развития. Возможно включение в резервный список.`;
  }
  return `Кандидат пока не соответствует ключевым требованиям программы. Рекомендуется отклонить заявку.`;
}

function extractTags(candidate: CandidateForm): string[] {
  const tags: string[] = [];
  const text = (candidate.skills + " " + candidate.position).toLowerCase();
  if (text.includes("product") || text.includes("менеджер")) tags.push("Product");
  if (text.includes("react") || text.includes("frontend")) tags.push("Frontend");
  if (text.includes("python") || text.includes("backend")) tags.push("Backend");
  if (text.includes("data") || text.includes("analyst")) tags.push("Data");
  if (text.includes("design") || text.includes("ui") || text.includes("ux")) tags.push("Design");
  if (text.includes("sales") || text.includes("продаж")) tags.push("Sales");
  if (text.includes("market")) tags.push("Marketing");
  if (text.includes("finance") || text.includes("финанс")) tags.push("Finance");
  if (candidate.experience >= 5) tags.push("Senior");
  else if (candidate.experience >= 2) tags.push("Middle");
  else tags.push("Junior");
  return tags.slice(0, 4);
}

export function scoreCandidate(form: CandidateForm): ScoredCandidate {
  const breakdown: ScoreBreakdown[] = [
    scoreExperience(form.experience),
    scoreEducation(form.educationLevel),
    scoreMotivation(form.motivation, form.achievements),
    scoreReviews(form.employerRating, form.employerReview, form.accidents),
    scoreSkills(form.skills, form.languages),
  ];

  const score = Math.min(100, breakdown.reduce((s, b) => s + b.value, 0));
  const status = getStatus(score);
  const aiSummary = generateSummary(form, score, breakdown);
  const tags = extractTags(form);

  return {
    ...form,
    score,
    status,
    scoreBreakdown: breakdown,
    aiSummary,
    shortlisted: score >= 75,
    tags,
  };
}
