import React, { useState } from 'react';
import { Plus, Target, Users, Calendar, Gift, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const challengeSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  challengeType: z.enum(['bottles_prevented', 'co2_saved', 'trade_value', 'points_earned']),
  targetValue: z.number().min(1, 'Target value must be positive'),
  duration: z.number().min(1).max(30, 'Duration must be between 1-30 days'),
  pointsReward: z.number().min(50, 'Minimum reward is 50 points'),
  participantLimit: z.number().min(2).max(100, 'Participant limit must be between 2-100'),
});

type ChallengeFormData = z.infer<typeof challengeSchema>;

export function ChallengeCreator() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<ChallengeFormData>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      duration: 7,
      pointsReward: 100,
      participantLimit: 20,
      targetValue: 100,
    },
  });

  const challengeType = watch('challengeType');

  const createChallengeMutation = useMutation({
    mutationFn: async (data: ChallengeFormData) => {
      return apiRequest('/api/social-challenges', 'POST', {
        ...data,
        creatorId: 'current-user-id', // This would come from auth context
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Challenge Created!",
        description: "Your eco-challenge is now live. Start sharing to get participants!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/social-challenges'] });
      setIsOpen(false);
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create challenge. Please try again.",
        variant: "destructive",
      });
    },
  });

  const challengeTypeOptions = [
    { value: 'bottles_prevented', label: 'Bottles Prevented', icon: '🌊', description: 'Save plastic bottles from the environment' },
    { value: 'co2_saved', label: 'CO2 Saved (kg)', icon: '🌱', description: 'Reduce carbon footprint' },
    { value: 'trade_value', label: 'Trade Value (AED)', icon: '💰', description: 'Total value of sustainable trades' },
    { value: 'points_earned', label: 'Points Earned', icon: '🏆', description: 'Sustainability impact points' },
  ];

  const getTargetSuggestion = (type: string) => {
    const suggestions = {
      bottles_prevented: [50, 100, 250, 500, 1000],
      co2_saved: [25, 50, 100, 200, 500],
      trade_value: [500, 1000, 2000, 5000, 10000],
      points_earned: [250, 500, 1000, 2500, 5000],
    };
    return suggestions[type as keyof typeof suggestions] || [100];
  };

  const onSubmit = (data: ChallengeFormData) => {
    createChallengeMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 hover:from-hero-green-600 hover:to-dubai-blue-600 text-white"
          data-testid="button-create-challenge"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Eco-Challenge
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-hero-green-500" />
            Create Social Eco-Challenge
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Challenge Title</Label>
            <Input
              id="title"
              placeholder="e.g., Save 500 Bottles in 7 Days"
              {...register('title')}
              data-testid="input-challenge-title"
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your challenge and what participants need to do..."
              rows={3}
              {...register('description')}
              data-testid="textarea-challenge-description"
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Challenge Type</Label>
            <Select onValueChange={(value) => setValue('challengeType', value as any)}>
              <SelectTrigger data-testid="select-challenge-type">
                <SelectValue placeholder="Select challenge type" />
              </SelectTrigger>
              <SelectContent>
                {challengeTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <span>{option.icon}</span>
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-gray-500">{option.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.challengeType && <p className="text-sm text-red-500">{errors.challengeType.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetValue">
                Target Value
                {challengeType && (
                  <span className="text-xs text-gray-500 ml-1">
                    ({challengeTypeOptions.find(t => t.value === challengeType)?.label})
                  </span>
                )}
              </Label>
              <Input
                id="targetValue"
                type="number"
                {...register('targetValue', { valueAsNumber: true })}
                data-testid="input-target-value"
              />
              {challengeType && (
                <div className="flex gap-1 flex-wrap">
                  {getTargetSuggestion(challengeType).map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setValue('targetValue', suggestion)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-2 py-1 rounded"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              {errors.targetValue && <p className="text-sm text-red-500">{errors.targetValue.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (days)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="30"
                {...register('duration', { valueAsNumber: true })}
                data-testid="input-duration"
              />
              {errors.duration && <p className="text-sm text-red-500">{errors.duration.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pointsReward">Points Reward</Label>
              <Input
                id="pointsReward"
                type="number"
                min="50"
                {...register('pointsReward', { valueAsNumber: true })}
                data-testid="input-points-reward"
              />
              {errors.pointsReward && <p className="text-sm text-red-500">{errors.pointsReward.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="participantLimit">Max Participants</Label>
              <Input
                id="participantLimit"
                type="number"
                min="2"
                max="100"
                {...register('participantLimit', { valueAsNumber: true })}
                data-testid="input-participant-limit"
              />
              {errors.participantLimit && <p className="text-sm text-red-500">{errors.participantLimit.message}</p>}
            </div>
          </div>

          <div className="bg-gradient-to-r from-hero-green-50 to-dubai-blue-50 dark:from-hero-green-900/20 dark:to-dubai-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Gift className="w-4 h-4 text-hero-green-500" />
              Challenge Benefits
            </h4>
            <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-300">
              <li>• Creator earns bonus points for each participant</li>
              <li>• Viral sharing multiplies your impact</li>
              <li>• Build your reputation as an eco-leader</li>
              <li>• Unlock exclusive challenge creator badges</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
              data-testid="button-cancel-challenge"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createChallengeMutation.isPending}
              className="flex-1 bg-gradient-to-r from-hero-green-500 to-dubai-blue-500 hover:from-hero-green-600 hover:to-dubai-blue-600 text-white"
              data-testid="button-submit-challenge"
            >
              {createChallengeMutation.isPending ? 'Creating...' : 'Create Challenge'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}