FROM php:8.1-apache-bookworm

WORKDIR /var/www/html

ENV TZ="America/Sao_Paulo"

RUN buildDeps=" \
        default-libmysqlclient-dev \
        libbz2-dev \
        libmemcached-dev \
        libsasl2-dev \
    " \
    runtimeDeps=" \
        curl \
        git \
        libfreetype6-dev \
        libicu-dev \
        libjpeg-dev \
        libmemcachedutil2 \
        libzip-dev \
        libpng-dev \
        libxml2-dev \
    " \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y $buildDeps $runtimeDeps \
    && docker-php-ext-install gd iconv mysqli pdo pdo_mysql xml zip \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
    && pecl install memcached \
    && docker-php-ext-enable memcached.so \
    && apt-get purge -y --auto-remove $buildDeps \
    && rm -r /var/lib/apt/lists/* \
    && sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf \
    && a2enmod rewrite \
    && a2enmod headers \
    && a2enmod deflate \
    && a2enmod ssl

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer --version
