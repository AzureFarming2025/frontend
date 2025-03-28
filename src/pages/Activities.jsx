import { useState } from "react";
import { Modal, Stats, Button, Tooltip, Avatar } from "react-daisyui";
import Title from "@components/field/Title";

const tabList = [
  "Timeline",
  "Activity Grid",
  "Achievements",
  "Membership",
  "Points"
];

export default function Activities() {
  return (
    <div className="p-6 space-y-12">
      <Title text="Activities"/>
      <div className="grid grid-cols-3 gap-8">
        <section className="col-span-full">
          <AchievementsSection />
        </section>
        <section className="col-span-full">
          <ActivityGridSection />
        </section>
        <section className="lg:col-span-2 col-span-full">
          <h2 className="text-xl font-semibold mb-4">📅 Timeline</h2>
          <TimelineSection />
        </section>
        <section className="lg:col-span-1 col-span-full">
          <h2 className="text-xl font-semibold mb-4">🏅 Membership</h2>
          <MembershipSection />
        </section>

      </div>
    </div>
  );
}

const TIMELINE_DATA = [
  { date: "03/27", type: "watering", title: "Watered Carrot", description: "Auto-pump activated at 08:14 AM" },
  { date: "03/26", type: "automation", title: "Automation Started", description: "Set auto mode at 10:45 AM" },
  { date: "03/25", type: "points", title: "Earned Points", description: "Received 50 points for daily login" },
  { date: "03/24", type: "points", title: "Redeemed Points", description: "Used 100 points for a reward" },
];

const TimelineSection = () => {
  const [filter, setFilter] = useState("all");

  const filtered = TIMELINE_DATA.filter((e) => filter === "all" || e.type === filter);

  return (
    <div>
      <div className="mb-4 space-x-2">
        <button className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-outline"}`} onClick={() => setFilter("all")}>
          All
        </button>
        <button className={`btn btn-sm ${filter === "watering" ? "btn-success" : "btn-outline"}`} onClick={() => setFilter("watering")}>
          Watering
        </button>
        <button className={`btn btn-sm ${filter === "automation" ? "btn-info" : "btn-outline"}`} onClick={() => setFilter("automation")}>
          Automation
        </button>
        <button className={`btn btn-sm ${filter === "points" ? "btn-warning" : "btn-outline"}`} onClick={() => setFilter("points")}>
          Points
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr key={idx}>
                <td>{item.date}</td>
                <td>
                  <span
                    className={`badge ${
                      item.type === "watering"
                        ? "badge-success"
                        : item.type === "automation"
                        ? "badge-info"
                        : "badge-warning"
                    }`}
                  >
                    {item.type}
                  </span>
                </td>
                <td>{item.title}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const activityLog = (month) =>
  Array.from({ length: new Date(2025, month + 1, 0).getDate() }, (_, i) => {
    const date = new Date(2025, month, i + 1);
    return { date: date.toISOString().split("T")[0], count: Math.floor(Math.random() * 5) };
  });

const getIntensityColor = (count) => {
  if (count === 0) return "bg-success/20";
  if (count < 2) return "bg-success/50";
  if (count < 4) return "bg-success/80";
  return "bg-success";
};

const ActivityGridSection = () => {
  const [month, setMonth] = useState(0);
  const daysInMonth = new Date(2025, month + 1, 0).getDate();
  const logs = activityLog(month);

  const handlePrev = () => setMonth((prev) => (prev === 0 ? 11 : prev - 1));
  const handleNext = () => setMonth((prev) => (prev === 11 ? 0 : prev + 1));

  return (
    <div className="w-full mt-4">
      <div className="flex-1 flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-4">🌱 Activity Grid</h2>
        <div className="join">
          <button className="join-item btn btn-sm btn-soft btn-success" onClick={handlePrev}>
            {"<"}
          </button>
          <button className="join-item btn btn-sm btn-soft btn-success">
          <span className="text-lg font-semibold text-primary">{new Date(2025, month).toLocaleString("default", { month: "long" })}</span>
          </button>
          <button className="join-item btn btn-sm btn-soft btn-success" onClick={handleNext}>
            {">"}
          </button>
        </div>
      </div>
      <div
        className="grid gap-y-1 gap-x-1 sm:gap-x-3 md:gap-x-5 lg:gap-x-8 auto-rows-fr"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(2.5rem, 1fr))",
        }}
      >
        {Array.from({ length: daysInMonth }, (_, i) => {
          const log = logs[i];
          return (
            <div
              key={i}
              className={`tooltip size-10 sm:size-13 md:size-14 lg:size-16 rounded ${getIntensityColor(log.count)}`}
              data-tip={`${log.count} actions on ${log.date}`}
            />
          );
        })}
      </div>
    </div>
  );
};
const AchievementsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("achievements");

  const ACHIEVEMENTS = [
    { title: "First Steps", description: "Complete your first activity", progress: 100, locked: false, image: "/images/achievements/first-steps.png" },
    { title: "Consistency", description: "Log in for 7 consecutive days", progress: 50, locked: false, image: "/images/achievements/consistency.png" },
    { title: "Master Gardener", description: "Grow 10 plants", progress: 100, locked: false, image: "/images/achievements/master-gardener.png" },
    { title: "Water Saver", description: "Use less than 100L of water in a month", progress: 30, locked: true, image: "/images/achievements/water-saver.png" },
  ];

  const BADGES = [
    { title: "Early Bird", description: "Log in before 7 AM", unlocked: true, image: "/images/badges/early-bird.png" },
    { title: "Night Owl", description: "Log in after 10 PM", unlocked: false, image: "/images/badges/night-owl.png" },
    { title: "Green Thumb", description: "Grow 5 plants", unlocked: true, image: "/images/badges/green-thumb.png" },
    { title: "Water Saver", description: "Use less than 50L of water in a week", unlocked: false, image: "/images/badges/water-saver.png" },
  ];

  const unlockedAchievements = ACHIEVEMENTS.filter((a) => a.progress === 100).length;
  const unlockedBadges = BADGES.filter((b) => b.unlocked).length;

  const renderCard = (item, isAchievement = true) => (
    <div key={item.title} className={`card bg-base-100 shadow ${isAchievement && item.locked ? "opacity-50 grayscale" : ""}`}>
      <figure>
        <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
      </figure>
      <div className="card-body pt-4">
        <h4 className="card-title">{item.title}</h4>
        {isAchievement ? (
          <>
            <progress
              className={`progress ${item.progress === 100 ? "progress-success" : "progress-warning"}`}
              value={item.progress}
              max="100"
            />
            {item.progress < 100 && !item.locked && <p className="text-sm">{100 - item.progress}% remaining</p>}
          </>
        ) : (
          <p className="text-sm">{item.description}</p>
        )}
      </div>
    </div>
  );

  const renderStats = [
    {
      title: "Achievements",
      value: `${unlockedAchievements}`,
      desc: `/ ${ACHIEVEMENTS.length}`,
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      color: "text-primary",
    },
    {
      title: "Badges",
      value: `${unlockedBadges}`,
      desc: `/ ${BADGES.length}`,
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      color: "text-secondary",
    },
    {
      title: "Managed Plants",
      value: "15",
      desc: "created",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      color: "text-info",
    },
    {
      title: "Activity Duration",
      value: "2 Years",
      desc: "",
      caption: `Joined Since 2023`,
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      color: "text-neutral/60",
    },
  ];

  const AchivementModal = () => (
    <Modal open={isModalOpen} onClickBackdrop={() => setIsModalOpen(false)} className="max-w-4xl">
      <div className="relative p-6">
        <button
          className="absolute top-2 right-2 btn btn-sm btn-circle btn-outline btn-error"
          onClick={() => setIsModalOpen(false)}
        >
          ✕
        </button>
        <div className="tabs mb-4 border-b border-gray-200">
          {["achievements", "badges"].map((tab) => (
            <button
              key={tab}
              className={`tab tab-lifted ${activeTab === tab ? "tab-active text-primary font-semibold" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {activeTab === "achievements" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ACHIEVEMENTS.map((a) => renderCard(a))}
            </div>
          )}
          {activeTab === "badges" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BADGES.map((b) => renderCard(b, false))}
            </div>
          )}
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">In Progress</h3>
            <ul className="list-disc list-inside text-sm space-y-2">
              {ACHIEVEMENTS.filter((a) => a.progress > 0 && a.progress < 100).map((a) => (
                <li key={a.title} className="text-gray-600">
                  <span className="font-medium">{a.title}</span>: {a.progress}% completed
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="space-y-6 flex-1 flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-4">🏆 Achievements</h2>
        <Button onClick={() => setIsModalOpen(true)} responsive variant="link">
          View All
        </Button>
      </div>
      <Stats className="shadow font-sans overflow-visible">
        {renderStats.map((stat, idx) => (
          <Stats.Stat key={idx}>
            <Stats.Stat.Title className={`text-lg font-semibold ${stat.color}`}>{stat.title}</Stats.Stat.Title>
            <div className={`my-1 flex flex-row justify-between items-top ${stat.color}`}>
              <Stats.Stat.Value className="space-x-2">
                <span className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
                </span>
                <span className={`text-sm font-medium -mt-1 ${stat.color} opacity-60`}>
                {stat.desc}
                </span>
              </Stats.Stat.Value>
              <Stats.Stat.Figure className={stat.color}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon}></path>
                </svg>
              </Stats.Stat.Figure>
            </div>
            <div className="flex flex-row items-end space-x-2 px-1">
              <Stats.Stat.Desc className={`text-caption opacity-70`}>{stat.caption}</Stats.Stat.Desc>
            </div>
          </Stats.Stat>
        ))}
      </Stats>
      {isModalOpen && <AchivementModal />}
    </div>
  );
};

const PointsSection = () => (
  <div>
    <div className="stats shadow mb-4">
      <div className="stat">
        <div className="stat-title">Available Points</div>
        <div className="stat-value text-primary">420P</div>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full text-sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {ACHIEVEMENTS.map((a, idx) => (
      <div
        key={idx}
        className={`card bg-base-100 shadow ${
          a.locked ? "opacity-50 grayscale" : ""
        }`}
      >
        <div className="card-body">
          <h3 className="card-title">{a.title}</h3>
          <p>{a.description}</p>
          <progress
            className={`progress ${
              a.progress === 100 ? "progress-success" : "progress-warning"
            }`}
            value={a.progress}
            max="100"
          />
          {a.progress < 100 && !a.locked && (
            <p className="text-sm">{100 - a.progress}% remaining</p>
          )}
        </div>
      </div>
    ))}
    </div>
  </div>
);

const MembershipSection = () => (
  <div className="card bg-base-100 shadow p-6">
    <h2 className="text-xl font-semibold mb-2">Premium Member</h2>
    <ul className="list-disc list-inside text-sm space-y-1">
      <li>No ads</li>
      <li>+50% bonus points</li>
      <li>Exclusive avatar frames</li>
    </ul>
    <p className="text-sm mt-4">Valid until: 2025-06-01</p>
    <button className="btn btn-outline btn-error mt-4">Cancel Membership</button>
  </div>
);
