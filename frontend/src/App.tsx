import { useEffect, useState } from 'react';
import axios from 'axios';
import FormPessoa from './components/FormPessoa';
import ListaPessoas from './components/ListaPessoas';

export interface Pessoa {
  _id: string;
  nome: string;
  email?: string;
  idade?: number;
  createdAt: string;
}

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function App() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  const carregar = async () => {
    const { data } = await axios.get(`${API}/pessoas`);
    setPessoas(data);
  };

  const adicionar = async (pessoa: Omit<Pessoa, '_id' | 'createdAt'>) => {
    const { data } = await axios.post(`${API}/pessoas`, pessoa);
    setPessoas([data, ...pessoas]);
  };

  const remover = async (id: string) => {
    await axios.delete(`${API}/pessoas/${id}`);
    setPessoas(pessoas.filter(p => p._id !== id));
  };

  useEffect(() => { carregar(); }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-2">
          Cadastro de Pessoas
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Node + TS + Mongo + React + Tailwind 🚀
        </p>

        <FormPessoa onAdicionar={adicionar} />
        <ListaPessoas pessoas={pessoas} onRemover={remover} />
      </div>
    </div>
  );
}

export default App;
