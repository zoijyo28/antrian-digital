// Variabel antrian
let nomorAntrian = 0;
let nomorProses = 0;
let totalAntrian = 0;

// Fungsi untuk memperbarui tampilan nomor antrian
function update() {
    document.getElementById("currentQueue").textContent = nomorAntrian;
    document.getElementById("processingQueue").textContent = nomorProses;
    document.getElementById("totalQueue").textContent = totalAntrian;
}

// Fungsi untuk mengucapkan teks dengan suara wanita Indonesia
function speakText(text) {
    let speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = "id-ID"; 
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    let voices = speechSynthesis.getVoices();
    let femaleVoice = voices.find(voice => voice.lang === "id-ID" && voice.name.includes("Female"));
    if (femaleVoice) {
        speech.voice = femaleVoice;
    }

    speechSynthesis.speak(speech);
}

// Fungsi untuk memainkan bel lalu mengucapkan teks (khusus untuk "Panggil Berikutnya")
function playBellAndSpeak(text) {
    let audio = new Audio("sound/belloket.wav"); // Pastikan file ada di folder yang benar

    // Setelah bel selesai berbunyi, baru menjalankan speakText()
    audio.onended = function () {
        speakText(text);
    };

    audio.play(); // Memutar suara bel
}

// Event Listener untuk tombol Ambil Antrian
document.getElementById("btnAmbil").addEventListener("click", function () {
    nomorAntrian++;
    totalAntrian++;
    update(); 
    speakText("Nomor Antrian Baru Telah Ditambahkan, Silahkan Menunggu Giliran Anda.");
});

// Event Listener untuk tombol Panggil Berikutnya (dengan suara bel)
document.getElementById("btnNext").addEventListener("click", function () {
    if (nomorProses < nomorAntrian) {
        nomorProses++;
        update();
        playBellAndSpeak("Nomor Antrian " + nomorProses + ". Silahkan Menuju Loket.");
    }
});

// Event Listener untuk tombol Reset Antrian
document.getElementById("btnReset").addEventListener("click", function () {
    nomorAntrian = 0;
    nomorProses = 0;
    totalAntrian = 0;
    update();
    speakText("Antrian telah direset. Silakan ambil nomor antrian baru.");
});

// Fungsi Menampilkan Jam dan Tanggal
function updateDateTime() {
    document.getElementById("datetime").textContent = new Date().toLocaleString('id-ID', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit'
    });
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Fungsi untuk teks berjalan
function startRunningText() {
    let text = document.querySelector('.running-text span');
    let container = document.querySelector('.running-text');
    let speed = 1.5; // Kecepatan lebih nyaman
    let pos = container.offsetWidth;

    function move() {
        pos -= speed;
        if (pos < -text.offsetWidth) {
            pos = container.offsetWidth;
        }
        text.style.transform = `translateX(${pos}px)`;
        requestAnimationFrame(move);
    }

    move();
}
startRunningText();

// Pastikan tampilan diperbarui saat halaman dimuat pertama kali
update();
