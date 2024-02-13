# 1. Первая часть проекта
# 1.1 Установка пакетов
+ React
+ Redux
+ Styled-components
+ Router-dom
# 1.2. Верстка
+ Верстка глаавной страницы
+ Разбить на компонент главную страницу
+ Настройка простого роутинга с помощью Router-dom
+ Верстка страницы авторизации
+ Верстка страницы регистрации
+ Верстка страницы профиля
- Верстка страниц продукта:
- ГЛАВНАЯ -> Страница продукта (смотрим чужие товары)
- ПРОФИЛЬ -> Страница продукта (смотрим свои товары, которые выставили на продажу)
- Верстка страницы продавца
- Пробросить майл и пароль в local storage и проверять наличие юзера в local storage
- Отображение кнопок в верхней панели в зависимости от наличия юзера в local storage
- Верстка модальных окон
# 1.3. Внедрение бекенда
- Установить Docker
- Запустить Docker с помощью ярлыка
- Скачать архив и разархивировать его
- Запустить в терминале команду: docker-compose -f docker-compose-backend.yaml up -d
- После этого бэкенд и Swagger будут доступны по адресу http://localhost:8090/
- Чтобы остановить работу бэкенда выполните:docker-compose down
----------------------
# 2. Вторая часть проекта
# 2.1 Реализация поведения незарегистрированного пользователя
- Добавить возможность поиска товаров по ключевым словам
- Просмотр обьявлений
- Просмотр профиля продавца
- Незарегистрированный пользователь не может оставлять комментарии
- Может получать номер телефона продавца
# 2.2 Реализация функционала регистрации и аутентификации пользователя
- Возможность регистрировать нового пользователя
- Возможность аутентификации пользователя
----------------------
# 3. Третья часть проекта
# 3.1 Реализация поведения зарегистрированного пользователя
- Возможность смены имени, фамилии, города, телефона, аватарки
- Добавление обьявления
- У пользователя должна быть возможность снять объявление с публикации
- Редактирование объявления
- Добавление отзывов о товаре
----------------------
# 4. Четвертая часть проекта
# 4.1 Проверка работы функционала приложения. Доработки
- Составить примерный текст защиты
- Оформить проект на GitHub


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
