import { supabase } from './supabase.js'

const { data } = await supabase
  .from('hutang_transaksi')
  .select(`
    nomor_invoice,
    unit,
    tanggal_jatuh_tempo,
    total_hutang,
    dp,
    pembayaran,
    status,
    supplier(nama_supplier)
  `)
  .neq('status', 'LUNAS')

data.forEach(h => {
  dataEl.innerHTML += `
  <tr>
    <td>${h.supplier.nama_supplier}</td>
    <td>${h.unit}</td>
    <td>${h.nomor_invoice}</td>
    <td>${h.tanggal_jatuh_tempo}</td>
    <td>${h.total_hutang - (h.dp + h.pembayaran)}</td>
    <td>${h.status}</td>
  </tr>`
})
