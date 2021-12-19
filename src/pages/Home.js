import React,{useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import Navbar from '../Components/navbar'
import FeaturedSection from '../Components/featuredSection'
import HeroSection from '../Components/hero-section'
import Footer from '../Components/Footer'

export default function Home() {
      return(
      <>
      <Navbar/>
      <HeroSection/>
      <FeaturedSection/>
      <Footer/>
      </>
      )
}

