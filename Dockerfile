FROM dunglas/frankenphp:php8.4

RUN install-php-extensions \
    pdo_pgsql \
    pgsql \
    mbstring \
    bcmath \
    exif \
    pcntl \
    intl \
    zip

WORKDIR /app

COPY . .

RUN touch storage/logs/laravel.log

RUN chmod -R 777 storage bootstrap/cache

RUN composer install --no-dev --optimize-autoloader

RUN php artisan wayfinder:generate --with-form

RUN npm install

RUN npm run build


CMD ["sh", "-c", "php artisan octane:frankenphp --host=0.0.0.0 --port=${PORT:-80}"]