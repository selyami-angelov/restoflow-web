import { Carousel } from 'flowbite-react'
import img1 from '../../assets/carousel/0lYlxgUlTrWoe84IPi7j_Truffle Mushroom Pizza2_Andrew Thomas Lee _Nov 2019.avif'
import img2 from '../../assets/carousel/2116801202023_Colletta-Cary_Andrew-Cebulka-14603.avif'
import img3 from '../../assets/carousel/4515101202023_Colletta-Cary_Andrew-Cebulka-14687.avif'
import img4 from '../../assets/carousel/6907001202023_Colletta-Cary_Andrew-Cebulka-14513.avif'
import img5 from '../../assets/carousel/8078001202023_Colletta-Cary_Andrew-Cebulka-14607.avif'

export const Home = () => {
  return (
    <div className="w-full h-full p-10 bg-white dark:bg-gray-800 relative">
      <Carousel slideInterval={3000}>
        <img alt="image 1" src={img1} />
        <img alt="image 2" src={img2} />
        <img alt="image 3" src={img3} />
        <img alt="image 4" src={img4} />
        <img alt="image 5" src={img5} />
      </Carousel>
      <div className="absolute bottom-1 left-9 bg-white w-96 h-20 flex items-center justify-center dark:bg-gray-800 rounded-r-md">
        <h2 className="text-5xl font-semibold italic text-gray-600/90 dark:text-white/90">Welcome</h2>
      </div>
    </div>
  )
}
