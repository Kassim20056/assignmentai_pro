import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DetailedQualityReport = () => {
  const [expandedSections, setExpandedSections] = useState(new Set(['introduction']));
  const [selectedIssue, setSelectedIssue] = useState(null);

  const reportSections = [
    {
      id: 'introduction',
      title: 'Introduction',
      wordCount: 245,
      qualityScore: 92,
      issues: [
        {
          id: 1,
          type: 'style',
          severity: 'low',
          description: 'Consider varying sentence length for better flow',
          location: 'Paragraph 2, Sentence 3',
          suggestion: 'Break down the long sentence into two shorter ones',
          originalText: 'The rapid advancement of artificial intelligence technologies has fundamentally transformed the landscape of modern computing, creating unprecedented opportunities for innovation while simultaneously raising important questions about ethical implementation and societal impact.',
          suggestedText: 'The rapid advancement of artificial intelligence technologies has fundamentally transformed the landscape of modern computing. This transformation has created unprecedented opportunities for innovation while raising important questions about ethical implementation and societal impact.'
        }
      ],
      aiDetection: 95,
      plagiarism: 0,
      citations: 3
    },
    {
      id: 'literature',
      title: 'Literature Review',
      wordCount: 892,
      qualityScore: 88,
      issues: [
        {
          id: 2,
          type: 'citation',
          severity: 'medium',
          description: 'Missing page numbers in citation',
          location: 'Paragraph 4, Citation 2',
          suggestion: 'Add page numbers to the Smith et al. citation',
          originalText: '(Smith et al., 2023)',
          suggestedText: '(Smith et al., 2023, pp. 45-47)'
        },
        {
          id: 3,
          type: 'ai-detection',
          severity: 'high',
          description: 'AI-generated content detected',
          location: 'Paragraph 6',
          suggestion: 'Rephrase to sound more natural and human-like',
          originalText: 'Furthermore, it is important to note that the aforementioned studies consistently demonstrate...',
          suggestedText: 'These studies consistently show...'
        }
      ],
      aiDetection: 78,
      plagiarism: 2.1,
      citations: 15
    },
    {
      id: 'methodology',
      title: 'Methodology',
      wordCount: 567,
      qualityScore: 95,
      issues: [],
      aiDetection: 98,
      plagiarism: 0,
      citations: 8
    },
    {
      id: 'results',
      title: 'Results',
      wordCount: 734,
      qualityScore: 85,
      issues: [
        {
          id: 4,
          type: 'plagiarism',
          severity: 'high',
          description: 'Potential plagiarism detected',
          location: 'Table 2 description',
          suggestion: 'Rephrase the table description in your own words',
          originalText: 'The results clearly indicate a significant correlation between variables X and Y.',
          suggestedText: 'Our analysis reveals a strong relationship between variables X and Y.'
        }
      ],
      aiDetection: 89,
      plagiarism: 5.2,
      citations: 12
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'citation': return 'BookOpen';
      case 'ai-detection': return 'Shield';
      case 'plagiarism': return 'Search';
      case 'style': return 'Edit3';
      case 'grammar': return 'CheckCircle';
      default: return 'AlertCircle';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-error';
  };

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleIssueClick = (issue) => {
    setSelectedIssue(selectedIssue?.id === issue.id ? null : issue);
  };

  const handleApplySuggestion = (issueId) => {
    console.log('Applying suggestion for issue:', issueId);
    // Implementation would apply the suggestion
  };

  const handleIgnoreIssue = (issueId) => {
    console.log('Ignoring issue:', issueId);
    // Implementation would ignore the issue
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-academic">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading font-semibold text-text-primary">
            Detailed Quality Report
          </h3>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-academic">
              <Icon name="Download" size={14} />
              <span>Export PDF</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1.5 bg-surface border border-border text-text-secondary rounded-md text-sm font-medium hover:bg-muted transition-academic">
              <Icon name="Share" size={14} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Executive Summary */}
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="text-lg font-heading font-semibold text-text-primary mb-2">
            Executive Summary
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">89%</div>
              <div className="text-sm text-text-secondary">Overall Quality</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">90%</div>
              <div className="text-sm text-text-secondary">AI Detection</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">1.8%</div>
              <div className="text-sm text-text-secondary">Plagiarism</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">4</div>
              <div className="text-sm text-text-secondary">Issues Found</div>
            </div>
          </div>
          <p className="text-sm text-text-secondary">
            Your assignment demonstrates strong overall quality with excellent AI detection scores. 
            Minor improvements needed in citation formatting and one section requires humanization. 
            Plagiarism levels are within acceptable limits.
          </p>
        </div>

        {/* Section Analysis */}
        <div className="space-y-4">
          <h4 className="text-lg font-heading font-semibold text-text-primary">
            Section-by-Section Analysis
          </h4>
          
          {reportSections.map((section) => (
            <div key={section.id} className="border border-border rounded-lg">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-4 text-left hover:bg-muted/50 transition-academic"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Icon 
                      name={expandedSections.has(section.id) ? "ChevronDown" : "ChevronRight"} 
                      size={16} 
                    />
                    <div>
                      <h5 className="font-medium text-text-primary">{section.title}</h5>
                      <div className="flex items-center space-x-4 text-sm text-text-secondary">
                        <span>{section.wordCount} words</span>
                        <span>•</span>
                        <span>{section.issues.length} issues</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getScoreColor(section.qualityScore)}`}>
                        {section.qualityScore}%
                      </div>
                      <div className="text-xs text-text-secondary">Quality Score</div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="text-center">
                        <div className={`text-sm font-medium ${getScoreColor(section.aiDetection)}`}>
                          {section.aiDetection}%
                        </div>
                        <div className="text-xs text-text-secondary">AI</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-sm font-medium ${section.plagiarism > 3 ? 'text-error' : 'text-success'}`}>
                          {section.plagiarism}%
                        </div>
                        <div className="text-xs text-text-secondary">Plag</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-text-primary">{section.citations}</div>
                        <div className="text-xs text-text-secondary">Cites</div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              
              {expandedSections.has(section.id) && (
                <div className="border-t border-border p-4">
                  {section.issues.length > 0 ? (
                    <div className="space-y-3">
                      <h6 className="font-medium text-text-primary">Issues Found:</h6>
                      {section.issues.map((issue) => (
                        <div key={issue.id} className="space-y-2">
                          <button
                            onClick={() => handleIssueClick(issue)}
                            className={`
                              w-full p-3 text-left rounded-lg border transition-academic
                              ${selectedIssue?.id === issue.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}
                            `}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Icon name={getTypeIcon(issue.type)} size={16} />
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-text-primary">{issue.description}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(issue.severity)}`}>
                                      {issue.severity}
                                    </span>
                                  </div>
                                  <div className="text-sm text-text-secondary">{issue.location}</div>
                                </div>
                              </div>
                              <Icon 
                                name={selectedIssue?.id === issue.id ? "ChevronUp" : "ChevronDown"} 
                                size={16} 
                              />
                            </div>
                          </button>
                          
                          {selectedIssue?.id === issue.id && (
                            <div className="ml-6 p-4 bg-muted/50 rounded-lg space-y-3">
                              <div>
                                <h7 className="text-sm font-medium text-text-primary">Original:</h7>
                                <p className="text-sm text-text-secondary bg-error/10 p-2 rounded mt-1">
                                  {issue.originalText}
                                </p>
                              </div>
                              
                              <div>
                                <h7 className="text-sm font-medium text-text-primary">Suggested:</h7>
                                <p className="text-sm text-text-secondary bg-success/10 p-2 rounded mt-1">
                                  {issue.suggestedText}
                                </p>
                              </div>
                              
                              <div>
                                <h7 className="text-sm font-medium text-text-primary">Recommendation:</h7>
                                <p className="text-sm text-text-secondary mt-1">{issue.suggestion}</p>
                              </div>
                              
                              <div className="flex items-center space-x-2 pt-2">
                                <button
                                  onClick={() => handleApplySuggestion(issue.id)}
                                  className="px-3 py-1.5 bg-success text-success-foreground rounded-md text-sm font-medium hover:bg-success/90 transition-academic"
                                >
                                  Apply Suggestion
                                </button>
                                <button
                                  onClick={() => handleIgnoreIssue(issue.id)}
                                  className="px-3 py-1.5 bg-surface border border-border text-text-secondary rounded-md text-sm font-medium hover:bg-muted transition-academic"
                                >
                                  Ignore
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-success">
                      <Icon name="CheckCircle" size={16} />
                      <span className="text-sm">No issues found in this section</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Batch Actions */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
            <div>
              <h4 className="font-medium text-text-primary">Batch Actions</h4>
              <p className="text-sm text-text-secondary">Apply improvements to multiple sections at once</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-academic">
                Apply All Suggestions
              </button>
              <button className="px-4 py-2 bg-surface border border-border text-text-secondary rounded-md text-sm font-medium hover:bg-muted transition-academic">
                Generate New Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedQualityReport;