import React from "react";
import HomeLayout from "../layout/HomeLayout";
import aboutMainImage from "../assets/aboutMainImage.png";
import apj from '../assets/apj.png';
import billGates from '../assets/billGates.png';
import steveJobs from '../assets/steveJobs.png';
import nelsonMandela from '../assets/nelsonMandela.png';
import einstein from '../assets/einstein.png';


const Aboutus = () => {
  return (
    <HomeLayout>
      <div className="flex flex-col text-white pl-20 pt-20">
        <div className="flex items-center gap-5 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affordable and quality education
            </h1>
            <p className="text-xl text-gray-200">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam,
              ea in velit vitae totam optio doloremque ducimus aspernatur
              cumque, recusandae corporis! Saepe, quam! Numquam dolorem, vitae
              illum consequatur alias laboriosam, excepturi maiores incidunt
              similique nam laudantium eum rem. Repellendus sapiente numquam in
              odit sunt neque illum rem recusandae repellat!
            </p>
          </section>
          <div className="w-1/2">
            <img
              src={aboutMainImage}
              className="drop-shadow-2xl"
              id="test1"
              alt="about main image"
            />
          </div>
        </div>

        <div className="carousel w-1/2 my-20 mx-auto">
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
            <img
              src={apj}
              className="w-40 rounded-full border-2 border-gray-400"
            />
            <p className="text-xl text-gray-200">Teaching is a very noble profession that shapes the character, caliber, and future of an individual.</p>
            <h3 className="text-2xl font-semibold">APJ Abdul Kalam</h3>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
          <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
            <img
              src={einstein}
              className="w-40 rounded-full border-2 border-gray-400"
            />
            <p className="text-xl text-gray-200">Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.</p>
            <h3 className="text-2xl font-semibold">Albert Einstein</h3>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
          <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
            <img
              src={billGates}
              className="w-40 rounded-full border-2 border-gray-400"
            />
            <p className="text-xl text-gray-200">The belief that the world is getting worse, that we can't solve extreme poverty and disease, isn't just mistaken.</p>
            <h3 className="text-2xl font-semibold">Bill Gates</h3>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide4" className="btn btn-circle">
                ❯
              </a>
            </div>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
          <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
            <img
              src={steveJobs}
              className="w-40 rounded-full border-2 border-gray-400"
            />
            <p className="text-xl text-gray-200">Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose.</p>
            <h3 className="text-2xl font-semibold">Steve Jobs</h3>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Aboutus;
