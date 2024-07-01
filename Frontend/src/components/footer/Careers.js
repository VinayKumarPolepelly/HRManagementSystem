import React from 'react'
import FooterHeader from './FooterHeader'

const Careers = () => {
  return (
    <div>
      <FooterHeader />
      <div className="px-4 py-8">
        <div className="mx-[7%]">
          <div className="flex flex-col lg:flex-row items-start mt-24">
            <div className="lg:w-1/2 lg:pl-8">
              <h2 className="text-2xl font-semibold text-red-300">
                CHANGE THE WORLD
              </h2>
              <h2 className="text-2xl font-semibold text-black mt-4">
                Life is too short to do mediocre work
              </h2>
              <p className="mt-4 text-lg text-blueGray-700">
                Most people die never realizing they lived a life doing mediocre
                work. If you aren’t one among them and need a purpose and
                meaning to what you do, you will find company at Keka. We do our
                best, to make your job feel inspired, enthused and is something
                that you would look forward to doing every day, something that
                would push you out of your bed. And not make you wonder everyday
                when your next vacation is. We do have a vacation policy though
                and we encourage that employees avail it. But that’s another
                topic.
              </p>
            </div>
            <div className="lg:w-1/2 lg:pr-8">
              <img
                src="https://d2w2i7rp1a0wob.cloudfront.net/static/images/about/team-collage.jpg"
                alt="Team Collage"
                className="w-full h-auto lg:w-3/4 mx-auto"
                style={{ maxHeight: '300px' }}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start mt-8">
            <div className="lg:w-1/2 lg:pr-8 order-2 lg:order-1">
              <img
                src="https://d2w2i7rp1a0wob.cloudfront.net/static/images/about/our-mission.jpg"
                alt="Our Mission"
                className="w-full h-auto lg:w-3/4 mx-auto"
                style={{ maxHeight: '300px' }}
              />
            </div>
            <div className="lg:w-1/2 lg:pl-8 order-1 lg:order-2">
              <h2 className="text-2xl font-semibold text-red-600">
                WE HAVE A PURPOSE
              </h2>
              <p className="mt-2 text-lg text-black">
                Join our purpose. Not because we are cool or you are cool.
              </p>
              <p className="mt-4 text-lg text-blueGray-700">
                We have a purpose and we are serious about it. The tools we use
                and the goals we pursue are part of our journey. We are on a
                mission to make every employee a growth enabler in every small
                medium business across this nation and other nations.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start mt-8">
            <div className="lg:w-1/2 lg:pl-8">
              <h2 className="text-2xl font-semibold text-blue-900 mt-8">
                Skills matter some. Attitude matters most.
              </h2>
              <p className="mt-4 text-lg text-blueGray-700">
                Skills are mere tools to accomplish tasks and can be learned and
                unlearned anytime. But the attitude you bring to the table when
                solving obstacles makes all the difference and gives purpose to
                those skills and the people around you. That’s what matters to
                us most. If you like this notion - we are excited and can’t wait
                to talk to you! Explore the job openings below and apply now!
              </p>
            </div>
            <div className="lg:w-1/2 lg:pr-8">
              <img
                src="https://d2w2i7rp1a0wob.cloudfront.net/static/images/about/Attitude.jpg"
                alt="Attitude Matters Most"
                className="w-full h-auto lg:w-3/4 mx-auto"
                style={{ maxHeight: '300px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Careers
