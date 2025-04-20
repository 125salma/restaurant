import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data);
        //image upload to imgbb and then get an 
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            //now send the menu item data to the server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            //send data server
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data)
            if (menuRes.data.insertedId) {
                reset();
                //show success popup
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    }
    return (
        <div>
            <SectionTitle heading="add an item" subHeading="what's new?"></SectionTitle>
            <div>
                <form className='m-6' onSubmit={handleSubmit(onSubmit)}>
                    {/* name */}
                    <div className='my-4'>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Recipe Name*</legend>
                            <input type="text" className="input w-full" placeholder="Recipe Name"
                                {...register('name', { required: true })} />

                        </fieldset>
                    </div>
                    <div className='flex gap-6'>
                        {/* category */}
                        <div className='my-6 w-full'>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Category*</legend>
                                <select defaultValue="Select a category" {...register("category", { required: true })} className="select w-full">
                                    <option disabled={true}>Select a category</option>
                                    <option value="salad">Salad</option>
                                    <option value="pizza">Pizza</option>
                                    <option value="soup">soup</option>
                                    <option value="dessert">Dessert</option>
                                    <option value="drinks">Drinks</option>

                                </select>
                            </fieldset>
                        </div>

                        {/* price */}
                        <div className='my-6 w-full'>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Price*</legend>
                                <input type="number" className="input w-full" placeholder="Price"
                                    {...register('price', { required: true })}
                                />
                            </fieldset>
                        </div>


                    </div>
                    {/* recepi details */}
                    <div className='w-full'>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Recepi Detail</legend>
                            <textarea {...register('recipe')} className="textarea h-24 w-full" placeholder="Bio"></textarea>

                        </fieldset>

                    </div>
                    <div className='my-6'>
                        <input {...register('image', { required: true })} type="file" className="file-input" />
                    </div>

                    <button className='btn'>Add Item<FaUtensils className='ml-4'></FaUtensils></button>




                </form>




            </div>
        </div>
    );
};

export default AddItems;