"use client";

import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
export default function AddAnggota() {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [telp, setTlp] = useState("");
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if (!nama || !alamat || jenis_kelamin || !telp) {
      setError("Semua Input Harus Terisi");
    }

    try {
      const response = await fetch("http://localhost:5000/anggota", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: nama,
          jenis_kelamin: jenis_kelamin,
          telp: telp,
          alamat: alamat,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Handle successful response
      setNama("");
      setJenisKelamin("");
      setAlamat("");
      setTlp("");
      router.refresh();
      setModal(false);
      setError("")
    } catch (error) {
      console.error("Error during fetch operation:", error);
    }
  }

  function handleChange() {
    setModal(!modal);
     setError("");
  }
  return (
    <div>
      <div>
        <button onClick={handleChange} className="my-3 btn btn-success">
          Tambah Data Anggota
        </button>
      </div>

      {modal && (
        <div
          className="modal modal-overlay"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tambah Data Anggota</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleChange} // Menutup modal saat tombol close diklik
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control my-3"
                      placeholder="Input Nama Anggota"
                      value={nama}
                      onChange={e => setNama(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control my-3"
                      placeholder="Alamat "
                      value={alamat}
                      onChange={e => setAlamat(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control my-3"
                      placeholder="TLP "
                      value={telp}
                      onChange={e => setTlp(e.target.value)}
                    />
                  </div>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={jenis_kelamin}
                    onChange={e => setJenisKelamin(e.target.value)}
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>

                  <div className="modal-footer">
                    <button type="submit" className="btn btn-success">
                      Save changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleChange} // Menutup modal saat tombol Close diklik
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
