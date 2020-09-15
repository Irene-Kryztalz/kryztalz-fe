export const required = value => value.trim() !== '';

export const length = config => value =>
{
    let isValid = true;
    if ( config.min )
    {
        isValid = isValid && value.trim().length >= config.min;
    }
    if ( config.max )
    {
        isValid = isValid && value.trim().length <= config.max;
    }
    return isValid;
};

export const alphaNumeric = value => (
    /^[a-z0-9]{1,}$/ig.test( value.trim() )
);

export const email = value =>
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        value.trim()
    );
