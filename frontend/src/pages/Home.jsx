import ComoFunciona from '../components/shared/ComoFunciona'
import Hero from '../components/shared/Hero'
import BannerServiGallery from '../components/shared/BannerServiGallery'
import CarruselCategorias from '../components/shared/CarruselCategorias'

const Home = () => {
  return (
    <div>
      <Hero />
      <ComoFunciona/>
      <BannerServiGallery/>
      <CarruselCategorias />
    </div>
  )
}

export default Home
