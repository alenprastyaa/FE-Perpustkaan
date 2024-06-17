import "bootstrap/dist/css/bootstrap.css";

import AddAnggota from "./addAnggota";
import DeleteAnggota from "./deleteAnggota";

export const metadata = {
  title: "Anggota List",
};

type Anggota = {
  uuid: number;
  nama: string;
  jenis_kelamin: string;
  telp: string;
  alamat: string;
};

async function getAnggota() {
  const res = await fetch("http://localhost:5000/anggota", {
    cache: "no-store",
  });
  return res.json();
}

export default async function AnggotaList() {
  const anggotas: Anggota[] = await getAnggota();
  return (
    <div className="container">
      <div>
        <div>
          <AddAnggota />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nama</th>
            <th scope="col">Alamat</th>
            <th scope="col">No Tlp</th>
            <th scope="col">Jenis Kelamin</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {anggotas.map((angota, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{angota.nama}</td>
              <td>{angota.alamat}</td>
              <td>{angota.telp}</td>
              <td>{angota.jenis_kelamin}</td>
              <td>
                <div className="flex">
                  <button className="text-sm p-1 mr-2 btn btn-warning">
                    Update
                  </button>
                  <DeleteAnggota {...angota} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
