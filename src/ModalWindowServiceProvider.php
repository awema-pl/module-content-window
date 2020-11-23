<?php

namespace AwemaPL\ModalWindow;

use AwemaPL\BaseJS\AwemaProvider;
use Illuminate\Cookie\Middleware\EncryptCookies;

class ModalWindowServiceProvider extends AwemaProvider
{

    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'modal-window');

        parent::boot();
    }
    
    public function getPackageName(): string
    {
        return 'modal-window';
    }

    public function getPath(): string
    {
        return __DIR__;
    }
}
