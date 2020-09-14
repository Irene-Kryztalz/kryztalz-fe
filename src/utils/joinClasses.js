/**
 * Return classNames string seperated by a space as in css
 * @param  {...any} classes An infinite list of classnames
 * 
 * @example
 * joinClasses("class1","class2")
 * // return "class1 class2"
 * OR
 * @example
 * using it with css modules
 * joinClasses(classes.Class1,classes["Class2"])
 
 */

export const joinClasses = ( ...classes ) =>
{
    return classes.join( " " );
};
