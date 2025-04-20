import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/menu-bg.jpg';
import desertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const dessertItems = menu.filter(item => item.category === 'dessert');
    const soupItems = menu.filter(item => item.category === 'soup');
    const saladItems = menu.filter(item => item.category === 'salad');
    const pizzaItems = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>

            <Cover  img={menuImg} title={"our menu"}></Cover>
            {/* main cover */}
             <SectionTitle
             subHeading="Don't Miss" heading="Today's Offer"
             ></SectionTitle>
             {/* offered menu items */}
             <MenuCategory items={offered} ></MenuCategory>
             {/* dessert menu items */}
             <MenuCategory items={dessertItems} title={"dessert" }img={desertImg}></MenuCategory>
             {/* pizza menu items */}
             <MenuCategory items={pizzaItems} title={"pizza"} img={pizzaImg}></MenuCategory>
              {/* salad menu items */}
              <MenuCategory items={saladItems} title={"salad"} img={saladImg}></MenuCategory>
             {/* soup menu items */}
             <MenuCategory items={soupItems} title={"soup"} img={soupImg}></MenuCategory>
            
             
        

        </div>
    );
};

export default Menu;


