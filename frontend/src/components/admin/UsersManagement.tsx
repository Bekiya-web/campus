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
  MessageSquare,
  Download,
  GraduationCap,
  MapPin,
  Calendar,
  Award,
  Mail,
  Building,
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
                {/* View User Details */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        {user.name}'s Profile
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      {/* Basic Information */}
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">Basic Information</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Full Name</Label>
                            <p className="font-medium">{user.name || 'N/A'}</p>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" /> Email
                            </Label>
                            <p className="font-medium text-sm">{user.email || 'N/A'}</p>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground flex items-center gap-1">
                              <Building className="h-3 w-3" /> University
                            </Label>
                            <p className="font-medium">{user.universityName || 'N/A'}</p>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground flex items-center gap-1">
                              <GraduationCap className="h-3 w-3" /> Department
                            </Label>
                            <p className="font-medium">{user.department || 'N/A'}</p>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> Year
                            </Label>
                            <p className="font-medium">{user.year || 'N/A'}</p>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground flex items-center gap-1">
                              <Shield className="h-3 w-3" /> Role
                            </Label>
                            <div className="flex items-center gap-2">
                              <p className="font-medium capitalize">{user.role || 'student'}</p>
                              {user.role === 'admin' && <Badge className="bg-amber-500"><Crown className="h-3 w-3 mr-1" /> Admin</Badge>}
                            </div>
                          </div>
                        </div>
                        {user.bio && (
                          <div className="mt-4 space-y-1">
                            <Label className="text-xs text-muted-foreground">Bio</Label>
                            <p className="text-sm italic text-muted-foreground">"{user.bio}"</p>
                          </div>
                        )}
                      </div>

                      {/* Account Statistics */}
                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">Account Statistics</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <Award className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                            <p className="text-2xl font-bold text-blue-600">{user.points || 0}</p>
                            <p className="text-xs text-muted-foreground">Points</p>
                          </div>
                          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <Star className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                            <p className="text-2xl font-bold text-purple-600">{user.bookmarks?.length || 0}</p>
                            <p className="text-xs text-muted-foreground">Bookmarks</p>
                          </div>
                          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <Activity className="h-5 w-5 text-green-600 mx-auto mb-1" />
                            <p className="text-2xl font-bold text-green-600">{user.badges?.length || 0}</p>
                            <p className="text-xs text-muted-foreground">Badges</p>
                          </div>
                          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <Clock className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                            <p className="text-xs font-semibold text-orange-600">
                              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                            </p>
                            <p className="text-xs text-muted-foreground">Joined</p>
                          </div>
                        </div>
                      </div>

                      {/* Badges */}
                      {user.badges && user.badges.length > 0 && (
                        <div className="border-t pt-4">
                          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">Badges Earned</h4>
                          <div className="flex flex-wrap gap-2">
                            {user.badges.map((badge, index) => (
                              <Badge key={index} variant="secondary" className="gap-1">
                                <Award className="h-3 w-3" />
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Permissions Status */}
                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">Permissions Status</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-sm flex items-center gap-2">
                              <Upload className="h-4 w-4" /> Upload
                            </span>
                            {user.canUpload !== false ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Ban className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-sm flex items-center gap-2">
                              <MessageCircle className="h-4 w-4" /> Chat
                            </span>
                            {user.canChat !== false ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Ban className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-sm flex items-center gap-2">
                              <Star className="h-4 w-4" /> Rate
                            </span>
                            {user.canRate !== false ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Ban className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-sm flex items-center gap-2">
                              <MessageSquare className="h-4 w-4" /> Comment
                            </span>
                            {user.canComment !== false ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Ban className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-sm flex items-center gap-2">
                              <Download className="h-4 w-4" /> Download
                            </span>
                            {user.canDownload !== false ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Ban className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-sm flex items-center gap-2 font-semibold">
                              <Ban className="h-4 w-4" /> Account
                            </span>
                            {user.isBanned ? (
                              <Badge variant="destructive" className="text-xs">Banned</Badge>
                            ) : (
                              <Badge variant="default" className="bg-green-500 text-xs">Active</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* User Preferences */}
                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">User Preferences</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-sm">Dark Mode</span>
                            {user.dark_mode ? (
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                            ) : (
                              <span className="text-xs text-muted-foreground">Off</span>
                            )}
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-sm">Email Notifications</span>
                            {user.email_notifications !== false ? (
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                            ) : (
                              <span className="text-xs text-muted-foreground">Off</span>
                            )}
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-sm">Push Notifications</span>
                            {user.push_notifications !== false ? (
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                            ) : (
                              <span className="text-xs text-muted-foreground">Off</span>
                            )}
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-sm">Public Profile</span>
                            {user.public_profile !== false ? (
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                            ) : (
                              <span className="text-xs text-muted-foreground">Private</span>
                            )}
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-sm">Show Email</span>
                            {user.show_email ? (
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                            ) : (
                              <span className="text-xs text-muted-foreground">Hidden</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* User ID */}
                      <div className="border-t pt-4">
                        <Label className="text-xs text-muted-foreground">User ID</Label>
                        <p className="text-xs font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1 break-all">{user.uid}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

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
                          <Label className="flex items-center gap-2"><Star className="h-4 w-4" /> Rate & Bookmark</Label>
                          <p className="text-xs text-muted-foreground">Allow user to rate and bookmark materials</p>
                        </div>
                        <Switch 
                          checked={user.canRate !== false} 
                          onCheckedChange={(checked) => onRestrictionChange(user.uid, { canRate: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Discussion Comments</Label>
                          <p className="text-xs text-muted-foreground">Allow user to comment on discussions</p>
                        </div>
                        <Switch 
                          checked={user.canComment !== false} 
                          onCheckedChange={(checked) => onRestrictionChange(user.uid, { canComment: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="flex items-center gap-2"><Download className="h-4 w-4" /> Download Materials</Label>
                          <p className="text-xs text-muted-foreground">Allow user to download study materials</p>
                        </div>
                        <Switch 
                          checked={user.canDownload !== false} 
                          onCheckedChange={(checked) => onRestrictionChange(user.uid, { canDownload: checked })}
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
                  onValueChange={(val: 'student' | 'admin') => onRoleChange(user.uid, val)}
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