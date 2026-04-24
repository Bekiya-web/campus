import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { FileText, Trash2 } from "lucide-react";
import { Material } from "@/services/materialService";

interface MaterialsManagementProps {
  materials: Material[];
  onDeleteMaterial: (materialId: string) => void;
}

export function MaterialsManagement({ materials, onDeleteMaterial }: MaterialsManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMaterials = materials.filter(material => 
    material.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.course?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Materials Management</h2>
        <Input
          placeholder="Search materials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
      </div>

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
            {materials.length === 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                Materials will appear here once users start uploading content.
              </p>
            )}
          </Card>
        ) : (
          filteredMaterials.map((material) => (
            <Card key={material.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{material.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {material.course} • {material.department} • {material.year}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Uploaded by {material.uploaderName || 'Unknown'} • {material.downloadCount || 0} downloads
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {material.ratingAvg?.toFixed(1) || '0.0'} ★
                  </Badge>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Material</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{material.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDeleteMaterial(material.id)}>
                          Delete
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