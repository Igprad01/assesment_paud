const STORAGE_KEY = 'sipaud_asesmen_v1';

const state = {
  step: 1,
  nama: '',
  usia: '',
  tanggalJam: '',
  konteks: '',
  aspek: '',
  cp: '',
  tp: '',
  indikator: '',
  teknik: 'anekdot',
  catatan: ''
};

const TECHNIKS = {
  anekdot: {
    label: 'Anekdot',
    title: 'Catatan Butki Observasi (Anekdot)',
    desc: 'Rekam fakta perikau yang terlihat dan terdengar secara objektif.',
    hints: [
      'Tulis apa yang terlihat dan terdengar, tanpa penilaian.',
      'Sertakan waktu, tempat, dan siapa yang terlibat.',
      'Hindari kata subjektif seperti "nakal" atau "pintar".'
    ]
  },
  running: {
    label: 'Running Record',
    title: 'Catatan Kronologis (Running Record)',
    desc: 'Catat urutan perikau dari awal hingga akhir dalam rentang waktu tertentu.',
    hints: [
      'Catat jam mulai dan selesai observasi.',
      'Urutkan perikau berdasarkan waktu kejadian.',
      'Sertakan respons anak terhadap stimuli.'
    ]
  },
  checklist: {
    label: 'Checklist',
    title: 'Daftar Periksa Kemampuan (Checklist)',
    desc: 'Tandai apakah anak telah menunjukkan keterampilan tertentu.',
    hints: [
      'Siapkan daftar indikator yang diamati.',
      'Tandai "Ya" atau "Tidak" untuk setiap indikator.',
      'Catat bukti pendukung jika diperlukan.'
    ]
  },
  unjuk: {
    label: 'Unjuk Kerja',
    title: 'Penilaian Unjuk Kerja',
    desc: 'Nilai kualitas hasil karya atau tugas anak dengan rubrik.',
    hints: [
      'Tentukan kriteria penilaian sebelum mulai.',
      'Gunakan skala BB-MB-BSH-BSB.',
      'Catat komentar spesifik terhadap hasil karya.'
    ]
  },
  event: {
    label: 'Event Sampling',
    title: 'Pencatatan Peristiwa (Event Sampling)',
    desc: 'Catat pola perilaku yang muncul berulang kali.',
    hints: [
      'Definisikan perilaku target yang akan dicatat.',
      'Catat pemicu (Antecedent) dan akibat (Consequence).',
      'Catat frekuensi dan waktu kejadian.'
    ]
  }
};

const PLANNING = {
  'Nilai Agama dan Moral': {
    cp: [
      'Anak mengenal dan meyakini Tuhan Yang Maha Esa melalui ciptaan-Nya',
      'Anak mengenal dan mempraktikkan ajaran agama yang dianutnya dalam kehidupan sehari-hari',
      'Anak terbiasa berperilaku santun dan menghargai orang lain',
      'Anak menunjukkan sikap jujur, disiplin, dan tanggung jawab',
      'Anak mengenal dan menghargai keberagaman budaya dan agama di sekitarnya',
      'Anak membiasakan mengucap syukur atas karunia Tuhan',
      'Anak menunjukkan sikap peduli dan suka menolong sesama',
      'Anak mengenal nilai-nilai kebaikan melalui cerita dan lagu'
    ],
    tp: [
      'Mengucapkan doa sebelum dan sesudah kegiatan dengan tertib',
      'Menyebut nama Tuhan melalui lagu dan cerita',
      'Menghormati guru dan orang tua dengan sikap santun',
      'Berbagi makanan atau mainan dengan teman',
      'Mengucapkan terima kasih dan maaf dalam interaksi sehari-hari',
      'Merapikan mainan setelah digunakan tanpa diminta',
      'Menghargai teman yang berbeda agama dan budaya',
      'Mengikuti kegiatan ibadah sesuai ajaran agama dengan bimbingan',
      'Menolong teman yang membutuhkan bantuan',
      'Menjaga kebersihan diri sebagai wujud rasa syukur'
    ]
  },
  'Fisik-Motorik': {
    cp: [
      'Anak menunjukkan kemampuan motorik kasar yang terkoordinasi dan seimbang',
      'Anak menunjukkan kemampuan motorik halus untuk kegiatan sehari-hari',
      'Anak mampu menjaga kesehatan dan kebersihan diri secara mandiri',
      'Anak menggunakan alat permainan dan media dengan aman',
      'Anak menunjukkan kekuatan dan ketahanan tubuh melalui aktivitas fisik',
      'Anak mengenal gerakan tubuh yang teratur dan terkontrol',
      'Anak menunjukkan kemampuan koordinasi mata dan tangan',
      'Anak terbiasa melakukan aktivitas fisik yang menyehatkan'
    ],
    tp: [
      'Melompat dengan dua kaki secara seimbang',
      'Berlari tanpa kehilangan keseimbangan',
      'Berjalan di atas garis lurus dengan stabil',
      'Menangkap bola dengan kedua tangan',
      'Menaiki dan menuruni tangga dengan kaki bergantian',
      'Menggunting mengikuti garis dengan rapi',
      'Meremas dan membentuk kertas atau adonan',
      'Memegang alat tulis dengan pegangan yang tepat',
      'Mencuci tangan sebelum dan sesudah makan',
      'Menjaga kebersihan diri setelah bermain'
    ]
  },
  Kognitif: {
    cp: [
      'Anak menunjukkan rasa ingin tahu melalui eksplorasi lingkungan sekitar',
      'Anak mengenal konsep bilangan, lambang bilangan, dan operasi sederhana',
      'Anak mengenal bentuk geometri, warna, dan ukuran',
      'Anak mampu mengelompokkan dan membandingkan benda',
      'Anak mengenal pola dan hubungan sebab-akibat sederhana',
      'Anak mampu memecahkan masalah sederhana dalam permainan',
      'Anak mengenal konsep ruang dan waktu dalam kegiatan sehari-hari',
      'Anak mampu mengurutkan dan menyusun benda secara logis'
    ],
    tp: [
      'Mengelompokkan benda berdasarkan warna, bentuk, atau ukuran',
      'Menyebut urutan angka 1 sampai 10 dengan benar',
      'Menghitung benda satu sampai sepuluh',
      'Menyusun balok menjadi bangunan sederhana',
      'Menyelesaikan puzzle sederhana dengan percaya diri',
      'Mengurutkan benda dari kecil ke besar atau sebaliknya',
      'Mengenal dan melanjutkan pola sederhana seperti merah-biru-merah',
      'Membedakan konsep banyak-sedikit dan besar-kecil',
      'Mengenal bentuk lingkaran, segitiga, dan persegi',
      'Mencari solusi sederhana saat menghadapi masalah permainan'
    ]
  },
  Bahasa: {
    cp: [
      'Anak menyimak dan memahami informasi dari percakapan atau cerita',
      'Anak mengungkapkan gagasan dan perasaan secara lisan',
      'Anak menunjukkan minat dan kemampuan mengenal huruf serta simbol',
      'Anak mampu bercerita dan mengekspresikan diri dengan kata-kata',
      'Anak mengenal kosakata baru dan menggunakannya dalam konteks',
      'Anak menunjukkan kemampuan berkomunikasi secara santun',
      'Anak memahami instruksi sederhana dan melaksanakannya',
      'Anak mengenal bahwa tulisan memiliki makna'
    ],
    tp: [
      'Menjawab pertanyaan sederhana tentang cerita yang didengar',
      'Menceritakan kembali pengalaman bermain dengan runtut',
      'Menyebut nama benda dan orang di sekitar',
      'Mengikuti instruksi dua langkah dengan benar',
      'Menyanyikan lagu sederhana sambil mengikuti lirik',
      'Mengenal huruf awal nama sendiri',
      'Menyebutkan huruf-huruf yang dikenal di lingkungan',
      'Menirukan bunyi huruf dengan jelas',
      'Bertanya dan menjawab dengan kalimat sederhana',
      'Mendengarkan teman berbicara tanpa memotong'
    ]
  },
  'Sosial-Emosional': {
    cp: [
      'Anak mengenal dan mengelola emosi secara sederhana',
      'Anak berinteraksi positif dengan teman sebaya dan orang dewasa',
      'Anak menunjukkan sikap kooperatif, berbagi, dan bergantian',
      'Anak menunjukkan kemandirian dan tanggung jawab sesuai usia',
      'Anak mengenal dan menghargai perbedaan',
      'Anak menunjukkan rasa percaya diri dalam kegiatan',
      'Anak menaati aturan sederhana di lingkungan bermain',
      'Anak mampu menyelesaikan konflik sederhana dengan bimbingan'
    ],
    tp: [
      'Mengantre menunggu giliran dengan sabar',
      'Meminta bantuan dengan kata-kata yang santun',
      'Bermain bersama teman tanpa berebut mainan',
      'Mengungkapkan perasaan dengan tenang dan jelas',
      'Berbagi mainan atau makanan dengan teman',
      'Membantu teman yang mengalami kesulitan',
      'Merapikan alat bermain setelah digunakan',
      'Menaati aturan permainan yang disepakati',
      'Menunjukkan rasa percaya diri saat tampil di depan teman',
      'Menghargai perbedaan pendapat dengan teman'
    ]
  },
  Seni: {
    cp: [
      'Anak menunjukkan minat dan kemampuan mengekspresikan diri melalui seni',
      'Anak mengenal berbagai bentuk karya seni seperti gambar, lagu, gerak, dan kriya',
      'Anak mampu berkarya seni menggunakan berbagai media dan bahan',
      'Anak menunjukkan kreativitas dalam menghasilkan karya sederhana',
      'Anak menikmati dan menghargai karya seni sendiri serta orang lain',
      'Anak mengekspresikan perasaan melalui musik, gerak, dan gambar',
      'Anak mengenal keindahan dan estetika dalam kegiatan sehari-hari',
      'Anak menunjukkan kemampuan mengolah bahan bekas menjadi karya'
    ],
    tp: [
      'Menggambar bebas dengan ide dan imajinasi sendiri',
      'Mewarnai gambar dengan rapi dan sesuai warna',
      'Membuat kolase dari kertas atau bahan bekas',
      'Membentuk bentuk sederhana dari adonan atau tanah liat',
      'Menari mengikuti irama musik dengan gembira',
      'Menyanyikan lagu dengan ekspresi dan gerakan',
      'Memainkan alat musik sederhana secara ritmis',
      'Memajang dan menceritakan hasil karya sendiri',
      'Menghargai hasil karya teman dengan memberi pujian',
      'Berkreasi menggunakan media yang tersedia di lingkungan'
    ]
  }
};

const els = {
  progressLinks: document.querySelectorAll('.step-link'),
  stepCards: document.querySelectorAll('.step-card'),
  clearBtn: document.getElementById('clearBtn'),
  tipsBtn: document.getElementById('tipsBtn'),
  objektifBtn: document.getElementById('objektifBtn'),
  raporOutput: document.getElementById('step4'),
  raporBody: document.getElementById('raporBody'),
  raporMeta: document.getElementById('raporMeta'),
  excelBtn: document.getElementById('excelBtn'),
  step3Title: document.getElementById('step3Title'),
  step3Desc: document.getElementById('step3Desc'),
  hintsBox: document.getElementById('hintsBox'),
  hintsList: document.getElementById('hintsList'),
  cetakBtn: document.getElementById('cetakBtn'),
  baruBtn: document.getElementById('baruBtn'),
  cpSelect: document.getElementById('cp'),
  cpManual: document.getElementById('cpManual'),
  tpSelect: document.getElementById('tp'),
  tpManual: document.getElementById('tpManual'),
  inputs: {
    nama: document.getElementById('nama'),
    usia: document.getElementById('usia'),
    tanggalJam: document.getElementById('tanggalJam'),
    konteks: document.getElementById('konteks'),
    aspek: document.getElementById('aspek'),
    indikator: document.getElementById('indikator'),
    catatan: document.getElementById('catatan')
  }
};

function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    Object.assign(state, data);
  } catch (e) {
    console.warn('Gagal memuat draft:', e);
  }
}

function saveDraft() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Gagal menyimpan draft:', e);
  }
}

function applyStateToUI() {
  els.inputs.nama.value = state.nama || '';
  els.inputs.usia.value = state.usia || '';
  els.inputs.tanggalJam.value = state.tanggalJam || '';
  els.inputs.konteks.value = state.konteks || '';
  els.inputs.aspek.value = state.aspek || '';
  populatePlanning(state.aspek);
  setChoice(els.cpSelect, els.cpManual, state.cp);
  setChoice(els.tpSelect, els.tpManual, state.tp);
  els.inputs.indikator.value = state.indikator || '';
  els.inputs.catatan.value = state.catatan || '';
  selectTechnik(state.teknik);
  showStep(state.step);
}

function populateChoiceSelect(select, items, placeholder) {
  select.innerHTML = '';
  const ph = document.createElement('option');
  ph.value = '';
  ph.textContent = placeholder;
  select.appendChild(ph);
  (items || []).forEach(text => {
    const opt = document.createElement('option');
    opt.value = text;
    opt.textContent = text;
    select.appendChild(opt);
  });
  const custom = document.createElement('option');
  custom.value = '__custom';
  custom.textContent = 'Lainnya (tulis sendiri)';
  select.appendChild(custom);
}

function populatePlanning(aspek) {
  const data = PLANNING[aspek] || { cp: [], tp: [] };
  populateChoiceSelect(els.cpSelect, data.cp, 'Pilih Capaian Pembelajaran (CP)');
  populateChoiceSelect(els.tpSelect, data.tp, 'Pilih Tujuan Pembelajaran (TP)');
}

function setChoice(select, manual, value) {
  manual.value = '';
  manual.hidden = true;
  if (!value) {
    select.value = '';
    return;
  }
  const matched = Array.from(select.options).some(opt => opt.value === value);
  if (matched) {
    select.value = value;
  } else {
    select.value = '__custom';
    manual.hidden = false;
    manual.value = value;
  }
}

function getChoice(select, manual) {
  if (select.value === '__custom') return manual.value.trim();
  return select.value;
}

function selectTechnik(key) {
  state.teknik = key;
  const tech = TECHNIKS[key];
  document.querySelectorAll('.tech-card').forEach(card => {
    card.classList.toggle('selected', card.dataset.tech === key);
  });
  els.step3Title.textContent = tech.title;
  els.step3Desc.textContent = tech.desc;
  renderHints(tech.hints);
}

function renderHints(hints) {
  els.hintsList.innerHTML = hints.map(h => `<li>${h}</li>`).join('');
}

function showStep(n) {
  state.step = Math.min(Math.max(n, 1), 4);
  els.stepCards.forEach(card => {
    card.classList.toggle('active', card.id === `step${state.step}`);
    card.classList.toggle('hidden', card.id !== `step${state.step}`);
  });
  els.progressLinks.forEach(link => {
    const num = Number(link.dataset.step);
    link.classList.toggle('active', num === state.step);
    link.classList.toggle('done', num < state.step);
  });

  updateNavButtons();
  saveDraft();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavButtons() {
  const isFirst = state.step === 1;
  const isLast = state.step === 4;

  document.querySelectorAll('.prev-step').forEach(btn => {
    btn.disabled = isFirst;
  });

  document.querySelectorAll('.next-step').forEach(btn => {
    btn.hidden = isLast;
    btn.textContent = state.step === 3
      ? 'Simpan & Unduh Laporan'
      : 'Selanjutnya';
  });
}

function readForm() {
  return {
    step: state.step,
    nama: els.inputs.nama.value.trim(),
    usia: els.inputs.usia.value.trim(),
    tanggalJam: els.inputs.tanggalJam.value.trim(),
    konteks: els.inputs.konteks.value.trim(),
    aspek: els.inputs.aspek.value.trim(),
    cp: getChoice(els.cpSelect, els.cpManual),
    tp: getChoice(els.tpSelect, els.tpManual),
    indikator: els.inputs.indikator.value.trim(),
    teknik: state.teknik,
    catatan: els.inputs.catatan.value.trim()
  };
}

function bindInputs() {
  const inputs = [
    els.inputs.nama,
    els.inputs.usia,
    els.inputs.tanggalJam,
    els.inputs.konteks,
    els.inputs.indikator,
    els.cpManual,
    els.tpManual,
    els.inputs.catatan
  ];
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      Object.assign(state, readForm());
      saveDraft();
    });
  });

  els.inputs.aspek.addEventListener('change', () => {
    populatePlanning(els.inputs.aspek.value);
    setChoice(els.cpSelect, els.cpManual, '');
    setChoice(els.tpSelect, els.tpManual, '');
    Object.assign(state, readForm());
    saveDraft();
  });

  els.cpSelect.addEventListener('change', () => {
    els.cpManual.hidden = els.cpSelect.value !== '__custom';
    if (els.cpManual.hidden) els.cpManual.value = '';
    Object.assign(state, readForm());
    saveDraft();
  });

  els.tpSelect.addEventListener('change', () => {
    els.tpManual.hidden = els.tpSelect.value !== '__custom';
    if (els.tpManual.hidden) els.tpManual.value = '';
    Object.assign(state, readForm());
    saveDraft();
  });

  document.querySelectorAll('.tech-card').forEach(card => {
    card.addEventListener('click', () => {
      selectTechnik(card.dataset.tech);
      Object.assign(state, readForm());
      saveDraft();
    });
  });

  els.clearBtn.addEventListener('click', () => {
    if (!confirm('Kosongkan semua data form?')) return;
    state.nama = '';
    state.usia = '';
    state.tanggalJam = '';
    state.konteks = '';
    state.aspek = '';
    state.cp = '';
    state.tp = '';
    state.indikator = '';
    state.catatan = '';
    applyStateToUI();
  });

  els.tipsBtn.addEventListener('click', () => {
    els.hintsBox.hidden = !els.hintsBox.hidden;
  });

  els.objektifBtn.addEventListener('click', () => {
    alert('Pemeriksa objektivitas: Pastikan catatan hanya berisi fakta yang terlihat dan terdengar, tanpa interpretasi atau label subjektif.');
  });

  document.querySelectorAll('.prev-step').forEach(btn => {
    btn.addEventListener('click', () => {
      if (state.step > 1) {
        Object.assign(state, readForm());
        saveDraft();
        showStep(state.step - 1);
      }
    });
  });

  document.querySelectorAll('.next-step').forEach(btn => {
    btn.addEventListener('click', () => {
      if (state.step === 3) {
        handleSave();
      } else if (state.step < 4) {
        goNext();
      }
    });
  });

  els.excelBtn.addEventListener('click', () => {
    Object.assign(state, readForm());
    downloadExcel();
  });

  els.cetakBtn.addEventListener('click', () => {
    window.print();
  });

  els.baruBtn.addEventListener('click', () => {
    state.nama = '';
    state.usia = '';
    state.tanggalJam = '';
    state.konteks = '';
    state.aspek = '';
    state.cp = '';
    state.tp = '';
    state.indikator = '';
    state.catatan = '';
    state.teknik = 'anekdot';
    saveDraft();
    applyStateToUI();
    showStep(1);
  });

  els.progressLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = Number(link.dataset.step);
      if (target <= state.step || target === 1) {
        showStep(target);
      }
    });
  });
}

function goNext() {
  const error = validateStep(state.step);
  if (error) {
    alert(error);
    return;
  }
  Object.assign(state, readForm());
  saveDraft();
  showStep(state.step + 1);
}

function validateStep(n) {
  const f = readForm();
  switch (n) {
    case 1:
      return f.nama ? '' : 'Isi nama / inisial anak.';
    case 2:
      if (!f.usia) return 'Pilih kelompok usia.';
      if (!f.teknik) return 'Pilih teknik asesmen.';
      return '';
    case 3:
      if (!f.konteks) return 'Isi konteks kegiatan.';
      if (!f.catatan) return 'Isi catatan butir observasi.';
      return '';
    default:
      return '';
  }
}

function handleSave() {
  const error = validateStep(3);
  if (error) {
    alert(error);
    showStep(3);
    return;
  }
  Object.assign(state, readForm());
  saveDraft();
  renderRapor();
  showStep(4);
}

function fileStamp() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function safeName(text) {
  return (text || 'asesmen').replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '');
}

function downloadExcel() {
  const tech = TECHNIKS[state.teknik];
  const tgl = state.tanggalJam ? new Date(state.tanggalJam).toLocaleString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  }) : '-';

  const rows = [
    ['Nama Anak', state.nama],
    ['Kelompok Usia', state.usia],
    ['Tanggal & Jam', tgl],
    ['Konteks Kegiatan / Sentra', state.konteks],
    ['Teknik Asesmen', tech.label],
    ['Aspek STPPA', state.aspek],
    ['Capaian Pembelajaran (CP)', state.cp],
    ['Tujuan Pembelajaran (TP)', state.tp],
    ['Indikator STPPA', state.indikator],
    ['Catatan Observasi', state.catatan]
  ].filter(([, value]) => value);

  const table = rows.map(([k, v]) =>
    `<tr><td><b>${escapeHtml(k)}</b></td><td>${escapeHtml(v || '-').replace(/\n/g, '<br>')}</td></tr>`
  ).join('');

  const html = `<html xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="UTF-8"></head><body><table border="1">${table}</table></body></html>`;

  const blob = new Blob(['\ufeff', html], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `rapor_${safeName(state.nama)}_${fileStamp()}.xls`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function renderRapor() {
  const tech = TECHNIKS[state.teknik];
  const tgl = state.tanggalJam ? new Date(state.tanggalJam).toLocaleString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  }) : '-';

  const planning = [
    ['Aspek STPPA', state.aspek],
    ['Capaian Pembelajaran (CP)', state.cp],
    ['Tujuan Pembelajaran (TP)', state.tp],
    ['Indikator STPPA', state.indikator]
  ].filter(([, value]) => value);

  els.raporMeta.textContent = `${state.nama} · ${state.usia} · ${tgl} · Teknik: ${tech.label}`;

  els.raporBody.innerHTML = `
    <p><strong>Nama Anak:</strong> ${escapeHtml(state.nama)}</p>
    <p><strong>Kelompok Usia:</strong> ${escapeHtml(state.usia)}</p>
    <p><strong>Tanggal &amp; Jam:</strong> ${escapeHtml(tgl)}</p>
    <p><strong>Konteks Kegiatan / Sentra:</strong> ${escapeHtml(state.konteks)}</p>
    <p><strong>Teknik Asesmen:</strong> ${escapeHtml(tech.label)}</p>
    ${planning.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`).join('')}
    <p><strong>Catatan Observasi:</strong></p>
    <p>${escapeHtml(state.catatan).replace(/\n/g, '<br>')}</p>
    <hr style="border:none; border-top:1px solid var(--line); margin:20px 0;">
    <p style="font-size:0.85rem; color:var(--muted);">Dibuat dengan SiPAUD Asesmen &mdash; Asesmen Formatif PAUD.</p>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function init() {
  loadDraft();
  applyStateToUI();
  bindInputs();
}

document.addEventListener('DOMContentLoaded', init);
