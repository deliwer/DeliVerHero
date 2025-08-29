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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { User } from '@shared/schema';
import { 
  User as UserIcon, 
  Edit, 
  Save, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Settings, 
  Shield,
  CreditCard,
  History,
  MessageCircle,
  Clock,
  HelpCircle
} from 'lucide-react';
import { ContactForm } from "@/components/contact-form";

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

export default function AccountConsolidated() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

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
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your account...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12" data-testid="account-consolidated-page">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">My Account</h1>
          <p className="text-xl text-gray-400">
            Manage your profile, settings, and DeliWer account preferences
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              Support
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <UserIcon className="w-6 h-6" />
                    Profile Information
                  </CardTitle>
                  {!isEditing && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                      className="border-slate-600 text-white hover:bg-slate-700"
                      data-testid="button-edit-profile"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white">First Name</Label>
                      <Input
                        id="firstName"
                        {...form.register('firstName')}
                        disabled={!isEditing}
                        className="bg-slate-700 border-slate-600 text-white disabled:opacity-60"
                        data-testid="input-first-name"
                      />
                      {form.formState.errors.firstName && (
                        <p className="text-red-400 text-sm mt-1">{form.formState.errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white">Last Name</Label>
                      <Input
                        id="lastName"
                        {...form.register('lastName')}
                        disabled={!isEditing}
                        className="bg-slate-700 border-slate-600 text-white disabled:opacity-60"
                        data-testid="input-last-name"
                      />
                      {form.formState.errors.lastName && (
                        <p className="text-red-400 text-sm mt-1">{form.formState.errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="username" className="text-white">Username</Label>
                    <Input
                      id="username"
                      {...form.register('username')}
                      disabled={!isEditing}
                      className="bg-slate-700 border-slate-600 text-white disabled:opacity-60"
                      data-testid="input-username"
                    />
                    {form.formState.errors.username && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.username.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register('email')}
                      disabled={!isEditing}
                      className="bg-slate-700 border-slate-600 text-white disabled:opacity-60"
                      data-testid="input-email"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...form.register('phone')}
                      disabled={!isEditing}
                      className="bg-slate-700 border-slate-600 text-white disabled:opacity-60"
                      data-testid="input-phone"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-white">Address</Label>
                    <Textarea
                      id="address"
                      {...form.register('address')}
                      disabled={!isEditing}
                      className="bg-slate-700 border-slate-600 text-white disabled:opacity-60"
                      data-testid="textarea-address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-white">City</Label>
                    <Input
                      id="city"
                      {...form.register('city')}
                      disabled={!isEditing}
                      className="bg-slate-700 border-slate-600 text-white disabled:opacity-60"
                      data-testid="input-city"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-emerald-600 hover:bg-emerald-700"
                        data-testid="button-save-profile"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isPending ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button
                        type="button"
                        onClick={handleCancel}
                        variant="outline"
                        className="border-slate-600 text-white hover:bg-slate-700"
                        data-testid="button-cancel-edit"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                      Change Password
                    </Button>
                    <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CreditCard className="w-6 h-6" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">Manage your payment methods for trade-ins and purchases</p>
                  <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <History className="w-6 h-6" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <History className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Orders Yet</h3>
                  <p className="text-gray-400 mb-4">
                    Your trade-in and purchase history will appear here
                  </p>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Start Your First Trade-in
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-emerald-400" />
                      Contact Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-emerald-400 mt-0.5" />
                        <div>
                          <p className="text-white font-medium">Email</p>
                          <a href="mailto:support@deliwer.com" className="text-gray-400 hover:text-emerald-400">
                            support@deliwer.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-emerald-400 mt-0.5" />
                        <div>
                          <p className="text-white font-medium">Phone</p>
                          <a href="tel:+971-4-123-4567" className="text-gray-400 hover:text-emerald-400">
                            +971 4 123 4567
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-emerald-400 mt-0.5" />
                        <div>
                          <p className="text-white font-medium">Address</p>
                          <p className="text-gray-400">
                            Business Bay<br />
                            Dubai, UAE
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-emerald-400 mt-0.5" />
                        <div>
                          <p className="text-white font-medium">Business Hours</p>
                          <p className="text-gray-400">
                            Sunday - Thursday: 9:00 AM - 6:00 PM<br />
                            Friday - Saturday: 10:00 AM - 4:00 PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}