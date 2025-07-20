import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AssignmentContextHeader from '../../components/ui/AssignmentContextHeader';
import QuickActionFloatingButton from '../../components/ui/QuickActionFloatingButton';
import NotificationToast from '../../components/ui/NotificationToast';
import ProcessingTimeline from './components/ProcessingTimeline';
import AssignmentMetadata from './components/AssignmentMetadata';
import LiveGenerationPreview from './components/LiveGenerationPreview';
import ProcessingControls from './components/ProcessingControls';
import ProcessingLog from './components/ProcessingLog';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AIProcessingCenter = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStage, setCurrentStage] = useState(2);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'processing',
      title: 'Research Gathering in Progress',
      message: 'Analyzing 47 relevant sources for your assignment',
      timestamp: new Date(Date.now() - 300000),
      progress: 67,
      progressLabel: 'Gathering sources...'
    }
  ]);

  // Simulate processing progress
  useEffect(() => {
    if (isProcessing && !isPaused) {
      const interval = setInterval(() => {
        // Simulate stage progression
        if (Math.random() > 0.95) {
          setCurrentStage(prev => Math.min(prev + 1, 5));
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isProcessing, isPaused]);

  const handlePause = () => {
    setIsPaused(true);
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'warning',
      title: 'Processing Paused',
      message: 'Assignment generation has been paused by user',
      timestamp: new Date()
    }]);
  };

  const handleResume = () => {
    setIsPaused(false);
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'info',
      title: 'Processing Resumed',
      message: 'Assignment generation has been resumed',
      timestamp: new Date()
    }]);
  };

  const handleStop = () => {
    setIsProcessing(false);
    setIsPaused(false);
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'error',
      title: 'Processing Stopped',
      message: 'Assignment generation has been cancelled',
      timestamp: new Date()
    }]);
  };

  const handleModifyParameters = () => {
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'info',
      title: 'Parameters Updated',
      message: 'Processing parameters have been modified',
      timestamp: new Date()
    }]);
  };

  const handleRegenerateSection = (section) => {
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'processing',
      title: `Regenerating ${section}`,
      message: `Starting regeneration of ${section} section`,
      timestamp: new Date(),
      progress: 0,
      progressLabel: 'Initializing...'
    }]);
  };

  const handleExportResults = () => {
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      title: 'Export Complete',
      message: 'Current results have been exported successfully',
      timestamp: new Date(),
      action: {
        label: 'Download',
        onClick: () => {}
      }
    }]);
  };

  const handleSwitchAssignment = () => {
    navigate('/assignment-dashboard');
  };

  const handleViewDetails = () => {
    // Toggle detailed view or navigate to assignment details
  };

  const handleDismissNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleDismissAllNotifications = () => {
    setNotifications([]);
  };

  const handleNewAssignment = () => {
    navigate('/assignment-creation-wizard');
  };

  const handleQuickUpload = () => {
    // Handle quick upload functionality
  };

  const handleEmergencyHelp = () => {
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'info',
      title: 'Help Request Sent',
      message: 'Our support team will contact you shortly',
      timestamp: new Date()
    }]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <AssignmentContextHeader
        assignmentTitle="Advanced Machine Learning Research Paper"
        subject="Computer Science"
        deadline="2025-07-25"
        progress={65}
        status="In Progress"
        onSwitchAssignment={handleSwitchAssignment}
        onViewDetails={handleViewDetails}
      />

      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                  AI Processing Center
                </h1>
                <p className="text-text-secondary">
                  Monitor real-time assignment generation with comprehensive progress tracking
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="BarChart3"
                  iconPosition="left"
                  onClick={() => {}}
                >
                  Analytics
                </Button>
                <Button
                  variant="outline"
                  iconName="Settings"
                  iconPosition="left"
                  onClick={() => {}}
                >
                  Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel - Assignment Metadata */}
            <div className="lg:col-span-4 space-y-6">
              <AssignmentMetadata />
              
              {/* Desktop Processing Controls */}
              <div className="hidden lg:block">
                <ProcessingControls
                  isProcessing={isProcessing}
                  isPaused={isPaused}
                  onPause={handlePause}
                  onResume={handleResume}
                  onStop={handleStop}
                  onModifyParameters={handleModifyParameters}
                  onRegenerateSection={handleRegenerateSection}
                  onExportResults={handleExportResults}
                  currentStage={currentStage === 1 ? "Requirement Analysis" : 
                              currentStage === 2 ? "Research Gathering" :
                              currentStage === 3 ? "Content Generation" :
                              currentStage === 4 ? "Humanization" : "Quality Verification"}
                  progress={currentStage === 2 ? 67 : currentStage * 20}
                />
              </div>
            </div>

            {/* Center Panel - Processing Timeline */}
            <div className="lg:col-span-4 space-y-6">
              <ProcessingTimeline currentStage={currentStage} />
              
              {/* Mobile Processing Controls */}
              <div className="lg:hidden">
                <ProcessingControls
                  isProcessing={isProcessing}
                  isPaused={isPaused}
                  onPause={handlePause}
                  onResume={handleResume}
                  onStop={handleStop}
                  onModifyParameters={handleModifyParameters}
                  onRegenerateSection={handleRegenerateSection}
                  onExportResults={handleExportResults}
                  currentStage={currentStage === 1 ? "Requirement Analysis" : 
                              currentStage === 2 ? "Research Gathering" :
                              currentStage === 3 ? "Content Generation" :
                              currentStage === 4 ? "Humanization" : "Quality Verification"}
                  progress={currentStage === 2 ? 67 : currentStage * 20}
                />
              </div>
              
              <ProcessingLog />
            </div>

            {/* Right Panel - Live Preview */}
            <div className="lg:col-span-4">
              <LiveGenerationPreview
                isGenerating={isProcessing && !isPaused}
                currentSection={currentStage === 1 ? "Requirements" : 
                               currentStage === 2 ? "Research" :
                               currentStage === 3 ? "Introduction" :
                               currentStage === 4 ? "Content Review" : "Final Check"}
              />
            </div>
          </div>

          {/* Emergency Actions Bar */}
          <div className="mt-8 p-4 bg-surface border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
                <div>
                  <h3 className="text-sm font-medium text-text-primary">
                    Need Help?
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Contact support if you encounter any issues during processing
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={() => {}}
                >
                  Live Chat
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="HelpCircle"
                  iconPosition="left"
                  onClick={handleEmergencyHelp}
                >
                  Get Help
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <QuickActionFloatingButton
        onNewAssignment={handleNewAssignment}
        onQuickUpload={handleQuickUpload}
        onEmergencyHelp={handleEmergencyHelp}
      />

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

export default AIProcessingCenter;