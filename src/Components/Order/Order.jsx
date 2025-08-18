import { useState } from 'react';
import orderCover from '../../assets/shop/order.jpg'
import Cover from '../Cover/Cover';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import useMenu from '../Hooks/useMenu';
import FoodCard from '../FoodCard/FoodCard';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert','drinks']
     const {category} = useParams()
     const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex]= useState(initialIndex)
    const [menu]= useMenu()
   
     const dessert = menu.filter(item=>item.category ==='dessert')
     const soup = menu.filter(item=>item.category ==='soup')
     const salad = menu.filter(item=>item.category ==='salad')
     const pizza = menu.filter(item=>item.category ==='pizza')
     const drinks = menu.filter(item=>item.category ==='drinks')
    return (
        <div>
            <Cover img={orderCover} title='Order Food'></Cover>
            <div>
             <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
  <TabList className='flex gap-2 cursor-pointer'>
    <Tab>Salad</Tab>
    <Tab>Pizza</Tab>
    <Tab>Soup</Tab>
    <Tab>Dessert</Tab>
    <Tab>Drinks</Tab>

    
  </TabList>
  <TabPanel>
 <OrderTab items={salad}></OrderTab>
  </TabPanel>
  <TabPanel>
     <OrderTab items={pizza}></OrderTab>
  </TabPanel>
  <TabPanel>
     <OrderTab items={soup}></OrderTab>
  </TabPanel>
  <TabPanel>
     <OrderTab items={dessert}></OrderTab>
  </TabPanel>

    <TabPanel>
     <OrderTab items={drinks}></OrderTab>
  </TabPanel>
 
 
</Tabs>
            </div>
        </div>
    );
};

export default Order;