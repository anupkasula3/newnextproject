
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, FileText, Video, Music, Image } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ResourcesSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const isMobile = useIsMobile();

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // In a real app, this would call an API endpoint
  };

  return (
    <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6 z-10">
      <div className="flex flex-col space-y-4">
        <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-center mb-2`}>Find the Perfect Learning Resource</h2>
        
        <div className="relative max-w-3xl mx-auto w-full">
          <Input
            type="text"
            placeholder="Search for resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-12 pr-4 ${isMobile ? 'py-4 text-base' : 'py-6 text-lg'} rounded-lg`}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={isMobile ? 16 : 20} />
          <Button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-md" 
            size="sm"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>

        <Tabs defaultValue="all" className="max-w-3xl mx-auto w-full">
          <TabsList className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-5'} gap-2 md:gap-4`}>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-1 md:gap-2">
              <FileText size={isMobile ? 14 : 16} /> {!isMobile && "Documents"}
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-1 md:gap-2">
              <Video size={isMobile ? 14 : 16} /> {!isMobile && "Videos"}
            </TabsTrigger>
            {!isMobile && (
              <>
                <TabsTrigger value="audio" className="flex items-center gap-2">
                  <Music size={16} /> Audio
                </TabsTrigger>
                <TabsTrigger value="images" className="flex items-center gap-2">
                  <Image size={16} /> Images
                </TabsTrigger>
              </>
            )}
          </TabsList>
          
          {isMobile && (
            <TabsList className="mt-2 grid grid-cols-2 gap-2">
              <TabsTrigger value="audio" className="flex items-center gap-1">
                <Music size={14} /> Audio
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center gap-1">
                <Image size={14} /> Images
              </TabsTrigger>
            </TabsList>
          )}
          
          <TabsContent value="all" className="mt-4">
            <p className="text-center text-gray-600 text-sm md:text-base">All resources will appear here based on your search.</p>
          </TabsContent>
          <TabsContent value="documents" className="mt-4">
            <p className="text-center text-gray-600 text-sm md:text-base">Document resources will appear here based on your search.</p>
          </TabsContent>
          <TabsContent value="videos" className="mt-4">
            <p className="text-center text-gray-600 text-sm md:text-base">Video resources will appear here based on your search.</p>
          </TabsContent>
          <TabsContent value="audio" className="mt-4">
            <p className="text-center text-gray-600 text-sm md:text-base">Audio resources will appear here based on your search.</p>
          </TabsContent>
          <TabsContent value="images" className="mt-4">
            <p className="text-center text-gray-600 text-sm md:text-base">Image resources will appear here based on your search.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResourcesSearch;
