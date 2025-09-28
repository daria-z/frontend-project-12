import { useState } from 'react';
import RenameChannelModal from "./Modals/RenameChannelModal"


const ChannelItem = ({ channel }) => {
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  return (
    <li>
      <span>{channel.name}</span>
      <button onClick={() => setIsRenameOpen(true)}>Переименовать</button>
      <RenameChannelModal channel={channel} isOpen={isRenameOpen} onClose={() => setIsRenameOpen(false)} />
    </li>
  );
};

export default ChannelItem;
