
import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../Hooks/useAxiosSecurePublic'
import useAxiosSecure from '../Hooks/useAxiosSecure'
import axios from 'axios';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTIG_KEY;
const image_hostic_API = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Additems = () => {
  const { register, handleSubmit } = useForm();
  const axiosPub = useAxiosPublic()
  const axiosSecure = useAxiosSecure()

  const onSubmit = async (data) => {
    console.log(data);

    const imageFile = {image: data.image[0]}
    const res = await axiosPub.post(image_hostic_API, imageFile, {
        headers:{
            'content-type': 'multipart/form-data'
        }
    })
    if(res.data.success){
      const menuItem ={
        name:data.recipeName,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url
      }

      const menuRes = await axiosSecure.post('/menu', menuItem)
      console.log(menuRes.data)
      if(menuRes.data.insertedId){
      Swal.fire({
  position: "top-end",
  icon: "success",
  title: `${data.recipeName} is added to the menu`,
  showConfirmButton: false,
  timer: 1500
});

    }


    }
    console.log('With Image URL',res.data)
    

  };

  return (
    <div className="my-4 w-full">
      <SectionTitle heading="Add an Item" subheading="What's New?" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Recipe Name */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Recipe Name*</legend>
          <input
            type="text"
            {...register("recipeName", { required: true })}
            className="input"
            placeholder="Recipe Name"
          />
        </fieldset>

        {/* Category */}
        <div>
          <select
            {...register("category", { required: true })}
            defaultValue="default"
            className="select select-secondary w-full"
          >
            <option value="default" disabled>
              Select a Category
            </option>
            <option value="salad">Salad</option>
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drinks</option>
          </select>
        </div>

        {/* Price */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Price*</legend>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: true })}
            className="input"
            placeholder="Price"
          />
        </fieldset>

        {/* Description */}
        <div>
          <textarea
            {...register("recipe")}
            className="textarea w-full"
            placeholder="Description"
          />
        </div>

        {/* File Upload */}
        <div className="p-4">
          <input
            type="file"
            {...register("image")}
            className="file-input"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Additems;





