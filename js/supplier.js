import { supabase } from './supabase.js'

const kategoriSelect = document.getElementById('kategori')
const form = document.getElementById('supplierForm')

// Load kategori dari RPC Supabase
const loadKategori = async () => {
  const { data, error } = await supabase.rpc('get_kategori_supplier')
  if (data) {
    data.forEach(k => {
      kategoriSelect.innerHTML += `<option value="${k}">${k}</option>`
    })
  }
}
loadKategori()

form.onsubmit = async (e) => {
  e.preventDefault()
  
  // Ambil elemen input secara spesifik
  const nama = document.getElementById('nama').value
  const kategori = document.getElementById('kategori').value
  const bank = document.getElementById('bank').value
  const rekening = document.getElementById('rekening').value

  const { error } = await supabase.from('supplier').insert({
    nama_supplier: nama,
    kategori: kategori,
    bank: bank,
    no_rekening: rekening
  })

  if (error) {
    alert('Gagal menyimpan: ' + error.message)
  } else {
    alert('Supplier tersimpan')
    form.reset()
  }
}
