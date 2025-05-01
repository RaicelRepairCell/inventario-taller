
// Archivo: App.jsx
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jpijhsyjvxaerxlpakrv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [herramientas, setHerramientas] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '', cantidad: '', estado: '', ubicacion: '', fecha_ingreso: '',
    cantidad_vendida: '', proveedor: '', precio_proveedor: '', precio_venta: ''
  });

  useEffect(() => {
    fetchInventario();
  }, []);

  async function fetchInventario() {
    const { data } = await supabase.from('inventario').select('*').order('id', { ascending: false });
    setHerramientas(data);
  }

  async function agregarHerramienta() {
    const { error } = await supabase.from('inventario').insert([formData]);
    if (!error) {
      setFormData({ nombre: '', cantidad: '', estado: '', ubicacion: '', fecha_ingreso: '', cantidad_vendida: '', proveedor: '', precio_proveedor: '', precio_venta: '' });
      fetchInventario();
    } else {
      alert('Error al guardar');
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Inventario del Taller</h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.keys(formData).map(key => (
          <input
            key={key}
            className="border p-2 rounded"
            placeholder={key.replace('_', ' ')}
            value={formData[key]}
            onChange={e => setFormData({ ...formData, [key]: e.target.value })}
            type={key.includes('fecha') ? 'date' : 'text'}
          />
        ))}
      </div>
      <button onClick={agregarHerramienta} className="bg-blue-600 text-white px-4 py-2 rounded mb-6">Agregar</button>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            {Object.keys(formData).map(key => (
              <th key={key} className="border px-2 py-1">{key.replace('_', ' ')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {herramientas.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {Object.keys(formData).map(key => (
                <td key={key} className="border px-2 py-1">{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
