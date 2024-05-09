import { useState } from 'react';
import { useCookies } from 'react-cookie';

import { useAuthStore } from '@/hooks/useAuthStore';
import Avatar from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ChangeUsername from '@/components/ChangeUsername';
import ChangePassword from '@/components/ChangePassword';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Profile = () => {
  const username = useAuthStore((state) => state.username);
  const [openLogout, setIsOpenLogout] = useState(false);
  const [openProfile, setIsOpenProfile] = useState(false);
  const [openChangeUsername, setIsOpenChangeUsername] = useState(false);
  const [openChangePassword, setIsOpenChangePassword] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const { toast } = useToast();
  const [_cookies, _setCookie, removeCookie] = useCookies(['token']);

  const logout = () => {
    setUser(null, null);
    removeCookie('token');
    toast({
      description: 'User logged out',
      duration: 3000,
    });
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='font-mono'
        >
          <DropdownMenuLabel>{username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsOpenProfile(true)}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpenLogout(true)}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog
        open={openLogout}
        onOpenChange={setIsOpenLogout}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action will log you out from this session.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={logout}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog
        open={openProfile}
        onOpenChange={setIsOpenProfile}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
            <DialogDescription>
              Manage your user profile with options to view info, change username/password, customize profile, and delete account.
            </DialogDescription>
          </DialogHeader>
          <div className='flex flex-col items-center gap-4 my-4'>
            <Avatar />
            <div className='font-bold text-xl'>{username}</div>
          </div>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              Change Username
              <Button onClick={() => setIsOpenChangeUsername(true)}>Change</Button>
              <ChangeUsername
                open={openChangeUsername}
                setIsOpen={setIsOpenChangeUsername}
              />
            </div>
            <div className='flex justify-between items-center'>
              Change Password
              <Button onClick={() => setIsOpenChangePassword(true)}>Change</Button>
              <ChangePassword
                open={openChangePassword}
                setIsOpen={setIsOpenChangePassword}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
