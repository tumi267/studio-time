import ParticleEffectImage from "./components/Hero/ParticleEffectImage";
import LangingGallery from "./components/LandingGallery/LangingGallery";
import StudioTestimonialsSlider from "./components/TestimonialSlider/TestimonialSlider";

export default function Home() {
  return (
    <main >
      <ParticleEffectImage
      src={'https://plus.unsplash.com/premium_photo-1680955436007-264b858768e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZGlvfGVufDB8fDB8fHww'}/>
      <StudioTestimonialsSlider/>
      <LangingGallery/>
    </main>
  )
}
