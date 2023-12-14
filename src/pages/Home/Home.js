import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Home.css';

// const FadeInScroll = ({ children }) => {
//   const animatedDivRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('fade-in');
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.5, once: true }
//     );
  
//     if (animatedDivRef.current) {
//       observer.observe(animatedDivRef.current);
//     }
  
//     return () => {
//       if (animatedDivRef.current) {
//         observer.disconnect();
//       }
//     };
//   }, []);

//   return <div ref={animatedDivRef}>{children}</div>;
// };

const Home = () => {
  useEffect(() => {
    document.title = 'Home - Klinik Ridsu';
  }, []);

  return (
    <div>
      <Header />

      <div className="head-home">
        <h1>Selamat Datang di Klinik Ridsu</h1>
        <p>Tempat Terbaik untuk Pelayanan Kesehatan</p>
        <img style={{ width: '500px' }} src={require('../../assets/images/klinik.jpg')} alt="" />
      </div>

      <section id="body-home">
        <h1 style={{ textAlign: 'center' }}>INFORMASI</h1>
        {/* <FadeInScroll> */}
          <section id="klinik-terbaik">
              <h2>Klinik Terbaik</h2>
              <img style={{ width: '500px' }} src={require('../../assets/images/tempat.jpg')} alt="" />
              <p>
                Dengan komitmen untuk memberikan perawatan yang canggih dan perhatian yang personal, Klinik Ridsu menjadi destinasi utama bagi pasien yang mencari pengalaman medis yang unggul.
              </p>
            </section>
          <section id="dokter-kompeten">
            <h2>Dokter Kompeten</h2>
            <img style={{ width: '500px' }} src={require('../../assets/images/bagus.jpeg')} alt="" />
            <p>
              Tim profesional kami terdiri dari dokter dan tenaga kesehatan berpengalaman yang didedikasikan untuk memberikan perawatan holistik kepada setiap pasien.
            </p>
          </section>
        {/* </FadeInScroll> */}
      </section>

      <Footer />
    </div>
  );
};

export default Home;
