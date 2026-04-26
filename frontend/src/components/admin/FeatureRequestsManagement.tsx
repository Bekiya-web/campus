import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TrendingUp } from "lucide-react";
import { FeatureRequest } from "@/types/admin";

interface FeatureRequestsManagementProps {
  featureRequests: FeatureRequest[];
  onStatusChange: (requestId: string, status: FeatureRequest['status']) => void;
}

export function FeatureRequestsManagement({ featureRequests, onStatusChange }: FeatureRequestsManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredRequests = featureRequests.filter(request => {
    const matchesSearch = request.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search feature requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="implemented">Implemented</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card className="p-8 text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Feature Requests Found</h3>
            <p className="text-muted-foreground">
              {featureRequests.length === 0 
                ? "No feature requests have been submitted yet." 
                : "No requests match your current search criteria."
              }
            </p>
          </Card>
        ) : (
          filteredRequests.map((request) => (
            <Card key={request.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold">{request.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{request.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Requested by {request.userName} for "{request.materialTitle}"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Badge 
                    variant={
                      request.status === 'approved' ? 'default' :
                      request.status === 'rejected' ? 'destructive' :
                      request.status === 'implemented' ? 'secondary' : 'outline'
                    }
                  >
                    {request.status}
                  </Badge>
                  <Badge variant="outline" className={
                    request.priority === 'high' ? 'border-red-500 text-red-500' :
                    request.priority === 'medium' ? 'border-yellow-500 text-yellow-500' :
                    'border-green-500 text-green-500'
                  }>
                    {request.priority}
                  </Badge>
                  <Select
                    value={request.status}
                    onValueChange={(status: FeatureRequest['status']) => 
                      onStatusChange(request.id, status)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="implemented">Implemented</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </Card>
  );
}