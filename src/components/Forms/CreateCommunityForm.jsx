import React, { useState } from 'react';
import { db } from '../../firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreateCommunityForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const communityData = {
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl || null,
        members: 0,
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'Community'), communityData);

      setLoading(false);
      console.log('Comunidade criada com sucesso!');

      navigate('/home');

      if (onClose) onClose();

    } catch (err) {
      setLoading(false);
      setError('Erro ao criar a comunidade');
      console.error('Erro ao criar a comunidade:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 left-4 text-gray-500 hover:text-blue-600 text-2x1 font-bold "
        >
          <span className="text-4xl">←</span>
        </button>

        <h2 className="text-2xl flex items-center justify-center font-bold text-gray-800 dark:text-white mb-6">
          Criar Nova Comunidade
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Título da Comunidade
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              URL do Banner (Opcional)
            </label>
            <input
              id="imageUrl"
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md focus:outline-none hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            disabled={loading} 
          >
            {loading ? 'Criando...' : 'Criar Comunidade'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunityForm;
