'use client'

import { Button } from '@/components/ui/button'
import ParallaxSection from './ParallaxSectionAdmin/ParallaxSection'
import StudioTestimonialsSliderAdmin from './TestimonialSliderAdmin/TestimonialSlider'
import LangingGalleryAdmin from './LandingGallery/LangingGalleryAdmin'
import LandgingGalleryLeftAdmin from './LandingGallaeryLeft/LandingGalleryLeftAdmin'
function PagePreview({ isedit, pageid, moduleid }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-[90%] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{pageid}</h2>
          <Button variant="ghost" onClick={() => {
            isedit(false)
            moduleid(null)
          }}>
            Close
          </Button>
        </div>

        {/* page edit here*/}

        {pageid=='landing'&&<div>
        <ParallaxSection
        imageUrl='https://plus.unsplash.com/premium_photo-1663956045546-80dd104c018f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG11c2ljJTIwZXF1aXBtZW50fGVufDB8fDB8fHww'
        title='Our Recording Studio'
        description='Professional environment for artists to create their best work' 
        />
        <StudioTestimonialsSliderAdmin
        />
        <ParallaxSection
        imageUrl='https://images.unsplash.com/photo-1581997743789-a3870a2e3eae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG11c2ljJTIwZXF1aXBtZW50fGVufDB8fDB8fHww'
        title='Premium Equipment'
        description='State-of-the-art gear for professional sound quality' 
        />
        <LangingGalleryAdmin
        />
        <ParallaxSection
        imageUrl="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        title="Create With Us"
        description="Book your session today and bring your music to life"
      />
      <LandgingGalleryLeftAdmin/>
        </div>
        }
                {pageid=='booking'&&<div>
        1
        </div>
        }
                {pageid=='studio'&&<div>
        2
        </div>
        }
                {pageid=='about'&&<div>
        3
        </div>
        }
                {pageid=='client'&&<div>
        4
        </div>
        }
                {pageid=='contact'&&<div>
        5
        </div>
        }
                {pageid=='gallery'&&<div>
        6
        </div>
        }

      </div>
    </div>
  )
}

export default PagePreview
