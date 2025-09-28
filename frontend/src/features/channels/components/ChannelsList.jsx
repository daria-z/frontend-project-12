import { useGetChannelsQuery } from '../channelsApi';
import ChannelItem from './ChannelItem';

const ChannelsList = () => {
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
