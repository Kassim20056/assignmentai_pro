import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const VerificationResultsPanel = () => {
  const [activeTab, setActiveTab] = useState('realtime');

  const realtimeResults = [
    {
      id: 1,
      service: 'Originality.ai',
      status: 'completed',
      score: 92,
      timestamp: '2025-07-17T13:20:00Z',
      details: 'Human-like content detected with high confidence',
      icon: 'Shield',
      color: 'text-success'
    },
    {
      id: 2,
      service: 'GPTZero',
      status: 'processing',
      score: null,
      timestamp: '2025-07-17T13:22:00Z',
      details: 'Analysis in progress...',
      icon: 'Loader',
      color: 'text-warning'
    },
    {
      id: 3,
      service: 'Copyleaks',
      status: 'completed',
      score: 88,
      timestamp: '2025-07-17T13:18:00Z',
      details: 'Minor AI patterns detected in 2 paragraphs',
      icon: 'AlertTriangle',
      color: 'text-warning'
    },
    {
      id: 4,
      service: 'Turnitin',
      status: 'queued',
      score: null,
      timestamp: null,
      details: 'Waiting in queue (estimated 5 minutes)',
      icon: 'Clock',
      color: 'text-text-secondary'
    }
  ];

  const humanizationProgress = [
    {
      id: 1,
      section: 'Introduction',
      original: 'AI-generated content detected',
      humanized: 'Successfully humanized',
      progress: 100,
      status: 'completed'
    },
    {
      id: 2,
      section: 'Literature Review',
      original: 'Moderate AI patterns found',
      humanized: 'Humanization in progress',
      progress: 65,
      status: 'processing'
    },
    {
      id: 3,
      section: 'Methodology',
      original: 'Human-like content',
      humanized: 'No changes needed',
      progress: 100,
      status: 'skipped'
    },
    {
      id: 4,
      section: 'Results',
      original: 'High AI probability detected',
      humanized: 'Queued for processing',
      progress: 0,
      status: 'queued'
    }
  ];

  const qualityTools = [
    {
      id: 1,
      name: 'Citation Formatter',
      description: 'Auto-format references to APA/MLA standards',
      status: 'available',
      icon: 'BookOpen',
      action: 'Format Citations'
    },
    {
      id: 2,
      name: 'Grammar Enhancer',
      description: 'Advanced grammar and style improvements',
      status: 'processing',
      icon: 'Edit3',
      action: 'Enhance Grammar'
    },
    {
      id: 3,
      name: 'Plagiarism Fixer',
      description: 'Automatically rephrase flagged content',
      status: 'available',
      icon: 'RefreshCw',
      action: 'Fix Plagiarism'
    },
    {
      id: 4,
      name: 'Coherence Booster',
      description: 'Improve paragraph flow and transitions',
      status: 'available',
      icon: 'ArrowRight',
      action: 'Boost Coherence'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'processing': return 'Loader';
      case 'queued': return 'Clock';
      case 'error': return 'AlertCircle';
      case 'skipped': return 'Minus';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'processing': return 'text-warning';
      case 'queued': return 'text-text-secondary';
      case 'error': return 'text-error';
      case 'skipped': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const tabs = [
    { id: 'realtime', label: 'Real-time Results', icon: 'Activity' },
    { id: 'humanization', label: 'Humanization', icon: 'User' },
    { id: 'tools', label: 'Quality Tools', icon: 'Wrench' }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-card border border-border rounded-lg shadow-academic">
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-academic
                ${activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary hover:bg-muted/50'
                }
              `}
            >
              <Icon name={tab.icon} size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4">
          {/* Real-time Verification Results */}
          {activeTab === 'realtime' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Verification Status
                </h3>
                <button className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-academic">
                  <Icon name="RefreshCw" size={14} />
                  <span>Refresh</span>
                </button>
              </div>

              <div className="space-y-3">
                {realtimeResults.map((result) => (
                  <div key={result.id} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={result.icon} 
                          size={16} 
                          className={`${result.color} ${result.status === 'processing' ? 'animate-spin' : ''}`}
                        />
                        <span className="font-medium text-text-primary">{result.service}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {result.score && (
                          <span className={`text-sm font-medium ${result.color}`}>
                            {result.score}%
                          </span>
                        )}
                        <span className="text-xs text-text-secondary">
                          {formatTimestamp(result.timestamp)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary">{result.details}</p>
                    
                    {result.status === 'processing' && (
                      <div className="mt-2">
                        <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                          <div className="h-full bg-warning animate-pulse" style={{ width: '60%' }} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Humanization Progress */}
          {activeTab === 'humanization' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Humanization Progress
                </h3>
                <div className="text-sm text-text-secondary">
                  2 of 4 sections completed
                </div>
              </div>

              <div className="space-y-3">
                {humanizationProgress.map((item) => (
                  <div key={item.id} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-text-primary">{item.section}</span>
                      <div className={`flex items-center space-x-1 ${getStatusColor(item.status)}`}>
                        <Icon name={getStatusIcon(item.status)} size={14} />
                        <span className="text-xs capitalize">{item.status}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-text-secondary mb-2">
                      <div className="flex items-center space-x-2">
                        <span>From:</span>
                        <span className="text-error">{item.original}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>To:</span>
                        <span className="text-success">{item.humanized}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            item.status === 'completed' ? 'bg-success' :
                            item.status === 'processing' ? 'bg-warning' :
                            item.status === 'skipped'? 'bg-text-secondary' : 'bg-border'
                          }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-secondary">{item.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quality Enhancement Tools */}
          {activeTab === 'tools' && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Quality Enhancement Tools
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {qualityTools.map((tool) => (
                  <div key={tool.id} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={tool.icon} size={16} color="var(--color-primary)" />
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary">{tool.name}</h4>
                          <p className="text-sm text-text-secondary">{tool.description}</p>
                        </div>
                      </div>
                      
                      <button
                        disabled={tool.status === 'processing'}
                        className={`
                          px-3 py-1.5 rounded-md text-sm font-medium transition-academic
                          ${tool.status === 'processing' ?'bg-muted text-text-secondary cursor-not-allowed' :'bg-primary text-primary-foreground hover:bg-primary/90'
                          }
                        `}
                      >
                        {tool.status === 'processing' ? (
                          <div className="flex items-center space-x-1">
                            <Icon name="Loader" size={14} className="animate-spin" />
                            <span>Processing</span>
                          </div>
                        ) : (
                          tool.action
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-academic">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Session Summary
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">4</div>
            <div className="text-xs text-text-secondary">Services Checked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">92%</div>
            <div className="text-xs text-text-secondary">Avg. Human Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">2</div>
            <div className="text-xs text-text-secondary">Issues Found</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">5m</div>
            <div className="text-xs text-text-secondary">Processing Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationResultsPanel;