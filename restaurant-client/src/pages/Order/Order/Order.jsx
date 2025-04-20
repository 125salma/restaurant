import orderCoverImg from '../../../assets/shop/banner2.jpg'
import Cover from '../../Shared/Cover/Cover';
import useMenu from "../../../hooks/useMenu";
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Order = () => {
  const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
  const { category } = useParams();
  //console.log(category)
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);


  const [menu] = useMenu();


  const dessertItems = menu.filter(item => item.category === 'dessert');
  const soupItems = menu.filter(item => item.category === 'soup');
  const saladItems = menu.filter(item => item.category === 'salad');
  const pizzaItems = menu.filter(item => item.category === 'pizza');
  const drinkItems = menu.filter(item => item.category === 'drinks');

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Order Food</title>
      </Helmet>
      <Cover img={orderCoverImg} title="Order Food"></Cover>
      {/* name of each tab group should be unique */}

      {/* react awesome theke tab use */}
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
          <OrderTab items={saladItems}></OrderTab>
        </TabPanel>

        <TabPanel>
          <OrderTab items={pizzaItems}></OrderTab>
        </TabPanel>

        <TabPanel>
          <OrderTab items={soupItems}></OrderTab>
        </TabPanel>

        <TabPanel>
          <OrderTab items={dessertItems}></OrderTab>
        </TabPanel>

        <TabPanel>
          <OrderTab items={drinkItems}></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;