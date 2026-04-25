import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  Trash2, 
  Edit, 
  Eye, 
  Download, 
  Star, 
  Flag, 
  CheckCircle, 
  XCircle,
  Clock,
  AlertTriangle,
  ExternalLink,
  Calendar,
  User,
  BarChart3
} from "lucide-react";
import { Material } from "@/services/materialService";
import { toast } from "sonner";

interface MaterialsManagementProps {
  materials: Material[];
  onDeleteMaterial: (materialId: string) => void;
}

interface MaterialStatus {
  materialId: string;
  status: 'approved' | 'pending' | 'rejected' | 'flagged';
  reason?: string;
  reviewedBy: string;
  reviewedAt: string;
}

export function MaterialsManagement({ materials, onDeleteMaterial }: MaterialsManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [materialStatuses, setMaterialStatuses] = useState<Record<string, MaterialStatus>>({});

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.uploaderName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const materialStatus = materialStatuses[material.id]?.status || 'approved';
    const matchesStatus = statusFilter === "all" || materialStatus === statusFilter;
    
    const matchesDepartment = departmentFilter === "all" || material.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleStatusChange = (materialId: string, status: MaterialStatus['status'], reason?: string) => {
    const newStatus: MaterialStatus = {
      materialId,
      status,
      reason,
      reviewedBy: 'current-admin', // TODO: Get from auth context
      reviewedAt: new Date().toISOString()
    };
    
    setMaterialStatuses(prev => ({ ...prev, [materialId]: newStatus }));
    toast.success(`Material ${status} successfully`);
  };

  const getStatusBadge = (materialId: string) => {
    const status = materialStatuses[materialId]?.status || 'approved';
    const variants = {
      approved: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      pending: { variant: "secondary" as const, icon: Clock, color: "text-yellow-600" },
      rejected: { variant: "destructive" as const, icon: XCircle, color: "text-red-600" },
      flagged: { variant: "outline" as const, icon: Flag, color: "text-orange-600" }
    };
    
    const config = variants[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className={`h-3 w-3 ${config.color}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const departments = [...new Set(materials.map(m => m.department).filter(Boolean))];

  return (
    <Card className="p-6">
      {/* Header with Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search materials by title, course, or uploader..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Materials List */}
      <div className="space-y-4">
        {filteredMaterials.length === 0 ? (
          <Card className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Materials Found</h3>
            <p className="text-muted-foreground">
              {materials.length === 0 
                ? "No materials have been uploaded to the system yet." 
                : "No materials match your current search criteria."
              }
            </p>
          </Card>
        ) : (
          filteredMaterials.map((material) => (
            <Card key={material.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                {/* Material Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{material.title}</h3>
                        {getStatusBadge(material.id)}
                        {material.ratingAvg && material.ratingAvg > 4 && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            Top Rated
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{material.uploaderName || 'Unknown'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>{material.course}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(material.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          <span>{material.downloadCount || 0} downloads</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          {material.department}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          {material.year}
                        </span>
                        {material.ratingAvg && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{material.ratingAvg.toFixed(1)}</span>
                            <span className="text-muted-foreground">({material.ratingCount || 0})</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                  {/* View Details */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedMaterial(material)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Material Details - {material.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Title</label>
                            <p className="font-semibold">{material.title}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Course</label>
                            <p className="font-semibold">{material.course}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Department</label>
                            <p className="font-semibold">{material.department}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Year</label>
                            <p className="font-semibold">{material.year}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Uploader</label>
                            <p className="font-semibold">{material.uploaderName}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Upload Date</label>
                            <p className="font-semibold">{new Date(material.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>

                        {/* Description */}
                        {material.description && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Description</label>
                            <p className="mt-1 p-3 bg-gray-50 rounded-lg">{material.description}</p>
                          </div>
                        )}

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{material.downloadCount || 0}</div>
                            <div className="text-sm text-muted-foreground">Downloads</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">{material.ratingAvg?.toFixed(1) || '0.0'}</div>
                            <div className="text-sm text-muted-foreground">Rating</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{material.ratingCount || 0}</div>
                            <div className="text-sm text-muted-foreground">Reviews</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{material.fileSize ? `${(material.fileSize / 1024 / 1024).toFixed(1)}MB` : 'N/A'}</div>
                            <div className="text-sm text-muted-foreground">File Size</div>
                          </div>
                        </div>

                        {/* File Info */}
                        <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">File Name</label>
                            <p className="font-semibold">{material.fileName || 'Unknown'}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">File Type</label>
                            <p className="font-semibold">{material.fileType || 'Unknown'}</p>
                          </div>
                        </div>

                        {/* Status Management */}
                        <div className="space-y-4">
                          <h4 className="font-semibold">Content Moderation</h4>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleStatusChange(material.id, 'approved')}
                              className="text-green-600 border-green-200 hover:bg-green-50"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleStatusChange(material.id, 'pending', 'Under review')}
                              className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                            >
                              <Clock className="h-4 w-4 mr-1" />
                              Pending
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleStatusChange(material.id, 'flagged', 'Inappropriate content')}
                              className="text-orange-600 border-orange-200 hover:bg-orange-50"
                            >
                              <Flag className="h-4 w-4 mr-1" />
                              Flag
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleStatusChange(material.id, 'rejected', 'Policy violation')}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View File
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Analytics
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Quick Status Actions */}
                  <Select
                    value={materialStatuses[material.id]?.status || 'approved'}
                    onValueChange={(status: MaterialStatus['status']) => handleStatusChange(material.id, status)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Approved
                        </div>
                      </SelectItem>
                      <SelectItem value="pending">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-yellow-600" />
                          Pending
                        </div>
                      </SelectItem>
                      <SelectItem value="flagged">
                        <div className="flex items-center gap-2">
                          <Flag className="h-4 w-4 text-orange-600" />
                          Flagged
                        </div>
                      </SelectItem>
                      <SelectItem value="rejected">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          Rejected
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Delete Material */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Material</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to permanently delete "{material.title}"? 
                          This action cannot be undone and will remove:
                          <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>The material file and metadata</li>
                            <li>All ratings and reviews</li>
                            <li>Download statistics</li>
                            <li>Associated bookmarks</li>
                          </ul>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => onDeleteMaterial(material.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete Permanently
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </Card>
  );
}