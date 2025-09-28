import { useState } from "react";

const CreateChannelButton = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState();

  return (
    <div>
      <Button onClick={() => setIsCreateModalOpen(true)}>Создать канал</Button>
      <CreateChannelModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  )
};

export default CreateChannelButton;
