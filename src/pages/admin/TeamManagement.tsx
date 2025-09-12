import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';

const TeamManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'super_admin',
      avatar: '/api/placeholder/40/40',
      department: 'Administration',
      joinDate: '2023-01-15',
      phone: '+1 (555) 123-4567',
      status: 'active',
      lastActive: '2024-01-08'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@example.com',
      role: 'admin',
      avatar: '/api/placeholder/40/40',
      department: 'Content',
      joinDate: '2023-03-20',
      phone: '+1 (555) 234-5678',
      status: 'active',
      lastActive: '2024-01-07'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily@example.com',
      role: 'teacher',
      avatar: '/api/placeholder/40/40',
      department: 'IELTS Department',
      joinDate: '2023-06-10',
      phone: '+1 (555) 345-6789',
      status: 'active',
      lastActive: '2024-01-08'
    },
    {
      id: 4,
      name: 'David Rodriguez',
      email: 'david@example.com',
      role: 'instructor',
      avatar: '/api/placeholder/40/40',
      department: 'Speaking Department',
      joinDate: '2023-08-05',
      phone: '+1 (555) 456-7890',
      status: 'inactive',
      lastActive: '2024-01-03'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      email: 'lisa@example.com',
      role: 'marketing',
      avatar: '/api/placeholder/40/40',
      department: 'Marketing',
      joinDate: '2023-09-12',
      phone: '+1 (555) 567-8901',
      status: 'active',
      lastActive: '2024-01-08'
    }
  ];

  const roles = [
    { value: 'super_admin', label: 'Super Admin', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' },
    { value: 'admin', label: 'Admin', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' },
    { value: 'manager', label: 'Manager', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
    { value: 'teacher', label: 'Teacher', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
    { value: 'instructor', label: 'Instructor', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' },
    { value: 'marketing', label: 'Marketing', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400' }
  ];

  const getRoleColor = (role: string) => {
    return roles.find(r => r.value === role)?.color || 'bg-gray-100 text-gray-800';
  };

  const getRoleLabel = (role: string) => {
    return roles.find(r => r.value === role)?.label || role;
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { title: 'Total Members', value: teamMembers.length, icon: Users },
    { title: 'Active Members', value: teamMembers.filter(m => m.status === 'active').length, icon: Users },
    { title: 'Departments', value: [...new Set(teamMembers.map(m => m.department))].length, icon: Users },
    { title: 'Admin Roles', value: teamMembers.filter(m => ['super_admin', 'admin'].includes(m.role)).length, icon: Users }
  ];

  return (
    <AdminLayout>
      <div className="container p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Team Management
            </h1>
            <p className="text-muted-foreground">Manage team members, roles, and permissions</p>
          </div>
          <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
                <DialogDescription>
                  Add a new team member to your organization.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">Role</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">Department</Label>
                  <Input id="department" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Member</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <stat.icon className="h-8 w-8 text-indigo-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Members</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4">
              {filteredMembers.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">{member.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {member.email}
                            </span>
                            <span className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {member.phone}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Joined {new Date(member.joinDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge className={getRoleColor(member.role)}>
                            {getRoleLabel(member.role)}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">{member.department}</p>
                          <p className="text-xs text-muted-foreground">
                            Last active: {new Date(member.lastActive).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                          {member.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <div className="grid gap-4">
              {filteredMembers.filter(m => m.status === 'active').map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getRoleColor(member.role)}>
                          {getRoleLabel(member.role)}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inactive" className="space-y-6">
            <div className="grid gap-4">
              {filteredMembers.filter(m => m.status === 'inactive').map((member) => (
                <Card key={member.id} className="opacity-75">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Inactive</Badge>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <div className="grid gap-4">
              {roles.map((role) => (
                <Card key={role.value}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{role.label}</span>
                      <Badge className={role.color}>
                        {teamMembers.filter(m => m.role === role.value).length} members
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Manage permissions and access levels for {role.label.toLowerCase()} role.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {teamMembers.filter(m => m.role === role.value).map((member) => (
                        <div key={member.id} className="flex items-center space-x-2 bg-muted rounded-lg p-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{member.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default TeamManagement;