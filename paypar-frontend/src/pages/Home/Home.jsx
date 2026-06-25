import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import InfoSection from '../../components/InfoSection/InfoSection';
import Footer from '../../components/Footer/Footer';
import PlateInput from '../../components/ui/PlateInput';
import { api } from '../../services/api';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const navigate              = useNavigate();

  const handleSearch = async (plate) => {
    setError('');
    setLoading(true);
    try {
      await api.getTicketByPlate(plate);
      navigate(`/parking?plate=${plate}`);
    } catch {
      setError('No se encontró un ticket activo para esa placa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      <section className="py-16 px-6" id="buscar">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
            Consulta tu vehículo
          </h2>
          <p className="text-slate-500 text-center text-sm mb-6">
            Ingresa la placa para consultar tu ticket activo
          </p>
          <PlateInput onSearch={handleSearch} loading={loading} />
          {error && (
            <p className="mt-3 text-red-500 text-sm text-center">{error}</p>
          )}
        </div>
      </section>

      <InfoSection />
      <Footer />
    </div>
  );
};

export default Home;
