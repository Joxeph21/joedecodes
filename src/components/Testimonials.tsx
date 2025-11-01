import React, { useRef } from 'react'

export default function Testimonials() {
    const sectionRef = useRef<HTMLDivElement| null>(null)
  return (
     <section
      ref={sectionRef}
      id="testimonials"
      className="bg-background text-foreground flex flex-col gap-24 relative section-container"
    >
      <h2 className="head-title"># Happy Clients</h2></section>
  )
}
