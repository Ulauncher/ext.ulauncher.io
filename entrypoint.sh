#!/bin/sh

set -e

replace_var() {
    # $1 var name
    # $2 file name
    eval "value=\$$1"
    if [ -z "$value" ]; then
        echo "WARN: Undefined variable $1"
        sed -i "s,%$1%,,g" $2
    else
        echo "Setting variable $1=$value"
        sed -i "s,%$1%,$value,g" $2
    fi
}

if [[ "$@" = 'nginx' ]]; then

    # go through all JS files and replace %VAR_NAME% with VAR_NAME value from env variables
    find /var/app -type f -name "*.js" | while read filename; do
        echo "Replacing env vars in $filename"
        replace_var REACT_APP_AUTH0_CLIENT_ID $filename
        replace_var REACT_APP_AUTH0_DOMAIN $filename
        replace_var REACT_APP_API_BASE_URL $filename
    done

    set -x
    exec nginx -g "daemon off;"
fi

set -x
exec "$@"
