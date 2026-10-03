import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, subtext, icon: Icon, color = 'blue' }) {
  const colorMap = {
    blue: {
      border: 'border-blue-200',
      iconBg: 'bg-blue-600 text-white shadow-md shadow-blue-500/20',
      title: 'text-blue-600',
      subtext: 'text-slate-500',
    },
    emerald: {
      border: 'border-emerald-200',
      iconBg: 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20',
      title: 'text-emerald-600',
      subtext: 'text-slate-500',
    },
    amber: {
      border: 'border-amber-200',
      iconBg: 'bg-amber-500 text-white shadow-md shadow-amber-500/20',
      title: 'text-amber-600',
      subtext: 'text-slate-500',
    },
    purple: {
      border: 'border-purple-200',
      iconBg: 'bg-purple-600 text-white shadow-md shadow-purple-500/20',
      title: 'text-purple-600',
      subtext: 'text-slate-500',
    },
  };

  const selectedColor = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`p-5 rounded-2xl bg-white border shadow-sm flex items-center justify-between transition-all ${selectedColor.border}`}
    >
      <div>
        <p className={`text-xs font-semibold uppercase  ${selectedColor.title}`}>
          {title}
        </p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
        {subtext && <p className={`text-xs font-medium mt-1 ${selectedColor.subtext}`}>{subtext}</p>}
      </div>
      <div className={`p-3 rounded-xl flex items-center justify-center ${selectedColor.iconBg}`}>
        <Icon className="w-6 h-6" />
      </div>
    </motion.div>
  );
}