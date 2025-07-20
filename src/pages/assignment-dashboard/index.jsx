import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AssignmentContextHeader from '../../components/ui/AssignmentContextHeader';
import QuickActionFloatingButton from '../../components/ui/QuickActionFloatingButton';
import NotificationToast from '../../components/ui/NotificationToast';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

// Import components
import AssignmentFilters from './components/AssignmentFilters';
import AssignmentStatsCards from './components/AssignmentStatsCards';
import AssignmentTable from './components/AssignmentTable';
import AssignmentCards from './components/AssignmentCards';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import RecentActivity from './components/RecentActivity';

const AssignmentDashboard = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    subject: 'all',
    status: 'all',
    priority: 'all',
    showCompleted: true,
    showOverdue: true,
    dateRange: null
  });
  const [sortBy, setSortBy] = useState('deadline');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Mock assignments data
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Advanced Machine Learning Research Paper",
      subject: "Computer Science",
      type: "Research Paper",
      deadline: "2025-07-25",
      status: "in-progress",
      priority: "high",
      progress: 65,
      grade: null,
      wordCount: 3500,
      targetWords: 5000,
      description: "Comprehensive analysis of deep learning algorithms and their applications in computer vision and natural language processing.",
      createdAt: "2025-07-10"
    },
    {
      id: 2,
      title: "Calculus Problem Set #7",
      subject: "Mathematics",
      type: "Problem Set",
      deadline: "2025-07-20",
      status: "pending",
      priority: "medium",
      progress: 0,
      grade: null,
      wordCount: 0,
      targetWords: 2000,
      description: "Integration techniques, differential equations, and series convergence problems.",
      createdAt: "2025-07-15"
    },
    {
      id: 3,
      title: "Shakespeare Analysis Essay",
      subject: "English Literature",
      type: "Essay",
      deadline: "2025-07-18",
      status: "completed",
      priority: "low",
      progress: 100,
      grade: 92,
      wordCount: 1800,
      targetWords: 1800,
      description: "Literary analysis of themes and character development in Hamlet.",
      createdAt: "2025-07-05"
    },
    {
      id: 4,
      title: "Business Strategy Case Study",
      subject: "Business Studies",
      type: "Case Study",
      deadline: "2025-07-15",
      status: "overdue",
      priority: "high",
      progress: 45,
      grade: null,
      wordCount: 1200,
      targetWords: 3000,
      description: "Analysis of competitive strategies in the tech industry with focus on market positioning.",
      createdAt: "2025-07-08"
    },
    {
      id: 5,
      title: "Python Web Scraping Project",
      subject: "Computer Science",
      type: "Coding Project",
      deadline: "2025-07-30",
      status: "draft",
      priority: "medium",
      progress: 20,
      grade: null,
      wordCount: 0,
      targetWords: 0,
      description: "Build a web scraping application using Python and BeautifulSoup for data extraction.",
      createdAt: "2025-07-16"
    }
  ]);

  // Statistics calculation
  const stats = {
    total: assignments.length,
    pending: assignments.filter(a => a.status === 'pending').length,
    inProgress: assignments.filter(a => a.status === 'in-progress').length,
    completed: assignments.filter(a => a.status === 'completed').length,
    overdue: assignments.filter(a => a.status === 'overdue').length,
    completionRate: Math.round((assignments.filter(a => a.status === 'completed').length / assignments.length) * 100),
    avgGrade: assignments.filter(a => a.grade).reduce((sum, a) => sum + a.grade, 0) / assignments.filter(a => a.grade).length || 0,
    upcomingDeadlines: assignments.filter(a => {
      const deadline = new Date(a.deadline);
      const now = new Date();
      const diffDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7;
    }).length
  };

  // Filter and search assignments
  const filteredAssignments = assignments.filter(assignment => {
    // Search filter
    if (searchQuery && !assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !assignment.subject.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Subject filter
    if (filters.subject !== 'all' && assignment.subject.toLowerCase().replace(' ', '-') !== filters.subject) {
      return false;
    }

    // Status filter
    if (filters.status !== 'all' && assignment.status !== filters.status) {
      return false;
    }

    // Priority filter
    if (filters.priority !== 'all' && assignment.priority !== filters.priority) {
      return false;
    }

    // Show completed filter
    if (!filters.showCompleted && assignment.status === 'completed') {
      return false;
    }

    // Show overdue filter
    if (!filters.showOverdue && assignment.status === 'overdue') {
      return false;
    }

    // Date range filter
    if (filters.dateRange) {
      const deadline = new Date(assignment.deadline);
      const now = new Date();
      const diffDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));

      switch (filters.dateRange) {
        case 'today':
          if (diffDays !== 0) return false;
          break;
        case 'week':
          if (diffDays < 0 || diffDays > 7) return false;
          break;
        case 'month':
          if (diffDays < 0 || diffDays > 30) return false;
          break;
        case 'overdue':
          if (diffDays >= 0) return false;
          break;
      }
    }

    return true;
  });

  // Sort assignments
  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'subject':
        aValue = a.subject.toLowerCase();
        bValue = b.subject.toLowerCase();
        break;
      case 'deadline':
        aValue = new Date(a.deadline);
        bValue = new Date(b.deadline);
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'progress':
        aValue = a.progress;
        bValue = b.progress;
        break;
      default:
        aValue = a.createdAt;
        bValue = b.createdAt;
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Event handlers
  const handleNewAssignment = () => {
    navigate('/assignment-creation-wizard');
  };

  const handleEditAssignment = (assignment) => {
    navigate('/assignment-editor', { state: { assignment } });
  };

  const handleDuplicateAssignment = (assignment) => {
    const duplicatedAssignment = {
      ...assignment,
      id: Date.now(),
      title: `${assignment.title} (Copy)`,
      status: 'draft',
      progress: 0,
      grade: null,
      createdAt: new Date().toISOString()
    };
    
    setAssignments([...assignments, duplicatedAssignment]);
    
    setNotifications([{
      id: Date.now(),
      type: 'success',
      title: 'Assignment Duplicated',
      message: `"${assignment.title}" has been duplicated successfully`,
      timestamp: new Date()
    }, ...notifications]);
  };

  const handleDownloadAssignment = (assignment) => {
    // Mock download functionality
    setNotifications([{
      id: Date.now(),
      type: 'info',
      title: 'Download Started',
      message: `Downloading "${assignment.title}"...`,
      timestamp: new Date()
    }, ...notifications]);
  };

  const handleDeleteAssignment = (assignment) => {
    setAssignments(assignments.filter(a => a.id !== assignment.id));
    
    setNotifications([{
      id: Date.now(),
      type: 'success',
      title: 'Assignment Deleted',
      message: `"${assignment.title}" has been deleted`,
      timestamp: new Date()
    }, ...notifications]);
  };

  const handleBulkAction = (action, assignmentIds) => {
    switch (action) {
      case 'download':
        setNotifications([{
          id: Date.now(),
          type: 'info',
          title: 'Bulk Download Started',
          message: `Downloading ${assignmentIds.length} assignments...`,
          timestamp: new Date()
        }, ...notifications]);
        break;
      case 'duplicate':
        const duplicatedAssignments = assignmentIds.map(id => {
          const original = assignments.find(a => a.id === id);
          return {
            ...original,
            id: Date.now() + Math.random(),
            title: `${original.title} (Copy)`,
            status: 'draft',
            progress: 0,
            grade: null,
            createdAt: new Date().toISOString()
          };
        });
        setAssignments([...assignments, ...duplicatedAssignments]);
        break;
      case 'delete':
        setAssignments(assignments.filter(a => !assignmentIds.includes(a.id)));
        setNotifications([{
          id: Date.now(),
          type: 'success',
          title: 'Assignments Deleted',
          message: `${assignmentIds.length} assignments have been deleted`,
          timestamp: new Date()
        }, ...notifications]);
        break;
    }
  };

  const handleSort = (column, order) => {
    setSortBy(column);
    setSortOrder(order);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleViewAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    navigate('/assignment-editor', { state: { assignment } });
  };

  const handleSwitchAssignment = () => {
    // Mock assignment switching
    const randomAssignment = assignments[Math.floor(Math.random() * assignments.length)];
    setSelectedAssignment(randomAssignment);
  };

  const handleViewDetails = () => {
    // Mock view details
    console.log('View assignment details');
  };

  const dismissNotification = (notificationId) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  const dismissAllNotifications = () => {
    setNotifications([]);
  };

  // View mode options
  const viewModeOptions = [
    { value: 'table', label: 'Table View' },
    { value: 'cards', label: 'Card View' }
  ];

  useEffect(() => {
    // Set initial selected assignment
    if (assignments.length > 0 && !selectedAssignment) {
      setSelectedAssignment(assignments.find(a => a.status === 'in-progress') || assignments[0]);
    }
  }, [assignments, selectedAssignment]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {selectedAssignment && (
        <AssignmentContextHeader
          assignmentTitle={selectedAssignment.title}
          subject={selectedAssignment.subject}
          deadline={selectedAssignment.deadline}
          progress={selectedAssignment.progress}
          status={selectedAssignment.status}
          onSwitchAssignment={handleSwitchAssignment}
          onViewDetails={handleViewDetails}
        />
      )}

      <div className="pt-32">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">Assignment Dashboard</h1>
              <p className="text-text-secondary">
                Manage your assignments, track progress, and monitor deadlines
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Button
                variant="outline"
                iconName="Upload"
                onClick={() => navigate('/assignment-creation-wizard')}
              >
                Quick Upload
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                onClick={handleNewAssignment}
              >
                New Assignment
              </Button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Filters and Stats */}
            <div className="lg:col-span-3 space-y-6">
              <AssignmentFilters
                onFilterChange={handleFilterChange}
                activeFilters={filters}
              />
              <AssignmentStatsCards stats={stats} />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-6 space-y-6">
              {/* Search and Controls */}
              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <Input
                      type="search"
                      placeholder="Search assignments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Select
                      options={viewModeOptions}
                      value={viewMode}
                      onChange={setViewMode}
                      className="w-32"
                    />
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Filter"
                      className="lg:hidden"
                    >
                      Filters
                    </Button>
                  </div>
                </div>
                
                {/* Results Summary */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="text-sm text-text-secondary">
                    Showing {sortedAssignments.length} of {assignments.length} assignments
                  </span>
                  
                  {(searchQuery || Object.values(filters).some(f => f !== 'all' && f !== true && f !== null)) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => {
                        setSearchQuery('');
                        setFilters({
                          subject: 'all',
                          status: 'all',
                          priority: 'all',
                          showCompleted: true,
                          showOverdue: true,
                          dateRange: null
                        });
                      }}
                      className="text-text-secondary hover:text-text-primary"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
              </div>

              {/* Assignment List */}
              {viewMode === 'table' ? (
                <AssignmentTable
                  assignments={sortedAssignments}
                  onEdit={handleEditAssignment}
                  onDuplicate={handleDuplicateAssignment}
                  onDownload={handleDownloadAssignment}
                  onDelete={handleDeleteAssignment}
                  onBulkAction={handleBulkAction}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              ) : (
                <AssignmentCards
                  assignments={sortedAssignments}
                  onEdit={handleEditAssignment}
                  onDuplicate={handleDuplicateAssignment}
                  onDownload={handleDownloadAssignment}
                  onDelete={handleDeleteAssignment}
                />
              )}
            </div>

            {/* Right Sidebar - Deadlines and Activity */}
            <div className="lg:col-span-3 space-y-6">
              <UpcomingDeadlines
                assignments={assignments}
                onViewAssignment={handleViewAssignment}
              />
              <RecentActivity
                onViewAll={() => console.log('View all activities')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <QuickActionFloatingButton
        onNewAssignment={handleNewAssignment}
        onQuickUpload={() => navigate('/assignment-creation-wizard')}
        onEmergencyHelp={() => console.log('Emergency help')}
      />

      {/* Notifications */}
      <NotificationToast
        notifications={notifications}
        onDismiss={dismissNotification}
        onDismissAll={dismissAllNotifications}
        position="top-right"
        maxVisible={3}
      />
    </div>
  );
};

export default AssignmentDashboard;