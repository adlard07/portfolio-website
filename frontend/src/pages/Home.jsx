import BgImage from '../assets/bg-image.jpg';
import About from '../components/About';
import ProjectCards from '../components/ProjectCards';
import Connect from '../components/Connect';
import Memes from '../components/Memes';

const HomePage = () => {
    return (
        <div className="bg-black text-white">
            {/* Hero Section with Background Image */}
            <div
                className="relative h-screen flex items-center justify-center text-center px-6"
                style={{
                    backgroundImage: `url(${BgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Gradient Overlay for Better Readability */}
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-0"></div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-3xl">
                    <h1 className="text-6xl font-extrabold leading-tight tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white drop-shadow-lg">
                        Transforming Data into Intelligent Solutions
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 font-light max-w-2xl mx-auto">
                        Unlocking patterns, making data-driven decisions, and shaping the future with AI and Machine Learning.
                    </p>
                </div>
            </div>

            {/* Sections */}
            
            <About />
            <ProjectCards />
            <Memes />
            <Connect />
        </div>
    );
};

export default HomePage;
