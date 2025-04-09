import { BestSeller } from '@/components/block/BestSeller/BestSeller'
import Coliection from '@/components/block/Collection/Coliection'
import Hero from '@/components/block/Hero/Hero'
import NewArrival from '@/components/block/NewArrival/NewArrival'
import Banner from '@/components/block/Banner/Banner'
const HomePage = () => {

  return (
    <section id='HomePage'>
      <Hero />
      <NewArrival />
      <Coliection />
      <BestSeller />
      <Banner />
    </section>
  )
}

export default HomePage