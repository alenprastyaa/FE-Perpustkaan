"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Anggota = {
  uuid: number;
  nama: string;
  jenis_kelamin: string;
  telp: string;
  alamat: string;
};

export default function DeleteAnggota(anggota: Anggota) {
  const [modal, setModal] = useState(false);
  const router = useRouter();


  async function handleDelete(uuid: number) {
    try {
      await fetch(`http://localhost:5000/anggota/${uuid}`, {
        method: "DELETE",
      });
      router.refresh();
      setModal(false);
    } catch (error) {
        console.log(error)
    }
  }

  function handleChange() {
    setModal(!modal);
  }
  return (
    <div>
      <button onClick={handleChange} className="btn btn-danger">
        Delete
      </button>
      {modal && (
        <div
          className="modal modal-overlay"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Hapus Data {anggota.nama} ?</h5>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => handleDelete(anggota.uuid)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleChange} // Menutup modal saat tombol Close diklik
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
