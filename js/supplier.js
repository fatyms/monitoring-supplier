import { supabase } from "./supabase.js";

const form = document.getElementById("formSupplier");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nama_supplier: document.getElementById("nama").value,
    kategori: document.getElementById("kategori").value,
    bank: document.getElementById("bank").value,
    no_rekening: document.getElementById("rekening").value
  };

  const { error } = await supabase.from("supplier").insert(data);

  if (error) {
    alert("Error: " + error.message);
  } else {
    alert("Supplier berhasil disimpan");
    form.reset();
  }
});
