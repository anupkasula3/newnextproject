
export type AdminRole = 
  | 'super_admin'
  | 'admin'
  | 'manager'
  | 'teacher'
  | 'instructor'
  | 'marketing'
  | 'student';

export interface AdminRolePermission {
  id: string;
  name: string;
  description: string;
}

export interface AdminRoleDefinition {
  id: AdminRole;
  name: string;
  description: string;
  permissions: string[];
  color: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: 'active' | 'inactive';
  lastLogin?: string;
  joinDate: string;
  country?: string;
}

export const adminRoleDefinitions: Record<AdminRole, AdminRoleDefinition> = {
  super_admin: {
    id: 'super_admin',
    name: 'Super Admin',
    description: 'Full access to all system features including user management and system settings',
    permissions: ['all'],
    color: 'red'
  },
  admin: {
    id: 'admin',
    name: 'Admin',
    description: 'Manages all educational content and most system settings',
    permissions: ['manage_content', 'manage_users', 'view_analytics', 'access_settings'],
    color: 'orange'
  },
  manager: {
    id: 'manager',
    name: 'Manager',
    description: 'Oversees instructors and teachers, manages course assignments',
    permissions: ['manage_instructors', 'assign_courses', 'view_analytics'],
    color: 'amber'
  },
  teacher: {
    id: 'teacher',
    name: 'Teacher',
    description: 'Creates educational content and grades student work',
    permissions: ['create_content', 'grade_work', 'message_students'],
    color: 'blue'
  },
  instructor: {
    id: 'instructor',
    name: 'Instructor',
    description: 'Evaluates speaking and writing tests',
    permissions: ['evaluate_speaking', 'evaluate_writing', 'message_students'],
    color: 'green'
  },
  marketing: {
    id: 'marketing',
    name: 'Marketing',
    description: 'Manages marketing campaigns, blog posts, and promotional content',
    permissions: ['manage_blog', 'manage_promotions', 'view_analytics'],
    color: 'purple'
  },
  student: {
    id: 'student',
    name: 'Student',
    description: 'Access to learning materials and can take tests',
    permissions: ['access_content', 'take_tests', 'view_progress'],
    color: 'slate'
  }
};

export const adminPermissions: AdminRolePermission[] = [
  { id: 'all', name: 'All Permissions', description: 'Full access to all system features' },
  { id: 'manage_content', name: 'Manage Content', description: 'Create and edit educational content' },
  { id: 'manage_users', name: 'Manage Users', description: 'View and modify user accounts' },
  { id: 'view_analytics', name: 'View Analytics', description: 'Access to system analytics and reports' },
  { id: 'access_settings', name: 'Access Settings', description: 'Modify system settings' },
  { id: 'manage_instructors', name: 'Manage Instructors', description: 'Assign and oversee instructors' },
  { id: 'assign_courses', name: 'Assign Courses', description: 'Assign courses to students and instructors' },
  { id: 'create_content', name: 'Create Content', description: 'Create educational content' },
  { id: 'grade_work', name: 'Grade Work', description: 'Grade student submissions' },
  { id: 'message_students', name: 'Message Students', description: 'Send messages to students' },
  { id: 'evaluate_speaking', name: 'Evaluate Speaking', description: 'Review and grade speaking tests' },
  { id: 'evaluate_writing', name: 'Evaluate Writing', description: 'Review and grade writing tests' },
  { id: 'manage_blog', name: 'Manage Blog', description: 'Create and edit blog posts' },
  { id: 'manage_promotions', name: 'Manage Promotions', description: 'Create and manage promotional content' },
  { id: 'access_content', name: 'Access Content', description: 'Access learning materials and resources' },
  { id: 'take_tests', name: 'Take Tests', description: 'Participate in tests and assessments' },
  { id: 'view_progress', name: 'View Progress', description: 'View personal learning progress' }
];
