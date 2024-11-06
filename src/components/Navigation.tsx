import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Music, Mic, User } from 'lucide-react';

export default function Navigation() {
  const navItems = [
    { to: '/', icon: Home, label: 'Feed' },
    { to: '/beats', icon: Music, label: 'Beats' },
    { to: '/studio', icon: Mic, label: 'Studio' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around py-3">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 text-sm ${
                  isActive ? 'text-purple-500' : 'text-gray-400 hover:text-white'
                }`
              }
            >
              <Icon className="w-6 h-6" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}