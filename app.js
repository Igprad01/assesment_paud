const STORAGE_KEY = 'paud_asesmen_v1';

const MOMEN = {
  'Nilai Agama dan Moral': [
    'Mengucap doa sebelum kegiatan',
    'Menghormati orang tua dan guru',
    'Berbagi makanan dengan teman',
    'Merapikan mainan setelah digunakan'
  ],
  'Fisik-Motorik': [
    'Melompat dengan dua kaki',
    'Berlari tanpa jatuh',
    'Menangkap bola dengan kedua tangan',
    'Menaiki tangga dengan kaki bergantian'
  ],
  Kognitif: [
    'Mengenal warna dasar',
    'Mengurutkan angka 1 sampai 10',
    'Menyelesaikan puzzle sederhana',
    'Mengelompokkan bentuk geometri'
  ],
  Bahasa: [
    'Bercerita dengan lancar',
    'Menyanyikan lagu sederhana',
    'Mengikuti instruksi guru',
    'Menyebut nama benda di sekitar'
  ],
  'Sosial-Emosional': [
    'Berkemitra dengan teman',
    'Mengemukan perasaan dengan kata',
    'Menunggu giliran bermain',
    'Bersedia membantu teman'
  ],
  Seni: [
    'Menggambar bebas dengan kreatif',
    'Membuat karya dari bahan bekas',
    'Menari mengikuti irama musik',
    'Mewarnai dalam garis'
  ]
};

const state = {
  step: 1,
  usia: '',
  aspek: '',
  momen: [],
  nama: '',
  tanggal: '',
  jam: '',
  konteks: '',
  catatan: '',
  objektif: '',
  skala: '',
  tindakLanjut: ''
};

const els = {
  progressItems: document.querySelectorAll('.progress-item'),
  steps: document.querySelectorAll('.step'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  saveBtn: document.getElementById('saveBtn'),
  printBtn: document.getElementById('printBtn'),
  summary: document.getElementById('summary'),
  raporOutput: document.getElementById('raporOutput'),
  raporText: document.getElementById('raporText'),
  momenGroup: document.getElementById('momenGroup'),
  momenHint: document.getElementById('momenHint'),
  inputs: {
    usia: document.getElementById('usia'),
    aspek: document.getElementById('aspek'),
    nama: document.getElementById('nama'),
    tanggal: document.getElementById('tanggal'),
    jam: document.getElementById('jam'),
    konteks: document.getElementById('konteks'),
    catatan: document.getElementById('catatan'),
    objektif: document.getElementsByName('objektif'),
    skala: document.getElementsByName('skala'),
    tindakLanjut: document.getElementById('tindakLanjut')
  }
};

function saveDraft() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Gagal menyimpan draft ke localStorage:', e);
  }
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    Object.assign(state, data);
  } catch (e) {
    console.warn('Gagal memuat draft dari localStorage:', e);
  }
}

function applyStateToUI() {
  els.inputs.usia.value = state.usia || '';
  els.inputs.aspek.value = state.aspek || '';
  renderMomen(state.aspek);
  if (state.momen && state.momen.length) {
    state.momen.forEach((val) => {
      const input = els.momenGroup.querySelector(`input[value="${escapeAttr(val)}"]`);
      if (input) input.checked = true;
    });
  }
  els.inputs.nama.value = state.nama || '';
  els.inputs.tanggal.value = state.tanggal || '';
  els.inputs.jam.value = state.jam || '';
  els.inputs.konteks.value = state.konteks || '';
  els.inputs.catatan.value = state.catatan || '';
  setRadioChecked(els.inputs.objektif, state.objektif);
  setRadioChecked(els.inputs.skala, state.skala);
  els.inputs.tindakLanjut.value = state.tindakLanjut || '';
}

function setRadioChecked(radios, value) {
  for (const radio of radios) {
    radio.checked = radio.value === value;
  }
}

function renderMomen(aspek) {
  els.momenGroup.innerHTML = '';
  const items = MOMEN[aspek] || [];
  if (!items.length) {
    els.momenHint.textContent = 'Pilih aspek STPPA untuk melihat momen belajar.';
    return;
  }
  els.momenHint.textContent = 'Pilih satu atau lebih momen belajar yang teramati.';
  items.forEach((text) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = 'momen';
    input.value = text;
    label.appendChild(input);
    label.appendChild(document.createTextNode(text));
    els.momenGroup.appendChild(label);
  });
}

function readForm() {
  const checkedMomen = [];
  for (const input of els.momenGroup.querySelectorAll('input:checked')) {
    checkedMomen.push(input.value);
  }

  return {
    step: state.step,
    usia: els.inputs.usia.value.trim(),
    aspek: els.inputs.aspek.value.trim(),
    momen: checkedMomen,
    nama: els.inputs.nama.value.trim(),
    tanggal: els.inputs.tanggal.value.trim(),
    jam: els.inputs.jam.value.trim(),
    konteks: els.inputs.konteks.value.trim(),
    catatan: els.inputs.catatan.value.trim(),
    objektif: getCheckedValue(els.inputs.objektif),
    skala: getCheckedValue(els.inputs.skala),
    tindakLanjut: els.inputs.tindakLanjut.value.trim()
  };
}

function getCheckedValue(radios) {
  for (const radio of radios) {
    if (radio.checked) return radio.value;
  }
  return '';
}

function showStep(n) {
  state.step = Math.min(Math.max(n, 1), 8);
  els.steps.forEach((section, i) => {
    section.classList.toggle('active', i + 1 === state.step);
  });
  els.progressItems.forEach((item, i) => {
    item.classList.toggle('current', i + 1 === state.step);
  });

  const first = state.step === 1;
  const last = state.step === 8;
  els.prevBtn.disabled = first;
  els.nextBtn.hidden = last;
  els.nextBtn.textContent = last ? 'Selesai' : 'Selanjutnya';

  if (last) renderSummary();

  window.scrollTo({ top: 0, behavior: 'smooth' });
  saveDraft();
}

function validateStep(n) {
  const f = readForm();
  switch (n) {
    case 1:
      return f.usia ? '' : 'Pilih kelompok usia anak terlebih dahulu.';
    case 2:
      if (!f.aspek) return 'Pilih aspek STPPA.';
      if (!f.momen.length) return 'Pilih setidaknya satu momen belajar.';
      return '';
    case 3:
      if (!f.nama) return 'Isi nama anak (inisial).';
      if (!f.tanggal) return 'Isi tanggal pengamatan.';
      return '';
    case 4:
      if (!f.konteks) return 'Isi konteks kegiatan.';
      if (!f.catatan) return 'Isi catatan perilaku.';
      return '';
    case 5:
      return f.objektif ? '' : 'Pilih hasil uji objektivitas (Ya / Tidak).';
    case 6:
      return f.skala ? '' : 'Pilih skala penilaian.';
    case 7:
      return f.tindakLanjut ? '' : 'Isi rencana tindak lanjut pedagogis.';
    default:
      return '';
  }
}

function goNext() {
  const error = validateStep(state.step);
  if (error) {
    alert(error);
    return;
  }
  Object.assign(state, readForm());
  saveDraft();
  if (state.step < 8) showStep(state.step + 1);
}

function goPrev() {
  if (state.step > 1) {
    Object.assign(state, readForm());
    saveDraft();
    showStep(state.step - 1);
  }
}

function renderSummary() {
  const f = readForm();
  const skalaLabel = {
    BB: 'Belum Berkembang',
    MB: 'Mulai Berkembang',
    BSH: 'Berkembang Sesuai Harapan',
    BSB: 'Berkembang Sangat Baik'
  }[f.skala] || f.skala;

  const html = `
    <dl>
      <dt>Nama Anak</dt><dd>${escapeHtml(f.nama || '-')}</dd>
      <dt>Semester / Tanggal</dt><dd>${escapeHtml(f.tanggal || '-')}${f.jam ? ' pukul ' + escapeHtml(f.jam) : ''}</dd>
      <dt>Kelompok Usia</dt><dd>${escapeHtml(f.usia || '-')}</dd>
      <dt>Aspek STPPA</dt><dd>${escapeHtml(f.aspek || '-')}</dd>
      <dt>Indikator / Momen Belajar</dt><dd>${escapeHtml(f.momen.join(', ') || '-')}</dd>
      <dt>Konteks Kegiatan</dt><dd>${escapeHtml(f.konteks || '-')}</dd>
      <dt>Catatan Perilaku</dt><dd>${escapeHtml(f.catatan || '-')}</dd>
      <dt>Uji Objektivitas</dt><dd>${escapeHtml(f.objektif || '-')}</dd>
      <dt>Skala Penilaian</dt><dd>${escapeHtml(f.skala || '-')} &mdash; ${escapeHtml(skalaLabel)}</dd>
      <dt>Tindak Lanjut Pedagogis</dt><dd>${escapeHtml(f.tindakLanjut || '-')}</dd>
    </dl>
  `;
  els.summary.innerHTML = html;
}

function generateRapor() {
  const f = readForm();
  const skalaLabel = {
    BB: 'Belum Berkembang',
    MB: 'Mulai Berkembang',
    BSH: 'Berkembang Sesuai Harapan',
    BSB: 'Berkembang Sangat Baik'
  }[f.skala] || f.skala;

  return `
    <p><strong>Nama Anak:</strong> ${escapeHtml(f.nama || '-')}</p>
    <p><strong>Tanggal / Jam:</strong> ${escapeHtml(f.tanggal || '-')}${f.jam ? ' pukul ' + escapeHtml(f.jam) : ''}</p>
    <p><strong>Kelompok Usia:</strong> ${escapeHtml(f.usia || '-')}</p>
    <p><strong>Aspek STPPA:</strong> ${escapeHtml(f.aspek || '-')}</p>
    <p><strong>Indikator / Momen Belajar:</strong> ${escapeHtml(f.momen.join(', ') || '-')}</p>
    <p><strong>Konteks Kegiatan:</strong> ${escapeHtml(f.konteks || '-')}</p>
    <p><strong>Skala Penilaian:</strong> ${escapeHtml(f.skala || '-')} &mdash; ${escapeHtml(skalaLabel)}</p>
    <p><strong>Catatan Perilaku:</strong> ${escapeHtml(f.catatan || '-')}</p>
    <p><strong>Tindak Lanjut Pedagogis:</strong> ${escapeHtml(f.tindakLanjut || '-')}</p>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function escapeAttr(text) {
  return String(text).replace(/"/g, '&quot;');
}

function bindInputs() {
  const inputs = [
    els.inputs.usia,
    els.inputs.aspek,
    els.inputs.nama,
    els.inputs.tanggal,
    els.inputs.jam,
    els.inputs.konteks,
    els.inputs.catatan,
    els.inputs.tindakLanjut
  ];

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      Object.assign(state, readForm());
      saveDraft();
    });
  });

  els.inputs.aspek.addEventListener('change', () => {
    renderMomen(els.inputs.aspek.value);
    Object.assign(state, readForm());
    saveDraft();
  });

  els.momenGroup.addEventListener('change', () => {
    Object.assign(state, readForm());
    saveDraft();
  });

  for (const radio of els.inputs.objektif) {
    radio.addEventListener('change', () => {
      Object.assign(state, readForm());
      saveDraft();
    });
  }

  for (const radio of els.inputs.skala) {
    radio.addEventListener('change', () => {
      Object.assign(state, readForm());
      saveDraft();
    });
  }
}

function init() {
  loadDraft();
  applyStateToUI();
  bindInputs();
  showStep(1);

  els.prevBtn.addEventListener('click', goPrev);
  els.nextBtn.addEventListener('click', goNext);

  els.saveBtn.addEventListener('click', () => {
    const error = validateStep(8);
    if (error) {
      alert(error);
      showStep(Math.min(state.step, 7));
      return;
    }
    Object.assign(state, readForm());
    saveDraft();
    renderSummary();
    els.raporText.innerHTML = generateRapor();
    els.raporOutput.hidden = false;
    els.raporOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  els.printBtn.addEventListener('click', () => {
    window.print();
  });
}

document.addEventListener('DOMContentLoaded', init);
