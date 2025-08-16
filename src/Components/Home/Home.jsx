import Banner from "../Banner/Banner";
import Call_Us from "../Call_Us/Call_Us";
import Card from "../Card/Card";
import Catagory from "../Catagory/Catagory";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";

import Testimonial from "../Testimonial/Testimonial";
import Try from "../Try/Try";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Catagory></Catagory>
            <Card></Card>
            <PopularMenu></PopularMenu>
            <Call_Us></Call_Us>
            <Try></Try>
            <Featured></Featured>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;