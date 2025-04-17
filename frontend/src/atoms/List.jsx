export const List = ({ ulClass, liClass, key}) => {
 return (
   <ul className={ulClass}>
     <li key={key} className={liClass}></li>
   </ul>
 );
 
}