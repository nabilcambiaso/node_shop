import React, { useState } from 'react'
import pic1 from '../../assets/images/pic1.jpg';
import pic2 from '../../assets/images/pic2.jpg';
import pic3 from '../../assets/images/pic3.jpg';

function LandingPage() {
  return (
    <div>
      <main>
        <header>
          <h2 className=' text-4xl m-5 text-gray-50'>Misceallaneous</h2>
        </header>
        <section className="mx-auto max-w-6xl py-12">
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="transition-all ease-in-out duration-1000 flex flex-col justify-center"></div>
              <div className="transition-all ease-in-out duration-1000 flex flex-col justify-center"></div>
              <div className="transition-all ease-in-out duration-1000 flex flex-col justify-center"></div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="transition-all ease-in-out duration-1000 flex flex-col justify-center">
                <div slot="middle-left" className="max-w-2xl">
                  <div className="flex flex-row">
                    <div className="w-2/3 bg-orange-500 p-5 text-teal-100 flex justify-center items-center h-48 text-3xl font-black uppercase">Awesome products delivered</div>
                    <div className="w-1/3 bg-gray-700 text-orange-100 p-5 flex justify-center items-center">More details about the study can be found in the book , click to learn more ...</div>
                  </div>
                </div>
              </div>
              <div className="transition-all ease-in-out duration-1000 flex flex-col justify-center"></div>
              <div className="transition-all ease-in-out duration-1000 flex flex-col justify-center">
                <div slot="middle-right" className="max-w-xs">
                  <div className="flex flex-col justify-center h-48 p-3">
                    <div className="text-xl font-black text-orange-500">Awesome discovery we did</div>
                    <div className="text-sm text-gray-100 my-3">The results are spectacular, you can checkout the source for more informations</div>
                    <div className="text-sm text-yellow-600 cursor-pointer">Read more</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="transition-all ease-in-out duration-1000 flex flex-col items-center md:items-stretch mr-0 md:mr-2">
                <div slot="bottom-left" className="max-w-lg">
                  <div className="p-5 shadow-md m-2 mt-4  bg-gray-700"><img className="object-cover h-90 w-90 rounded" src={pic3} alt="step3"/>
                    <div className="text-xs font-bold uppercase text-orange-500 mt-1 mb-2">Blog post</div>
                    <div className="text-xl font-bold mb-2 text-white">Big case study</div>
                    <div className="truncate  text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ut vel facilis iste, dicta est minus alias, aliquam, velit nisi quo assumenda porro dignissimos doloremque temporibus eum saepe aspernatur ab.</div>
                  </div>
                </div>
              </div>
              <div className="transition-all  ease-in-out duration-1000 flex flex-col items-center md:items-stretch  mx-0 md:mx-4">
                <div slot="bottom-center" className="max-w-lg">
                  <div className="p-5 shadow-md m-2 mt-4  bg-gray-700"><img className=" object-cover max-h-90 w-90 rounded" src={pic2} alt="step3"/>
                    <div className="text-xs font-bold uppercase text-orange-500 mt-1 mb-2">Blog post</div>
                    <div className="text-xl font-bold mb-2 text-white">Big case study</div>
                    <div className="truncate  text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ut vel facilis iste, dicta est minus alias, aliquam, velit nisi quo assumenda porro dignissimos doloremque temporibus eum saepe aspernatur ab.</div>
                  </div>
                </div>
              </div>
              <div className="transition-all ease-in-out duration-1000 flex flex-col items-center md:items-stretch  ml-0 md:ml-2">
                <div slot="bottom-right" className="max-w-lg">
                  <div className="p-5 shadow-md m-2 mt-4  bg-gray-700"><img className="object-cover max-h-90 w-90 rounded" src={pic1} alt="camera"/>
                    <div className="text-xs font-bold uppercase text-orange-500 mt-1 mb-2">Blog post</div>
                    <div className="text-xl font-bold mb-2 text-white">Big case study</div>
                    <div className="truncate text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ut vel facilis iste, dicta est minus alias, aliquam, velit nisi quo assumenda porro dignissimos doloremque temporibus eum saepe aspernatur ab.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LandingPage;