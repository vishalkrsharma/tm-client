import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { ScratchpadType } from '@/types';
import SidebarItem from '@/components/scratchpad/sidebar-item';
import { Separator } from '@/components/ui/separator';

const Sidebar = ({ scratchpads, getScratchPads }: { scratchpads: ScratchpadType[]; getScratchPads: () => Promise<void> }) => {
  const onOpen = useDialogStore((state) => state.onOpen);
  return (
    <div className='w-[500px] h-[calc(100vh-60px)] flex flex-col justify-start items-center p-2 border-r'>
      <Button
        className='w-full'
        onClick={() => onOpen('new-scratchpad', {}, getScratchPads)}
      >
        New task
        <Plus className='w-4 h-4 ml-2' />
      </Button>
      <Separator className='my-2' />
      <div className='space-y-2 w-full'>
        {scratchpads.length === 0 ? (
          <div className='text-center'>No scratchpads</div>
        ) : (
          scratchpads.map((scratchpad: ScratchpadType) => (
            <SidebarItem
              scratchpad={scratchpad}
              key={scratchpad._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
