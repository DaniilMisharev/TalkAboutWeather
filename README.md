# Let's talk about weather
**Let's talk about weather** -  это веб-сайт, где люди могут узнать актуальную погоду в любом городе и поговорить об этом в чате.

### Стек технологий используемых в проекте
* Node.js
* Express
* Express-sessions
* Handlebars
* OpenWeather API
* Web Sockets

### Установка и запуск проекта
1. Перейти в корневой каталог проекта (Let's talk about weather) 
2. В командной строке выполнить (однократно для установки): **npm install**
3. Запуск проекта: **npm run dev**
4. Создать файл .env и запонить его данными по образцу .env.expample

### Пара слов о проекте
Вас встречает главная страница приложения "Поговорим о погоде", в верхней панели имеется две вкладки, "Войти" и "Зарегистрироваться". После успешной аутентификации, создается сессия (а также cookies) и сохраняется до момента выхода пользователя из системы "Выйти". Сессия хранится в MongoStore.   
**Функция поиска города** используется для поиска интересующего вас города и погоды в нем, данные полученные с OpenWeather API подгружаются на экран по запросу.
**Функция чата** используется для общения в реальном времени между пользователями, функция реализованна по протоколу WebSocket.

### Главная страница
![MainPage](https://github.com/DaniilMisharev/TalkAboutWeather/blob/main/public/images/MainPage.png "Главная страница")
### Страница входа
![LoginPage](https://github.com/DaniilMisharev/TalkAboutWeather/blob/main/public/images/Login.png "Страница входа")
### Страница регистрации
![RegistrationPage](https://github.com/DaniilMisharev/TalkAboutWeather/blob/main/public/images/Registartion.png "Страница регистрации")
### Страница поиска города и чата
![ApiPage](https://github.com/DaniilMisharev/TalkAboutWeather/blob/main/public/images/ApiPage1.png "Страница поиска города и чата")
### Страница поиска города и чата (продолжение)
![ApiPage](https://github.com/DaniilMisharev/TalkAboutWeather/blob/main/public/images/ApiPage2.png "Страница поиска города и чата")
