
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Database, 
  RefreshCw, 
  ServerOff, 
  Server, 
  Check, 
  X, 
  Download,
  Upload,
  Key,
  Shield
} from 'lucide-react';

interface DatabaseConfig {
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
  useSSL: boolean;
}

const DatabaseSettings: React.FC = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<DatabaseConfig>({
    host: '',
    port: '5432',
    username: '',
    password: '',
    database: '',
    useSSL: true
  });

  // Load saved config from localStorage on component mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('databaseConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
        
        // Check if we previously had a connected status
        const connectedStatus = localStorage.getItem('databaseConnected');
        if (connectedStatus === 'true') {
          setIsConnected(true);
        }
      } catch (e) {
        console.error('Failed to parse saved database config:', e);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      useSSL: checked
    }));
  };

  const saveConfig = () => {
    localStorage.setItem('databaseConfig', JSON.stringify(config));
    toast({
      title: "Configuration Saved",
      description: "Database configuration has been saved",
    });
  };

  const testConnection = () => {
    setIsLoading(true);
    
    toast({
      title: "Testing Connection",
      description: "Attempting to connect to the database...",
    });
    
    // Simulate connection test
    setTimeout(() => {
      setIsLoading(false);
      setIsConnected(true);
      localStorage.setItem('databaseConnected', 'true');
      
      toast({
        title: "Connection Successful",
        description: "Successfully connected to the database",
      });
    }, 2000);
  };

  const disconnectDatabase = () => {
    setIsConnected(false);
    localStorage.setItem('databaseConnected', 'false');
    
    toast({
      title: "Disconnected",
      description: "Database connection has been closed",
    });
  };

  const exportData = () => {
    toast({
      title: "Exporting Data",
      description: "Starting export process. This may take a few minutes...",
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Data has been exported successfully",
      });
    }, 3000);
  };

  const importData = () => {
    toast({
      title: "Importing Data",
      description: "Starting import process. This may take a few minutes...",
    });
    
    // Simulate import process
    setTimeout(() => {
      toast({
        title: "Import Complete",
        description: "Data has been imported successfully",
      });
    }, 3000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-indigo-600" />
          <div>
            <CardTitle>Database Connection</CardTitle>
            <CardDescription>
              Configure your database connection to store user data, analytics, and content
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
          {isConnected ? (
            <Button variant="outline" size="sm" onClick={disconnectDatabase}>
              <ServerOff className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={testConnection}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Test Connection
            </Button>
          )}
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="host">Host</Label>
            <Input 
              id="host" 
              name="host" 
              placeholder="localhost or IP address" 
              value={config.host}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="port">Port</Label>
            <Input 
              id="port" 
              name="port" 
              placeholder="5432" 
              value={config.port}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="database">Database Name</Label>
            <Input 
              id="database" 
              name="database" 
              placeholder="mydatabase" 
              value={config.database}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              name="username" 
              placeholder="Username" 
              value={config.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              value={config.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="use-ssl">Use SSL</Label>
              <div className="text-sm text-muted-foreground">
                Encrypt database connection
              </div>
            </div>
            <Switch 
              id="use-ssl" 
              checked={config.useSSL}
              onCheckedChange={handleSwitchChange}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={saveConfig}>Save Configuration</Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportData} disabled={!isConnected}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" onClick={importData} disabled={!isConnected}>
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DatabaseSettings;
