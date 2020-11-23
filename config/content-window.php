<?php

return [

    'src' => [
        'script' => 'awema-pl/module-content-window/v1.x.x/js/main.js',
        'script_legacy' => 'awema-pl/module-content-window/v1.x.x/js/main.legacy.js',
        'style' => 'awema-pl/module-content-window/v1.x.x/css/main.css'
    ],

    'local' => [
        'script' => '/static/content-window/js/main.js',
        'script_legacy' => '/static/content-window/js/main.legacy.js',
        'style' => '/static/content-window/css/main.css'
    ],
    // this resources has been auto load to layout
    'dist' => [
        'js/main.js',
        'js/main.legacy.js',
        //'css/main.css',
    ],

];
