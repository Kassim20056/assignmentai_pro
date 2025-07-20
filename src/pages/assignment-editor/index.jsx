import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AssignmentContextHeader from '../../components/ui/AssignmentContextHeader';
import QuickActionFloatingButton from '../../components/ui/QuickActionFloatingButton';
import NotificationToast from '../../components/ui/NotificationToast';
import DocumentOutline from './components/DocumentOutline';
import ResearchSourcesPanel from './components/ResearchSourcesPanel';
import RevisionHistory from './components/RevisionHistory';
import RichTextEditor from './components/RichTextEditor';
import AIAssistantPanel from './components/AIAssistantPanel';
import QualityScoreWidget from './components/QualityScoreWidget';
import CollaborationPanel from './components/CollaborationPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AssignmentEditor = () => {
  const navigate = useNavigate();
  const [activeLeftPanel, setActiveLeftPanel] = useState('outline');
  const [activeRightPanel, setActiveRightPanel] = useState('ai-assistant');
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
  const [isSplitView, setIsSplitView] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [editorContent, setEditorContent] = useState('');
  const [wordCount, setWordCount] = useState(2847);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [qualityScore, setQualityScore] = useState(85);

  // Mock assignment data
  const assignmentData = {
    title: "Advanced Machine Learning Research Paper",
    subject: "Computer Science",
    deadline: "2025-07-25",
    progress: 65,
    status: "In Progress"
  };

  useEffect(() => {
    // Simulate initial notifications
    const initialNotifications = [
      {
        id: '1',
        type: 'success',
        title: 'Auto-save Complete',
        message: 'Your changes have been saved automatically',
        timestamp: new Date(Date.now() - 300000),
        autoDismiss: 5000
      },
      {
        id: '2',
        type: 'info',
        title: 'Collaboration Update',
        message: 'Dr. Johnson added 2 new comments',
        timestamp: new Date(Date.now() - 600000),
        action: {
          label: 'View',
          onClick: () => setActiveRightPanel('collaboration')
        }
      }
    ];
    setNotifications(initialNotifications);
  }, []);

  const handleContentChange = (content) => {
    setEditorContent(content);
    const words = content.trim().split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);
  };

  const handleAutoSave = async (content) => {
    setIsAutoSaving(true);
    // Simulate auto-save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAutoSaving(false);
    
    addNotification({
      type: 'success',
      title: 'Auto-saved',
      message: 'Changes saved automatically',
      autoDismiss: 3000
    });
  };

  const handleManualSave = async (content) => {
    // Simulate manual save
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addNotification({
      type: 'success',
      title: 'Saved Successfully',
      message: 'Your document has been saved',
      autoDismiss: 3000
    });
  };

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleDismissAllNotifications = () => {
    setNotifications([]);
  };

  const handleExport = (format) => {
    addNotification({
      type: 'processing',
      title: 'Exporting Document',
      message: `Preparing ${format.toUpperCase()} export...`,
      progress: 0,
      progressLabel: 'Processing...'
    });

    // Simulate export progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      if (progress <= 100) {
        setNotifications(prev => prev.map(n => 
          n.title === 'Exporting Document' 
            ? { ...n, progress, progressLabel: `${progress}% complete` }
            : n
        ));
      } else {
        clearInterval(interval);
        setNotifications(prev => prev.filter(n => n.title !== 'Exporting Document'));
        addNotification({
          type: 'success',
          title: 'Export Complete',
          message: `Document exported as ${format.toUpperCase()}`,
          action: {
            label: 'Download',
            onClick: () => {}
          }
        });
      }
    }, 500);
  };

  const handleRunQualityCheck = async () => {
    addNotification({
      type: 'processing',
      title: 'Quality Check Running',
      message: 'Analyzing document quality...',
      progress: 0
    });

    // Simulate quality check
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      if (progress <= 100) {
        setNotifications(prev => prev.map(n => 
          n.title === 'Quality Check Running' 
            ? { ...n, progress, progressLabel: `Checking... ${progress}%` }
            : n
        ));
      } else {
        clearInterval(interval);
        setNotifications(prev => prev.filter(n => n.title === 'Quality Check Running'));
        setQualityScore(Math.floor(Math.random() * 20) + 80); // Random score 80-100
        addNotification({
          type: 'success',
          title: 'Quality Check Complete',
          message: 'Document analysis finished',
          autoDismiss: 5000
        });
      }
    }, 800);
  };

  const leftPanelTabs = [
    { id: 'outline', label: 'Outline', icon: 'List' },
    { id: 'sources', label: 'Sources', icon: 'BookOpen' },
    { id: 'history', label: 'History', icon: 'Clock' }
  ];

  const rightPanelTabs = [
    { id: 'ai-assistant', label: 'AI Assistant', icon: 'Bot' },
    { id: 'collaboration', label: 'Comments', icon: 'MessageSquare' }
  ];

  const renderLeftPanel = () => {
    switch (activeLeftPanel) {
      case 'outline':
        return (
          <DocumentOutline
            onSectionClick={(sectionId) => {
              // Scroll to section in editor
              console.log('Navigate to section:', sectionId);
            }}
            onAddSection={() => {
              addNotification({
                type: 'info',
                title: 'Section Added',
                message: 'New section added to outline'
              });
            }}
          />
        );
      case 'sources':
        return (
          <ResearchSourcesPanel
            onAddSource={() => navigate('/research-library')}
            onCiteSource={(sourceId) => {
              addNotification({
                type: 'success',
                title: 'Citation Added',
                message: 'Source citation inserted into document'
              });
            }}
            onVerifySource={(sourceId) => {
              addNotification({
                type: 'processing',
                title: 'Verifying Source',
                message: 'Checking source credibility...'
              });
            }}
          />
        );
      case 'history':
        return (
          <RevisionHistory
            onSelectRevision={(revisionId) => {
              console.log('Select revision:', revisionId);
            }}
            onCompareRevisions={(rev1, rev2) => {
              setIsSplitView(true);
              addNotification({
                type: 'info',
                title: 'Comparison Mode',
                message: 'Showing revision differences'
              });
            }}
            onRestoreRevision={(revisionId) => {
              addNotification({
                type: 'warning',
                title: 'Revision Restored',
                message: 'Document restored to previous version'
              });
            }}
          />
        );
      default:
        return null;
    }
  };

  const renderRightPanel = () => {
    switch (activeRightPanel) {
      case 'ai-assistant':
        return (
          <AIAssistantPanel
            onGenerateContent={(type) => {
              addNotification({
                type: 'processing',
                title: 'Generating Content',
                message: `AI is creating ${type} content...`
              });
            }}
            onImproveText={(suggestion) => {
              addNotification({
                type: 'success',
                title: 'Text Improved',
                message: 'AI suggestions applied to selected text'
              });
            }}
            onCheckGrammar={() => {
              addNotification({
                type: 'processing',
                title: 'Grammar Check',
                message: 'Analyzing grammar and style...'
              });
            }}
            onHumanizeText={() => {
              addNotification({
                type: 'processing',
                title: 'Humanizing Text',
                message: 'Processing with QuillBot integration...'
              });
            }}
          />
        );
      case 'collaboration':
        return (
          <CollaborationPanel
            onAddComment={(comment) => {
              addNotification({
                type: 'success',
                title: 'Comment Added',
                message: 'Your comment has been posted'
              });
            }}
            onReplyToComment={(commentId, reply) => {
              addNotification({
                type: 'success',
                title: 'Reply Posted',
                message: 'Your reply has been added'
              });
            }}
            onInviteCollaborator={() => {
              addNotification({
                type: 'info',
                title: 'Invitation Sent',
                message: 'Collaborator invitation sent via email'
              });
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AssignmentContextHeader
        assignmentTitle={assignmentData.title}
        subject={assignmentData.subject}
        deadline={assignmentData.deadline}
        progress={assignmentData.progress}
        status={assignmentData.status}
        onSwitchAssignment={() => navigate('/assignment-dashboard')}
        onViewDetails={() => {
          addNotification({
            type: 'info',
            title: 'Assignment Details',
            message: 'Viewing assignment information'
          });
        }}
      />

      <div className="flex h-[calc(100vh-128px)]">
        {/* Left Sidebar */}
        <div className={`
          border-r border-border bg-surface transition-all duration-300
          ${isLeftPanelCollapsed ? 'w-12' : 'w-80'}
          ${isLeftPanelCollapsed ? 'lg:w-12' : 'lg:w-80'}
          hidden lg:flex flex-col
        `}>
          {!isLeftPanelCollapsed && (
            <>
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {leftPanelTabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveLeftPanel(tab.id)}
                        className={`
                          flex items-center space-x-1 px-2 py-1 text-xs rounded-md transition-academic
                          ${activeLeftPanel === tab.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-text-secondary hover:bg-muted'
                          }
                        `}
                      >
                        <Icon name={tab.icon} size={12} />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="PanelLeftClose"
                    onClick={() => setIsLeftPanelCollapsed(true)}
                  />
                </div>
              </div>
              <div className="flex-1">
                {renderLeftPanel()}
              </div>
            </>
          )}
          
          {isLeftPanelCollapsed && (
            <div className="p-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="PanelLeftOpen"
                onClick={() => setIsLeftPanelCollapsed(false)}
              />
            </div>
          )}
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col">
          {/* Editor Toolbar */}
          <div className="border-b border-border bg-surface p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  onClick={() => {
                    // Show export options
                    const formats = ['PDF', 'DOCX', 'TXT'];
                    const format = formats[Math.floor(Math.random() * formats.length)];
                    handleExport(format.toLowerCase());
                  }}
                >
                  Export
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Shield"
                  onClick={() => {
                    addNotification({
                      type: 'processing',
                      title: 'Plagiarism Check',
                      message: 'Scanning for potential plagiarism...'
                    });
                  }}
                >
                  Plagiarism
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Bot"
                  onClick={() => {
                    addNotification({
                      type: 'processing',
                      title: 'AI Detection Check',
                      message: 'Analyzing AI-generated content...'
                    });
                  }}
                >
                  AI Check
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Quote"
                  onClick={() => {
                    addNotification({
                      type: 'success',
                      title: 'Citations Formatted',
                      message: 'All citations updated to APA format'
                    });
                  }}
                >
                  Citations
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={isSplitView ? "Columns" : "PanelTop"}
                  onClick={() => setIsSplitView(!isSplitView)}
                >
                  {isSplitView ? 'Single View' : 'Split View'}
                </Button>
                
                {isAutoSaving && (
                  <div className="flex items-center space-x-1 text-xs text-text-secondary">
                    <Icon name="Loader" size={12} className="animate-spin" />
                    <span>Saving...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1">
            <RichTextEditor
              content={editorContent}
              onChange={handleContentChange}
              onSave={handleManualSave}
              onAutoSave={handleAutoSave}
              wordCount={wordCount}
              targetWordCount={3000}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={`
          border-l border-border bg-surface transition-all duration-300
          ${isRightPanelCollapsed ? 'w-12' : 'w-80'}
          ${isRightPanelCollapsed ? 'lg:w-12' : 'lg:w-80'}
          hidden lg:flex flex-col
        `}>
          {!isRightPanelCollapsed && (
            <>
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {rightPanelTabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveRightPanel(tab.id)}
                        className={`
                          flex items-center space-x-1 px-2 py-1 text-xs rounded-md transition-academic
                          ${activeRightPanel === tab.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-text-secondary hover:bg-muted'
                          }
                        `}
                      >
                        <Icon name={tab.icon} size={12} />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="PanelRightClose"
                    onClick={() => setIsRightPanelCollapsed(true)}
                  />
                </div>
              </div>
              <div className="flex-1">
                {renderRightPanel()}
              </div>
            </>
          )}
          
          {isRightPanelCollapsed && (
            <div className="p-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="PanelRightOpen"
                onClick={() => setIsRightPanelCollapsed(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Quality Score Widget */}
      <QualityScoreWidget
        overallScore={qualityScore}
        onRunCheck={handleRunQualityCheck}
        onViewDetails={() => navigate('/quality-assurance-dashboard')}
        isChecking={false}
      />

      {/* Quick Action Floating Button */}
      <QuickActionFloatingButton
        onNewAssignment={() => navigate('/assignment-creation-wizard')}
        onAddSource={() => navigate('/research-library')}
        onQuickUpload={() => {
          addNotification({
            type: 'info',
            title: 'Quick Upload',
            message: 'File upload dialog opened'
          });
        }}
        onEmergencyHelp={() => {
          addNotification({
            type: 'info',
            title: 'Help Center',
            message: 'Opening support resources'
          });
        }}
      />

      {/* Notifications */}
      <NotificationToast
        notifications={notifications}
        onDismiss={handleDismissNotification}
        onDismissAll={handleDismissAllNotifications}
        position="top-right"
        maxVisible={3}
      />
    </div>
  );
};

export default AssignmentEditor;