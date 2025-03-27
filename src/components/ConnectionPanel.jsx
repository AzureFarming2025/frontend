import React from "react";

const services = [
  { name: "Google", icon: "🌐", connected: true },
  { name: "WhatsApp", icon: "💬", connected: false },
  { name: "Kakao", icon: "🟡", connected: false },
];

const ConnectionPanel = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">🔗 Connected Services</h2>
      <ul className="space-y-3">
        {services.map(({ name, icon, connected }) => (
          <li key={name} className="flex items-center justify-between px-4 py-2 rounded-lg bg-base-100 shadow">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-xl">{icon}</span>
              <span>{name}</span>
            </div>
            {connected ? (
              <span className="badge badge-success">Connected</span>
            ) : (
              <button className="btn btn-xs btn-outline">Connect</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConnectionPanel;
