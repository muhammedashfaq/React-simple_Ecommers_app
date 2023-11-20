import React from 'react'
const AddProducts = () => {
  return (
    <div className='pt-24'>

<div classNameName="">
  <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
    <h1 className="text-xl font-semibold"> <span className="font-normal">Add Product Here</span></h1>
    <form className="mt-6">
      <div className="flex justify-between gap-3">
        <span className="w-1/2">
          <label for="firstname" className="block text-xs font-semibold text-gray-600 uppercase">Name</label>
          <input id="firstname" type="text" name="firstname" placeholder="John" autocomplete="given-name" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
        </span>
        <span className="w-1/2">
          <label for="lastname" className="block text-xs font-semibold text-gray-600 uppercase">Price</label>
        <input id="lastname" type="text" name="lastname" placeholder="Doe" autocomplete="family-name" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
        </span>
      </div>
     
      <label for="email" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Decsription</label>
      <textarea id="email" type="email" name="email" placeholder="john.doe@company.com" autocomplete="email" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />

      <label for="image" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Add Image</label>
      <input id="image" type="file" name="email" placeholder="john.doe@company.com" autocomplete="email" className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
      <button type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
        Add
      </button>
    </form>
  </div>
</div>
    </div>
  )
}

export default AddProducts