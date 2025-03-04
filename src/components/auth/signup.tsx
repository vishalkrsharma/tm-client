import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import axios from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/hooks/use-auth-store';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  username: z.string().min(4, {
    message: 'Username is required.',
  }),
  password: z.string().min(4, {
    message: 'Password is required.',
  }),
});

const Signup = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await axios.post('/api/auth/signup', values, { withCredentials: true });
      const { user } = data;
      setUser(user.username, user._id);
      toast({
        description: data.message,
        duration: 2000,
      });
      navigate('/dashboard');
    } catch (error: any) {
      const { data } = error.response;
      toast({
        description: data.error,
        duration: 2000,
        variant: 'destructive',
      });
    } finally {
      form.reset();
    }
  };

  return (
    <div>
      <h1 className='text-xl mb-4 font-bold'>Sign up</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold'>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter username...'
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold'>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter password...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='font-bold'
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
