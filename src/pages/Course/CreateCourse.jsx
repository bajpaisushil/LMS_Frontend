import React, { useState } from "react";
import HomeLayout from "../../layout/HomeLayout";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createNewCourse } from "../../redux/slices/courseSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: null,
    previewImage: "",
  });
  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          thumbnail: uploadedImage,
          previewImage: this.result,
        });
      });
    }
  }
  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }
  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.category ||
      !userInput.createdBy ||
      !userInput.description ||
      !userInput.thumbnail
    ) {
      toast.error("All Fields are mandatory!");
      return;
    }
    const response = await dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      setUserInput({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: null,
        previewImage: "",
      });
      nav("/courses");
    }
  }
  return (
    <HomeLayout>
      <div className="h-[100vh] flex items-center justify-center">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 h-[500px] text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
        >
          <Link
            onClick={() => nav(-1)}
            className="absolute top-8 text-2xl link text-accent cursor-pointer"
          >
            <AiOutlineArrowLeft />
          </Link>
          <h1 className="text-2xl text-center font-bold">Create new course</h1>
          <main className="grid grid-cols-2 gap-x-10">
            <div className="gap-y-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput?.previewImage ? (
                    <img
                      src={userInput?.previewImage}
                      className="w-full h-44 m-auto border"
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                      <h1 className="font-bold text-lg">
                        Upload course thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  className="hidden"
                  type="file"
                  id="image_uploads"
                  accept=".jpg, .png, .jpeg, .svg"
                  name="image_uploads"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-lg font-semibold">
                  Course title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter the title of the course"
                  onChange={handleUserInput}
                  value={userInput.title}
                  className="bg-transparent px-2 py-1 border"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <label htmlFor="createdBy" className="text-lg font-semibold">
                  Instructor
                </label>
                <input
                  required
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter the instructor of the course"
                  onChange={handleUserInput}
                  value={userInput.createdBy}
                  className="bg-transparent px-2 py-1 border"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-lg font-semibold">
                  Category
                </label>
                <input
                  required
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Enter the category of the course"
                  onChange={handleUserInput}
                  value={userInput.category}
                  className="bg-transparent px-2 py-1 border"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-lg font-semibold">
                  Description
                </label>
                <textarea
                  required
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter the description of the course"
                  onChange={handleUserInput}
                  value={userInput.description}
                  className="bg-transparent px-2 py-1 border h-24 resize-none overflow-y-scroll"
                />
              </div>
            </div>
          </main>
          <button type="submit" className="w-full py-2 rounded-sm text-lg font-semibold cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default CreateCourse;
