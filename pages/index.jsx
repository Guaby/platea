import {gsap, Power3} from 'gsap';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

const Home = () => {

  let stepsList = useRef(null);
  const [state, setState] = useState({
    isActive1: true,
    isActive2: false,
    isActive3: false
  });

  useEffect(() => {
    gsap.to(stepsList.children[0], {
      opacity: 1,
      duration: 0
    })
  },[]);


  // Show Hide Animation
  let tl = gsap.timeline();

  const tlHideStep = (el, timeline) => {
    timeline.to(el, { 
      height: 0,
      autoAlpha: 0,
      duration: 0.6,
      ease: Power3.easeOut
    });
  }

  const tlShowStep = (el, timeline) => {
    timeline.to(el, { 
      height: 'auto',
      autoAlpha: 1,
      duration: 1,
      ease: Power3.easeOut
    });
  }


  // Function for Prev / Next Slide Logic
  const prevSlide = () => {
    if(stepsList.children[2].classList.contains('active')) {
      
      setState({isActive2: true, isActive3: false})
      tlHideStep(stepsList.children[2],tl);
      tlShowStep(stepsList.children[1], tl);

    }
  }
  
  const nextSlide = () => {

    if(stepsList.children[0].classList.contains('active')) {

      setState({isActive1: false, isActive2: true});
      tlHideStep(stepsList.children[0],tl);
      tlShowStep(stepsList.children[1], tl);

    } else if(stepsList.children[1].classList.contains('active')) {

      setState({isActive2: false, isActive3: true})
      tlHideStep(stepsList.children[1],tl);
      tlShowStep(stepsList.children[2], tl);

    } 
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Platea TripPlanner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='absolute'>
        <video autoPlay muted loop className='h-screen w-screen object-cover'>
          <source src= "/videoHD.mp4" type='video/mp4'/> Your browser does not support the video tag.
        </video>
      </div>

      <main className='flex relative w-full h-screen lg:w-auto lg:h-auto'>

       <div className='bg-white rounded-2xl	px-8 lg:px-16 py-8 pt-0 w-full lg:w-auto left-0 bottom-0 max-w-full lg:max-w-lg flex flex-col items-center text-center absolute lg:relative'>
         <span className='bg-white w-20 h-20 flex items-center justify-center rounded-full -translate-y-2/4'>
           <img src="/logo.svg" alt="explore icon" className='w-8 h-8'/>
         </span>
         <h1 className='text-4xl font-bold -mt-10 mb-2'>Explora todo lo que puedes hacer en la isla</h1>

         {/* ==== Steps ==== */}
         <div className='w-11/12 overflow-hidden' ref={el => (stepsList = el)}>

          {/* Step 1 */}
          <div className={'w-full overflow-hidden ' + (state.isActive1 ? 'active' : '')}>
              <a onClick={nextSlide} href='#' className='text-white'>
                <div className={'relative p-4 pl-7 flex justify-between items-center my-4'}>
                  <span className='absolute bg-black left-0 top-0 right-0 bottom-0 w-full rounded-full'></span>
                  <p className='relative'>¿Qué hacer?</p>
                  <span className='bg-white relative w-10 h-10 rounded-full flex items-center justify-center'>
                    <img src="/down-arrow.svg" alt="explore icon" className='w-4 h-4 top-px relative'/>
                  </span>
                </div>
              </a>
              <a href='#' className='text-sm opacity-40'>No estoy seguro. Que me recomiendas?</a>
          </div>

          {/* Step 2 */}
          <div className={'w-full text-left mt-6 overflow-hidden h-0 ' + (state.isActive2 ? 'active' : '')}>
              <h2 className='text-lg font-bold mb-2'>¿Qué hacer?</h2>
              <div className='overflow-hidden'>
                <ul className='ttd mb-6 border-solid border border-black-400 rounded-md px-8 py-6 max-h-80 overflow-scroll'>
                  <li>Restaurantes</li>
                  <li>Hospedaje</li>
                  <li>Playas</li>
                  <li>Arte Y Cultura</li>
                  <li>Shopping</li>
                  <li>Ecoturismo</li>
                  <li>Tours</li>
                  <li>Entretenimiento</li>
                  <li>Clases y workshop</li>
                </ul>
              </div>
              <div className='w-11/12 mx-auto'>
                <a onClick={nextSlide} href='#' className='text-black'>
                  <div className='relative p-4 pl-7 py-6 flex justify-center items-center my-4'>
                    <span className='absolute bg-white left-0 top-0 right-0 bottom-0 w-full rounded-full border-solid border-2 border-black'></span>
                    <p className='relative text-center'>¿Dónde?</p>
                  </div>
                </a>
              </div>
          </div>

          {/* Step 3 */}
          <div className={'w-full text-left overflow-hidden h-0 ' + (state.isActive3 ? 'active' : '')}>
              <h2 className='text-lg font-bold mb-2'>¿Dónde?</h2>
              <div className='overflow-hidden'>
                <ul className='ttd mb-6 border-solid border border-black-400 rounded-md px-8 py-6 max-h-80 overflow-scroll'>
                  <li>Metro</li>
                  <li>Norte</li>
                  <li>Sur</li>
                  <li>Este</li>
                  <li>Oeste</li>
                  <li>Centro</li>
                </ul>
              </div>
              <div className='w-full mx-auto flex justify-between'>

                <a onClick={prevSlide} href='#' className='text-black mr-4 grow-0 w-32'>
                  <div className='relative p-4 py-6 flex justify-center items-center my-4'>
                    <span className='absolute bg-white left-0 top-0 right-0 bottom-0 w-full rounded-full border-solid border-2 border-black'></span>
                    <p className='relative text-center'>Back</p>
                  </div>
                </a>

                <a href='/explore' className='text-white grow'>
                  <div className='relative p-4 py-6 flex justify-center items-center my-4'>
                    <span className='absolute bg-black left-0 top-0 right-0 bottom-0 w-full rounded-full border-solid border-2 border-black'></span>
                    <p className='relative text-center'>Continuar</p>
                  </div>
                </a>
              </div>
          </div>
         </div>
         
       </div>
      </main>
    </div>
  )
}

export default Home