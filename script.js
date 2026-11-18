
// =====================================
// VALIDASI DOKUMEN RAJA ARMADA
// =====================================

function validasiDokumenRental() {

    // Dokumen hanya diwajibkan untuk lepas kunci
    const layanan = document.getElementById("modal-rental-layanan");

    if (!layanan) {
        alert("Pilihan paket layanan tidak ditemukan.");
        return false;
    }

    if (layanan.value !== "Lepas Kunci") {
        return true;
    }

    const dokumen = [
        { id: "dokumen-ktp", nama: "Foto KTP" },
        { id: "dokumen-kk", nama: "Foto KK" },
        { id: "dokumen-sim", nama: "Foto SIM A" },
        { id: "dokumen-selfie", nama: "Foto selfie memegang KTP" }
    ];

    for (const item of dokumen) {

        const input = document.getElementById(item.id);

        if (!input || !input.files || input.files.length === 0) {
            alert("Mohon unggah " + item.nama + " terlebih dahulu.");

            if (input) input.focus();

            return false;
        }

        const file = input.files[0];

        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            alert(item.nama + " harus berupa gambar JPG, PNG, atau WEBP.");
            return false;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert(item.nama + " maksimal 5 MB.");
            input.value = "";
            return false;
        }
    }

    return true;
}

 // =====================================
 // MINIMAL HARI SEWA RAJA ARMADA
 // =====================================

const minimalHariSewa = {
    "Dalam kota": 8,
    "Luar kota": 8,
};

function cekMinimalSewa() {

    const tujuan = document.getElementById("modal-rental-tujuan");
    const durasi = document.getElementById("modal-rental-durasi");
    const info = document.getElementById("info-minimal-sewa");

    // Pastikan elemen HTML tersedia
    if (!tujuan || !durasi || !info) return;

    const kota = tujuan.value;

    // Jika tujuan belum dipilih
    if (!kota) {
        info.textContent = "Silakan pilih tujuan perjalanan.";
        durasi.min = 1;
        return;
    }

    // Ambil minimal hari berdasarkan tujuan
    const minimal = minimalHariSewa[kota];

    if (!minimal) return;

    // Atur batas minimal durasi
    durasi.min = 1;

    info.textContent =
        "Minimal sewa tujuan " + kota +
        " adalah " + minimal + " hari.";

}
