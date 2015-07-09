enb-bembundle [![Build Status](https://travis-ci.org/enb-make/enb-bembundle.png?branch=master)](https://travis-ci.org/enb-make/enb-bembundle)
==========

Предоставляет технологии для сборки `bembundle`-модулей.

css-chunks
----------

Из *css*-файлов по deps'ам, собирает `css-chunks.js`-файл, обрабатывая инклуды, ссылки.
`css-chunks.js`-файлы нужны для создания bembundle-файлов или bembundle-страниц.

Технология bembundle активно используется в bem-tools для выделения из проекта
догружаемых кусков функционала и стилей (js/css).

**Опции**

* *String* **target** — Результирующий таргет. По умолчанию `?.css-chunks.js`.
* *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов
  (его предоставляет технология `files`). По умолчанию — `?.files`.
* *String* **sourceSuffixes** — суффиксы файлов, по которым строится `files`-таргет. По умолчанию — 'css'.

**Пример**

```javascript
nodeConfig.addTech(require('enb-bembundle/techs/css-chunks'));
```

css-borschik-chunks
-------------------

Из *css*-файлов по deps'ам, собирает `css-chunks.js`-файл, обрабатывая инклуды, ссылки.
Умеет минифицировать и фризить.

`css-chunks.js`-файлы нужны для создания bembundle-файлов или bembundle-страниц.

Технология bembundle активно используется в bem-tools для выделения
из проекта догружаемых кусков функционала и стилей (js/css).

**Опции**

* *String* **target** — Результирующий таргет. По умолчанию `?.css-chunks.js`.
* *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов
  (его предоставляет технология `files`). По умолчанию — `?.files`.
* *Boolean* **minify** — Минифицировать ли в процессе обработки. По умолчанию — `true`.
* *Boolean* **freeze** — Использовать ли фризинг в процессе обработки. По умолчанию — `false`.
* *String* **tech** — Технология сборки. По умолчанию — соответствует расширению исходного таргета.

**Пример**

```javascript
nodeConfig.addTech([ require('enb-bembundle/techs/css-borschik-chunks'), {
  minify: true,
  freeze: true
} ]);
```

i18n-lang-js-chunks
-------------------

Собирает `?.js-chunks.lang.<язык>.js`-файлы на основе `?.keysets.<язык>.js`-файлов.

Используется для локализации в JS с помощью BEM.I18N при сборке bembundle.

Исходные и конечные таргеты в данный момент не настраиваются (нет запроса).

**Опции**

* *String* **target** — Результирующий таргет. По умолчанию — `?.js-chunks.lang.{lang}.js`.
* *String* **lang** — Язык, для которого небходимо собрать файл.

**Пример**

```javascript
nodeConfig.addTechs([
  [ require('i18n-lang-js-chunks'), { lang: 'all' } ],
  [ require('i18n-lang-js-chunks'), { lang: '{lang}' } ],
]);
```

js-chunks
---------

Из *js*-файлов по deps'ам, собирает `js-chunks.js`-файл.
`js-chunks.js`-файлы нужны для создания bembundle-файлов или bembundle-страниц.

Технология bembundle активно используется в bem-tools для выделения из проекта догружаемых
кусков функционала и стилей (js/css).

**Опции**

* *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов
  (его предоставляет технология `files`). По умолчанию — `?.files`.
* *String* **sourceSuffixes** — суффиксы файлов, по которым строится `files`-таргет. По умолчанию — 'js'.
* *String* **target** — Результирующий таргет. По умолчанию — `?.js-chunks.js`.

**Пример**

```javascript
nodeConfig.addTech(require('enb-bembundle/techs/js-chunks'));
```

js-bembundle-component
-------------------

Собирает `?.bembundle.js`-файл из `?.css-chunks.js` и `?.js-chunks.js`.

Используется вместе с `deps-subtract`, `deps-provider`, `js-chunks`, `css-chunks` для построения догружаемой части функционала сайта.

**Опции**

* *String* **cssChunksTargets** — Имена `css-chunks.js`-таргетов, которые предоставляют CSS-чанки. По умолчанию — `[ '?.css-chunks.js' ]`.
* *String* **jsChunksTargets** — Имена `js-chunks.js`-таргетов, которые предоставляют JS-чанки. По умолчанию — `[ '?.js-chunks.js' ]`.
* *String* **target** — Результирующий таргет. По умолчанию — `?.bembundle.js`.

**Пример**

```javascript
nodeConfig.addTechs([
  [ require('enb-bembundle/techs/levels'), { levels: /* ... */ } ],
  require('enb-bembundle/techs/files'),
  [ require('enb-bembundle/techs/deps'), { depsTarget: 'router.tmp.deps.js' } ],
  [ require('enb-bembundle/techs/deps-provider'), { sourceNodePath: 'pages/index', depsTarget: 'index.deps.js' } ],
  [ require('enb-bembundle/techs/deps-subtract'), {
    subtractWhatTarget: 'index.deps.js',
    subtractFromTarget: 'router.tmp.deps.js',
    depsTarget: 'router.deps.js'
  } ],
  require('enb-bembundle/techs/css-chunks'),
  require('enb-bembundle/techs/js-chunks'),
  require('enb-bembundle/techs/js-bembundle-component')
]);
```

js-bembundle-component-i18n
---------------------------

Собирает `?.bembundle.<язык>.js`-файл из `?.css-chunks.js`,  `?.js-chunks.lang.<язык>.js` и `?.js-chunks.js`.

Используется вместе с `deps-subtract`, `deps-provider`, `js-chunks`, `i18n-lang-js-chunks`, `css-chunks` для построения догружаемой части функционала сайта.

Имена результирующих файлов в данный момент не настраиваются (нет запросов на эту функцию).

**Опции**

* *String* **cssChunksTargets** — Имена `css-chunks.js`-таргетов, которые предоставляют CSS-чанки. По умолчанию — `[ '?.css-chunks.js' ]`.
* *String* **jsChunksTargets** — Имена `js-chunks.js`-таргетов, которые предоставляют JS-чанки. По умолчанию — `[ '?.js-chunks.js' ]`.
* *String* **target** — Результирующий таргет. По умолчанию — `?.bembundle.{lang}.js`.
* *String* **lang** — Язык, для которого небходимо собрать файл.

**Пример**

```javascript
nodeConfig.addTechs([
  [ require('enb-bembundle/techs/levels'), { levels: /* ... */ } ],
  require('enb-bembundle/techs/files'),
  [ require('enb-bembundle/techs/deps'), { depsTarget: 'router.tmp.deps.js' } ],
  [ require('enb-bembundle/techs/deps-provider'), { sourceNodePath: 'pages/index', depsTarget: 'index.deps.js' } ],
  [ require('enb-bembundle/techs/deps-subtract'), {
    subtractWhatTarget: 'index.deps.js',
    subtractFromTarget: 'router.tmp.deps.js',
    depsTarget: 'router.deps.js'
  } ],
  require('enb-bembundle/techs/css-chunks'),
  require('enb-bembundle/techs/js-chunks'),
  [ require('enb-bembundle/techs/i18n-merge-keysets'), { lang: 'all' } ],
  [ require('enb-bembundle/techs/i18n-merge-keysets'), { lang: '{lang}' } ],
  [ require('enb-bembundle/techs/i18n-lang-js-chunks'), { lang: 'all' } ],
  [ require('enb-bembundle/techs/i18n-lang-js-chunks'), { lang: '{lang}' } ],
  [ require('enb-bembundle/techs/js-bembundle-component-i18n'), { lang: '{lang}' } ]
]);
```

js-bembundle-page
--------------

Собирает страничный `?.js`-файл из `?.css-chunks.js` и `?.js-chunks.js`.

Результирующий файл готов к догрузке кода из бандлов (JS и CSS, приходящий из бандлов, повторно не выполняется на странице).

**Опции**

* *String* **cssChunksTargets** — Имена `css-chunks.js`-таргетов, которые предоставляют CSS-чанки. По умолчанию — `[ '?.css-chunks.js' ]`.
* *String* **jsChunksTargets** — Имена `js-chunks.js`-таргетов, которые предоставляют JS-чанки. По умолчанию — `[ '?.js-chunks.js' ]`.
* *String* **target** — Результирующий таргет. По умолчанию — `?.js`.

**Пример**

```javascript
nodeConfig.addTechs([
  /* ... */
  require('enb-bembundle/techs/css-chunks'),
  require('enb-bembundle/techs/js-chunks'),
  require('enb-bembundle/techs/js-bembundle-page')
]);
```

js-bembundle-page-i18n
----------------------

Собирает страничный `?.<язык>.js`-файл из `?.css-chunks.js`,  `?.js-chunks.lang.<язык>.js` и `?.js-chunks.js`.

Используется вместе с `deps-subtract`, `deps-provider`, `js-chunks`, `i18n-lang-js-chunks`, `css-chunks` для построения догружаемой части функционала сайта.

**Опции**

* *String* **cssChunksTargets** — Имена `css-chunks.js`-таргетов, которые предоставляют CSS-чанки. По умолчанию — `[ '?.css-chunks.js' ]`.
* *String* **jsChunksTargets** — Имена `js-chunks.js`-таргетов, которые предоставляют JS-чанки. По умолчанию — `[ '?.js-chunks.js' ]`.
* *String* **target** — Результирующий таргет. По умолчанию — `?.bembundle.{lang}.js`.
* *String* **lang** — Язык, для которого небходимо собрать файл.

**Пример**

```javascript
nodeConfig.addTechs([
  /* ... */
  require('enb-bembundle/techs/css-chunks'),
  require('enb-bembundle/techs/js-chunks'),
  [ require('enb-bembundle/techs/i18n-merge-keysets'), { lang: 'all' } ],
  [ require('enb-bembundle/techs/i18n-merge-keysets'), { lang: '{lang}' } ],
  [ require('enb-bembundle/techs/i18n-lang-js-chunks'), { lang: 'all' } ],
  [ require('enb-bembundle/techs/i18n-lang-js-chunks'), { lang: '{lang}' } ],
  [ require('enb-bembundle/techs/js-bembundle-page-i18n'), { lang: '{lang}' } ]
]);
```
