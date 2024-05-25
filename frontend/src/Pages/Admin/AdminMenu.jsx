import { NavLink } from "react-router-dom";
import {
  FaPlus,
  FaList,
  FaClipboardList,
  FaUsers,
  FaHome,
} from "react-icons/fa";

const AdminMenu = () => {
  return (
    <div className="container-fluid pt-4 mb-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Panneau d'administration</h4>
              <ul className="list-group list-group-flush">
                <NavLink
                  to="/admin"
                  className="list-group-item list-group-item-action d-flex align-items-center justify-content-start"
                  activeClassName="active"
                  end
                >
                  <FaHome className="mr-2 fa-icon-react" />
                  Tableau de bord
                </NavLink>
                <NavLink
                  to="/admin/create-category"
                  className="list-group-item list-group-item-action d-flex align-items-center justify-content-start"
                  activeClassName="active"
                  end
                >
                  <FaPlus className="mr-2 fa-icon-react" />
                  Créer une catégorie
                </NavLink>  
              
                <NavLink
                  to="/admin/create-product"
                  className="list-group-item list-group-item-action d-flex align-items-center justify-content-start"
                  activeClassName="active"
                  end
                >
                  <FaPlus className="mr-2 fa-icon-react" />
                  Créer un produit
                </NavLink>
                <NavLink
                  to="/admin/products"
                  className="list-group-item list-group-item-action d-flex align-items-center justify-content-start"
                  activeClassName="active"
                  end
                >
                  <FaList className="mr-2 fa-icon-react" />
                  Tous les produits
                </NavLink>
                <NavLink
                  to="/admin/orders"
                  className="list-group-item list-group-item-action d-flex align-items-center justify-content-start"
                  activeClassName="active"
                  end
                >
                  <FaClipboardList className="mr-2 fa-icon-react" />
                  Toutes les commandes
                </NavLink>
                <NavLink
                  to="/admin/allCarts"
                  className="list-group-item list-group-item-action d-flex align-items-center justify-content-start"
                  activeClassName="active"
                  end
                >
                  <FaClipboardList className="mr-2 fa-icon-react" />
                  Tous les paniers
                </NavLink>
                <NavLink
                  to="/admin/users"
                  className="list-group-item list-group-item-action d-flex align-items-center justify-content-start"
                  activeClassName="active"
                  end
                >
                  <FaUsers className="mr-2 fa-icon-react" />
                  Utilisateurs
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
