import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ChannelActionsToast from '../components/ChannelActionsToast';

const ChannelItem = ({ channel }) => {

  const [showToast, setShowToast] = useState(false);



  return (
    <li>
      <div key={channel.id} className="mb-2">
        <span>{channel.name}</span>
        {channel.removable &&
          <>
          <Button onClick={() => setShowToast(true)}>toast button</Button>
          <ChannelActionsToast
            channel={channel}
            show={showToast}
            onClose={() => setShowToast(false)}
          />
          </>
        }
      </div>
    </li>
  );
};

export default ChannelItem;
