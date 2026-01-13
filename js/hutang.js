import { supabase } from './supabase.js'

const supplierSelect = document.getElementById('supplier')
const unitSelect = document.getElementById('unit')

const loadData = async () => {
  const { data: supplier } = await supabase.from('supplier').select()
  supplier.forEach(s =>
    supplierSelect.innerHTML += `<option value="${s.id_supplier}">${s.nama_supplier}</option>`
  )

  const { data: unit } = await supabase.rpc('get_unit')
  unit.forEach(u =>
    unitSelect.innerHTML += `<option>${u}</option>`
  )
}
loadData()

hutangForm.onsubmit = async e => {
  e.preventDefault()

  await supabase.from('hutang_transaksi').insert({
    id_supplier: supplier.value,
    unit: unit.value,
    nomor_invoice: invoice.value,
    tanggal_invoice: tglInvoice.value,
    tanggal_jatuh_tempo: jatuhTempo.value,
    total_hutang: total.value,
    dp: dp.value
  })

  alert('Hutang tersimpan')
}
