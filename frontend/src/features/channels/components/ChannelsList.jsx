import { useGetChannelsQuery } from '../channelsApi';
import ChannelItem from './ChannelItem';
import ModalComponent from './Modals/ModalComponent';
import { useState } from 'react';

const ChannelsList = () => {
  const [modalType, setModalType] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const handleOpenModal = (type, channel) => {
    setModalType(type);
    setSelectedChannel(channel);
  };
  const { data: channels, isLoading, error } = useGetChannelsQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  if (!channels || channels.length === 0) {
    return <div>Каналы отсутствуют</div>;
  }

  return (
    <div>
      <h2>Каналы</h2>
      <div><button
        className="btn btn-primary"
        onClick={() => handleOpenModal('addChannel', null)}
      >
        Добавить канал
      </button></div>
      {modalType && (
        <ModalComponent
          type={modalType}
          isOpen={!!modalType}
          channel={selectedChannel}
          onClose={() => {
            setModalType(null);
            setSelectedChannel(null);
          }}
        />
      )}
      <div className="channels_list">
        <ul>
          {channels.map((channel) => (
            <ChannelItem key={channel.id} channel={channel} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChannelsList;
