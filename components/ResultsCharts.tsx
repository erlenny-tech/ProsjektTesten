'use client';

import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  ScatterChart,
  Scatter
} from 'recharts';
import { SimulationResult } from '@/lib/types';

const HEAT_COLORS = ['#E3F2FD', '#BBDEFB', '#90CAF9', '#42A5F5', '#1E88E5'];

export function ResultsCharts({ result }: { result: SimulationResult }) {
  const comparisonData = result.personaResults.map((row) => ({
    navn: row.personaNavn,
    Behov: row.needScore,
    Intensitet: row.followUpIntensity,
    'RTW 26 uker': row.rtwProbability26Weeks
  }));

  const heatmapData = result.personaResults.map((row) => ({
    persona: row.personaNavn,
    advisor: result.advisorProfile.navn,
    value: Math.round((row.followUpIntensity + row.needScore) / 2)
  }));

  const timelineData = [
    { fase: 'Oppfølgingsplan', uke: result.rules.oppfolgingsplanUke },
    { fase: 'Dialogmøte 1', uke: result.rules.dialogmote1Uke },
    { fase: 'Aktivitetsvurdering', uke: result.rules.aktivitetsvurderingUke },
    { fase: 'Dialogmøte 2', uke: result.rules.dialogmote2Uke }
  ];

  return (
    <div className="space-y-6">
      <div className="card h-80">
        <h3 className="mb-2 text-sm font-semibold">Sammenligning per persona</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={comparisonData} margin={{ top: 20, right: 20, left: 0, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="navn" angle={-18} textAnchor="end" interval={0} height={80} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Behov" fill="#005B82" />
            <Bar dataKey="Intensitet" fill="#4F46E5" />
            <Bar dataKey="RTW 26 uker" fill="#16A34A" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card h-72">
          <h3 className="mb-2 text-sm font-semibold">Persona/veileder-heatmap</h3>
          <ResponsiveContainer width="100%" height="88%">
            <ScatterChart>
              <CartesianGrid />
              <XAxis dataKey="persona" name="Persona" type="category" interval={0} angle={-18} textAnchor="end" height={70} />
              <YAxis dataKey="advisor" name="Veileder" type="category" width={120} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={heatmapData}>
                {heatmapData.map((entry, index) => {
                  const colorIndex = Math.min(HEAT_COLORS.length - 1, Math.floor(entry.value / 20));
                  return <Cell key={`cell-${index}`} fill={HEAT_COLORS[colorIndex]} />;
                })}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="card h-72">
          <h3 className="mb-2 text-sm font-semibold">Persona-tidslinje (regeluker)</h3>
          <ResponsiveContainer width="100%" height="88%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fase" />
              <YAxis domain={[0, 30]} />
              <Tooltip />
              <Line type="monotone" dataKey="uke" stroke="#005B82" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
