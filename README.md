# English-for-kids
Приложение для изучения английского языка для детей в игровой форме.

Подробное описание приложение можно посмотреть [здесь](https://github.com/Rasskris/English-for-kids-FE/pull/21)

<img width="600" alt="category-page" src="https://user-images.githubusercontent.com/62946911/147360159-d665773a-ff9a-44d9-b43a-9c5246d2b940.gif">

**Главная страница приложения**

<img width="600" alt="main-page" src="https://user-images.githubusercontent.com/62946911/147362981-4bf98763-d883-4b53-9587-10bb5d8e1f16.png">

**Страница выбранной категории**

- Режим тренировки
<img width="600" alt="Train mode" src="https://user-images.githubusercontent.com/62946911/147363087-f00ed1ff-6487-4a8a-99a6-40933faf8db8.png">

- Режим игры
- [x] - при нажатии на кнопку `старт` звучит слово на английском языке 
- [x] - eсли пользователь угадал слово, то появляется радостный смайл и соответствующий звук
- [x] - если допущена ошибка, то появляется грустный смайл и соответствующий звук
<img width="600" alt="Game mode" src="https://user-images.githubusercontent.com/62946911/147578329-a35d6079-bbdd-43ff-9826-8e46a055636e.png">

- Не допущено ошибок
<img width="600" alt="Won game" src="https://user-images.githubusercontent.com/62946911/147578319-d1743e34-b335-468a-b827-955ff029b4c2.png">

- Допущены ошибки
<img width="600" alt="Failed game" src="https://user-images.githubusercontent.com/62946911/147578332-8a5d2b22-3492-48a1-9735-76410245bd94.png">

**После регистрации и аутентификации доступна страница статистики**
- [x] - страница со статистикой содержит следующие столбцы:
 - категорию;
 - слово из этой категории;
 - перевод слова;
 - сколько раз по карточки с данным словом кликали в режиме тренировки;
 - сколько раз данное слово угадывали в режиме игры;
 - сколько ошибок при этом допустили
- [x]  -   есть возможность сортировки данных по алфавиту, для числовых значений - по их величине. Сортировка может происходить в прямом и обратном порядке и должна охватывать весь диапазон данных
- [x]  -   на странице со статистикой размещены кнопки "Repeat difficult words" и "Reset". Кнопка "Reset" обнуляет статистику. При клике по кнопке "Repeat difficult words" открывается страница изучения слов с наибольшим процентом ошибок аналогичная странице категории.

<img width="600" alt="admin-categories" src="https://user-images.githubusercontent.com/62946911/147363851-770140e4-e4fb-4a56-8f4f-bc475690b01d.gif">
<img width="600" alt="admin-categories" src="https://user-images.githubusercontent.com/62946911/147361034-cd35b947-d998-4cea-8f53-2fd1f78877c3.gif">

**Страница админа: категории**

Доступно редактирование существующих категорий, а так же добавление новой
<img width="600" alt="admin-categories" src="https://user-images.githubusercontent.com/62946911/147362747-dc75e4d8-9042-408f-8a99-d2f61e0d4b31.png">

**Страница админа: слова:**

Доступно редактирование, удаление и добавление слов выбранной категории
<img width="600" alt="admin-categories" src="https://user-images.githubusercontent.com/62946911/147358526-5e403a9e-fb89-475d-8c10-59f4501c2660.gif">
