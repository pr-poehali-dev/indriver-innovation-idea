import { useState } from "react";
import Icon from "@/components/ui/icon";

const candidates = [
  {
    id: 1,
    name: "Айгерим Бекова",
    position: "Senior Product Manager",
    score: 94,
    avatar: "АБ",
    location: "Алматы",
    experience: 7,
    education: "MBA, KIMEP University",
    status: "top",
    scoreBreakdown: [
      { label: "Опыт работы", value: 30, max: 30, sign: "+" },
      { label: "Рекомендации", value: 25, max: 25, sign: "+" },
      { label: "Образование", value: 20, max: 20, sign: "+" },
      { label: "Мотивация", value: 15, max: 20, sign: "+" },
      { label: "Активность", value: 4, max: 5, sign: "+" },
    ],
    reviews: [
      { company: "Kaspi.kz", author: "Дмитрий Ковалёв", role: "CTO", text: "Исключительный специалист. Вывела 3 продукта на рынок.", rating: 5 },
      { company: "Choco", author: "Алия Нурланова", role: "CEO", text: "Отличные навыки работы с командой и аналитика.", rating: 5 },
    ],
    tags: ["Product", "Agile", "Data", "B2C"],
  },
  {
    id: 2,
    name: "Тимур Джаксыбеков",
    position: "Full-Stack Engineer",
    score: 88,
    avatar: "ТД",
    location: "Нур-Султан",
    experience: 5,
    education: "CS, Назарбаев Университет",
    status: "high",
    scoreBreakdown: [
      { label: "Опыт работы", value: 25, max: 30, sign: "+" },
      { label: "Технические навыки", value: 24, max: 25, sign: "+" },
      { label: "Образование", value: 20, max: 20, sign: "+" },
      { label: "Мотивация", value: 12, max: 20, sign: "+" },
      { label: "Активность", value: 7, max: 5, sign: "+" },
    ],
    reviews: [
      { company: "Beeline KZ", author: "Сергей Матвеев", role: "Tech Lead", text: "Быстро учится, пишет чистый код. Рекомендую.", rating: 5 },
    ],
    tags: ["React", "Python", "AWS", "PostgreSQL"],
  },
  {
    id: 3,
    name: "Мадина Сейтова",
    position: "UX/UI Designer",
    score: 81,
    avatar: "МС",
    location: "Алматы",
    experience: 4,
    education: "Дизайн, Международная Академия Бизнеса",
    status: "high",
    scoreBreakdown: [
      { label: "Портфолио", value: 28, max: 30, sign: "+" },
      { label: "Опыт работы", value: 20, max: 25, sign: "+" },
      { label: "Образование", value: 16, max: 20, sign: "+" },
      { label: "Мотивация", value: 14, max: 20, sign: "+" },
      { label: "Активность", value: 3, max: 5, sign: "+" },
    ],
    reviews: [
      { company: "inDriver", author: "Анна Петрова", role: "Head of Design", text: "Отличное чувство продукта, работает с данными.", rating: 4 },
      { company: "Kolesa.kz", author: "Марат Дюсенов", role: "PM", text: "Хороший дизайнер, иногда пропускала дедлайны.", rating: 4 },
    ],
    tags: ["Figma", "UX Research", "Motion", "Design System"],
  },
  {
    id: 4,
    name: "Ерлан Омаров",
    position: "Data Analyst",
    score: 73,
    avatar: "ЕО",
    location: "Шымкент",
    experience: 3,
    education: "Экономика, КазНУ",
    status: "mid",
    scoreBreakdown: [
      { label: "Технические навыки", value: 22, max: 30, sign: "+" },
      { label: "Опыт работы", value: 18, max: 25, sign: "+" },
      { label: "Образование", value: 14, max: 20, sign: "+" },
      { label: "Мотивация", value: 10, max: 20, sign: "-" },
      { label: "Рекомендации", value: 9, max: 5, sign: "+" },
    ],
    reviews: [
      { company: "ForteBank", author: "Жанар Сабирова", role: "Data Lead", text: "Умеет работать с большими датасетами, SQL на уровне.", rating: 4 },
    ],
    tags: ["SQL", "Python", "Tableau", "Excel"],
  },
  {
    id: 5,
    name: "Зарина Ахметова",
    position: "Marketing Manager",
    score: 65,
    avatar: "ЗА",
    location: "Алматы",
    experience: 2,
    education: "Маркетинг, Almaty Management University",
    status: "mid",
    scoreBreakdown: [
      { label: "Опыт работы", value: 14, max: 30, sign: "+" },
      { label: "Образование", value: 18, max: 20, sign: "+" },
      { label: "Мотивация", value: 18, max: 20, sign: "+" },
      { label: "Технические навыки", value: 10, max: 25, sign: "-" },
      { label: "Рекомендации", value: 5, max: 5, sign: "+" },
    ],
    reviews: [
      { company: "OLX Kazakhstan", author: "Рустем Балтин", role: "Marketing Director", text: "Хороший потенциал, но пока не хватает опыта в digital.", rating: 3 },
    ],
    tags: ["SMM", "Content", "SEO", "Google Ads"],
  },
  {
    id: 6,
    name: "Нурлан Сагинтаев",
    position: "Operations Manager",
    score: 52,
    avatar: "НС",
    location: "Павлодар",
    experience: 2,
    education: "Менеджмент, ЕНУ им. Гумилёва",
    status: "low",
    scoreBreakdown: [
      { label: "Опыт работы", value: 12, max: 30, sign: "-" },
      { label: "Образование", value: 14, max: 20, sign: "+" },
      { label: "Мотивация", value: 10, max: 20, sign: "-" },
      { label: "Технические навыки", value: 8, max: 25, sign: "-" },
      { label: "Рекомендации", value: 8, max: 5, sign: "+" },
    ],
    reviews: [
      { company: "LocalShop", author: "Арман Исаев", role: "CEO", text: "Исполнительный, но инициативы мало.", rating: 3 },
    ],
    tags: ["Logistics", "Operations", "Excel"],
  },
];

const getScoreColor = (score: number) => {
  if (score >= 85) return "#00e896";
  if (score >= 70) return "#fbbf24";
  return "#f87171";
};

const getScoreLabel = (score: number) => {
  if (score >= 85) return "Топ кандидат";
  if (score >= 70) return "Высокий";
  return "Средний";
};

const getStatusBg = (status: string) => {
  if (status === "top") return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
  if (status === "high") return "bg-blue-500/15 text-blue-400 border-blue-500/20";
  if (status === "mid") return "bg-amber-500/15 text-amber-400 border-amber-500/20";
  return "bg-red-500/15 text-red-400 border-red-500/20";
};

type SortKey = "score" | "experience" | "name";
type FilterStatus = "all" | "top" | "high" | "mid" | "low";

export default function Index() {
  const [sortBy, setSortBy] = useState<SortKey>("score");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [selectedCandidate, setSelectedCandidate] = useState<typeof candidates[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = candidates
    .filter((c) => filterStatus === "all" || c.status === filterStatus)
    .filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.position.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "score") return b.score - a.score;
      if (sortBy === "experience") return b.experience - a.experience;
      return a.name.localeCompare(b.name);
    });

  const stats = {
    total: candidates.length,
    top: candidates.filter((c) => c.score >= 85).length,
    avg: Math.round(candidates.reduce((s, c) => s + c.score, 0) / candidates.length),
    reviewed: candidates.filter((c) => c.reviews.length > 0).length,
  };

  return (
    <div className="min-h-screen grid-bg font-golos" style={{ background: "hsl(220, 20%, 6%)" }}>
      {/* Header */}
      <header className="border-b border-white/5 sticky top-0 z-40" style={{ background: "rgba(13,15,20,0.85)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00e896, #00b4d8)" }}>
              <Icon name="Zap" size={18} className="text-black" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-wide text-white">inDriver</div>
              <div className="text-xs text-white/40 font-mono-custom">AI Scoring System</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "rgba(0,232,150,0.1)", color: "#00e896", border: "1px solid rgba(0,232,150,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow inline-block" />
              AI активен
            </div>
            <button className="glass px-4 py-2 rounded-xl text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2">
              <Icon name="Upload" size={14} />
              Загрузить заявки
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold text-white mb-1">
            Рейтинг кандидатов
          </h1>
          <p className="text-white/40 text-sm">AI-анализ заявок · InVision U · Весна 2026</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Всего заявок", value: stats.total, icon: "Users", color: "#38bdf8" },
            { label: "Топ кандидаты", value: stats.top, icon: "Star", color: "#00e896" },
            { label: "Средний балл", value: stats.avg, icon: "BarChart2", color: "#a855f7" },
            { label: "С отзывами", value: stats.reviewed, icon: "MessageSquare", color: "#fbbf24" },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-5 hover-lift"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}18` }}>
                  <Icon name={stat.icon} size={16} style={{ color: stat.color }} />
                </div>
                <span className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</span>
              </div>
              <div className="text-white/50 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-48">
            <Icon name="Search" size={15} className="text-white/30" />
            <input
              type="text"
              placeholder="Поиск по имени или должности..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-white/30 outline-none w-full"
            />
          </div>
          <div className="w-px h-5 bg-white/10" />
          <div className="flex items-center gap-2 flex-wrap">
            {(["all", "top", "high", "mid", "low"] as FilterStatus[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filterStatus === f
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {f === "all" ? "Все" : f === "top" ? "Топ" : f === "high" ? "Высокие" : f === "mid" ? "Средние" : "Низкие"}
              </button>
            ))}
          </div>
          <div className="w-px h-5 bg-white/10" />
          <div className="flex items-center gap-2">
            <Icon name="ArrowUpDown" size={14} className="text-white/30" />
            {(["score", "experience", "name"] as SortKey[]).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  sortBy === s ? "text-neon-green" : "text-white/40 hover:text-white/70"
                }`}
              >
                {s === "score" ? "Балл" : s === "experience" ? "Опыт" : "Имя"}
              </button>
            ))}
          </div>
        </div>

        {/* Candidates List */}
        <div className="space-y-3">
          {filtered.map((candidate, index) => (
            <div
              key={candidate.id}
              className="candidate-card glass rounded-2xl p-5 hover-lift cursor-pointer"
              style={{ borderColor: selectedCandidate?.id === candidate.id ? "rgba(0,232,150,0.3)" : undefined }}
              onClick={() => setSelectedCandidate(selectedCandidate?.id === candidate.id ? null : candidate)}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="w-8 text-center font-mono-custom text-sm font-semibold text-white/20">
                  #{index + 1}
                </div>

                {/* Avatar */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${getScoreColor(candidate.score)}30, ${getScoreColor(candidate.score)}10)`,
                    border: `1px solid ${getScoreColor(candidate.score)}30`,
                    color: getScoreColor(candidate.score),
                  }}
                >
                  {candidate.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white font-semibold text-sm">{candidate.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs border ${getStatusBg(candidate.status)}`}>
                      {getScoreLabel(candidate.score)}
                    </span>
                  </div>
                  <div className="text-white/40 text-xs truncate">{candidate.position} · {candidate.location} · {candidate.experience} лет опыта</div>
                </div>

                {/* Tags */}
                <div className="hidden md:flex items-center gap-1.5 flex-wrap max-w-56">
                  {candidate.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md text-xs text-white/40 bg-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Score */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden sm:flex items-center gap-1 text-white/30 text-xs">
                    <Icon name="Star" size={12} className="text-amber-400" />
                    {candidate.reviews.length} отз.
                  </div>
                  <div className="text-right">
                    <div
                      className="text-2xl font-bold font-mono-custom leading-none"
                      style={{ color: getScoreColor(candidate.score) }}
                    >
                      {candidate.score}
                    </div>
                    <div className="text-white/30 text-xs mt-0.5">баллов</div>
                  </div>
                  <Icon
                    name={selectedCandidate?.id === candidate.id ? "ChevronUp" : "ChevronDown"}
                    size={16}
                    className="text-white/30"
                  />
                </div>
              </div>

              {/* Expanded Details */}
              {selectedCandidate?.id === candidate.id && (
                <div className="mt-5 pt-5 border-t border-white/5 grid md:grid-cols-2 gap-6 animate-fade-in">
                  {/* Score Breakdown */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="BarChart2" size={14} className="text-neon-green" />
                      <span className="text-white/60 text-xs font-medium uppercase tracking-wider">AI Объяснение оценки</span>
                    </div>
                    <div className="space-y-3">
                      {candidate.scoreBreakdown.map((item) => (
                        <div key={item.label}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-white/60 text-xs">{item.label}</span>
                            <span
                              className="font-mono-custom text-xs font-medium"
                              style={{ color: item.sign === "+" ? "#00e896" : "#f87171" }}
                            >
                              {item.sign}{item.value} / {item.max}
                            </span>
                          </div>
                          <div className="score-bar">
                            <div
                              className="score-bar-fill"
                              style={{
                                width: `${(item.value / item.max) * 100}%`,
                                background: item.sign === "+" ? "linear-gradient(90deg, #00e896, #00b4d8)" : "linear-gradient(90deg, #f87171, #fb923c)",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="MessageSquare" size={14} className="text-neon-purple" />
                      <span className="text-white/60 text-xs font-medium uppercase tracking-wider">Отзывы работодателей</span>
                    </div>
                    <div className="space-y-3">
                      {candidate.reviews.map((review, i) => (
                        <div key={i} className="glass-bright rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-white text-xs font-semibold">{review.author}</div>
                              <div className="text-white/40 text-xs">{review.role} · {review.company}</div>
                            </div>
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, s) => (
                                <span key={s} className={`text-xs ${s < review.rating ? "text-amber-400" : "text-white/15"}`}>★</span>
                              ))}
                            </div>
                          </div>
                          <p className="text-white/50 text-xs leading-relaxed">"{review.text}"</p>
                        </div>
                      ))}
                      {candidate.reviews.length === 0 && (
                        <div className="text-white/25 text-xs text-center py-6">Отзывы не добавлены</div>
                      )}
                    </div>

                    {/* Action */}
                    <div className="mt-4 flex gap-2">
                      <button
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                        style={{ background: "linear-gradient(135deg, #00e896, #00b4d8)", color: "#0d0f14" }}
                      >
                        Пригласить на интервью
                      </button>
                      <button className="px-4 py-2.5 rounded-xl text-sm glass text-white/60 hover:text-white transition-colors">
                        <Icon name="Bookmark" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/25 animate-fade-in">
            <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-30" />
            <div className="text-sm">Кандидаты не найдены</div>
          </div>
        )}

        {/* Footer note */}
        <div className="mt-10 flex items-center gap-2 justify-center text-white/20 text-xs">
          <Icon name="Zap" size={12} />
          <span>AI-скоринг носит рекомендательный характер · Окончательное решение принимает комиссия</span>
        </div>
      </div>
    </div>
  );
}