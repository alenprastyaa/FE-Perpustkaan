import 'bootstrap/dist/css/bootstrap.css';
export async function Home () {
  const res = await fetch(
    `http://localhost:5000/anggota`,{
      method : 'GET'
    }
  )
  const anggota = await res.json()
  console.log(anggota)
  return (
    <div className='container'>
      <h1 className="text-red-700 text-sm">Halo nama Saya Alen </h1>
      <button className="bg-red-700 text-white p-1.5 rounded-lg">Hapus Data</button>
    </div>
  )
}

export default Home

