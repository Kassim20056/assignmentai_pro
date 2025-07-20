import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AssignmentTable = ({ 
  assignments = [], 
  onEdit, 
  onDuplicate, 
  onDownload, 
  onDelete,
  onBulkAction,
  sortBy,
  sortOrder,
  onSort
}) => {
  const [selectedAssignments, setSelectedAssignments] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { color: 'bg-accent/10 text-accent', icon: 'Clock' },
      'in-progress': { color: 'bg-primary/10 text-primary', icon: 'Play' },
      'completed': { color: 'bg-success/10 text-success', icon: 'CheckCircle' },
      'overdue': { color: 'bg-error/10 text-error', icon: 'AlertTriangle' },
      'draft': { color: 'bg-muted text-text-secondary', icon: 'Edit3' }
    };

    const config = statusConfig[status] || statusConfig['pending'];
    
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span className="capitalize">{status.replace('-', ' ')}</span>
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      'high': { color: 'text-error', bg: 'bg-error/10' },
      'medium': { color: 'text-accent', bg: 'bg-accent/10' },
      'low': { color: 'text-success', bg: 'bg-success/10' }
    };

    const config = priorityConfig[priority] || priorityConfig['medium'];
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.color} ${config.bg}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)}d overdue`, color: 'text-error' };
    } else if (diffDays === 0) {
      return { text: 'Due today', color: 'text-accent' };
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', color: 'text-accent' };
    } else if (diffDays <= 7) {
      return { text: `${diffDays}d left`, color: 'text-accent' };
    } else {
      return { text: date.toLocaleDateString(), color: 'text-text-secondary' };
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedAssignments(assignments.map(a => a.id));
    } else {
      setSelectedAssignments([]);
    }
  };

  const handleSelectAssignment = (assignmentId, checked) => {
    if (checked) {
      setSelectedAssignments([...selectedAssignments, assignmentId]);
    } else {
      setSelectedAssignments(selectedAssignments.filter(id => id !== assignmentId));
    }
  };

  const handleSort = (column) => {
    const newOrder = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
    onSort?.(column, newOrder);
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return 'ArrowUpDown';
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const mockAssignments = [
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
      createdAt: "2025-07-16"
    }
  ];

  const displayAssignments = assignments.length > 0 ? assignments : mockAssignments;

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Bulk Actions Bar */}
      {selectedAssignments.length > 0 && (
        <div className="bg-primary/5 border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-primary">
              {selectedAssignments.length} assignment{selectedAssignments.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                onClick={() => onBulkAction?.('download', selectedAssignments)}
              >
                Download
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Copy"
                onClick={() => onBulkAction?.('duplicate', selectedAssignments)}
              >
                Duplicate
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={() => onBulkAction?.('delete', selectedAssignments)}
                className="text-error hover:text-error"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={selectedAssignments.length === displayAssignments.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-academic"
                >
                  <span>Assignment</span>
                  <Icon name={getSortIcon('title')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('subject')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-academic"
                >
                  <span>Subject</span>
                  <Icon name={getSortIcon('subject')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('deadline')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-academic"
                >
                  <span>Deadline</span>
                  <Icon name={getSortIcon('deadline')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-academic"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3">Progress</th>
              <th className="text-left px-4 py-3">Grade</th>
              <th className="w-24 px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayAssignments.map((assignment) => {
              const deadline = formatDeadline(assignment.deadline);
              
              return (
                <tr
                  key={assignment.id}
                  className="border-b border-border hover:bg-muted/50 transition-academic"
                  onMouseEnter={() => setHoveredRow(assignment.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-4 py-4">
                    <Checkbox
                      checked={selectedAssignments.includes(assignment.id)}
                      onChange={(e) => handleSelectAssignment(assignment.id, e.target.checked)}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <h3 className="text-sm font-medium text-text-primary">
                        {assignment.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-text-secondary">
                          {assignment.type}
                        </span>
                        {assignment.priority && (
                          <>
                            <span className="text-xs text-text-secondary">•</span>
                            {getPriorityBadge(assignment.priority)}
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-text-primary">{assignment.subject}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-sm ${deadline.color}`}>
                      {deadline.text}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(assignment.status)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${assignment.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-secondary">
                        {assignment.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {assignment.grade ? (
                      <span className="text-sm font-medium text-success">
                        {assignment.grade}%
                      </span>
                    ) : (
                      <span className="text-sm text-text-secondary">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className={`flex items-center space-x-1 transition-academic ${
                      hoveredRow === assignment.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Edit3"
                        onClick={() => onEdit?.(assignment)}
                        className="text-text-secondary hover:text-primary"
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Copy"
                        onClick={() => onDuplicate?.(assignment)}
                        className="text-text-secondary hover:text-primary"
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Download"
                        onClick={() => onDownload?.(assignment)}
                        className="text-text-secondary hover:text-primary"
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Trash2"
                        onClick={() => onDelete?.(assignment)}
                        className="text-text-secondary hover:text-error"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {displayAssignments.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No assignments found</h3>
          <p className="text-text-secondary mb-4">Get started by creating your first assignment</p>
          <Button variant="default" iconName="Plus">
            Create Assignment
          </Button>
        </div>
      )}
    </div>
  );
};

export default AssignmentTable;