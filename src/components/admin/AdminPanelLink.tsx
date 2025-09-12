
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

// Configure your Laravel admin URL here
const LARAVEL_ADMIN_URL = "http://localhost:8000/admin";

interface AdminPanelLinkProps {
  className?: string;
}

const AdminPanelLink: React.FC<AdminPanelLinkProps> = ({ className }) => {
  return (
    <a href={LARAVEL_ADMIN_URL} className={className}>
      <Button variant="outline" className="flex items-center gap-2">
        <Settings className="h-4 w-4" />
        Admin Panel
      </Button>
    </a>
  );
};

export default AdminPanelLink;
