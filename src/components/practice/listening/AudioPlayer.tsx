
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Pause, Play, SkipBack, Volume2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
  showTranscript?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  audioUrl, 
  title,
  onPlayStateChange,
  showTranscript = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
          console.error("Audio play failed:", e);
          toast({
            title: "Audio Error",
            description: "Failed to play audio. Please try again.",
            variant: "destructive"
          });
        });
      }
      setIsPlaying(!isPlaying);
      if (onPlayStateChange) onPlayStateChange(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setProgress(0);
      if (!isPlaying) {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
        if (onPlayStateChange) onPlayStateChange(true);
      }
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Update progress bar as audio plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      const value = (audio.currentTime / audio.duration) * 100;
      setProgress(value || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onPlayStateChange) onPlayStateChange(false);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [onPlayStateChange]);

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={togglePlayPause}
                className="h-10 w-10 rounded-full"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={resetAudio}
                className="h-10 w-10 rounded-full"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {title}
                </span>
                <span className="text-xs text-gray-500">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4 text-gray-500" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20"
              />
            </div>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <audio 
            ref={audioRef} 
            src={audioUrl}
            className="hidden"
          />
          
          {showTranscript && (
            <div className="mt-4 p-3 bg-muted rounded-md text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium mb-1">IELTS Tip:</p>
              <p>Listen carefully for signpost words like "however", "in addition", and "nevertheless" as they often indicate important information is coming next.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;
