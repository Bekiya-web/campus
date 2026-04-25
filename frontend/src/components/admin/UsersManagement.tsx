import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  Crown, 
  Trash2, 
  Shield, 
  Ban, 
  CheckCircle, 
  Clock, 
  Eye,
  Settings,
  Activity,
  Upload,
  MessageCircle,
  Star,
} from "lucide-react";
import { UserProfile } from "@/services/authService";
import { toast } from "sonner";

interface UsersManagementProps {
  users: UserProfile[];
  onRoleChange: (userId: string, newRole: 'student' | 'admin') => void;
  onRestrictionChange: (userId: string, restrictions: Partial<UserProfile>) => void;
  onDeleteUser: (userId: string) => void;
}

export function UsersManagement({ users, onRoleChange, onRestrictionChange, onDeleteUser }: UsersManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getStatusBadge = (user: UserProfile) => {
    if (user.isBanned) return <Badge variant="destructive"><Ban className="h-3 w-3 mr-1" /> Banned</Badge>;
    return <Badge variant="default" className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" /> Active</Badge>;
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="student">Students</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.uid} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    {user.role === 'admin' && <Badge className="bg-amber-500"><Crown className="h-3 w-3 mr-1" /> Admin</Badge>}
                    {getStatusBadge(user)}
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Restriction Settings */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Settings className="h-4 w-4" />
                      Restrict Actions
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Permissions for {user.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="flex items-center gap-2"><Upload className="h-4 w-4" /> Upload Materials</Label>
                          <p className="text-xs text-muted-foreground">Allow user to upload new study materials</p>
                        </div>
                        <Switch 
                          checked={user.canUpload !== false} 
                          onCheckedChange={(checked) => onRestrictionChange(user.uid, { canUpload: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> Chat Access</Label>
                          <p className="text-xs text-muted-foreground">Allow user to send messages in course chats</p>
                        </div>
                        <Switch 
                          checked={user.canChat !== false} 
                          onCheckedChange={(checked) => onRestrictionChange(user.uid, { canChat: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="flex items-center gap-2"><Star className="h-4 w-4" /> Rate & Review</Label>
                          <p className="text-xs text-muted-foreground">Allow user to rate materials and earn points</p>
                        </div>
                        <Switch 
                          checked={user.canRate !== false} 
                          onCheckedChange={(checked) => onRestrictionChange(user.uid, { canRate: checked })}
                        />
                      </div>
                      <div className="pt-4 border-t border-red-100">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5 text-red-600">
                            <Label className="flex items-center gap-2 font-bold"><Ban className="h-4 w-4" /> Ban Account</Label>
                            <p className="text-xs">Prevent user from logging in completely</p>
                          </div>
                          <Switch 
                            checked={user.isBanned === true} 
                            onCheckedChange={(checked) => onRestrictionChange(user.uid, { isBanned: checked })}
                          />
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Select
                  value={user.role}
                  onValueChange={(val: any) => onRoleChange(user.uid, val)}
                >
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="text-red-500 border-red-100">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete User?</AlertDialogTitle>
                      <AlertDialogDescription>This will permanently remove {user.name} and all their data.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDeleteUser(user.uid)} className="bg-red-600">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}