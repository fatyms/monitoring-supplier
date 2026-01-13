import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Supabase config
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// ===================== Supplier =====================
const supplierForm = document.getElementById('supplierForm');
const supplierSelect = document.getElementById('supplier_select');

async function loadSuppliers() {
    const { data, error } = await supabase.from('supplier').select('*');
    if (data) {
        supplierSelect.innerHTML = data.map(s => `<option value="${s.id_supplier}">${s.nama_supplier} (${s.jenis_supplier})</option>`).join('');
    }
}

supplierForm.addEventListener('submit', async e => {
    e.preventDefault();
    const nama_supplier = document.getElementById('nama_supplier').value;
    const jenis_supplier = document.getElementById('jenis_supplier').value;
    const npwp = document.getElementById('npwp').value;
    const telepon = document.getElementById('telepon').value;
    const email = document.getElementById('email').value;
    const bank = document.getElementById('bank').value;
    const no_rekening = document.getElementById('no_rekening').value;

    await supabase.from('supplier').insert([{ nama_supplier, jenis_supplier, npwp, telepon, email, bank, no_rekening }]);
    supplierForm.reset();
    loadSuppliers();
});

// ===================== Hutang Supplier =====================
const hutangForm = document.getElementById('hutangForm');
const outstandingTable = document.getElementById('outstandingTable');

async function loadOutstanding() {
    const { data, error } = await supabase
        .from('hutang_supplier')
        .select('*, supplier(*)')
        .order('due_date', { ascending: true });

    if (data) {
        outstandingTable.innerHTML = data.map(h => `
            <tr>
                <td class="border p-2">${h.supplier.nama_supplier}</td>
                <td class="border p-2">${h.supplier.jenis_supplier}</td>
                <td class="border p-2">${h.invoice_number}</td>
                <td class="border p-2">${h.due_date}</td>
                <td class="border p-2">${h.total_amount}</td>
                <td class="border p-2">${h.dp_amount}</td>
                <td class="border p-2">${h.paid_amount}</td>
                <td class="border p-2">${h.status}</td>
            </tr>
        `).join('');
    }
}

hutangForm.addEventListener('submit', async e => {
    e.preventDefault();
    const id_supplier = supplierSelect.value;
    const invoice_number = document.getElementById('invoice_number').value;
    const tanggal_invoice = document.getElementById('tanggal_invoice').value;
    const due_date = document.getElementById('due_date').value;
    const total_amount = parseFloat(document.getElementById('total_amount').value);
    const dp_amount = parseFloat(document.getElementById('dp_amount').value || 0);
    const paid_amount = parseFloat(document.getElementById('paid_amount').value || 0);

    await supabase.from('hutang_supplier').insert([{ id_supplier, invoice_number, tanggal_invoice, due_date, total_amount, dp_amount, paid_amount }]);
    hutangForm.reset();
    loadOutstanding();
});

// Load supplier list and outstanding table on start
loadSuppliers();
loadOutstanding();
