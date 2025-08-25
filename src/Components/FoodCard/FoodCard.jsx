// import React, { useContext } from 'react';
// import { AuthContext } from '../Providers/AuthProvider';
// import useAuth from '../Hooks/useAuth';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// const FoodCard = ({item}) => {
//         const {image, name, recipe, category, price}= item
//         const {user}=useAuth()
//         const Navigate = useNavigate()


//         const handleAddToCart = food =>{
        

//           if(user && user.email){
//               //TODO: send cart item to the database
//               Navigate('/login')
//           }
//           else{
//             Swal.fire({
//   title: "You are not LogIn",
//   text: "You won't be able to revert this!",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonColor: "#3085d6",
//   cancelButtonColor: "#d33",
//   confirmButtonText: "Yes, Log In"
// }).then((result) => {
//   if (result.isConfirmed) {
   
//   }
// });
//           }





//           console.log(food, user?.email)
//         }
//     return (
//       <div className="card bg-base-100 w-96 shadow-sm">
//   <figure>
//     <img
//       src={image}
//       alt="Shoes" />
//   </figure>
//   <p className='absolute bg-black text-white  right-2.5'>${price}</p>
//   <div className="card-body">
//     <h2 className="card-title">{name}</h2>
//     <p>{recipe}</p>
//     <div className="card-actions justify-end">
//       <button 

//       onClick={()=>handleAddToCart(item)}
      
//       className="btn btn-primary">Add to cart</button>
//     </div>
//   </div>
// </div>
//     );
// };

// export default FoodCard;



import React from 'react';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FoodCard = ({ item }) => {
  const { image, name, recipe, price, _id } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation()

  const handleAddToCart = (food) => {
    if (user && user.email) {
      // TODO: send cart item to the database
      console.log("Cart item:", food, "User:", user.email);

      const cartItems = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price

      }
      axios.post('http://localhost:5000/carts', cartItems)
      .then(res=>{
        console.log(res.data)
        if(res.data.insertedId){
        Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${name} has been saved`,
        showConfirmButton: false,
        timer: 1500
});
        }

      })



    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add items to your cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Log In"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', {state:{from: location}});
        }
      });
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={image} alt={name} />
      </figure>
      <p className='absolute bg-black text-white right-2.5 px-2 py-1 rounded'>
        ${price}
      </p>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button 
            onClick={() => handleAddToCart(item)}
            className="btn btn-primary"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
