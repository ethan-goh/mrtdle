import React from 'react'
import Mrtle from '../components/Mrtle';

const Home = () => {
  return (
    <div>
        <section className="min-h-screen flex flex-col items-center justify-start px-4 py-8 text-center text-3xl font-semibold overflow-y-auto">
          <div className="mt-25">
            Try today's daily MRT puzzle!
            <Mrtle/>
          </div>
        </section>
    </div>
  )
}

export default Home;