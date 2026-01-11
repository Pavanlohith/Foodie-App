import React, { useEffect, useState } from 'react'
import './Add.css'
import axios from 'axios'
import { assets } from '../../assets/assets'
const Add = ({url}) => {
   
    const[image,setImage]=useState(false)
    const [data,setDate]=useState({
        name:"",
        description:"",
        price:"",
        category:"salad"
    })
    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setDate(data=>({...data,[name]:value}))

    }
  const onsubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
        alert("Please select an image!");
        return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image); 

    try {
        const response = await axios.post(`${url}/api/food/add`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.data.success) {
            setDate({
                name: "",
                description: "",
                price: "",
                category: "salad",
            });
            setImage(false);
            alert("Food item added successfully!");
        } else {
            alert("Failed to add food item.");
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong while adding the food item.");
    }
};

   
  return (
    
    <div className='add '>
        <form className='flex-col' onSubmit={onsubmitHandler}>
            <div className="add-image-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor='image'>
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />

                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />

            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product Decsription</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write Contetnt Here' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler}  name="category" >
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Desert">Desert</option>
                        <option value="Sandwitch">Sandwitch</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg ">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select >
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input  onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />

                    </div>
                </div>
                <button type='submit' className='add-btn'>Add</button>
            </div>
        </form>

    </div>
  )
}

export default Add