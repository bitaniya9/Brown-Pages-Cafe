const BACKEND_ROOT = import.meta.env.VITE_API_URL1;

const MenuCard = ({ item }) => {
  return (
    <div className="menu-card">
      <img src={`${BACKEND_ROOT}${item.image}`} alt={item.name} />

      <div className="menu-card-body">
        <div className="menu-card-header">
          <h3 className="menu-card-title">{item.name}</h3>
          <span className="menu-card-price">${item.price.toFixed(2)}</span>
        </div>

        <p className="menu-card-category">
          {item.category.replaceAll("_", " ")}
        </p>
      </div>
    </div>
  );
};

export default MenuCard;
