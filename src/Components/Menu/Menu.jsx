import React from 'react';
import { Helmet } from 'react-helmet';
import Cover from '../Cover/Cover';
import ImgMenu from '../../assets/menu/banner3.jpg'
import DessertMenu from '../../assets/menu/dessert-bg.jpeg'
import pizzaMenu from '../../assets/menu/pizza-bg.jpg'
import sladMenu from '../../assets/menu/salad-bg.jpg'
import SoupMenu from '../../assets/menu/soup-bg.jpg'
import useMenu from '../Hooks/useMenu';

import SectionTitle from '../SectionTitle/SectionTitle';
import Menucategory from '../Menucategory/Menucategory';


const Menu = () => {
    const [menu] = useMenu()
     const dessert = menu.filter(item=>item.category ==='dessert')
     const soup = menu.filter(item=>item.category ==='soup')
     const salad = menu.filter(item=>item.category ==='salad')
     const pizza = menu.filter(item=>item.category ==='pizza')
     const offered = menu.filter(item=>item.category ==='offered')
    return (
        <div>

            <Helmet>
                 <title>Menu</title>
            </Helmet>
            <Cover img={ImgMenu} title='Our Menu'></Cover>
            <SectionTitle heading="Today's Offer"
        subheading="Don't Miss"        
        >
        </SectionTitle>
        <Menucategory items={offered}></Menucategory>
         <Menucategory 
         items={dessert}
         title='Dessert'
         Img={DessertMenu}
         
         >
         </Menucategory>


          <Menucategory 
         items={pizza}
         title='pizza'
         Img={pizzaMenu}
         >
         </Menucategory>


          <Menucategory 
         items={salad}
         title='salad'
         Img={sladMenu}
         >
         </Menucategory>
          

            <Menucategory 
         items={soup}
         title='soup'
         Img={SoupMenu}
         >
         </Menucategory>
        </div>
    );
};

export default Menu;