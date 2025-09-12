
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock, Calendar as CalendarIcon, Clock, AlertCircle, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const UpcomingTests = () => {
  const currentDate = new Date();
  const [tests, setTests] = useState([
    {
      title: "Full Mock Test",
      date: new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      duration: "2 hours 45 minutes",
      isPriority: true
    },
    {
      title: "Reading Practice Test",
      date: new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      duration: "1 hour",
      isPriority: false
    },
    {
      title: "Writing Task 1 & 2",
      date: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      duration: "1 hour",
      isPriority: false
    }
  ]);

  // State for new test scheduling
  const [newTest, setNewTest] = useState({
    title: "IELTS Mock Test",
    date: new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now by default
    duration: "2 hours 45 minutes",
    isPriority: false,
    // Adding exam timer values
    examTimerDays: 22,
    examTimerMonths: 1,
    examTimerType: "preparation"
  });

  // Format date to display
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Add a new scheduled test
  const handleAddTest = () => {
    setTests([...tests, newTest]);
    // Reset form for next entry
    setNewTest({
      title: "IELTS Mock Test",
      date: new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000),
      duration: "2 hours 45 minutes",
      isPriority: false,
      examTimerDays: 22,
      examTimerMonths: 1,
      examTimerType: "preparation"
    });
  };

  return (
    <Card className="w-full shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <CalendarClock className="mr-2 h-5 w-5 text-indigo" />
          Upcoming Tests
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tests.map((test, index) => (
            <div key={index} className={`border ${test.isPriority ? 'border-coral' : 'border-muted'} rounded-lg p-4`}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium flex items-center">
                  {test.isPriority && <AlertCircle className="mr-1 h-4 w-4 text-coral" />}
                  {test.title}
                </h3>
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatDate(test.date)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {test.duration}
                </div>
              </div>
              <Button size="sm" variant={test.isPriority ? "default" : "outline"} className={`w-full ${test.isPriority ? 'bg-coral hover:bg-coral-600' : ''}`}>
                {test.isPriority ? 'Prepare Now' : 'View Details'}
              </Button>
            </div>
          ))}
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full mt-4 hover:text-indigo">
              <PlusCircle className="h-4 w-4 mr-2" /> Schedule New Test
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule Exam</DialogTitle>
              <DialogDescription>
                Select a date and time for your upcoming IELTS exam or practice test.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="test-title" className="text-right">
                  Test Title
                </Label>
                <select 
                  id="test-title"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  value={newTest.title}
                  onChange={(e) => setNewTest({...newTest, title: e.target.value})}
                >
                  <option value="IELTS Mock Test">IELTS Mock Test</option>
                  <option value="Listening Practice">Listening Practice</option>
                  <option value="Reading Practice">Reading Practice</option>
                  <option value="Writing Task 1 & 2">Writing Task 1 & 2</option>
                  <option value="Speaking Practice">Speaking Practice</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="test-date" className="text-right">
                  Date
                </Label>
                <div className="col-span-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="test-date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newTest.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newTest.date ? format(newTest.date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newTest.date}
                        onSelect={(date) => date && setNewTest({...newTest, date})}
                        initialFocus
                        className="p-3 pointer-events-auto"
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="test-duration" className="text-right">
                  Duration
                </Label>
                <select 
                  id="test-duration"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  value={newTest.duration}
                  onChange={(e) => setNewTest({...newTest, duration: e.target.value})}
                >
                  <option value="30 minutes">30 minutes</option>
                  <option value="1 hour">1 hour</option>
                  <option value="1 hour 30 minutes">1 hour 30 minutes</option>
                  <option value="2 hours">2 hours</option>
                  <option value="2 hours 45 minutes">2 hours 45 minutes (Full Test)</option>
                </select>
              </div>
              
              {/* Added days input for exam timer */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="exam-timer-days" className="text-right">
                  Days Until Exam
                </Label>
                <input
                  type="number"
                  id="exam-timer-days"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  value={newTest.examTimerDays}
                  onChange={(e) => setNewTest({...newTest, examTimerDays: parseInt(e.target.value)})}
                  min="1"
                  max="365"
                />
              </div>
              
              {/* Added months input for exam timer */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="exam-timer-months" className="text-right">
                  Months Until Exam
                </Label>
                <input
                  type="number"
                  id="exam-timer-months"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  value={newTest.examTimerMonths}
                  onChange={(e) => setNewTest({...newTest, examTimerMonths: parseInt(e.target.value)})}
                  min="0"
                  max="36"
                />
              </div>
              
              {/* Added exam type dropdown */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="exam-timer-type" className="text-right">
                  Exam Type
                </Label>
                <select 
                  id="exam-timer-type"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  value={newTest.examTimerType}
                  onChange={(e) => setNewTest({...newTest, examTimerType: e.target.value})}
                >
                  <option value="preparation">Preparation Period</option>
                  <option value="academic">Academic IELTS</option>
                  <option value="general">General Training IELTS</option>
                  <option value="speaking">Speaking Only</option>
                  <option value="writing">Writing Only</option>
                </select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="test-priority" className="text-right">
                  Priority
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <input
                    type="checkbox"
                    id="test-priority"
                    checked={newTest.isPriority}
                    onChange={(e) => setNewTest({...newTest, isPriority: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300 text-indigo focus:ring-indigo"
                  />
                  <label htmlFor="test-priority" className="text-sm text-gray-700">
                    Mark as priority
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddTest}>Schedule Test</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UpcomingTests;
