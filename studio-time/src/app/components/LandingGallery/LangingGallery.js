import Image from 'next/image'
import React from 'react'

function LangingGallery() {
    const imageList=[
        'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0dWRpb3xlbnwwfHwwfHx8MA%3D%3D',
        'https://images.unsplash.com/photo-1618609377864-68609b857e90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHN0dWRpb3xlbnwwfHwwfHx8MA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1680955436131-52b6d11cf6b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHN0dWRpb3xlbnwwfHwwfHx8MA%3D%3D',
        'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHN0dWRpb3xlbnwwfHwwfHx8MA%3D%3D',
        'https://images.unsplash.com/photo-1613870948964-7125fa3e1aab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHN0dWRpb3xlbnwwfHwwfHx8MA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1683115179796-aaf64e354441?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHxzdHVkaW98ZW58MHx8MHx8fDA%3D',
        'https://plus.unsplash.com/premium_photo-1664194584256-5c940e4e7ecf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTgxfHxzdHVkaW98ZW58MHx8MHx8fDA%3D',
        'https://plus.unsplash.com/premium_photo-1682940443809-a214f034dca1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjI5fHxzdHVkaW98ZW58MHx8MHx8fDA%3D'
    ]
  return (
    <div className='grid grid-cols-2 gap-2 h-[80vh] sm:h-[60vh] md:h-[80vh] lg:h-[80vh] xl:h-[80vh] mt-12 mb-12'>
        <div>
            {/* will be insersted from back */}
            <h3 className="font-Inter text-[#2b2b2b] font-[600]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed est massa. Quisque gravida volutpat enim id pellentesque.
            </h3>
        </div>
        <div className='grid grid-cols-4 gap-4'>
        {imageList.map((e,i)=>{return <div className='relative' key={i}>
            <Image src={e} 
            alt={i} 
            fill 
            loading="lazy"/>
        </div>})}
        </div>
    </div>
  )
}

export default LangingGallery