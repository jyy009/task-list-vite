export const List = ({ data, ulClass, renderItem, liClass}) => {
 return (
   <ul className={ulClass}>
    {data.map((item) => (
      <li key={item._id} className={liClass}>{renderItem(item)}</li>

    ))}
   </ul>
 );
 
}