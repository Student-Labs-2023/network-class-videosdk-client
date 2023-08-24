# Этот микрофронтенд отвечает за работу с видео

# Для запуска потребуется 
git clone https://github.com/Student-Labs-2023/network-class-videosdk-client

cd network-class-videosdk-client

npm install --force

npm run start

# Примечание
при запуске проект автоматически открывается в браузере, закройте эту вкладку,
если вы еще не запустили основное приложение, интструкция,
https://github.com/Student-Labs-2023/network-class-frontend/tree/main

build для тестирования не потребуется

# Инструкция для build 
в app.js path='/' 
в .env REACT_APP_NETWORKCLASS_URL = "https://network-class.pages.dev/"
npm run build
в build/index.html 
путь до стилей "./static/css/main.5d0d4cea.css"
путь до js "./static/js/main.76bcabdf.js"
