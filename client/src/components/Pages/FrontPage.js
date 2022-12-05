import React from 'react'
import Coat from '../FrontPageComponents/Coat/Coat'
import Footer from '../FrontPageComponents/Footer/Footer'
import Gallery from '../FrontPageComponents/Gallery/Gallery'
import Hero from '../FrontPageComponents/Hero/Hero'
import Navbar from '../FrontPageComponents/Navbar/Navbar'
import Poetries from '../FrontPageComponents/Poetries/Poetries'
import Poets from '../FrontPageComponents/Poets/Poets'

function FrontPage() {
  return (
    <>
          
    <Hero></Hero>
    <Gallery></Gallery>
    <Poetries></Poetries>
    <Coat></Coat>
    <Poets></Poets>
    <Footer></Footer>
    </>
    
  )
}

export default FrontPage