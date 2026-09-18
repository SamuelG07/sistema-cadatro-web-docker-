import { Pessoa } from '../App';

interface Props {
  pessoas: Pessoa[];
  onRemover: (id: string) => void;
}

export default function ListaPessoas({ pessoas, onRemover }: Props) {
  if (pessoas.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-500">
        Nenhuma pessoa cadastrada ainda.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {pessoas.map((p) => (
          <li
            key={p._id}
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="font-semibold text-gray-800">{p.nome}</p>
              <p className="text-sm text-gray-500">
                {p.email && <span>{p.email}</span>}
                {p.email && p.idade && <span> • </span>}
                {p.idade && <span>{p.idade} anos</span>}
              </p>
            </div>

            <button
              onClick={() => onRemover(p._id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors text-sm font-medium"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
