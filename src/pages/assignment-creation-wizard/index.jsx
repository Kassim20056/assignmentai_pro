import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AssignmentContextHeader from '../../components/ui/AssignmentContextHeader';
import ProgressIndicatorStrip from '../../components/ui/ProgressIndicatorStrip';
import NotificationToast from '../../components/ui/NotificationToast';
import QuickActionFloatingButton from '../../components/ui/QuickActionFloatingButton';
import FileUploadZone from './components/FileUploadZone';
import RequirementAnalysis from './components/RequirementAnalysis';
import ConfigurationPanel from './components/ConfigurationPanel';
import GenerationPreview from './components/GenerationPreview';

import Button from '../../components/ui/Button';

const AssignmentCreationWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    uploadedFiles: [],
    textInput: '',
    analysisResults: null,
    configuration: {},
    isProcessing: false
  });
  const [notifications, setNotifications] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const wizardSteps = [
    { 
      id: 1, 
      title: 'Upload & Input', 
      description: 'Upload files or enter assignment requirements',
      completed: currentStep > 1
    },
    { 
      id: 2, 
      title: 'AI Analysis', 
      description: 'Review AI-powered requirement analysis',
      completed: currentStep > 2
    },
    { 
      id: 3, 
      title: 'Configuration', 
      description: 'Customize output parameters and settings',
      completed: currentStep > 3
    },
    { 
      id: 4, 
      title: 'Generation Preview', 
      description: 'Review and start AI generation process',
      completed: currentStep > 4
    }
  ];

  useEffect(() => {
    // Auto-save wizard state to localStorage
    const saveState = () => {
      localStorage.setItem('wizardState', JSON.stringify({
        currentStep,
        wizardData,
        timestamp: new Date().toISOString()
      }));
    };

    const timeoutId = setTimeout(saveState, 1000);
    return () => clearTimeout(timeoutId);
  }, [currentStep, wizardData]);

  useEffect(() => {
    // Load saved state on component mount
    const savedState = localStorage.getItem('wizardState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        const savedTime = new Date(parsed.timestamp);
        const now = new Date();
        const hoursDiff = (now - savedTime) / (1000 * 60 * 60);
        
        // Only restore if saved within last 24 hours
        if (hoursDiff < 24) {
          setCurrentStep(parsed.currentStep);
          setWizardData(parsed.wizardData);
          
          addNotification({
            type: 'info',
            title: 'Draft Restored',
            message: 'Your previous wizard session has been restored.',
            timestamp: new Date()
          });
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const dismissAllNotifications = () => {
    setNotifications([]);
  };

  const handleFileUpload = async (files) => {
    setIsUploading(true);
    
    try {
      // Simulate file upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setWizardData(prev => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...files]
      }));
      
      addNotification({
        type: 'success',
        title: 'Files Uploaded',
        message: `${files.length} file(s) uploaded successfully.`,
        timestamp: new Date()
      });
      
      // Auto-advance to next step after successful upload
      setTimeout(() => {
        setCurrentStep(2);
      }, 1000);
      
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Upload Failed',
        message: 'Failed to upload files. Please try again.',
        timestamp: new Date()
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleTextInput = (text) => {
    setWizardData(prev => ({
      ...prev,
      textInput: text
    }));
    
    addNotification({
      type: 'success',
      title: 'Text Analyzed',
      message: 'Assignment requirements have been processed.',
      timestamp: new Date()
    });
    
    // Auto-advance to analysis step
    setTimeout(() => {
      setCurrentStep(2);
    }, 500);
  };

  const handleAnalysisConfirm = (analysisData) => {
    setWizardData(prev => ({
      ...prev,
      analysisResults: analysisData
    }));
    
    addNotification({
      type: 'success',
      title: 'Analysis Confirmed',
      message: 'Requirements analysis has been confirmed.',
      timestamp: new Date()
    });
    
    setCurrentStep(3);
  };

  const handleConfigurationSave = (config) => {
    setWizardData(prev => ({
      ...prev,
      configuration: config
    }));
    
    addNotification({
      type: 'success',
      title: 'Configuration Saved',
      message: 'Assignment configuration has been saved.',
      timestamp: new Date()
    });
    
    setCurrentStep(4);
  };

  const handleStartGeneration = () => {
    setWizardData(prev => ({
      ...prev,
      isProcessing: true
    }));
    
    addNotification({
      type: 'processing',
      title: 'Generation Started',
      message: 'AI assignment generation has begun.',
      timestamp: new Date(),
      progress: 0,
      progressLabel: 'Initializing...'
    });
    
    // Navigate to processing center
    setTimeout(() => {
      navigate('/ai-processing-center');
    }, 2000);
  };

  const handleSaveDraft = () => {
    addNotification({
      type: 'success',
      title: 'Draft Saved',
      message: 'Your assignment draft has been saved.',
      timestamp: new Date()
    });
  };

  const handleStepNavigation = (step) => {
    if (step.id <= currentStep || step.completed) {
      setCurrentStep(step.id);
    }
  };

  const handleNewAssignment = () => {
    setCurrentStep(1);
    setWizardData({
      uploadedFiles: [],
      textInput: '',
      analysisResults: null,
      configuration: {},
      isProcessing: false
    });
    localStorage.removeItem('wizardState');
    
    addNotification({
      type: 'info',
      title: 'New Assignment',
      message: 'Starting fresh assignment creation.',
      timestamp: new Date()
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FileUploadZone
            onFileUpload={handleFileUpload}
            onTextInput={handleTextInput}
            uploadedFiles={wizardData.uploadedFiles}
            isUploading={isUploading}
          />
        );
      
      case 2:
        return (
          <RequirementAnalysis
            analysisData={wizardData.analysisResults}
            onEditRequirement={() => setCurrentStep(1)}
            onConfirmAnalysis={handleAnalysisConfirm}
          />
        );
      
      case 3:
        return (
          <ConfigurationPanel
            onConfigurationSave={handleConfigurationSave}
            initialConfig={wizardData.configuration}
          />
        );
      
      case 4:
        return (
          <GenerationPreview
            assignmentData={wizardData.analysisResults}
            configuration={wizardData.configuration}
            onStartGeneration={handleStartGeneration}
            onSaveDraft={handleSaveDraft}
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
        assignmentTitle="New Assignment Creation"
        subject="Assignment Wizard"
        deadline="2025-07-25"
        progress={Math.round((currentStep / wizardSteps.length) * 100)}
        status="In Progress"
        onSwitchAssignment={() => navigate('/assignment-dashboard')}
        onViewDetails={() => {}}
      />
      
      <ProgressIndicatorStrip
        currentStep={currentStep}
        steps={wizardSteps}
        onStepClick={handleStepNavigation}
        allowBackNavigation={true}
        showDescriptions={true}
      />

      {/* Main Content */}
      <main className="pt-4 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Step Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                {currentStep}
              </div>
              <h1 className="text-2xl font-heading font-bold text-text-primary">
                {wizardSteps.find(s => s.id === currentStep)?.title}
              </h1>
            </div>
            <p className="text-text-secondary ml-11">
              {wizardSteps.find(s => s.id === currentStep)?.description}
            </p>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between p-6 bg-surface border border-border rounded-lg">
            <Button
              variant="outline"
              iconName="ChevronLeft"
              iconPosition="left"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-text-secondary">
                Step {currentStep} of {wizardSteps.length}
              </span>
              
              <Button
                variant="ghost"
                iconName="Save"
                iconPosition="left"
                onClick={handleSaveDraft}
                className="text-text-secondary"
              >
                Save Draft
              </Button>
            </div>

            <Button
              variant="default"
              iconName="ChevronRight"
              iconPosition="right"
              onClick={() => setCurrentStep(Math.min(wizardSteps.length, currentStep + 1))}
              disabled={currentStep === wizardSteps.length}
            >
              {currentStep === wizardSteps.length ? 'Complete' : 'Next'}
            </Button>
          </div>
        </div>
      </main>

      <NotificationToast
        notifications={notifications}
        onDismiss={dismissNotification}
        onDismissAll={dismissAllNotifications}
        position="top-right"
        maxVisible={3}
      />

      <QuickActionFloatingButton
        onNewAssignment={handleNewAssignment}
        onQuickUpload={() => setCurrentStep(1)}
        onEmergencyHelp={() => {
          addNotification({
            type: 'info',
            title: 'Help Available',
            message: 'Contact support for assistance with the wizard.',
            timestamp: new Date()
          });
        }}
      />
    </div>
  );
};

export default AssignmentCreationWizard;