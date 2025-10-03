import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../Hooks/useAxiosSecurePublic'
import useAxiosSecure from '../Hooks/useAxiosSecure'
import Swal from 'sweetalert2';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTIG_KEY;
const image_hostic_API = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpdateItem = () => {
    const { register, handleSubmit } = useForm();
   
    const {recipeName, category, recipe, price, _id} = useLoaderData()
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
        recipeName:data.recipeName,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url
      }

      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
      console.log(menuRes.data)
      if(menuRes.data.modifiedCount > 0){
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
        <div>
              <SectionTitle heading="Update an Items" subheading="Refresh info"></SectionTitle>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Recipe Name */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Recipe Name*</legend>
          <input
            type="text"
            defaultValue={recipeName}
            {...register("recipeName", { required: true })}
            className="input"
            placeholder="Recipe Name"
          />
        </fieldset>

        {/* Category */}
        <div>
          <select
        
            {...register("category", { required: true })}
            defaultValue={category}
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
            defaultValue={price}
            {...register("price", { required: true })}
            className="input"
            placeholder="Price"
          />
        </fieldset>

        {/* Description */}
        <div>
          <textarea
            {...register("recipe")}
            defaultValue={recipe}
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
          Update Menu Item
        </button>
      </form>
        </div>
    );
};

export default UpdateItem;