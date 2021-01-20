export const dateFormatter = ( value ) =>
{

    if ( !value ) return "N/A";

    const formatter = new Intl.DateTimeFormat( 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: "numeric",
        minute: "numeric"
    } );

    const date = new Date( value );

    return formatter.format( date );
};
