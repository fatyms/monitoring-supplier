import { supabase } from './supabase.js'

const kategoriSelect = document.getElementById('kategori')

const loadKategori = async () => {
  const { data } = await supabase.rpc('get_kategori_supplier')
  data.forEach(k => {
    kategoriSelect.innerHTML += `<option value="${k}">${k}</option>`
  })
}
loadKategori()

document.getElementById('supplierForm').onsubmit = async e => {
  e.preventDefault()

  await supabase.from('supplier').insert({
    nama_supplier: nama.value,
    kategori: kategori.value,
    bank: bank.value,
    no_rekening: rekening.value
  })

  alert('Supplier tersimpan')
}
