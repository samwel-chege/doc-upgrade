import React from 'react'
import Link from 'next/link'

const Landing = () => {
  return (
    <div>
     <div className="relative flex flex-col-reverse px-4 py-16 mx-auto lg:block lg:flex-col lg:py-32 xl:py-48 md:px-8 sm:max-w-xl md:max-w-full">
      <div className="z-0 flex justify-center h-full -mx-4 overflow-hidden lg:pt-24 lg:pb-16 lg:pr-8 xl:pr-0 lg:w-1/2 lg:absolute lg:justify-end lg:bottom-0 lg:left-0 lg:items-center">
        <img
          src="https://kitwind.io/assets/kometa/laptop.png"
          className="object-cover object-right w-full h-auto lg:w-auto lg:h-full"
          alt=""
        />
      </div>
      <div className="relative flex justify-end max-w-xl mx-auto xl:pr-32 lg:max-w-screen-xl">
        <div className="mb-16 lg:pr-5 lg:max-w-lg lg:mb-0">
          <div className="max-w-xl mb-6">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-400">
                DocUpp
              </p>
            </div>
            <h2 className="max-w-lg mb-6  text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            Improve Your
              <br className="hidden md:block" />
              Documents {' '}
              <span className="inline-block text-purple-400">
             Seamlessly
              </span>
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
            Upload your document and get actionable suggestions to improve its
             quality.
            </p>
          </div>
          <form>
            <div className="flex items-center mt-4">
              <Link href={`/document`} >
              <button
                className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              >
               Get started
              </button>
              </Link>
              
            </div>
          </form>
        </div>
      </div>
    </div>

    {/* about section */}
    <section id="about" className="bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-purple-400">About Us</h2>
        <p className="mt-4 text-gray-700">
          DocUpp is an innovative platform designed to enhance your
          documents with AI-powered suggestions. Whether it's for grammar,
          tone, or clarity, our goal is to help you create polished, impactful
          content effortlessly.
        </p>
      </div>
    </section>
    </div>
  )
}

export default Landing