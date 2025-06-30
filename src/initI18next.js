import i18next from 'i18next';

const resources = {
  ru: {
    translation: {
      title: 'RSS агрегатор',
      subtitle: 'Начните читать RSS сегодня! Это легко, это красиво.',
      add: 'Добавить',
      inputPlaceholder: 'Ссылка RSS',
      errors: {
        url: 'Ссылка должна быть валидным URL',
        required: 'Поле обязательно для заполнения',
        duplicate: 'RSS уже существует',
        invalidRss: 'Ресурс не содержит валидный RSS',
        network: 'Ошибка сети',
      },
      messages: {
        success: 'RSS успешно загружен',
      },
    },
  },
};

i18next.init({
  lng: 'ru',
  debug: true,
  resources,
});

export default i18next;
