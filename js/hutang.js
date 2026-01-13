import { supabase } from "./supabase.js";

const supplierSelect = document.getElementById("supplier");
const form = document.getElementById("formHutang");

// load supplier
const loadSupplier = async () => {
  const { data } = await supabase.from("supplier").select("id_supplier, nama_supplier");

  supplierSelect.innerHTML = `<option value="">Pilih Supplier</option>`;
  data.forEach(s => {
    supplierSelect.innerHTML += `
      <option value="${s.id_supplier}">
        ${s.nama_supplier}
      </option>`;
  });
};

loadSupplier();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    id_supplier: supplierSelect.value,
    unit: document.getElementById("unit").value,
    nomor_invoice: document.getElementById("invoice").value,
    tanggal_invoice: document.getElementById("tglInvoice").value,
    tanggal_jatuh_tempo: document.getElementById("jatuhTempo").value,
    total_hutang: document.getElementById("total").value,
    dp: document.getElementById("dp").value || 0
  };

  const { error } = await supabase.from("hutang_transaksi").insert(data);

  if (error) {
    alert(error.message);
  } else {
    alert("Hutang berhasil disimpan");
    form.reset();
  }
});
