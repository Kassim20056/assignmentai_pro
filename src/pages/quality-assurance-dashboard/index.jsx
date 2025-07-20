import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AssignmentContextHeader from '../../components/ui/AssignmentContextHeader';
import NotificationToast from '../../components/ui/NotificationToast';
import QuickActionFloatingButton from '../../components/ui/QuickActionFloatingButton';
import QualityMetricsOverview from './components/QualityMetricsOverview';
import QualityAnalysisCharts from './components/QualityAnalysisCharts';
import QualityFiltersSidebar from './components/QualityFiltersSidebar';
import VerificationResultsPanel from './components/VerificationResultsPanel';
import DetailedQualityReport from './components/DetailedQualityReport';
import Icon from '../../components/AppIcon';

const QualityAssuranceDashboard = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [filters, setFilters] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock assignment data
  const currentAssignment = {
    title: "Advanced Machine Learning Research Paper",
    subject: "Computer Science",
    deadline: "2025-07-25",
    progress: 85,
    status: "Quality Review"
  };

  // Initialize notifications
  useEffect(() => {
    const initialNotifications = [
      {
        id: 1,
        type: 'success',
        title: 'Quality Analysis Complete',
        message: 'Your assignment scored 89% overall quality with minor improvements needed.',
        timestamp: new Date(Date.now() - 300000),
        action: {
          label: 'View Report',
          onClick: () => console.log('View report clicked')
        }
      },
      {
        id: 2,
        type: 'warning',
        title: 'AI Detection Alert',
        message: 'Literature Review section needs humanization (78% human score).',
        timestamp: new Date(Date.now() - 600000)
      },
      {
        id: 3,
        type: 'processing',
        title: 'Running Plagiarism Check',
        message: 'Turnitin analysis in progress...',
        timestamp: new Date(Date.now() - 120000),
        progress: 65,
        progressLabel: 'Analyzing content...'
      }
    ];
    setNotifications(initialNotifications);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const handleRunQualityCheck = () => {
    setIsAnalyzing(true);
    
    // Add processing notification
    const processingNotification = {
      id: Date.now(),
      type: 'processing',
      title: 'Quality Check Started',
      message: 'Running comprehensive quality analysis...',
      timestamp: new Date(),
      progress: 0,
      progressLabel: 'Initializing...'
    };
    
    setNotifications(prev => [processingNotification, ...prev]);
    
    // Simulate analysis progress
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Update to success notification
      const successNotification = {
        id: Date.now() + 1,
        type: 'success',
        title: 'Quality Check Complete',
        message: 'Analysis finished with 92% overall quality score.',
        timestamp: new Date()
      };
      
      setNotifications(prev => [successNotification, ...prev.filter(n => n.id !== processingNotification.id)]);
    }, 5000);
  };

  const handleSwitchAssignment = () => {
    navigate('/assignment-dashboard');
  };

  const handleViewAssignmentDetails = () => {
    console.log('View assignment details');
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
    console.log('Quick upload triggered');
  };

  const handleEmergencyHelp = () => {
    console.log('Emergency help requested');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <AssignmentContextHeader
        assignmentTitle={currentAssignment.title}
        subject={currentAssignment.subject}
        deadline={currentAssignment.deadline}
        progress={currentAssignment.progress}
        status={currentAssignment.status}
        onSwitchAssignment={handleSwitchAssignment}
        onViewDetails={handleViewAssignmentDetails}
      />

      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary">
                  Quality Assurance Dashboard
                </h1>
                <p className="text-text-secondary mt-2">
                  Comprehensive quality analysis with AI detection verification and improvement recommendations
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleRunQualityCheck}
                  disabled={isAnalyzing}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-academic
                    ${isAnalyzing
                      ? 'bg-muted text-text-secondary cursor-not-allowed' :'bg-primary text-primary-foreground hover:bg-primary/90'
                    }
                  `}
                >
                  <Icon 
                    name={isAnalyzing ? "Loader" : "Play"} 
                    size={16} 
                    className={isAnalyzing ? "animate-spin" : ""}
                  />
                  <span>{isAnalyzing ? 'Analyzing...' : 'Run Quality Check'}</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-surface border border-border text-text-secondary rounded-lg text-sm font-medium hover:bg-muted transition-academic">
                  <Icon name="Settings" size={16} />
                  <span>Configure</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quality Metrics Overview */}
          <div className="mb-8">
            <QualityMetricsOverview />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Filters and Tools */}
            <div className="lg:col-span-3">
              <QualityFiltersSidebar onFiltersChange={handleFiltersChange} />
            </div>

            {/* Center Content - Charts and Analysis */}
            <div className="lg:col-span-6 space-y-6">
              <QualityAnalysisCharts />
              <DetailedQualityReport />
            </div>

            {/* Right Sidebar - Verification Results */}
            <div className="lg:col-span-3">
              <VerificationResultsPanel />
            </div>
          </div>

          {/* Mobile-Optimized Stacked Layout */}
          <div className="lg:hidden mt-8 space-y-6">
            <QualityAnalysisCharts />
            <DetailedQualityReport />
          </div>
        </div>
      </main>

      {/* Notifications */}
      <NotificationToast
        notifications={notifications}
        onDismiss={handleDismissNotification}
        onDismissAll={handleDismissAllNotifications}
        position="top-right"
        maxVisible={3}
      />

      {/* Quick Actions */}
      <QuickActionFloatingButton
        onNewAssignment={handleNewAssignment}
        onQuickUpload={handleQuickUpload}
        onEmergencyHelp={handleEmergencyHelp}
      />
    </div>
  );
};

export default QualityAssuranceDashboard;