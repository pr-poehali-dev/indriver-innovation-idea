import { useState } from "react";
import Icon from "@/components/ui/icon";
import { scoreCandidate, type CandidateForm, type ScoredCandidate } from "@/lib/aiScoring";

type CommissionStatus = "pending" | "accepted" | "rejected" | "review";

const COMMISSION_STATUS_META: Record<CommissionStatus, { label: string; color: string; bg: string; icon: string }> = {
  pending:  { label: "На рассмотрении", color: "#94a3b8", bg: "rgba(148,163,184,0.1)",  icon: "Clock" },
  review:   { label: "Собеседование",   color: "#38bdf8", bg: "rgba(56,189,248,0.12)",  icon: "CalendarCheck" },
  accepted: { label: "Принят",          color: "#00e896", bg: "rgba(0,232,150,0.12)",   icon: "CheckCircle2" },
  rejected: { label: "Отклонён",        color: "#f87171", bg: "rgba(248,113,113,0.12)", icon: "XCircle" },
};

const DEMO_CANDIDATES: ScoredCandidate[] = [
  {
    id: "d1", name: "Айгерим Бекова", age: 29, position: "Senior Product Manager",
    location: "Алматы", experience: 7, education: "MBA, KIMEP University",
    educationLevel: "master", skills: "Product Management, Agile, Data Analysis, B2C",
    previousCompanies: "Kaspi.kz, Choco", employerReview: "Исключительный специалист. Вывела 3 продукта на рынок. Рекомендую без сомнений.",
    employerRating: 5, accidents: 0, motivation: "Стремлюсь к лидерству в продуктовой разработке. Хочу развивать инновационные решения для реального бизнеса. Моя цель — создавать продукты с реальным влиянием на рынок.",
    achievements: "Запустила 3 продукта, вырастила команду с 5 до 20 человек", languages: "Казахский, Русский, English",
    submittedAt: "2026-03-10", avatar: "АБ",
    score: 94, status: "top", shortlisted: true, tags: ["Product", "Agile", "Data", "Senior"],
    aiSummary: "Выдающийся кандидат с высоким потенциалом. Обширный опыт 7+ лет → максимальный балл. Настоятельно рекомендуется к интервью.",
    scoreBreakdown: [
      { label: "Опыт работы", value: 30, max: 30, sign: "+", reason: "Обширный опыт 7+ лет → максимальный балл" },
      { label: "Образование", value: 18, max: 20, sign: "+", reason: "Магистратура — отличная академическая подготовка" },
      { label: "Мотивация", value: 20, max: 20, sign: "+", reason: "Сильная, конкретная мотивация с чёткими целями" },
      { label: "Отзывы и рейтинг", value: 22, max: 25, sign: "+", reason: "Высокий рейтинг 5/5, положительные отзывы" },
      { label: "Навыки", value: 4, max: 5, sign: "+", reason: "Сильный набор востребованных навыков" },
    ],
  },
  {
    id: "d2", name: "Тимур Джаксыбеков", age: 26, position: "Full-Stack Engineer",
    location: "Астана", experience: 5, education: "CS, Назарбаев Университет",
    educationLevel: "bachelor", skills: "React, Python, AWS, PostgreSQL, Docker",
    previousCompanies: "Beeline KZ", employerReview: "Быстро учится, пишет чистый код. Рекомендую.",
    employerRating: 5, accidents: 0, motivation: "Хочу развиваться как инженер и вносить вклад в технологические продукты, которые меняют жизни. Стремлюсь к росту и инновациям.",
    achievements: "Разработал платёжную систему, обрабатывающую 100K транзакций/день", languages: "Казахский, Русский, English",
    submittedAt: "2026-03-12", avatar: "ТД",
    score: 88, status: "high", shortlisted: true, tags: ["Backend", "Frontend", "Data", "Middle"],
    aiSummary: "Сильный кандидат, соответствует большинству критериев. Рекомендуется к рассмотрению.",
    scoreBreakdown: [
      { label: "Опыт работы", value: 25, max: 30, sign: "+", reason: "Хороший опыт 5–7 лет" },
      { label: "Образование", value: 14, max: 20, sign: "+", reason: "Бакалавриат — базовое высшее образование" },
      { label: "Мотивация", value: 18, max: 20, sign: "+", reason: "Сильная, конкретная мотивация с чёткими целями" },
      { label: "Отзывы и рейтинг", value: 25, max: 25, sign: "+", reason: "Высокий рейтинг 5/5, положительные отзывы" },
      { label: "Навыки", value: 5, max: 5, sign: "+", reason: "Сильный набор востребованных навыков" },
    ],
  },
  {
    id: "d3", name: "Мадина Сейтова", age: 27, position: "UX/UI Designer",
    location: "Алматы", experience: 4, education: "Дизайн, МАБ",
    educationLevel: "bachelor", skills: "Figma, UX Research, Motion, Design System",
    previousCompanies: "inDriver, Kolesa.kz", employerReview: "Хороший дизайнер, иногда пропускала дедлайны.",
    employerRating: 4, accidents: 0, motivation: "Создавать красивые и удобные продукты. Хочу работать в команде, где дизайн влияет на бизнес-результаты.",
    achievements: "Разработала дизайн-систему для 50+ компонентов", languages: "Казахский, Русский",
    submittedAt: "2026-03-14", avatar: "МС",
    score: 75, status: "high", shortlisted: true, tags: ["Design", "Middle"],
    aiSummary: "Сильный кандидат, соответствует большинству критериев. Рекомендуется к рассмотрению.",
    scoreBreakdown: [
      { label: "Опыт работы", value: 18, max: 30, sign: "+", reason: "Средний опыт 3–5 лет" },
      { label: "Образование", value: 14, max: 20, sign: "+", reason: "Бакалавриат — базовое высшее образование" },
      { label: "Мотивация", value: 14, max: 20, sign: "+", reason: "Мотивация есть, но недостаточно конкретики" },
      { label: "Отзывы и рейтинг", value: 25, max: 25, sign: "+", reason: "Рейтинг 4/5, нейтральные отзывы" },
      { label: "Навыки", value: 4, max: 5, sign: "+", reason: "Сильный набор востребованных навыков" },
    ],
  },
  {
    id: "d4", name: "Ерлан Омаров", age: 24, position: "Data Analyst",
    location: "Шымкент", experience: 3, education: "Экономика, КазНУ",
    educationLevel: "bachelor", skills: "SQL, Python, Tableau, Excel",
    previousCompanies: "ForteBank", employerReview: "Умеет работать с большими датасетами, SQL на уровне.",
    employerRating: 4, accidents: 0, motivation: "Хочу попробовать себя в аналитике данных.",
    achievements: "Автоматизировал отчётность, сэкономил 10 часов в неделю", languages: "Казахский, Русский",
    submittedAt: "2026-03-15", avatar: "ЕО",
    score: 65, status: "mid", shortlisted: false, tags: ["Data", "Middle"],
    aiSummary: "Кандидат с умеренным потенциалом. Есть области для развития.",
    scoreBreakdown: [
      { label: "Опыт работы", value: 18, max: 30, sign: "+", reason: "Средний опыт 3–5 лет" },
      { label: "Образование", value: 14, max: 20, sign: "+", reason: "Бакалавриат — базовое высшее образование" },
      { label: "Мотивация", value: 7, max: 20, sign: "-", reason: "Слабая мотивация — мало деталей" },
      { label: "Отзывы и рейтинг", value: 22, max: 25, sign: "+", reason: "Рейтинг 4/5, нейтральные отзывы" },
      { label: "Навыки", value: 4, max: 5, sign: "+", reason: "Сильный набор востребованных навыков" },
    ],
  },
  {
    id: "d5", name: "Нурлан Сагинтаев", age: 22, position: "Operations Manager",
    location: "Павлодар", experience: 1, education: "Менеджмент, ЕНУ",
    educationLevel: "bachelor", skills: "Excel, Logistics",
    previousCompanies: "LocalShop", employerReview: "Исполнительный, но инициативы мало.",
    employerRating: 3, accidents: 2, motivation: "Хочу денег и карьеры.",
    achievements: "", languages: "Казахский, Русский",
    submittedAt: "2026-03-16", avatar: "НС",
    score: 38, status: "low", shortlisted: false, tags: ["Junior"],
    aiSummary: "Кандидат пока не соответствует ключевым требованиям программы. Рекомендуется отклонить заявку.",
    scoreBreakdown: [
      { label: "Опыт работы", value: 10, max: 30, sign: "-", reason: "Минимальный опыт менее 3 лет" },
      { label: "Образование", value: 14, max: 20, sign: "+", reason: "Бакалавриат — базовое высшее образование" },
      { label: "Мотивация", value: 2, max: 20, sign: "-", reason: "Слабая мотивация — мало деталей" },
      { label: "Отзывы и рейтинг", value: 2, max: 25, sign: "-", reason: "Низкий рейтинг или негативные отзывы, есть инциденты (2)" },
      { label: "Навыки", value: 2, max: 5, sign: "-", reason: "Навыки требуют развития" },
    ],
  },
];

const getScoreColor = (score: number) => {
  if (score >= 85) return "#00e896";
  if (score >= 70) return "#fbbf24";
  if (score >= 55) return "#fb923c";
  return "#f87171";
};

const getStatusLabel = (status: string) => {
  if (status === "top") return "Топ";
  if (status === "high") return "Высокий";
  if (status === "mid") return "Средний";
  return "Низкий";
};

const getStatusBg = (status: string) => {
  if (status === "top") return "bg-emerald-500/15 text-emerald-400 border-emerald-500/25";
  if (status === "high") return "bg-blue-500/15 text-blue-400 border-blue-500/25";
  if (status === "mid") return "bg-amber-500/15 text-amber-400 border-amber-500/25";
  return "bg-red-500/15 text-red-400 border-red-500/25";
};

const emptyForm: Omit<CandidateForm, "id" | "submittedAt" | "avatar"> = {
  name: "", age: 25, position: "", location: "",
  experience: 0, education: "", educationLevel: "bachelor",
  skills: "", previousCompanies: "", employerReview: "",
  employerRating: 4, accidents: 0, motivation: "",
  achievements: "", languages: "",
};

type Tab = "apply" | "rating" | "shortlist" | "commission";

export default function Index() {
  const [tab, setTab] = useState<Tab>("rating");
  const [candidates, setCandidates] = useState<ScoredCandidate[]>(DEMO_CANDIDATES);
  const [commissionStatuses, setCommissionStatuses] = useState<Record<string, CommissionStatus>>({
    d1: "accepted", d2: "review", d3: "review", d4: "pending", d5: "rejected",
  });
  const [form, setForm] = useState({ ...emptyForm });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<ScoredCandidate | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"score" | "experience">("score");
  const [commissionNote, setCommissionNote] = useState<Record<string, string>>({});
  const [editingNote, setEditingNote] = useState<string | null>(null);

  const setStatus = (id: string, status: CommissionStatus) => {
    setCommissionStatuses(prev => ({ ...prev, [id]: status }));
  };

  const sorted = [...candidates].sort((a, b) =>
    sortBy === "score" ? b.score - a.score : b.experience - a.experience
  );
  const shortlist = sorted.filter(c => c.shortlisted);

  const commissionStats = {
    accepted: Object.values(commissionStatuses).filter(s => s === "accepted").length,
    review:   Object.values(commissionStatuses).filter(s => s === "review").length,
    rejected: Object.values(commissionStatuses).filter(s => s === "rejected").length,
    pending:  Object.values(commissionStatuses).filter(s => s === "pending").length,
  };

  const handleSubmit = () => {
    if (!form.name || !form.position || !form.motivation) return;
    setSubmitting(true);
    setTimeout(() => {
      const newCandidate = scoreCandidate({
        ...form,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString().split("T")[0],
        avatar: form.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
      });
      setCandidates(prev => [...prev, newCandidate]);
      setCommissionStatuses(prev => ({ ...prev, [newCandidate.id]: "pending" }));
      setSubmitted(newCandidate);
      setSubmitting(false);
      setForm({ ...emptyForm });
    }, 1800);
  };

  const stats = {
    total: candidates.length,
    shortlisted: candidates.filter(c => c.shortlisted).length,
    avg: Math.round(candidates.reduce((s, c) => s + c.score, 0) / candidates.length),
  };

  return (
    <div className="min-h-screen font-golos" style={{ background: "hsl(220,20%,6%)", backgroundImage: "linear-gradient(rgba(0,232,150,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,232,150,0.02) 1px,transparent 1px)", backgroundSize: "40px 40px" }}>

      {/* Header */}
      <header className="border-b border-white/5 sticky top-0 z-40" style={{ background: "rgba(10,12,18,0.9)", backdropFilter: "blur(24px)" }}>
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#00e896,#00b4d8)" }}>
              <Icon name="Zap" size={17} className="text-black" />
            </div>
            <div>
              <div className="font-bold text-white text-sm tracking-wide">inDriver</div>
              <div className="text-white/35 text-xs font-mono-custom">AI Candidate Selector</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 glass rounded-xl p-1">
            {([
              { key: "apply",      icon: "FilePlus",   label: "Подать заявку" },
              { key: "rating",     icon: "BarChart2",  label: "Рейтинг" },
              { key: "shortlist",  icon: "Star",       label: `Shortlist (${stats.shortlisted})` },
              { key: "commission", icon: "Users",      label: "Комиссия" },
            ] as const).map(t => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setSubmitted(null); }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${tab === t.key ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"}`}
              >
                <Icon name={t.icon} size={13} />
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs" style={{ background: "rgba(0,232,150,0.1)", color: "#00e896", border: "1px solid rgba(0,232,150,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" style={{ animation: "pulse 2s infinite" }} />
            AI активен
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-8">

        {/* ── TAB: APPLY ── */}
        {tab === "apply" && (
          <div className="animate-fade-in max-w-2xl mx-auto">
            {submitted ? (
              <div className="glass rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${getScoreColor(submitted.score)}20`, border: `2px solid ${getScoreColor(submitted.score)}50` }}>
                  <span className="text-2xl font-bold font-mono-custom" style={{ color: getScoreColor(submitted.score) }}>{submitted.score}</span>
                </div>
                <div className="text-white font-bold text-xl mb-1">Заявка принята!</div>
                <div className="text-white/40 text-sm mb-2">{submitted.name} · {getStatusLabel(submitted.status)}</div>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">{submitted.aiSummary}</p>

                <div className="space-y-2 mb-6 text-left">
                  {submitted.scoreBreakdown.map(b => (
                    <div key={b.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-white/50 text-xs">{b.label}</span>
                        <span className="font-mono-custom text-xs" style={{ color: b.sign === "+" ? "#00e896" : "#f87171" }}>{b.sign}{b.value}/{b.max}</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/8">
                        <div className="h-full rounded-full transition-all" style={{ width: `${(b.value / b.max) * 100}%`, background: b.sign === "+" ? "linear-gradient(90deg,#00e896,#00b4d8)" : "linear-gradient(90deg,#f87171,#fb923c)" }} />
                      </div>
                    </div>
                  ))}
                </div>

                {submitted.shortlisted && (
                  <div className="mb-5 py-3 px-4 rounded-xl text-sm font-medium" style={{ background: "rgba(0,232,150,0.1)", color: "#00e896", border: "1px solid rgba(0,232,150,0.2)" }}>
                    🎉 Вы попали в Shortlist — комиссия рассмотрит вашу заявку
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => { setSubmitted(null); setTab("rating"); }} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "linear-gradient(135deg,#00e896,#00b4d8)", color: "#0d0f14" }}>
                    Посмотреть рейтинг
                  </button>
                  <button onClick={() => setSubmitted(null)} className="px-4 py-2.5 rounded-xl text-sm glass text-white/60 hover:text-white transition-colors">
                    Новая заявка
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-7">
                  <h1 className="text-2xl font-bold text-white mb-1">Подать заявку</h1>
                  <p className="text-white/40 text-sm">AI автоматически оценит вашу заявку по 5 критериям</p>
                </div>

                <div className="space-y-4">
                  {/* Personal */}
                  <div className="glass rounded-2xl p-5">
                    <div className="text-white/50 text-xs font-medium uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Icon name="User" size={13} /> Личные данные
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="text-white/40 text-xs mb-1 block">ФИО *</label>
                        <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Иванов Иван Иванович" className="w-full bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-white/20 transition-colors" />
                      </div>
                      <div>
                        <label className="text-white/40 text-xs mb-1 block">Возраст</label>
                        <input type="number" value={form.age} onChange={e => setForm(f => ({ ...f, age: +e.target.value }))} className="w-full bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-white/20 transition-colors" />
                      </div>
                      <div>
                        <label className="text-white/40 text-xs mb-1 block">Желаемая позиция *</label>
                        <input value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} placeholder="Product Manager" className="w-full bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-white/20 transition-colors" />
                      </div>
                      <div>
                        <label className="text-white/40 text-xs mb-1 block">Город</label>
                        <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Алматы" className="w-full bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-white/20 transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="glass rounded-2xl p-5">
                    <div className="text-white/50 text-xs font-medium uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Icon name="Briefcase" size={13} /> Опыт и образование
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-white/40 text-xs mb-1 block">Лет опыта</label>
                        <input type="number" min={0} max={40} value={form.experience} onChange={e => setForm(f => ({ ...f, experience: +e.target.value }))} className="w-full bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-white/20 transition-colors" />
                      </div>
                      <div>
                        <label className="text-white/40 text-xs mb-1 block">Уровень образования</label>
                        <select value={form.educationLevel} onChange={e => setForm(f => ({ ...f, educationLevel: e.target.value as CandidateForm["educationLevel"] }))} className="w-full bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-white/20 transition-colors">
                          <option value="school" className="bg-gray-900">Среднее</option>
                          <option value="bachelor" className="bg-gray-900">Бакалавр</option>
                          <option value="master" className="bg-gray-900">Магистр</option>
                          <option value="phd" className="bg-gray-900">Докторантура</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="text-white/40 text-xs mb-1 block">ВУЗ и специальность</label>
                        <input value={form.education} onChange={e => setForm(f => ({ ...f, education: e.target.value }))} placeholder="Назарбаев Университет, Computer Science" className="w-full bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-white/20 transition-colors" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-white/40 text-xs mb-1 block">Навыки (через запятую)</label>
                        <input value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} placeholder="Python, SQL, React, Leadership..." className="w-full bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-white/20 transition-colors" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-white/40 text-xs mb-1 block">Языки</label>
                        <input value={form.languages} onChange={e => setForm(f => ({ ...f, languages: e.target.value }))} placeholder="Казахский, Русский, English" className="w-full bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-white/20 transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Reviews */}
                  <div className="glass rounded-2xl p-5">
                    <div className="text-white/50 text-xs font-medium uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Icon name="MessageSquare" size={13} /> Отзыв работодателя
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="text-white/40 text-xs mb-1 block">Предыдущие компании</label>
                        <input value={form.previousCompanies} onChange={e => setForm(f => ({ ...f, previousCompanies: e.target.value }))} placeholder="Kaspi.kz, Beeline" className="w-full bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-white/20 transition-colors" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-white/40 text-xs mb-1 block">Отзыв от работодателя</label>
                        <textarea value={form.employerReview} onChange={e => setForm(f => ({ ...f, employerReview: e.target.value }))} placeholder="Напишите или вставьте отзыв от предыдущего работодателя..." rows={3} className="w-full bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-white/20 transition-colors resize-none" />
                      </div>
                      <div>
                        <label className="text-white/40 text-xs mb-1 block">Рейтинг от работодателя</label>
                        <div className="flex gap-2 pt-1">
                          {[1, 2, 3, 4, 5].map(s => (
                            <button key={s} onClick={() => setForm(f => ({ ...f, employerRating: s }))} className={`text-xl transition-all ${form.employerRating >= s ? "text-amber-400" : "text-white/15 hover:text-white/30"}`}>★</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-white/40 text-xs mb-1 block">Аварии / инциденты</label>
                        <input type="number" min={0} max={20} value={form.accidents} onChange={e => setForm(f => ({ ...f, accidents: +e.target.value }))} className="w-full bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-white/20 transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Motivation */}
                  <div className="glass rounded-2xl p-5">
                    <div className="text-white/50 text-xs font-medium uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Icon name="Flame" size={13} /> Мотивация и достижения
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-white/40 text-xs mb-1 block">Мотивационное письмо *</label>
                        <textarea value={form.motivation} onChange={e => setForm(f => ({ ...f, motivation: e.target.value }))} placeholder="Почему вы хотите участвовать в программе? Каковы ваши цели? Чем вы можете быть полезны?" rows={4} className="w-full bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-white/20 transition-colors resize-none" />
                        <div className="text-right text-xs mt-1" style={{ color: form.motivation.split(" ").length >= 50 ? "#00e896" : "#ffffff40" }}>
                          {form.motivation.split(" ").filter(Boolean).length} слов {form.motivation.split(" ").length >= 50 ? "✓" : "(рекомендуется 50+)"}
                        </div>
                      </div>
                      <div>
                        <label className="text-white/40 text-xs mb-1 block">Ключевые достижения</label>
                        <textarea value={form.achievements} onChange={e => setForm(f => ({ ...f, achievements: e.target.value }))} placeholder="Опишите 2–3 значимых достижения..." rows={3} className="w-full bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-white/20 transition-colors resize-none" />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !form.name || !form.position || !form.motivation}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg,#00e896,#00b4d8)", color: "#0d0f14" }}
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full" style={{ animation: "spin 0.8s linear infinite" }} />
                        AI анализирует заявку...
                      </>
                    ) : (
                      <>
                        <Icon name="Zap" size={16} />
                        Отправить и получить AI-оценку
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── TAB: RATING ── */}
        {tab === "rating" && (
          <div className="animate-fade-in">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Рейтинг кандидатов</h1>
                <p className="text-white/40 text-sm">{candidates.length} заявок · средний балл <span style={{ color: "#00e896" }}>{stats.avg}</span></p>
              </div>
              <div className="flex items-center gap-1 glass rounded-xl p-1">
                {(["score", "experience"] as const).map(s => (
                  <button key={s} onClick={() => setSortBy(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${sortBy === s ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"}`}>
                    {s === "score" ? "По баллу" : "По опыту"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {sorted.map((c, i) => (
                <div
                  key={c.id}
                  className="candidate-card glass rounded-2xl p-4 cursor-pointer transition-all hover:border-white/10"
                  style={{ border: expanded === c.id ? "1px solid rgba(0,232,150,0.25)" : undefined }}
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 font-mono-custom text-xs text-white/20 text-center shrink-0">#{i + 1}</div>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: `${getScoreColor(c.score)}18`, border: `1px solid ${getScoreColor(c.score)}30`, color: getScoreColor(c.score) }}>
                      {c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white font-semibold text-sm">{c.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs border ${getStatusBg(c.status)}`}>{getStatusLabel(c.status)}</span>
                        {c.shortlisted && <span className="text-xs" style={{ color: "#00e896" }}>★ Shortlist</span>}
                      </div>
                      <div className="text-white/35 text-xs truncate">{c.position} · {c.location} · {c.experience} лет</div>
                    </div>
                    <div className="hidden md:flex gap-1.5 flex-wrap max-w-48">
                      {c.tags.slice(0, 3).map(t => <span key={t} className="px-2 py-0.5 rounded-md text-xs text-white/35 bg-white/5">{t}</span>)}
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-xl font-bold font-mono-custom" style={{ color: getScoreColor(c.score) }}>{c.score}</div>
                      <div className="text-white/25 text-xs">/ 100</div>
                    </div>
                    <Icon name={expanded === c.id ? "ChevronUp" : "ChevronDown"} size={15} className="text-white/25 shrink-0" />
                  </div>

                  {expanded === c.id && (
                    <div className="mt-4 pt-4 border-t border-white/5 grid md:grid-cols-2 gap-5 animate-fade-in">
                      <div>
                        <div className="text-white/40 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <Icon name="Brain" size={12} className="text-neon-green" /> AI объяснение
                        </div>
                        <p className="text-white/55 text-xs leading-relaxed mb-4 italic">"{c.aiSummary}"</p>
                        <div className="space-y-2.5">
                          {c.scoreBreakdown.map(b => (
                            <div key={b.label}>
                              <div className="flex justify-between mb-1">
                                <span className="text-white/45 text-xs">{b.label}</span>
                                <span className="font-mono-custom text-xs" style={{ color: b.sign === "+" ? "#00e896" : "#f87171" }}>{b.sign}{b.value}/{b.max}</span>
                              </div>
                              <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                                <div className="h-full rounded-full" style={{ width: `${(b.value / b.max) * 100}%`, background: b.sign === "+" ? "linear-gradient(90deg,#00e896,#00b4d8)" : "linear-gradient(90deg,#f87171,#fb923c)", transition: "width 0.8s ease" }} />
                              </div>
                              <div className="text-white/25 text-xs mt-0.5">{b.reason}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-white/40 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <Icon name="Info" size={12} className="text-neon-purple" /> Детали
                        </div>
                        <div className="space-y-2 text-xs">
                          {[
                            { label: "Образование", val: c.education },
                            { label: "Навыки", val: c.skills },
                            { label: "Компании", val: c.previousCompanies },
                            { label: "Языки", val: c.languages },
                            { label: "Дата заявки", val: c.submittedAt },
                          ].map(row => row.val ? (
                            <div key={row.label} className="flex gap-2">
                              <span className="text-white/30 w-24 shrink-0">{row.label}</span>
                              <span className="text-white/60">{row.val}</span>
                            </div>
                          ) : null)}
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="text-white/30 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Icon name="Shield" size={11} /> Решение комиссии
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            {(Object.entries(COMMISSION_STATUS_META) as [CommissionStatus, typeof COMMISSION_STATUS_META[CommissionStatus]][]).map(([key, meta]) => (
                              <button
                                key={key}
                                onClick={e => { e.stopPropagation(); setStatus(c.id, key); }}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
                                style={{
                                  background: commissionStatuses[c.id] === key ? meta.bg : "rgba(255,255,255,0.04)",
                                  color: commissionStatuses[c.id] === key ? meta.color : "rgba(255,255,255,0.35)",
                                  border: `1px solid ${commissionStatuses[c.id] === key ? meta.color + "40" : "rgba(255,255,255,0.06)"}`,
                                }}
                              >
                                <Icon name={meta.icon} size={11} />
                                {meta.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: SHORTLIST ── */}
        {tab === "shortlist" && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-1">Shortlist для комиссии</h1>
              <p className="text-white/40 text-sm">Топ кандидаты с баллом 75+ · рекомендованы AI к рассмотрению</p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: "В шортлисте", value: shortlist.length, color: "#00e896" },
                { label: "Топ (85+)", value: shortlist.filter(c => c.score >= 85).length, color: "#a855f7" },
                { label: "Средний балл", value: shortlist.length ? Math.round(shortlist.reduce((s, c) => s + c.score, 0) / shortlist.length) : 0, color: "#38bdf8" },
              ].map((s, i) => (
                <div key={i} className="glass rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold font-mono-custom mb-1" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-white/40 text-xs">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {shortlist.map((c, i) => (
                <div key={c.id} className="glass rounded-2xl p-5 hover-lift" style={{ border: c.score >= 85 ? "1px solid rgba(0,232,150,0.2)" : undefined }}>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm font-mono-custom shrink-0" style={{ background: `${getScoreColor(c.score)}20`, color: getScoreColor(c.score) }}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-white font-bold">{c.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs border ${getStatusBg(c.status)}`}>{getStatusLabel(c.status)}</span>
                      </div>
                      <div className="text-white/40 text-xs mb-2">{c.position} · {c.location} · {c.experience} лет опыта</div>
                      <p className="text-white/55 text-xs leading-relaxed italic mb-3">"{c.aiSummary}"</p>
                      <div className="flex flex-wrap gap-1.5">
                        {c.tags.map(t => <span key={t} className="px-2 py-0.5 rounded-md text-xs text-white/40 bg-white/5">{t}</span>)}
                      </div>
                    </div>
                    <div className="text-right shrink-0 flex flex-col items-end gap-2">
                      <div>
                        <div className="text-3xl font-bold font-mono-custom" style={{ color: getScoreColor(c.score) }}>{c.score}</div>
                        <div className="text-white/25 text-xs">баллов</div>
                      </div>
                      <div className="flex flex-col gap-1">
                        {(Object.entries(COMMISSION_STATUS_META) as [CommissionStatus, typeof COMMISSION_STATUS_META[CommissionStatus]][]).map(([key, meta]) => (
                          <button
                            key={key}
                            onClick={() => setStatus(c.id, key)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all"
                            style={{
                              background: commissionStatuses[c.id] === key ? meta.bg : "rgba(255,255,255,0.03)",
                              color: commissionStatuses[c.id] === key ? meta.color : "rgba(255,255,255,0.3)",
                              border: `1px solid ${commissionStatuses[c.id] === key ? meta.color + "35" : "transparent"}`,
                            }}
                          >
                            <Icon name={meta.icon} size={10} />
                            {meta.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mini score bars */}
                  <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-5 gap-2">
                    {c.scoreBreakdown.map(b => (
                      <div key={b.label} className="text-center">
                        <div className="text-xs font-mono-custom font-medium mb-1" style={{ color: b.sign === "+" ? "#00e896" : "#f87171" }}>{b.value}</div>
                        <div className="h-1 rounded-full bg-white/8 mb-1">
                          <div className="h-full rounded-full" style={{ width: `${(b.value / b.max) * 100}%`, background: b.sign === "+" ? "#00e896" : "#f87171" }} />
                        </div>
                        <div className="text-white/25 text-xs truncate">{b.label.split(" ")[0]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {shortlist.length === 0 && (
              <div className="text-center py-20 text-white/25">
                <Icon name="Users" size={40} className="mx-auto mb-3 opacity-30" />
                <div className="text-sm">Нет кандидатов в шортлисте</div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB: COMMISSION ── */}
        {tab === "commission" && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-1">Панель комиссии</h1>
              <p className="text-white/40 text-sm">Управляйте статусами кандидатов · AI рекомендует, вы решаете</p>
            </div>

            {/* Status summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {(Object.entries(COMMISSION_STATUS_META) as [CommissionStatus, typeof COMMISSION_STATUS_META[CommissionStatus]][]).map(([key, meta]) => (
                <div key={key} className="glass rounded-2xl p-4 text-center" style={{ border: `1px solid ${meta.color}20` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: meta.bg }}>
                    <Icon name={meta.icon} size={16} style={{ color: meta.color }} />
                  </div>
                  <div className="text-2xl font-bold font-mono-custom mb-0.5" style={{ color: meta.color }}>
                    {commissionStats[key]}
                  </div>
                  <div className="text-white/40 text-xs">{meta.label}</div>
                </div>
              ))}
            </div>

            {/* Candidate list with status controls */}
            <div className="space-y-3">
              {sorted.map(c => {
                const currentStatus = commissionStatuses[c.id] || "pending";
                const currentMeta = COMMISSION_STATUS_META[currentStatus];
                return (
                  <div key={c.id} className="glass rounded-2xl p-5" style={{ border: `1px solid ${currentMeta.color}18` }}>
                    <div className="flex items-start gap-4">
                      {/* Avatar + score */}
                      <div className="shrink-0 text-center">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold mb-1"
                          style={{ background: `${getScoreColor(c.score)}18`, color: getScoreColor(c.score), border: `1px solid ${getScoreColor(c.score)}30` }}>
                          {c.avatar}
                        </div>
                        <div className="font-mono-custom text-sm font-bold" style={{ color: getScoreColor(c.score) }}>{c.score}</div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="text-white font-semibold">{c.name}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs border ${getStatusBg(c.status)}`}>{getStatusLabel(c.status)}</span>
                          {c.shortlisted && <span className="text-xs font-medium" style={{ color: "#00e896" }}>★ Shortlist</span>}
                        </div>
                        <div className="text-white/40 text-xs mb-2">{c.position} · {c.location} · {c.experience} лет</div>
                        <p className="text-white/45 text-xs leading-relaxed italic mb-3">"{c.aiSummary}"</p>

                        {/* Note field */}
                        <div>
                          {editingNote === c.id ? (
                            <div className="flex gap-2">
                              <input
                                autoFocus
                                value={commissionNote[c.id] || ""}
                                onChange={e => setCommissionNote(prev => ({ ...prev, [c.id]: e.target.value }))}
                                onBlur={() => setEditingNote(null)}
                                onKeyDown={e => e.key === "Enter" && setEditingNote(null)}
                                placeholder="Комментарий комиссии..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/25 outline-none"
                              />
                            </div>
                          ) : (
                            <button
                              onClick={() => setEditingNote(c.id)}
                              className="flex items-center gap-1.5 text-xs transition-colors"
                              style={{ color: commissionNote[c.id] ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)" }}
                            >
                              <Icon name="MessageSquarePlus" size={12} />
                              {commissionNote[c.id] || "Добавить комментарий..."}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Status buttons */}
                      <div className="shrink-0 flex flex-col gap-1.5">
                        {(Object.entries(COMMISSION_STATUS_META) as [CommissionStatus, typeof COMMISSION_STATUS_META[CommissionStatus]][]).map(([key, meta]) => (
                          <button
                            key={key}
                            onClick={() => setStatus(c.id, key)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all w-40 justify-start"
                            style={{
                              background: currentStatus === key ? meta.bg : "rgba(255,255,255,0.03)",
                              color: currentStatus === key ? meta.color : "rgba(255,255,255,0.3)",
                              border: `1px solid ${currentStatus === key ? meta.color + "40" : "rgba(255,255,255,0.05)"}`,
                            }}
                          >
                            <Icon name={meta.icon} size={12} />
                            {meta.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Export hint */}
            <div className="mt-6 glass rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(56,189,248,0.1)" }}>
                  <Icon name="Download" size={14} style={{ color: "#38bdf8" }} />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Экспорт решений</div>
                  <div className="text-white/35 text-xs">Принято: {commissionStats.accepted} · На интервью: {commissionStats.review} · Отклонено: {commissionStats.rejected}</div>
                </div>
              </div>
              <button className="px-4 py-2 rounded-xl text-xs font-medium glass text-white/50 hover:text-white transition-colors">
                Скачать отчёт
              </button>
            </div>
          </div>
        )}

        <div className="mt-10 text-center text-white/15 text-xs flex items-center justify-center gap-2">
          <Icon name="Zap" size={11} />
          AI-скоринг носит рекомендательный характер · Окончательное решение принимает комиссия
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .bg-white\\/8 { background: rgba(255,255,255,0.08); }
      `}</style>
    </div>
  );
}