import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://onagcdgzuqoqtowwfvmu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uYWdjZGd6dXFvcXRvd3dmdm11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MzU1NDAsImV4cCI6MjA4MTUxMTU0MH0.YydT3OZ6_S1ewnrG4HamOg2eoNE63eYvPolvFtjMNhs";
const supabase = createClient(supabaseUrl, supabaseKey);

// ================= SUPPLIER =================
async function loadSupplier() {
  const { data } = await supabase.from("supplier").select("*").order("nama_supplier");
  document.getElementById("supplier_select").innerHTML =
    data.map(s => `<option value="${s.id_supplier}">${s.nama_supplier}</option>`).join("");
}

document.getElementById("supplierForm").addEventListener("submit", async e => {
  e.preventDefault();
  await supabase.from("supplier").insert([{
    nama_supplier: nama_supplier.value,
    jenis_supplier: jenis_supplier.value,
    bank: bank.value,
    no_rekening: no_rekening.value
  }]);
  e.target.reset();
  loadSupplier();
});

// ================= HUTANG =================
async function loadHutang() {
  const { data } = await supabase
    .from("hutang_supplier")
    .select("*, supplier(*)")
    .order("due_date");

  document.getElementById("outstandingTable").innerHTML =
    data.map(h => `
      <tr class="text-center">
        <td class="border p-2">${h.supplier.nama_supplier}</td>
        <td class="border p-2">${h.supplier.jenis_supplier}</td>
        <td class="border p-2">${h.invoice_number}</td>
        <td class="border p-2">${h.due_date}</td>
        <td class="border p-2">${h.total_amount}</td>
        <td class="border p-2">${h.dp_amount}</td>
        <td class="border p-2">${h.paid_amount}</td>
        <td class="border p-2 font-semibold">${h.status}</td>
      </tr>
    `).join("");
}

document.getElementById("hutangForm").addEventListener("submit", async e => {
  e.preventDefault();
  await supabase.from("hutang_supplier").insert([{
    id_supplier: supplier_select.value,
    invoice_number: invoice_number.value,
    tanggal_invoice: tanggal_invoice.value,
    due_date: due_date.value,
    total_amount: total_amount.value,
    dp_amount: dp_amount.value || 0,
    paid_amount: paid_amount.value || 0
  }]);
  e.target.reset();
  loadHutang();
});

loadSupplier();
loadHutang();
