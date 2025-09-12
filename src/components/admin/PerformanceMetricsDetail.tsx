
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Globe, Users, Clock, Activity, Calendar, Search, Download, RefreshCw } from 'lucide-react';

// Mock data for visualization purposes - in a real application, this would come from the database
const mockVisitorsData = [
  { id: 1, ip: '203.142.89.75', country: 'India', timestamp: '2023-07-12T10:34:21', browser: 'Chrome', device: 'Desktop', page: '/exams/ielts' },
  { id: 2, ip: '85.92.134.56', country: 'Germany', timestamp: '2023-07-12T11:15:42', browser: 'Firefox', device: 'Mobile', page: '/practice/writing' },
  { id: 3, ip: '172.58.63.12', country: 'United States', timestamp: '2023-07-12T12:03:15', browser: 'Safari', device: 'Tablet', page: '/' },
  { id: 4, ip: '115.27.93.45', country: 'China', timestamp: '2023-07-12T13:22:08', browser: 'Edge', device: 'Desktop', page: '/resources' },
  { id: 5, ip: '194.152.42.31', country: 'France', timestamp: '2023-07-12T14:45:36', browser: 'Chrome', device: 'Mobile', page: '/blog' },
  { id: 6, ip: '41.193.85.74', country: 'Nigeria', timestamp: '2023-07-12T15:12:51', browser: 'Opera', device: 'Desktop', page: '/exams/toefl' },
  { id: 7, ip: '189.123.45.67', country: 'Brazil', timestamp: '2023-07-12T16:30:29', browser: 'Chrome', device: 'Mobile', page: '/signup' },
  { id: 8, ip: '103.84.36.91', country: 'Australia', timestamp: '2023-07-12T17:18:47', browser: 'Safari', device: 'Desktop', page: '/practice/listening' },
];

const mockCountriesData = [
  { id: 1, country: 'India', visitors: 523, topPage: '/exams/ielts', avgSessionDuration: '5:12' },
  { id: 2, country: 'United States', visitors: 487, topPage: '/', avgSessionDuration: '3:45' },
  { id: 3, country: 'United Kingdom', visitors: 342, topPage: '/exams/ielts', avgSessionDuration: '4:23' },
  { id: 4, country: 'Canada', visitors: 289, topPage: '/practice/writing', avgSessionDuration: '6:18' },
  { id: 5, country: 'Australia', visitors: 267, topPage: '/resources', avgSessionDuration: '3:52' },
  { id: 6, country: 'Germany', visitors: 231, topPage: '/blog', avgSessionDuration: '2:41' },
  { id: 7, country: 'France', visitors: 198, topPage: '/practice/speaking', avgSessionDuration: '5:07' },
  { id: 8, country: 'Japan', visitors: 176, topPage: '/exams/toefl', avgSessionDuration: '4:32' },
];

const mockSessionsData = [
  { id: 1, userId: 'user_45891', duration: '12:34', pagesViewed: 8, deviceType: 'Desktop', startTime: '2023-07-12T10:15:21', country: 'India' },
  { id: 2, userId: 'user_23451', duration: '05:21', pagesViewed: 3, deviceType: 'Mobile', startTime: '2023-07-12T11:23:45', country: 'United States' },
  { id: 3, userId: 'user_78932', duration: '08:45', pagesViewed: 5, deviceType: 'Tablet', startTime: '2023-07-12T12:56:12', country: 'Germany' },
  { id: 4, userId: 'user_12784', duration: '03:12', pagesViewed: 2, deviceType: 'Mobile', startTime: '2023-07-12T13:34:56', country: 'Australia' },
  { id: 5, userId: 'user_56743', duration: '15:23', pagesViewed: 11, deviceType: 'Desktop', startTime: '2023-07-12T14:45:23', country: 'Canada' },
  { id: 6, userId: 'user_98432', duration: '07:56', pagesViewed: 6, deviceType: 'Desktop', startTime: '2023-07-12T15:12:45', country: 'Japan' },
  { id: 7, userId: 'user_34521', duration: '04:32', pagesViewed: 4, deviceType: 'Mobile', startTime: '2023-07-12T16:23:56', country: 'France' },
  { id: 8, userId: 'user_67453', duration: '09:12', pagesViewed: 7, deviceType: 'Tablet', startTime: '2023-07-12T17:34:12', country: 'United Kingdom' },
];

type DataType = 'visitors' | 'countries' | 'sessions';

interface MetricProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  description: string;
  icon: React.ReactNode;
}

// Function to get user's country from IP (mock implementation)
const getCountryFromIP = async (ip: string): Promise<string> => {
  // In a real application, this would make an API call to a geolocation service
  // For demo purposes, we'll return the country from our mock data
  const visitor = mockVisitorsData.find(v => v.ip === ip);
  if (visitor) {
    return visitor.country;
  }
  return 'Unknown';
};

const PerformanceMetricsDetail: React.FC = () => {
  const [dataType, setDataType] = useState<DataType>('visitors');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState('last7days');
  const { toast } = useToast();

  // Function to get the appropriate data based on the selected type
  const getData = () => {
    switch (dataType) {
      case 'visitors':
        return mockVisitorsData.filter(
          visitor => 
            visitor.ip.includes(searchTerm) || 
            visitor.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            visitor.browser.toLowerCase().includes(searchTerm.toLowerCase()) ||
            visitor.page.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 'countries':
        return mockCountriesData.filter(
          country => 
            country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            country.topPage.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 'sessions':
        return mockSessionsData.filter(
          session => 
            session.userId.includes(searchTerm) || 
            session.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            session.country.toLowerCase().includes(searchTerm.toLowerCase())
        );
      default:
        return [];
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    
    toast({
      title: "Refreshing data",
      description: "Please wait while we fetch the latest metrics",
    });
    
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data refreshed",
        description: "Performance metrics have been updated",
      });
    }, 1500);
  };

  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: `The ${dataType} data has been exported to CSV`,
    });
  };

  const renderTable = () => {
    const data = getData();
    
    switch (dataType) {
      case 'visitors':
        return (
          <Table>
            <TableCaption>A list of all visitors to the site</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>IP Address</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Browser</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Page</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((visitor: any) => (
                <TableRow key={visitor.id}>
                  <TableCell>{visitor.ip}</TableCell>
                  <TableCell>{visitor.country}</TableCell>
                  <TableCell>{new Date(visitor.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{visitor.browser}</TableCell>
                  <TableCell>{visitor.device}</TableCell>
                  <TableCell>{visitor.page}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'countries':
        return (
          <Table>
            <TableCaption>Visitors by country</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead>Visitors</TableHead>
                <TableHead>Top Page</TableHead>
                <TableHead>Avg. Session Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((country: any) => (
                <TableRow key={country.id}>
                  <TableCell>{country.country}</TableCell>
                  <TableCell>{country.visitors}</TableCell>
                  <TableCell>{country.topPage}</TableCell>
                  <TableCell>{country.avgSessionDuration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'sessions':
        return (
          <Table>
            <TableCaption>User sessions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Pages Viewed</TableHead>
                <TableHead>Device Type</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Country</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((session: any) => (
                <TableRow key={session.id}>
                  <TableCell>{session.userId}</TableCell>
                  <TableCell>{session.duration}</TableCell>
                  <TableCell>{session.pagesViewed}</TableCell>
                  <TableCell>{session.deviceType}</TableCell>
                  <TableCell>{new Date(session.startTime).toLocaleString()}</TableCell>
                  <TableCell>{session.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      default:
        return null;
    }
  };

  // Get the icon based on data type
  const getIcon = () => {
    switch (dataType) {
      case 'visitors':
        return <Users className="h-6 w-6 text-indigo-500" />;
      case 'countries':
        return <Globe className="h-6 w-6 text-green-500" />;
      case 'sessions':
        return <Clock className="h-6 w-6 text-amber-500" />;
      default:
        return <Activity className="h-6 w-6 text-blue-500" />;
    }
  };

  // Get the title based on data type
  const getTitle = () => {
    switch (dataType) {
      case 'visitors':
        return 'Visitor Details';
      case 'countries':
        return 'Countries Overview';
      case 'sessions':
        return 'Session Information';
      default:
        return 'Performance Metrics';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getIcon()}
            <div>
              <CardTitle>{getTitle()}</CardTitle>
              <CardDescription>
                Detailed view of {dataType} metrics
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Select value={dataType} onValueChange={(value: string) => setDataType(value as DataType)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select data type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visitors">Visitors</SelectItem>
                <SelectItem value="countries">Countries</SelectItem>
                <SelectItem value="sessions">Sessions</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7days">Last 7 days</SelectItem>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="thisMonth">This month</SelectItem>
                <SelectItem value="lastMonth">Last month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative w-[300px]">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={`Search ${dataType}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="rounded-md border">
          {renderTable()}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetricsDetail;
