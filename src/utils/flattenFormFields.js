function flattenFormFields ( fieldConfig, fieldName ) 
{
    return (
        {
            fieldName,
            ...fieldConfig
        }
    );

}


export 
{
    flattenFormFields

};
