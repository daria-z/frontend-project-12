import * as Yup from "yup";
import {
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} from "../../channelsApi";

export const modalConfig = {
  addChannel: {
    title: "Добавить канал",
    submitButtonText: "Отправить",
    cancelButtonText: "Отменить",
    submitVariant: "primary",
    hasForm: true,
    formFields: [
      {
        name: "name",
        type: "text",
        placeholder: "",
        validation: Yup.string()
          .required("Обязательное поле")
          .min(3, "Минимум 3 символа")
          .max(20, "Максимум 20 символов"),
      },
    ],
    mutationHook: useAddChannelMutation,
  },
  renameChannel: {
    title: "Переименовать канал",
    submitButtonText: "Изменить",
    cancelButtonText: "Отменить",
    submitVariant: "primary",
    hasForm: true,
    formFields: [
      {
        name: "name",
        type: "text",
        placeholder: "Введите новое имя канала",
        validation: Yup.string()
          .required("Обязательное поле")
          .min(3, "Минимум 3 символа")
          .max(20, "Максимум 20 символов"),
      },
    ],
    mutationHook: useEditChannelMutation,
  },
  deleteChannel: {
    title: "Удалить канал",
    submitButtonText: "Удалить",
    cancelButtonText: "Отменить",
    submitVariant: "danger",
    hasForm: false,
    mutationHook: useRemoveChannelMutation,
    condition: (channel) => channel?.removable ?? false, // Проверяем removable
  },
};
