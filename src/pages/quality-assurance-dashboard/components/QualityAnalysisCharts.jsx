import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import Icon from '../../../components/AppIcon';

const QualityAnalysisCharts = () => {
  const [activeChart, setActiveChart] = useState('authenticity');

  const authenticityData = [
    { section: 'Introduction', score: 92, issues: 1 },
    { section: 'Literature Review', score: 88, issues: 3 },
    { section: 'Methodology', score: 95, issues: 0 },
    { section: 'Results', score: 85, issues: 2 },
    { section: 'Discussion', score: 90, issues: 1 },
    { section: 'Conclusion', score: 93, issues: 1 }
  ];

  const styleConsistencyData = [
    { metric: 'Tone', current: 85, target: 90 },
    { metric: 'Vocabulary', current: 92, target: 88 },
    { metric: 'Sentence Structure', current: 78, target: 85 },
    { metric: 'Paragraph Flow', current: 88, target: 90 },
    { metric: 'Academic Style', current: 91, target: 92 }
  ];

  const sourceIntegrationData = [
    { name: 'Properly Cited', value: 78, color: '#10B981' },
    { name: 'Missing Citations', value: 12, color: '#F59E0B' },
    { name: 'Incorrect Format', value: 8, color: '#EF4444' },
    { name: 'Over-cited', value: 2, color: '#6B7280' }
  ];

  const qualityTrendData = [
    { date: '2025-07-10', overall: 82, ai: 88, plagiarism: 95, citations: 85 },
    { date: '2025-07-11', overall: 84, ai: 90, plagiarism: 94, citations: 87 },
    { date: '2025-07-12', overall: 86, ai: 91, plagiarism: 96, citations: 88 },
    { date: '2025-07-13', overall: 83, ai: 89, plagiarism: 93, citations: 86 },
    { date: '2025-07-14', overall: 87, ai: 92, plagiarism: 97, citations: 89 },
    { date: '2025-07-15', overall: 89, ai: 94, plagiarism: 98, citations: 91 },
    { date: '2025-07-16', overall: 85, ai: 92, plagiarism: 97, citations: 88 }
  ];

  const radarData = [
    { subject: 'Originality', A: 92, fullMark: 100 },
    { subject: 'Clarity', A: 88, fullMark: 100 },
    { subject: 'Structure', A: 85, fullMark: 100 },
    { subject: 'Citations', A: 91, fullMark: 100 },
    { subject: 'Grammar', A: 94, fullMark: 100 },
    { subject: 'Coherence', A: 87, fullMark: 100 }
  ];

  const chartOptions = [
    { id: 'authenticity', label: 'Content Authenticity', icon: 'Shield' },
    { id: 'consistency', label: 'Style Consistency', icon: 'Palette' },
    { id: 'sources', label: 'Source Integration', icon: 'BookOpen' },
    { id: 'trends', label: 'Quality Trends', icon: 'TrendingUp' },
    { id: 'radar', label: 'Quality Radar', icon: 'Target' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-academic">
          <p className="text-sm font-medium text-text-primary">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name === 'score' ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'authenticity':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={authenticityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="section" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'consistency':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={styleConsistencyData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
              <YAxis dataKey="metric" type="category" tick={{ fontSize: 12 }} width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="current" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="target" fill="var(--color-secondary)" radius={[0, 4, 4, 0]} opacity={0.5} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'sources':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourceIntegrationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {sourceIntegrationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'trends':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={qualityTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis domain={[75, 100]} tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="overall" stroke="var(--color-primary)" strokeWidth={2} />
              <Line type="monotone" dataKey="ai" stroke="var(--color-secondary)" strokeWidth={2} />
              <Line type="monotone" dataKey="plagiarism" stroke="var(--color-success)" strokeWidth={2} />
              <Line type="monotone" dataKey="citations" stroke="var(--color-warning)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'radar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--color-border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar
                name="Quality Score"
                dataKey="A"
                stroke="var(--color-primary)"
                fill="var(--color-primary)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-academic">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Quality Analysis
          </h3>
          
          <div className="flex items-center space-x-2 overflow-x-auto">
            {chartOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveChart(option.id)}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-academic whitespace-nowrap
                  ${activeChart === option.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary hover:text-text-primary hover:bg-muted/80'
                  }
                `}
              >
                <Icon name={option.icon} size={16} />
                <span className="hidden sm:inline">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        {renderChart()}
        
        {/* Chart Legend/Info */}
        <div className="mt-4 pt-4 border-t border-border">
          {activeChart === 'authenticity' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-text-secondary">Authenticity Score</span>
              </div>
              <div className="text-text-secondary">
                Average: {Math.round(authenticityData.reduce((acc, item) => acc + item.score, 0) / authenticityData.length)}%
              </div>
              <div className="text-text-secondary">
                Total Issues: {authenticityData.reduce((acc, item) => acc + item.issues, 0)}
              </div>
            </div>
          )}
          
          {activeChart === 'sources' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              {sourceIntegrationData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-text-secondary">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          )}
          
          {activeChart === 'trends' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-text-secondary">Overall Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-text-secondary">AI Detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-text-secondary">Plagiarism Check</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="text-text-secondary">Citations</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QualityAnalysisCharts;