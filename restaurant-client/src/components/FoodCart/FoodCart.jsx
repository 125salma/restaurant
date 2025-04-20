import React from 'react';
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";



const FoodCart = ({item}) => {
    const {name, image, price, recipe, _id} = item;
    //cart
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    //item order korbo
    const handleAddToCart = () =>{
      //cart
      if(user && user.email){
        //send cart item to the database
         //console.log(food, user.email);
         const cartItem = {
          manuId: _id,
          email: user.email,
          name,
          image,
          price
         }
         axiosSecure.post('/carts', cartItem)
         .then(res => {
          //console.log(res.data)
          if(res.data.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${name} added to your cart`,
              showConfirmButton: false,
              timer: 1500
            });
            //refetch cart to update the cart items count
            refetch();
          }
         })
      }
      else{
        Swal.fire({
          title: "Yor are not Logged In",
          text: "Please login to add to the cart?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, login!"
        }).then((result) => {
          if (result.isConfirmed) {
        //send the user to the login page
        navigate('/login', {state: {from: location}});
          }
        });
      }
    }

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={image}
            alt="" />
        </figure>
        <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">${price}</p>
        <div className="card-body flex flex-col items-center">
          <h2 className="card-title">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-end">
            <button onClick={handleAddToCart} className="btn btn-outline btn-primary border-orange-400 border-0 border-b-4 mt-4">Add to Cart</button>
          </div>
        </div>
      </div>
    );
};

export default FoodCart;