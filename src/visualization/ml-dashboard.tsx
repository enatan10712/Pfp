"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const data = [
  { name: "Epoch 1", accuracy: 0.65, loss: 0.8 },
  { name: "Epoch 2", accuracy: 0.72, loss: 0.6 },
  { name: "Epoch 3", accuracy: 0.78, loss: 0.45 },
  { name: "Epoch 4", accuracy: 0.85, loss: 0.3 },
  { name: "Epoch 5", accuracy: 0.89, loss: 0.22 },
  { name: "Epoch 6", accuracy: 0.92, loss: 0.15 },
  { name: "Epoch 7", accuracy: 0.94, loss: 0.12 },
];

export default function MLDashboard() {
  return (
    <section className="py-24 bg-secondary/20" id="visualizations">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-mono text-accent-blue tracking-[0.5em] uppercase mb-4">
            // Data Visualization Engine
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold">ANALYTICS HUB</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass p-8 border-white/5">
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-blue rounded-full" />
              MODEL_TRAINING_METRICS
            </h4>
            <div className="h-[300px] w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} />
                  <YAxis stroke="#ffffff40" fontSize={10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111318", border: "1px solid #ffffff10", fontSize: "12px" }}
                    itemStyle={{ color: "#00E5FF" }}
                  />
                  <Area type="monotone" dataKey="accuracy" stroke="#00E5FF" fillOpacity={1} fill="url(#colorAcc)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 flex justify-between text-[10px] font-mono text-white/30 uppercase">
              <span>Status: Training Complete</span>
              <span>Final Accuracy: 94.2%</span>
            </div>
          </div>

          <div className="glass p-8 border-white/5">
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-purple rounded-full" />
              LOSS_CONVERGENCE_FLOW
            </h4>
            <div className="h-[300px] w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} />
                  <YAxis stroke="#ffffff40" fontSize={10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111318", border: "1px solid #ffffff10", fontSize: "12px" }}
                    itemStyle={{ color: "#7000FF" }}
                  />
                  <Line type="stepAfter" dataKey="loss" stroke="#7000FF" strokeWidth={2} dot={{ fill: "#7000FF" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 flex justify-between text-[10px] font-mono text-white/30 uppercase">
              <span>Metric: Cross Entropy Loss</span>
              <span>Optimization: Adam</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { label: "Precision", value: "0.96", color: "text-accent-blue" },
             { label: "Recall", value: "0.92", color: "text-accent-cyan" },
             { label: "F1 Score", value: "0.94", color: "text-accent-green" },
           ].map((metric, i) => (
             <div key={i} className="glass p-6 border-white/5 flex flex-col items-center">
                <div className="text-[10px] font-mono text-white/30 uppercase mb-2 tracking-widest">{metric.label}</div>
                <div className={`text-4xl font-bold ${metric.color}`}>{metric.value}</div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
