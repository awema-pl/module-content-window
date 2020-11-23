<?php

namespace AwemaPL\ContentWindow;

use AwemaPL\BaseJS\AwemaProvider;
use Illuminate\Cookie\Middleware\EncryptCookies;

class ContentWindowServiceProvider extends AwemaProvider
{

    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'content-window');

        parent::boot();
    }
    
    public function getPackageName(): string
    {
        return 'content-window';
    }

    public function getPath(): string
    {
        return __DIR__;
    }
}
