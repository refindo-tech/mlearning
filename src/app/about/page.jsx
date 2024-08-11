import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Background from "@/components/Background"
const AboutPage = () => {
    return (
        <>
            <Navbar />
            <div className="h-screen w-full flex items-center bg-[url('/assets/image/heroonboarding.png')] bg-cover bg-no-repeat bg-center">
            </div>
            <div className="h-[100px] flex items-center text-center justify-center border-b-2 border-gray-200">
                <h3 className="font-bold text-[32px]">Tentang M-Learning</h3>
            </div>
            <div className="relative">
                <Background />
                <div className="absolute top-0 w-full z-10">
                    <div className="container mx-auto py-10">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint deserunt, nostrum ea a eaque, animi suscipit dolorem enim, quasi molestias tempore. Sequi inventore enim voluptatum velit id optio! Libero, autem.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat consequuntur quos autem, ullam exercitationem impedit distinctio ipsum quae facilis, eos quisquam qui omnis? Ut velit quidem voluptatibus tempore quam repudiandae?
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, id at asperiores, ipsa dolor dolorem repellendus aut aliquid veritatis facere consectetur modi dicta odio, ab non voluptatem sequi adipisci. Expedita.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint deserunt, nostrum ea a eaque, animi suscipit dolorem enim, quasi molestias tempore. Sequi inventore enim voluptatum velit id optio! Libero, autem.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat consequuntur quos autem, ullam exercitationem impedit distinctio ipsum quae facilis, eos quisquam qui omnis? Ut velit quidem voluptatibus tempore quam repudiandae?
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, id at asperiores, ipsa dolor dolorem repellendus aut aliquid veritatis facere consectetur modi dicta odio, ab non voluptatem sequi adipisci. Expedita.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint deserunt, nostrum ea a eaque, animi suscipit dolorem enim, quasi molestias tempore. Sequi inventore enim voluptatum velit id optio! Libero, autem.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat consequuntur quos autem, ullam exercitationem impedit distinctio ipsum quae facilis, eos quisquam qui omnis? Ut velit quidem voluptatibus tempore quam repudiandae?
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, id at asperiores, ipsa dolor dolorem repellendus aut aliquid veritatis facere consectetur modi dicta odio, ab non voluptatem sequi adipisci. Expedita.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default AboutPage