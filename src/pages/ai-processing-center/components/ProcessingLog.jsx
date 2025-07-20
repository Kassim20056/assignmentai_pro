import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingLog = ({
  logs = [
    {
      id: 1,
      timestamp: '2025-07-17T13:20:15Z',
      type: 'info',
      stage: 'Requirement Analysis',
      message: 'Assignment requirements successfully parsed',
      details: 'Extracted: 3500 words, APA citation, Computer Science subject, Graduate level complexity'
    },
    {
      id: 2,
      timestamp: '2025-07-17T13:20:45Z',
      type: 'success',
      stage: 'Requirement Analysis',
      message: 'Requirements validation completed',
      details: 'All mandatory fields validated. Processing can proceed to next stage.'
    },
    {
      id: 3,
      timestamp: '2025-07-17T13:21:30Z',
      type: 'info',
      stage: 'Research Gathering',
      message: 'Initiating source collection',
      details: 'Searching academic databases for relevant materials on machine learning topics'
    },
    {
      id: 4,
      timestamp: '2025-07-17T13:22:15Z',
      type: 'success',
      stage: 'Research Gathering',
      message: 'Found 47 relevant sources',
      details: '15 peer-reviewed papers, 8 books, 12 conference proceedings, 12 technical reports'
    },
    {
      id: 5,
      timestamp: '2025-07-17T13:23:00Z',
      type: 'processing',
      stage: 'Research Gathering',
      message: 'Analyzing source relevance and quality',
      details: 'Ranking sources by relevance score and academic credibility'
    },
    {
      id: 6,
      timestamp: '2025-07-17T13:23:45Z',
      type: 'warning',
      stage: 'Research Gathering',
      message: 'Some sources may be outdated',
      details: '3 sources are older than 5 years. Consider requesting more recent alternatives.'
    },
    {
      id: 7,
      timestamp: '2025-07-17T13:24:30Z',
      type: 'info',
      stage: 'Research Gathering',
      message: 'Source verification in progress',
      details: 'Checking accessibility and citation format compliance'
    }
  ]
}) => {
  const [filter, setFilter] = useState('all');
  const [expandedLogs, setExpandedLogs] = useState(new Set());

  const getLogIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'error':
        return 'AlertCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'processing':
        return 'Loader';
      default:
        return 'Info';
    }
  };

  const getLogStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          icon: 'text-success',
          border: 'border-success/20',
          bg: 'bg-success/5'
        };
      case 'error':
        return {
          icon: 'text-error',
          border: 'border-error/20',
          bg: 'bg-error/5'
        };
      case 'warning':
        return {
          icon: 'text-warning',
          border: 'border-warning/20',
          bg: 'bg-warning/5'
        };
      case 'processing':
        return {
          icon: 'text-primary',
          border: 'border-primary/20',
          bg: 'bg-primary/5'
        };
      default:
        return {
          icon: 'text-text-secondary',
          border: 'border-border',
          bg: 'bg-muted/30'
        };
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const toggleLogExpansion = (logId) => {
    const newExpanded = new Set(expandedLogs);
    if (newExpanded.has(logId)) {
      newExpanded.delete(logId);
    } else {
      newExpanded.add(logId);
    }
    setExpandedLogs(newExpanded);
  };

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.type === filter);

  const filterOptions = [
    { value: 'all', label: 'All Logs', count: logs.length },
    { value: 'info', label: 'Info', count: logs.filter(l => l.type === 'info').length },
    { value: 'success', label: 'Success', count: logs.filter(l => l.type === 'success').length },
    { value: 'warning', label: 'Warnings', count: logs.filter(l => l.type === 'warning').length },
    { value: 'error', label: 'Errors', count: logs.filter(l => l.type === 'error').length },
    { value: 'processing', label: 'Processing', count: logs.filter(l => l.type === 'processing').length }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-text-primary">
          Processing Log
        </h2>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            onClick={() => {}}
          >
            Export
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`
                px-3 py-1.5 rounded-md text-sm font-medium transition-academic
                ${filter === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary hover:text-text-primary hover:bg-muted/80'
                }
              `}
            >
              {option.label}
              {option.count > 0 && (
                <span className="ml-1 text-xs opacity-75">
                  ({option.count})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Log Entries */}
      <div className="max-h-96 overflow-y-auto">
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="FileText" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4 opacity-50" />
            <p className="text-text-secondary">No logs found for the selected filter.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredLogs.map((log) => {
              const styles = getLogStyles(log.type);
              const isExpanded = expandedLogs.has(log.id);
              
              return (
                <div key={log.id} className={`p-4 ${styles.bg} border-l-4 ${styles.border}`}>
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 mt-0.5 ${styles.icon}`}>
                      <Icon 
                        name={getLogIcon(log.type)} 
                        size={16}
                        className={log.type === 'processing' ? 'animate-spin' : ''}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                            {log.stage}
                          </span>
                          <span className="text-xs text-text-secondary">
                            {formatTimestamp(log.timestamp)}
                          </span>
                        </div>
                        
                        {log.details && (
                          <button
                            onClick={() => toggleLogExpansion(log.id)}
                            className="p-1 hover:bg-surface rounded-md transition-academic"
                          >
                            <Icon 
                              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                              size={14} 
                              color="var(--color-text-secondary)"
                            />
                          </button>
                        )}
                      </div>
                      
                      <p className="text-sm text-text-primary font-medium mb-1">
                        {log.message}
                      </p>
                      
                      {log.details && isExpanded && (
                        <div className="mt-2 p-3 bg-surface rounded-md border border-border">
                          <p className="text-xs text-text-secondary leading-relaxed">
                            {log.details}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Log Stats */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-success">
              {logs.filter(l => l.type === 'success').length}
            </div>
            <div className="text-xs text-text-secondary">Success</div>
          </div>
          <div>
            <div className="text-lg font-bold text-warning">
              {logs.filter(l => l.type === 'warning').length}
            </div>
            <div className="text-xs text-text-secondary">Warnings</div>
          </div>
          <div>
            <div className="text-lg font-bold text-error">
              {logs.filter(l => l.type === 'error').length}
            </div>
            <div className="text-xs text-text-secondary">Errors</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">
              {logs.filter(l => l.type === 'processing').length}
            </div>
            <div className="text-xs text-text-secondary">Processing</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingLog;