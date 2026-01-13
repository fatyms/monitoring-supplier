import { supabase } from './supabase.js'

const supplierSelect = document.getElementById('supplier')
const unitSelect = document.getElementById('unit')
const hutangForm = document.getElementById('hutangForm')

const loadData = async () => {
  const { data: supplier } = await supabase.from('supplier').select()
  if (supplier) {
    supplier.forEach(s =>
      supplierSelect.innerHTML += `<option value="${s.id_supplier}">${s.nama_supplier}</option>`
    )
  }

  const { data: unit } = await supabase.rpc('get_unit')
  if (unit) {
    unit.forEach(u =>
      unitSelect.innerHTML += `<option value="${u}">${u}</option>`
    )
  }
}
loadData()

hutangForm.onsubmit = async (e) => {
  e.preventDefault()

  const payload = {
    id_supplier: document.getElementById('supplier').value,
    unit: document.getElementById('unit').value,
    nomor_invoice: document.getElementById('invoice').value,
    tanggal_invoice: document.getElementById('tglInvoice').value,
    tanggal_jatuh_tempo: document.getElementById('jatuhTempo').value,
    total_hutang: parseFloat(document.getElementById('total').value),
    dp: parseFloat(document.getElementById('dp').value),
    pembayaran: 0, // Inisialisasi default
    status: 'BELUM LUNAS' // Inisialisasi default
  }

  const { error } = await supabase.from('hutang_transaksi').insert(payload)

  if (error) {
    console.error(error)
    alert('Gagal: ' + error.message)
  } else {
    alert('Hutang tersimpan')
    hutangForm.reset()
  }
}
