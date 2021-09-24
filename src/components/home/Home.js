import "./Home.css"
import homePic from '../../images/homePagePic.png'


export const Home = () => {



    return(

        <>
            <h2>Welcome to Coburn's Exclusive</h2>
            <div className="about">
                <section className="about__blurb">
                <p><b>Since 2009, Coburn’s Exclusive has called Nashville, Tennessee home. We are an architectural metal design and fabrication company.  
                    Our team works to deliver a timeless and handcrafted product while balancing the needs of our customer first.</b></p>

                <p>Our work has been featured in several publications and we are proud to offer a diversification of work experience in commercial 
                    fabrication, installation and our  in house design for accuracy and efficiency, With added 3D laser scanning we can offer the accuracy and speed rarely 
                    found in the decorative and structural metal world.  We offer and endless line-up of custom powder coating finishes and hand applied patina's,  our shops 
                    ability for precision fabrication through the use of our water-jet system, tube bending, cutting and CNC bending capabilities allow us to offering matched  accuracy and speed. </p>

                <p>Take the opportunity to get to know us better and visit some of our past work in our online portfolio.  We are proud to offer our design, fabrication, 
                    finish, and installation services in a number of industries including: architectural,  restaurants/hospitality, railings, commercial signage and lighting to name a few.  </p>

                <p>We are always looking to expand our capabilities and test our skills so please reach out if we may be of help to you in your project.  We will never forget that our customers 
                    made us who we are today!</p>
                </section>
            <img className="homePic" src={homePic} width="500" height="500"></img>
            </div>
        </>
    )
}