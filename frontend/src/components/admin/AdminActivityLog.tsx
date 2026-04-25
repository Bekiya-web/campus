import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity, 
  User, 
  FileText, 
  MessageSquare, 
  Shield, 
  Trash2, 
  Edit, 
  Plus, 
  Eye,
  Clock,
  MapPin
} from "lucide-react";
import { AdminAction } from "./types";

interface AdminActivityLogProps {
  actions?: AdminAction[];
}

export function AdminActivityLog({ actions = [] }: AdminActivityLogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [resourceFilter, setResourceFilter] = useState<string>("all");
  const [adminActions, setAdminActions] = useState<AdminAction[]>([]);

  // Mock data for demonstration
  useEffect(() => {
    const mockActions: AdminAction[] = [
      {
        id: '1',
        adminId: 'admin-1',
        adminName: 'John Admin',
        action: 'delete',
        resource: 'user',
        resourceId: 'user-123',
        details: 'Deleted user account for policy violation',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        ipAddress: '192.168.1.100'
      },
      {
        id: '2',
        adminId: 'admin-1',
        adminName: 'John Admin',
        action: 'update',
        resource: 'material',
        resourceId: 'material-456',
        details: 'Approved material "Advanced Calculus Notes"',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        ipAddress: '192.168.1.100'
      },
      {
        id: '3',
        adminId: 'admin-2',
        adminName: 'Sarah Admin',
        action: 'permission_grant',
        resource: 'user',
        resourceId: 'user-789',
        details: 'Granted admin permissions to user "Mike Johnson"',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
        ipAddress: '10.0.0.50'
      },
      {
        id: '4',
        adminId: 'admin-1',
        adminName: 'John Admin',
        action: 'delete',
        resource: 'material',
        resourceId: 'material-789',
        details: 'Removed inappropriate material "Exam Answers 2024"',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
        ipAddress: '192.168.1.100'
      },
      {
        id: '5',
        adminId: 'admin-2',
        adminName: 'Sarah Admin',
        action: 'create',
        resource: 'user',
        resourceId: 'user-999',
        details: 'Created admin account for new staff member',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        ipAddress: '10.0.0.50'
      }
    ];
    
    setAdminActions([...mockActions, ...actions]);
  }, [actions]);

  const filteredActions = adminActions.filter(action => {
    const matchesSearch = action.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.resourceId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = actionFilter === "all" || action.action === actionFilter;
    const matchesResource = resourceFilter === "all" || action.resource === resourceFilter;
    
    return matchesSearch && matchesAction && matchesResource;
  });

  const getActionIcon = (action: AdminAction['action']) => {
    const icons = {
      create: Plus,
      update: Edit,
      delete: Trash2,
      permission_grant: Shield,
      permission_revoke: Shield
    };
    return icons[action] || Activity;
  };

  const getResourceIcon = (resource: AdminAction['resource']) => {
    const icons = {
      user: User,
      material: FileText,
      message: MessageSquare,
      permission: Shield
    };
    return icons[resource] || Activity;
  };

  const getActionColor = (action: AdminAction['action']) => {
    const colors = {
      create: 'text-green-600 bg-green-50 border-green-200',
      update: 'text-blue-600 bg-blue-50 border-blue-200',
      delete: 'text-red-600 bg-red-50 border-red-200',
      permission_grant: 'text-purple-600 bg-purple-50 border-purple-200',
      permission_revoke: 'text-orange-600 bg-orange-50 border-orange-200'
    };
    return colors[action] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Admin Activity Log
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Track all administrative actions and changes
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {filteredActions.length} activities
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search by admin name, action details, or resource ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="permission_grant">Grant Permission</SelectItem>
              <SelectItem value="permission_revoke">Revoke Permission</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={resourceFilter} onValueChange={setResourceFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by resource" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Resources</SelectItem>
              <SelectItem value="user">Users</SelectItem>
              <SelectItem value="material">Materials</SelectItem>
              <SelectItem value="message">Messages</SelectItem>
              <SelectItem value="permission">Permissions</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Activity Timeline */}
      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {filteredActions.length === 0 ? (
            <div className="text-center py-12">
              <Activity className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h4 className="text-lg font-semibold text-muted-foreground mb-2">No Activities Found</h4>
              <p className="text-muted-foreground">
                {adminActions.length === 0 
                  ? "No admin activities recorded yet." 
                  : "No activities match your current search criteria."
                }
              </p>
            </div>
          ) : (
            filteredActions.map((action, index) => {
              const ActionIcon = getActionIcon(action.action);
              const ResourceIcon = getResourceIcon(action.resource);
              const isLast = index === filteredActions.length - 1;
              
              return (
                <div key={action.id} className="relative">
                  {/* Timeline Line */}
                  {!isLast && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    {/* Action Icon */}
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center border-2 ${getActionColor(action.action)}`}>
                      <ActionIcon className="h-5 w-5" />
                    </div>
                    
                    {/* Action Details */}
                    <div className="flex-1 min-w-0">
                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="flex items-center gap-1">
                                <ResourceIcon className="h-3 w-3" />
                                {action.resource}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`${getActionColor(action.action)} border`}
                              >
                                {action.action.replace('_', ' ')}
                              </Badge>
                            </div>
                            
                            <p className="font-medium text-gray-900 mb-1">
                              {action.details}
                            </p>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{action.adminName}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{formatTimeAgo(action.timestamp)}</span>
                              </div>
                              {action.ipAddress && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{action.ipAddress}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="mt-2 text-xs text-muted-foreground">
                              Resource ID: <code className="bg-gray-100 px-1 rounded">{action.resourceId}</code>
                            </div>
                          </div>
                          
                          <div className="text-right text-xs text-muted-foreground">
                            {new Date(action.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}