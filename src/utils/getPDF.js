export const getPDF = async ( sendData, endpoint, title ) =>
{
    const { data, error } = await sendData(
        {
            endpoint,
            isBlob: true
        }
    );

    if ( !error )
    {
        const file = new Blob( [ data ], { type: 'application/pdf' } );

        const url = URL.createObjectURL( file );
        const a = document.createElement( 'a' );

        a.href = url;
        a.download = `${ title }.pdf`;

        const clickHandler = () =>
        {
            setTimeout( () =>
            {
                URL.revokeObjectURL( url );
                a.removeEventListener( 'click', clickHandler );
            }, 150 );
        };

        a.addEventListener( 'click', clickHandler, false );
        a.click();

    }
};
