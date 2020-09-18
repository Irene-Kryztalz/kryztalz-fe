export const extractFormData = ( formFields ) =>
{
    const formData = {};

    for ( const field in formFields ) 
    {
        formData[ field ] = formFields[ field ].value;
    }
    return formData;
};
