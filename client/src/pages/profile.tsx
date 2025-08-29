import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { User } from '@shared/schema';
import { User as UserIcon, Edit, Save, X, Mail, Phone, MapPin } from 'lucide-react';

const updateUserSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address').optional(),
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
});

type UpdateUserForm = z.infer<typeof updateUserSchema>;

export default function ProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['/api/user/profile'],
  });

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (data: UpdateUserForm) => {
      return await apiRequest('/api/user/profile', 'PUT', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/profile'] });
      setIsEditing(false);
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const form = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      city: 'Dubai',
    },
  });

  // Update form values when user data loads
  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username || '',
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || 'Dubai',
      });
    }
  }, [user, form]);

  const onSubmit = (data: UpdateUserForm) => {
    updateProfile(data);
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">My Profile</h1>
          <p className="text-gray-300">Manage your account information and preferences</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/95 backdrop-blur-sm border-slate-600/70">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserIcon className="w-10 h-10 text-emerald-500" />
              </div>
              <CardTitle className="text-white">
                {user?.firstName && user?.lastName 
                  ? `${user.firstName} ${user.lastName}`
                  : user?.username || 'DeliWer User'
                }
              </CardTitle>
              <p className="text-gray-400">{user?.email || 'No email set'}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">{user?.phone || 'No phone set'}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{user?.city || 'Dubai'}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}</span>
              </div>
            </CardContent>
          </Card>

          {/* Profile Edit Form */}
          <Card className="md:col-span-2 bg-gradient-to-br from-slate-800/90 to-slate-900/95 backdrop-blur-sm border-slate-600/70">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Account Details</CardTitle>
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                  className="border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10"
                  data-testid="button-edit-profile"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    size="sm"
                    className="border-gray-500/50 text-gray-400 hover:bg-gray-500/10"
                    data-testid="button-cancel-edit"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Username</Label>
                    <Input
                      {...form.register('username')}
                      disabled={!isEditing}
                      className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-60"
                      data-testid="input-username"
                    />
                    {form.formState.errors.username && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.username.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-gray-300">Email</Label>
                    <Input
                      {...form.register('email')}
                      disabled={!isEditing}
                      type="email"
                      placeholder="your@email.com"
                      className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-60"
                      data-testid="input-email"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">First Name</Label>
                    <Input
                      {...form.register('firstName')}
                      disabled={!isEditing}
                      placeholder="First name"
                      className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-60"
                      data-testid="input-first-name"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-gray-300">Last Name</Label>
                    <Input
                      {...form.register('lastName')}
                      disabled={!isEditing}
                      placeholder="Last name"
                      className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-60"
                      data-testid="input-last-name"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Phone</Label>
                    <Input
                      {...form.register('phone')}
                      disabled={!isEditing}
                      placeholder="+971 50 123 4567"
                      className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-60"
                      data-testid="input-phone"
                    />
                    {form.formState.errors.phone && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-gray-300">City</Label>
                    <Input
                      {...form.register('city')}
                      disabled={!isEditing}
                      placeholder="Dubai"
                      className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-60"
                      data-testid="input-city"
                    />
                    {form.formState.errors.city && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.city.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Address</Label>
                  <Textarea
                    {...form.register('address')}
                    disabled={!isEditing}
                    placeholder="Enter your full address"
                    className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-60 resize-none"
                    rows={3}
                    data-testid="textarea-address"
                  />
                  {form.formState.errors.address && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.address.message}</p>
                  )}
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      data-testid="button-save-profile"
                    >
                      {isPending ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                          Saving...
                        </div>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}