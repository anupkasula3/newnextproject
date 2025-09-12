
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Search, Mail, Ban, Shield, Filter, User, Flag, Clock, Check, UserCheck, AlertCircle, UserPlus, Download, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { AdminRole, adminRoleDefinitions, adminPermissions } from '@/types/adminRoles';

const UsersCMS = () => {
  const { toast } = useToast();
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showNewUserDialog, setShowNewUserDialog] = useState(false);
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<AdminRole>("student");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'student' as AdminRole,
    status: 'active',
    country: ''
  });

  // Sample user data for demonstration
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@neplia.com', role: 'student' as AdminRole, status: 'active', joinDate: '2023-01-15', country: 'United States', lastLogin: '2023-06-20 14:32' },
    { id: 2, name: 'Jane Smith', email: 'jane@neplia.com', role: 'teacher' as AdminRole, status: 'active', joinDate: '2023-02-20', country: 'Canada', lastLogin: '2023-06-19 09:45' },
    { id: 3, name: 'Bob Johnson', email: 'bob@neplia.com', role: 'student' as AdminRole, status: 'inactive', joinDate: '2023-03-10', country: 'United Kingdom', lastLogin: '2023-05-30 16:21' },
    { id: 4, name: 'Alice Williams', email: 'alice@neplia.com', role: 'admin' as AdminRole, status: 'active', joinDate: '2022-12-05', country: 'Australia', lastLogin: '2023-06-21 08:15' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@neplia.com', role: 'student' as AdminRole, status: 'active', joinDate: '2023-04-22', country: 'Germany', lastLogin: '2023-06-18 11:05' },
    { id: 6, name: 'Maria Garcia', email: 'maria@neplia.com', role: 'instructor' as AdminRole, status: 'active', joinDate: '2023-01-10', country: 'Spain', lastLogin: '2023-06-22 10:15' },
    { id: 7, name: 'David Lee', email: 'david@neplia.com', role: 'marketing' as AdminRole, status: 'active', joinDate: '2023-03-05', country: 'South Korea', lastLogin: '2023-06-21 16:45' },
    { id: 8, name: 'Sarah Johnson', email: 'sarah@neplia.com', role: 'manager' as AdminRole, status: 'active', joinDate: '2023-02-15', country: 'France', lastLogin: '2023-06-20 11:30' },
    { id: 9, name: 'Michael Brown', email: 'michael@neplia.com', role: 'super_admin' as AdminRole, status: 'active', joinDate: '2022-11-01', country: 'United States', lastLogin: '2023-06-22 09:10' }
  ]);

  // Handler for opening role management dialog
  const handleManageRoles = (user: any) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setShowRoleDialog(true);
  };

  // Handler for opening permissions dialog
  const handleManagePermissions = (user: any) => {
    setSelectedUser(user);
    // Get permissions for the current role
    const rolePermissions = adminRoleDefinitions[user.role as AdminRole]?.permissions || [];
    setSelectedPermissions(rolePermissions);
    setShowPermissionsDialog(true);
  };

  // Handler for role selection
  const handleRoleSelect = (roleId: AdminRole) => {
    setSelectedRole(roleId);
  };

  // Handler for permission selection
  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions(current => {
      if (current.includes(permissionId)) {
        return current.filter(id => id !== permissionId);
      } else {
        return [...current, permissionId];
      }
    });
  };

  // Handler for confirm role change
  const handleConfirmRoleChange = () => {
    setShowRoleDialog(false);
    setShowConfirmDialog(true);
  };

  // Handler for saving role changes
  const handleSaveRoles = () => {
    setUsers(users.map(user => {
      if (user.id === selectedUser.id) {
        return { ...user, role: selectedRole };
      }
      return user;
    }));
    
    toast({
      title: "Role Updated",
      description: `${selectedUser.name}'s role has been updated to ${adminRoleDefinitions[selectedRole].name}.`,
    });
    
    setShowConfirmDialog(false);
  };

  // Handler for saving permissions
  const handleSavePermissions = () => {
    toast({
      title: "Permissions Updated",
      description: `Custom permissions for ${selectedUser.name} have been updated.`,
    });
    
    setShowPermissionsDialog(false);
  };

  // Handler for adding new user
  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      ...newUserData,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never'
    };
    
    setUsers([...users, newUser]);
    
    toast({
      title: "User Added",
      description: `${newUserData.name} has been successfully added as ${adminRoleDefinitions[newUserData.role as AdminRole].name}.`,
    });
    
    setNewUserData({
      name: '',
      email: '',
      role: 'student' as AdminRole,
      status: 'active',
      country: ''
    });
    
    setShowNewUserDialog(false);
  };

  // Handler for toggling user status
  const handleToggleStatus = (user: any) => {
    setUsers(users.map(u => {
      if (u.id === user.id) {
        const newStatus = u.status === 'active' ? 'inactive' : 'active';
        return { ...u, status: newStatus };
      }
      return u;
    }));
    
    toast({
      title: user.status === 'active' ? "User Deactivated" : "User Activated",
      description: `${user.name} has been ${user.status === 'active' ? 'deactivated' : 'activated'}.`,
    });
  };

  // Bulk role management
  const handleBulkRoleManagement = () => {
    toast({
      title: "Bulk Role Management",
      description: "Select users and assign roles in bulk. Coming soon!",
    });
  };

  // Export users
  const handleExportUsers = () => {
    toast({
      title: "Export Users",
      description: "User data has been exported to CSV.",
    });
  };

  // Import users
  const handleImportUsers = () => {
    toast({
      title: "Import Users",
      description: "Upload a CSV file to import users.",
    });
  };

  // Filter users based on selected filters and search term
  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRole && matchesStatus && matchesSearch;
  });

  const getRoleBadgeVariant = (role: AdminRole) => {
    const roleMap: Record<string, any> = {
      super_admin: 'destructive',
      admin: 'destructive',
      manager: 'warning',
      teacher: 'secondary',
      instructor: 'default',
      marketing: 'purple',
      student: 'outline'
    };
    
    return roleMap[role] || 'default';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Users</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2" onClick={handleExportUsers}>
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleImportUsers}>
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button className="flex items-center gap-2" onClick={() => setShowNewUserDialog(true)}>
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
            <Button 
              className="flex items-center gap-2" 
              onClick={handleBulkRoleManagement}
            >
              <Shield className="h-4 w-4" />
              Manage Roles
            </Button>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search users..." 
              className="h-9 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 items-center w-full md:w-auto">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="instructor">Instructor</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Users Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    No users found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {adminRoleDefinitions[user.role]?.name || user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div 
                          className={`h-2 w-2 rounded-full ${
                            user.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                          } mr-2`}
                        ></div>
                        {user.status}
                      </div>
                    </TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Flag className="h-3 w-3 text-muted-foreground" />
                      {user.country}
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {user.lastLogin}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => {
                        toast({
                          title: "Email Sent",
                          description: `Email has been sent to ${user.name}.`,
                        });
                      }}>
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(user)}>
                        <Ban className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleManageRoles(user)}>
                        <Shield className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Role Management Dialog */}
      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage User Role</DialogTitle>
            <DialogDescription>
              {selectedUser ? `Update role for ${selectedUser.name}` : 'Update user role'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <RadioGroup value={selectedRole} onValueChange={handleRoleSelect} className="space-y-4">
              {Object.values(adminRoleDefinitions).map(role => (
                <div key={role.id} className="flex items-start space-x-3 border p-3 rounded-md hover:bg-slate-50 cursor-pointer">
                  <RadioGroupItem value={role.id} id={`role-${role.id}`} className="mt-1" />
                  <div className="space-y-1">
                    <label
                      htmlFor={`role-${role.id}`}
                      className="text-sm font-medium leading-none block cursor-pointer"
                    >
                      {role.name}
                    </label>
                    <p className="text-xs text-muted-foreground">{role.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRoleDialog(false)}>Cancel</Button>
            <Button onClick={handleConfirmRoleChange} className="gap-2">
              <Check className="h-4 w-4" />
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Permissions Dialog */}
      <Dialog open={showPermissionsDialog} onOpenChange={setShowPermissionsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage User Permissions</DialogTitle>
            <DialogDescription>
              {selectedUser ? `Customize permissions for ${selectedUser.name}` : 'Customize user permissions'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4 p-3 bg-amber-50 rounded-md text-amber-800 text-sm">
              <p>These permissions override the default role permissions. Use with caution.</p>
            </div>
            <div className="space-y-4">
              {adminPermissions.map(permission => (
                <div key={permission.id} className="flex items-start space-x-3 border p-3 rounded-md">
                  <Checkbox
                    id={`permission-${permission.id}`}
                    checked={selectedPermissions.includes(permission.id)}
                    onCheckedChange={() => handlePermissionToggle(permission.id)}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <label
                      htmlFor={`permission-${permission.id}`}
                      className="text-sm font-medium leading-none block cursor-pointer"
                    >
                      {permission.name}
                    </label>
                    <p className="text-xs text-muted-foreground">{permission.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPermissionsDialog(false)}>Cancel</Button>
            <Button onClick={handleSavePermissions} className="gap-2">
              <Check className="h-4 w-4" />
              Save Permissions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New User Dialog */}
      <Dialog open={showNewUserDialog} onOpenChange={setShowNewUserDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input
                  id="name"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium">Country</label>
                <Input
                  id="country"
                  value={newUserData.country}
                  onChange={(e) => setNewUserData({...newUserData, country: e.target.value})}
                  placeholder="United States"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select 
                  value={newUserData.role} 
                  onValueChange={(value) => setNewUserData({...newUserData, role: value as AdminRole})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(adminRoleDefinitions).map(role => (
                      <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                    ))}
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select 
                  value={newUserData.status} 
                  onValueChange={(value) => setNewUserData({...newUserData, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewUserDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleAddUser} 
              className="gap-2"
              disabled={!newUserData.name || !newUserData.email}
            >
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Role Change</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedUser && selectedRole && (
                <>
                  You are about to change <strong>{selectedUser.name}</strong>'s role from <Badge className="ml-1 mr-1">{adminRoleDefinitions[selectedUser.role]?.name || selectedUser.role}</Badge>
                  to <Badge className="ml-1 mr-1">{adminRoleDefinitions[selectedRole]?.name}</Badge>
                  <div className="flex items-center gap-2 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                    <p className="text-sm text-amber-700">This action will update user permissions immediately.</p>
                  </div>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSaveRoles} className="gap-2 bg-blue-600">
              <UserCheck className="h-4 w-4" />
              Confirm Change
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default UsersCMS;
